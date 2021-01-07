class Content {

  constructor () {
    let that = this;

    // capture:
    // 1. Tab
    // 2. Area
    // 3. Desktop
    this.restore = this.restore.bind(this);
    this.restore(); // init state

    this.minAreaWidth = 50;
    this.minAreaHeight = 50;
    this.delay = 3000;

    this._capturearea = "__recorder-area-capture__";
    this._clipareaid = "__recorder-area-capture-clip__";
    this._clippingClass = "__rec-clipping";
    this._clippedClass = "__rec-clipped";

    this.handleBrowserMessaging = this.handleBrowserMessaging.bind(this);
    this.drawArea = this.drawArea.bind(this);

    this.handleBrowser_BG__CONTENT__CAPTURE_AREAWEBCAM_START = this.handleBrowser_BG__CONTENT__CAPTURE_AREAWEBCAM_START.bind(this);
    this.handleBrowser_BG__CONTENT__TIMER = this.handleBrowser_BG__CONTENT__TIMER.bind(this);

    this.handleUser_DOCUMENT_KEYDOWN = this.handleUser_DOCUMENT_KEYDOWN.bind(this);
    this.handleUser_DOCUMENT_ESCAPEPRESSED = this.handleUser_DOCUMENT_ESCAPEPRESSED.bind(this);
    this.handleUser_CLIP_MOUSEDOWN = this.handleUser_CLIP_MOUSEDOWN.bind(this);
    this.handleUser_DOCUMENT_MOUSEDOWN = this.handleUser_DOCUMENT_MOUSEDOWN.bind(this);
    this.handleUser_DOCUMENT_MOUSEUP = this.handleUser_DOCUMENT_MOUSEUP.bind(this);
    this.handleUser_DOCUMENT_MOUSEMOVE = this.handleUser_DOCUMENT_MOUSEMOVE.bind(this);
    // this.handleEvent_VISIBILITY_CHANGE = this.handleEvent_VISIBILITY_CHANGE.bind(this);

    chrome.runtime.onMessage.addListener(this.handleBrowserMessaging);
  };

  // service

  restore () {
    this.escaped = false;
    this.capturing = false;
    this.webcamCapture = false;
    
    this.scroll = document.scrollingElement;
    this.state = {};
    this.state.mouse = {x: 0, y: 0};
    this.state.area = { x: 0, y: 0, w: 0, h: 0 };
    this.state.areaStart = { x: 0, y: 0 };

    this.unmounted = true;
    this.mousedown = false;
    this.movedout = false;
  }

  mount () {
    this.unmounted = false;

    let div = document.getElementById(this._clipareaid);
    if (div) div.parentNode.removeChild(div);

    this.clip = document.createElement("div");
    this.clip.id = this._clipareaid;
    document.body.appendChild(this.clip);

    this.scroll = document.scrollingElement;
    this.startScrolling = { x: this.scroll.scrollLeft, y: this.scroll.scrollTop };
    this.scroll.classList.add(this._capturearea);
    document.body.scrollTo(this.startScrolling.x, this.startScrolling.y);

    this.clip.style.display = "block";
  }

  unmount () {
    this.unmounted = true;

    this.scroll.classList.remove(this._capturearea);
    this.clip.classList.remove(this._clippingClass);
    this.scroll.classList.remove(this.clippedClass);

    this.clip.style.clipPath = "";
    this.clip.style.display = "none";

    // webcam
    if (this.webcam) {
      let el = document.querySelector("#" + this.webcam.id);
      if (el) el.parentNode.removeChild(el);
    }
    
    this.restore();
  }

  events () {
    document.addEventListener("keydown", this.handleUser_DOCUMENT_KEYDOWN);
    this.clip.addEventListener("mousedown", this.handleUser_CLIP_MOUSEDOWN);
    document.addEventListener("mousedown", this.handleUser_DOCUMENT_MOUSEDOWN);
    document.addEventListener("mouseup", this.handleUser_DOCUMENT_MOUSEUP);
    document.addEventListener("mousemove", this.handleUser_DOCUMENT_MOUSEMOVE);
  };

  unevents () {
    document.removeEventListener("keydown", this.handleUser_DOCUMENT_KEYDOWN);
    this.clip.removeEventListener("mousedown", this.handleUser_CLIP_MOUSEDOWN);
    document.removeEventListener("mousedown", this.handleUser_DOCUMENT_MOUSEDOWN);
    document.removeEventListener("mouseup", this.handleUser_DOCUMENT_MOUSEUP);
    document.removeEventListener("mousemove", this.handleUser_DOCUMENT_MOUSEMOVE);
  }

  // drawing

  isAreaDone () {
    return this.state.area.w > this.minAreaWidth && this.state.area.h > this.minAreaHeight;
  }

  drawArea () {
    if (!this.mousedown || this.unmounted) return;
    let path = "polygon(0 0, 0 100%, 100% 100%, 100% 0, 0 0, " + this.state.area.x + "px " + this.state.area.y + "px, " + (this.state.area.x + this.state.area.w) + "px " + this.state.area.y + "px, " + (this.state.area.x + this.state.area.w) + "px " + (this.state.area.y + this.state.area.h) + "px, " + this.state.area.x + "px " + (this.state.area.y + this.state.area.h) + "px, " + this.state.area.x + "px " + this.state.area.y + "px, 0 0)";
    this.clip.style.clipPath = path;
  }

  // user actions

  handleUser_DOCUMENT_KEYDOWN(e) {
    if (this.unmounted) return;
    if (e.keyCode === 27) this.handleUser_DOCUMENT_ESCAPEPRESSED();
  }

  handleUser_DOCUMENT_MOUSEDOWN (e) {
    if (this.unmounted) return;
    if (this.scroll.classList.contains(this._clippedClass)) return;

    this.mousedown = true;
    this.escaped = false;

    this.state.mouse.x = e.clientX;
    this.state.mouse.y = e.clientY;

    this.state.areaStart.x = e.clientX;
    this.state.areaStart.y = e.clientY;

    this.state.area.x = e.clientX;
    this.state.area.y = e.clientY;
    this.state.area.w = 0;
    this.state.area.h = 0;

    this.clip.classList.add(this._clippingClass);
  }

  handleUser_CLIP_MOUSEDOWN(e) {
    if (this.unmounted) return;
    this.scroll.classList.remove(this._clippedClass);
    this.handleUser_DOCUMENT_MOUSEDOWN(e);
    e.stopPropagation();
  }

  handleUser_DOCUMENT_MOUSEUP (e) {
    this.state.mouse.x = e.clientX;
    this.state.mouse.y = e.clientY;

    this.mousedown = false;
    if (this.unmounted && this.mousedown) return;
    if (this.escaped) return;
    if (e.target !== this.clip) return;

    let newArea = {
      x: Math.min(this.state.mouse.x, this.state.areaStart.x),
      y: Math.min(this.state.mouse.y, this.state.areaStart.y),
      w: Math.abs(this.state.mouse.x - this.state.areaStart.x),
      h: Math.abs(this.state.mouse.y - this.state.areaStart.y)
    };

    this.state.area = newArea;

    let isAreaDone = this.isAreaDone();

    if (!isAreaDone ) {
      this.clip.classList.remove(this._clippingClass);
      this.scroll.classList.remove(this._clippedClass);
      if (this.capturing) {
        chrome.runtime.sendMessage({ action: "CONTENT__BG__CAPTURE_AREA_STOP" });
        this.capturing = false;
      }
    } else {
      this.scroll.classList.add(this._clippedClass);
      chrome.runtime.sendMessage({ action: "CONTENT__BG__CAPTURE_AREA_START", data: this.state.area });
      this.capturing = true;
    }
  }

  handleUser_DOCUMENT_MOUSEMOVE (e) {
    if (this.unmounted && this.mousedown) return;

    this.state.mouse.x = e.clientX;
    this.state.mouse.y = e.clientY;

    if (!this.mousedown) return;

    let newArea = {
      x: Math.min(this.state.mouse.x, this.state.areaStart.x),
      y: Math.min(this.state.mouse.y, this.state.areaStart.y),
      w: Math.abs(this.state.mouse.x - this.state.areaStart.x),
      h: Math.abs(this.state.mouse.y - this.state.areaStart.y)
    };
    
    this.state.area = newArea;

    requestAnimationFrame(this.drawArea);
  }

  handleUser_DOCUMENT_ESCAPEPRESSED() {
    chrome.runtime.sendMessage({ action: "CONTENT__BG__CAPTURE_AREA_STOP" });

    this.escaped = true;

    this.unmount();
    this.unevents();
  }

  // browser: capture tab or area with webcam

  handleBrowser_BG__CONTENT__CAPTURE_AREAWEBCAM_START() {
    // webcam
    this.webcam = document.createElement("iframe");
    this.webcam.setAttribute("allow", "camera");
    this.webcam.id = "__recorder-area-webcam__";

    let camSize = {};
    camSize.width = 204;
    camSize.height = 154;

    let prop = camSize.width / camSize.height;
    if (this.state.area.w < camSize.width) {
      camSize.width = this.state.area.w - 24;
      camSize.height = Math.round(camSize.width / prop);
    }
    if (this.state.area.h < camSize.height) {
      camSize.height = this.state.area.h - 24;
      camSize.width = Math.round(camSize.height * prop);
    }

    let camCoords = {};
    camCoords.left = this.state.area.x + this.state.area.w - camSize.width - 12;
    camCoords.top = this.state.area.y + this.state.area.h - camSize.height - 12;
    this.webcam.setAttribute("style", `bottom:unset !important;right:unset !important;left:${camCoords.left}px;top:${camCoords.top}px;width:${camSize.width}px;height:${camSize.height}px`);
    this.webcam.src = chrome.extension.getURL("camera.iframe.html");
    document.body.appendChild(this.webcam);
      // webcam end
  }
  handleBrowser_BG__CONTENT__CAPTURE_TABWEBCAM_START() {
    // webcam
    this.webcam = document.createElement("iframe");
    this.webcam.setAttribute("allow", "camera");
    this.webcam.id = "__recorder-area-webcam__";
    this.webcam.src = chrome.extension.getURL("camera.iframe.html");
    document.body.appendChild(this.webcam);
  }

  handleBrowser_BG__CONTENT__CAPTURE_WEBCAM_STOP() {
    let el = document.querySelector("#"+this.webcam.id);
    if (el) el.parentNode.removeChild(el);
  }

  // timer
  handleBrowser_BG__CONTENT__TIMER(req) {
    let timerText = req.value;

    if (timerText === '') {
      if(this.timerDiv){
        let el = document.querySelector("#"+this.timerDiv.id);
        if (el) el.parentNode.removeChild(el);
        this.timerDiv = null;
      }
    } else {
      if (!this.timerDiv) { // create timerDiv
        this.timerDiv = document.createElement("div");
        this.timerDiv.id = "__rec_timer_div";
        document.body.appendChild(this.timerDiv);
      }
      this.timerDiv.textContent = req.value;
    }
  }

  // browser: capture area

  handleBrowser_ALL__CONTENT__CAPTURE_AREA_ENABLE (req) {
    this.mount();
    this.events();
  }

  handleBrowser_BG__CONTENT__CAPTURE_AREA_DISABLE () {
    if (this.unmounted) return;
    this.unmount();
    this.unevents();
  }

  // handle messaging

  handleBrowserMessaging (req, sender, sendResponse) {
    // console.log("message: ", req.action);
    let grant = typeof (this["handleBrowser_" + req.action]) !== 'undefined';
    if (!grant) return;
    this['handleBrowser_' + req.action](req, sender, sendResponse);
  }

};

window.__r_ecorder_ext = new Content();
console.log("HERE!");