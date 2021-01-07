import Storage from './storage.js';
import Badge from './badge.js';
import Helpers from "./helpers.js";
import config from "./config.js";
var KEY_USERID = "Ext_UserId";
var userId = "";
var homepage = function () {return chrome.runtime.getManifest().homepage_url};
var version = function () {return chrome.runtime.getManifest().version};
var welcomeUrl, goodbyeUrl;





class Background extends Helpers {
  
  constructor () {
    super();

    
    // bind local methods
    this.handleExtensionInstalled = this.handleExtensionInstalled.bind(this);
    this.handlePageUpdated = this.handlePageUpdated.bind(this);
    this.handleTabChanged = this.handleTabChanged.bind(this);
    this.stopCapturing = this.stopCapturing.bind(this);
    this.startCamera = this.startCamera.bind(this);
    

    this.tabHandle_CONTENT__BG__CAPTURE_AREA_START = this.tabHandle_CONTENT__BG__CAPTURE_AREA_START.bind(this);
    
    

    this.captureDelay = 3;

    this.captureRecorder = false;

    // state
    this.state = {};
    this.state.capturing = false;
    
    
    this.videoRecorderSettings = {};
    this.videoRecorderSettings.mimeType = "video/webm\;codecs=h264";
    this.videoRecorderSettings.audioBitsPerSecond = 128000;
    this.videoRecorderSettings.videoBitsPerSecond = 6000000;

    // chrome.tabCapture
    this.tabCaptureSettings = config.tabCapture;

    // navigator.MediaDevices.getDisplayMedia

    // video
    this.videoCapturingSettings = config.userMediaVideo;

    // audio
    this.audioCapturingSettings = config.userMediaAudio;

    this.badge = new Badge(this.state);

    this.capturearea = false;

    this.capturePlayer = false;
    this.captureCanvas = false;
    this.captureTime = 0;
    this.captureTimer = false;

    this.badgeTimers = [];

    this.emergencyCancelCapture = false;

    this.events();

    this.storage = new Storage();

    this.badge.setBackgroundColor();
    this.badge.setDefaultPopup();

    this.initCommands();
  };

  initCommands () {
    chrome.commands.onCommand.addListener(async command => {
      console.log('Command:', command);
      if (command === 'toggle_rec_screen') { // c s 3
        if (this.state.capturing) this.stopCapturing();
        else this.tabHandle_POPUP__BG__CAPTURE_DESKTOP_START();

      } else if (command === 'toggle_rec_area') { // c s 1
        if (!(await this.isTabNotRestricted())) alert("Capturing Area on this page is disabled by browser permissions");
        else {
          if (this.state.capturing) this.stopCapturing();
          else this.tabHandle_POPUP__BG__CAPTURE_AREA_ENABLE();
        }

      }
    });
  }

  getStorage () {
    return this.storage;
  }

  events () {

    // listen to messages
    chrome.runtime.onMessage.addListener(this.handleMessages);
    // listen to tab Updated
    chrome.tabs.onUpdated.addListener(this.handlePageUpdated);
    // listen to tab Change
    chrome.tabs.onActivated.addListener(this.handleTabChanged);
    // listen to extension installed
    chrome.runtime.onInstalled.addListener(this.handleExtensionInstalled);
    //chrome.browserAction.onClicked.addListener(this.onIconClicked);
  };
  
 


  handleExtensionInstalled (details) {
    this.storage.setDefaults();
    if (details.reason !== "install") return;
    chrome.storage.local.get((options) => {
      userId = options[KEY_USERID];
      if (!userId) {
        userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        let set = {};
        set[KEY_USERID] = userId;
        chrome.storage.local.set(set, ()=> {});
      }
      welcomeUrl = `${homepage()}/?v=${version()}&type=install&uid=${userId}`;
      goodbyeUrl = `${homepage()}?v=${version()}&type=uninstall&uid=${userId}`;
      chrome.runtime.setUninstallURL(goodbyeUrl,()=>{
        console.log("installed uninstall url");
        chrome.tabs.create({ url: welcomeUrl });
      })
    });
    
  }

  getSetTimerTextFunc(text) {
    return () => {
      if (this.emergencyCancelCapture) {
        this.clearBadgeTimers();
        this.hideWaitTimers();
      } else {
        this.badge.setText(text);
        this.fireTab_BG__CONTENT__TIMER(text);
      }
    };
  };

  clearBadgeTimers () {
    if (this.badgeTimers && this.badgeTimers.length > 0) this.badgeTimers.filter((timer) => clearTimeout(timer));
    this.badgeTimers = [];
  }

  hideWaitTimers () {
    this.badge.setText("");
    this.fireTab_BG__CONTENT__TIMER("");
  }

  getCaptureTabOptions (tab) {
    let sets = {
      ...this.tabCaptureSettings,
      videoConstraints: {
        mandatory: {
          ...this.tabCaptureSettings.videoConstraints.mandatory,
          minWidth: tab.width * window.devicePixelRatio,
          maxWidth: tab.width * window.devicePixelRatio,
          minHeight: tab.height * window.devicePixelRatio,
          maxHeight: tab.height * window.devicePixelRatio
        }
      }
    }

    return sets;
  };

  showBadgeCaptureTime () {
    if (!this.state.capturing) return;
    let time = () => {
      let m = Math.floor(this.captureTime / 60);
      let s = this.captureTime - 60 * m;
      m = m < 10 ? "0" + m : "" + m;
      s = s < 10 ? "0" + s : "" + s;
      return [m, s].join("");
    };
    this.badge.setText(time());

    this.captureTime += 1;

    this.badgeTimers = [];
    this.badgeTimers.push(setTimeout(() => this.showBadgeCaptureTime(), 1000));
  }

  setCaptureBadgeDelay (options) {
    let tab = options.tab;
    if(!tab){return;}
    let handleStream = options.handleStream;
    let secs = options.secs;
    let o = options.o;
    let stream = options.stream;
    this.tabId = tab.id;

    if (this.emergencyCancelCapture) return;
    secs = secs || config.captureDelay;
    let dec = secs;
    let inc = 0;

    // badge
    this.badge.setAction(this.stopCapturing.bind(this));
    this.badge.setEmptyPopup();

    // countdown timers
    this.clearBadgeTimers();
    this.hideWaitTimers();

    do {
      this.badgeTimers.push(setTimeout(this.getSetTimerTextFunc(dec), inc * 1000)); // N sec delay
      dec -= 1;
      inc += 1;
    } while (secs > inc);

    // capture timer
    this.captureTimer = setTimeout(() => {
      // this.fireTab_BG__CONTENT__TIMER("");
      this.startCapturing(handleStream, tab, o, stream);
    }, secs * 1000);

  };

  startCapturing(handleStream, tab, o, stream) {
    this.state.capturing = true;

    o = o || this.getCaptureTabOptions(tab);

    this.captureTime = 0;

    this.badge.set(this.stopCapturing);

    this.hideWaitTimers();
    this.showBadgeCaptureTime();

    if (stream) handleStream(stream);
    else chrome.tabCapture.capture(o, handleStream);
  }

  stopCapturing() {
    this.emergencyCancelCapture = true;

    this.state.capturing = false;
    this.captureTime = 0;

    this.badge.set();
    this.badge.setIconNormal();

    clearTimeout(this.captureTimer);

    this.clearBadgeTimers();
    this.hideWaitTimers();

    this.stopCamera();

    if (this.capturearea) {
      this.capturearea = false;
      this.fireTab_BG__CONTENT__CAPTURE_AREA_DISABLE();
    }

    if (!this.capturePlayer && !this.captureRecorder) {
      console.log("Error:", "player wan't created for this capture. Nothing to stop");
      return;
    }
    try {
      if (this.capturePlayer) this.capturePlayer.pause();
      else if (this.captureRecorder && this.captureRecorder.state !== "inactive") this.captureRecorder.stop();
    } catch (e) {
      console.warn(e)
    }
  }

  async stopCamera () {
    let webcamCapture = await this.storage.getCaptureCamera();
    if (webcamCapture) this.fireTab_BG__CONTENT__CAPTURE_WEBCAM_STOP();
  }

  async startCamera (area) {
    let webcamCapture = await this.storage.getCaptureCamera();
    if (!area && webcamCapture) {
      this.fireTab_BG__CONTENT__CAPTURE_TABWEBCAM_START();
    } else if (area && webcamCapture) {
      this.fireTab_BG__CONTENT__CAPTURE_AREAWEBCAM_START();
    }
  }

  async tabHandle_POPUP__BG__CAPTURE_AREA_ENABLE() {
    let inserted = await this.isScriptsInserted();
    if (!inserted) await this.injectScriptsAndStyles();
    this.fireTab_ALL__CONTENT__CAPTURE_AREA_ENABLE()
  }


// VOICE & SOUND

  tabHandle_POPUP__BG__CAPTURE_VOICE(tabid, data) {
    this.emergencyCancelCapture = false;
    this.storage.setCaptureVoice(data.checked);
  }

  tabHandle_POPUP__BG__CAPTURE_SOUND(tabid, data) {
    this.emergencyCancelCapture = false;
    this.storage.setCaptureSound(data.checked);
  }


// CAMERA

  tabHandle_POPUP__BG__CAPTURE_CAMERA(tabid, data) {
    this.emergencyCancelCapture = false;
    this.storage.setCaptureCamera(data.checked);
  }

  tabHandle_POPUP__BG__OPTION_GDRIVE(tabid, data) {
    this.storage.setOptionGdrive(data.checked);
  }


// TAB

  async tabHandle_POPUP__BG__CAPTURE_TAB_START (tabid) {
    this.emergencyCancelCapture = false;
    let voiceCapture = await this.storage.getCaptureVoice();
    let soundCapture = await this.storage.getCaptureSound();
    this.videoRecorderSettings.mimeType = await this.storage.getCodec();

    let handleStream = async (stream) => {
      if (!stream) {
        console.error('Error starting tab capture: ' + (chrome.runtime.lastError.message || 'UNKNOWN'));
        this.stopCapturing();
        return;
      }

      // replaying tab audio if needed
      let clonedTabAudio = this.cloneAndPlayAudioStreamIfNeeded(soundCapture, stream.getAudioTracks().length > 0 ? stream.getAudioTracks()[0] : false);

      // mic
      let micStream = false;
      if (voiceCapture) {
        try {
          micStream = await navigator.mediaDevices.getUserMedia({ audio: this.audioCapturingSettings });
        } catch (e) {
          console.error('Error starting tab capture (Mic): ' + (chrome.runtime.lastError.message || 'UNKNOWN'));
          this.stopCapturing();
          return;
        }
      }

      let streamsAudioBup = [];
      if (micStream) {
        let audioTracks = this.mergeAudioStreams(stream, micStream);
        let audioTrack = audioTracks.length > 0 ? audioTracks[0] : micStream.getAudioTracks()[0];
        streamsAudioBup = stream.getAudioTracks();
        stream.getAudioTracks().filter(track => stream.removeTrack(track));
        stream.addTrack(audioTrack);
      }

      // capture stream
      this.captureRecorder = new MediaRecorder(stream, this.videoRecorderSettings);

      let chunks = [];
      let collectData = (e) => chunks.push(e.data);
      let sendData = () => {
        let blob = new Blob(chunks);
        this.downloadFile(blob, "rec-tab.webm", true);
        blob = null;
        stream.getTracks().forEach(track => track.stop());
        
        if (micStream) micStream.getTracks().forEach(track => track.stop());
        micStream = null;

        this.stopPlayingAndRemoveCloneOfTabAudio(clonedTabAudio);

        if (streamsAudioBup.length > 0) streamsAudioBup.forEach(track => track.stop());
        
        this.captureRecorder = null;
        stream = null;
      };
      
      this.captureRecorder.addEventListener("dataavailable", collectData)
      this.captureRecorder.addEventListener("stop", sendData)
      this.captureRecorder.start();
    };

    let prepare = (tab) => {

      let o = {
        video: true,
        audio: false,
        videoConstraints: {
          mandatory: {
            ...this.tabCaptureSettings.videoConstraints.mandatory,
            minWidth: tab.width * window.devicePixelRatio,
            maxWidth: tab.width * window.devicePixelRatio,
            minHeight: tab.height * window.devicePixelRatio,
            maxHeight: tab.height * window.devicePixelRatio
          }
        }
      };

      if (soundCapture) {
        o.audio = true;
        o.audioConstraints = { ...this.tabCaptureSettings.audioConstraints };
      }

      console.log("tab", o)

      // tab is only for screen size
      this.setCaptureBadgeDelay({
        tab: tab,
        handleStream: handleStream,
        o: o
      });
    };

    // chrome.tabs.get(tabid).then(prepare);
    let tab = await this.doInCurrentTab();
    prepare(tab);

    // webcam
    this.startCamera();
  }

  tabHandle_POPUP__BG__CAPTURE_TAB_STOP (tabid) {
    this.stopCapturing();
  }

/////
///// DESKTOP

  async tabHandle_POPUP__BG__CAPTURE_DESKTOP_START(req) {
    this.emergencyCancelCapture = false;
    let voiceCapture = await this.storage.getCaptureVoice();
    let soundCapture = await this.storage.getCaptureSound();
    this.videoRecorderSettings.mimeType = await this.storage.getCodec();

    let handleStream = async (stream) => {
      if (!stream) {
        console.error('Error starting tab capture (Desktop): ' + (chrome.runtime.lastError.message || 'UNKNOWN'));
        this.stopCapturing();
        return;
      }

      // mic
      let micStream = false;
      if (voiceCapture) {
        try {
          micStream = await navigator.mediaDevices.getUserMedia({ audio: this.audioCapturingSettings });
        } catch (e) {
          console.error('Error starting tab capture (Mic): ' + (chrome.runtime.lastError.message || 'UNKNOWN'));
          this.stopCapturing();
          return;
        }
      }

      let streamsAudioBup = [];
      if (micStream) {
        let audioTracks = this.mergeAudioStreams(stream, micStream);
        let audioTrack = audioTracks.length > 0 ? audioTracks[0] : micStream.getAudioTracks()[0];
        streamsAudioBup = stream.getAudioTracks();
        stream.getAudioTracks().filter(track => stream.removeTrack(track));
        stream.addTrack(audioTrack);
      }

      this.captureRecorder = new MediaRecorder(stream, this.videoRecorderSettings);

      let chunks = [];
      this.captureRecorder.addEventListener("dataavailable", e => chunks.push(e.data) );

      this.captureRecorder.addEventListener("stop", () => {
        let blob = new Blob(chunks);
        this.downloadFile(blob, "rec-screen.webm", true);
        blob = null;

        stream.getTracks().forEach(track => track.stop());

        if (micStream) micStream.getTracks().forEach(track => track.stop());
        micStream = null;

        if (streamsAudioBup.length > 0) streamsAudioBup.forEach(track => track.stop());
        // we should not clone audio which is get with getDisplayMedia
        // this.stopPlayingAndRemoveCloneOfTabAudio(clonedTabAudio)
        
        this.captureRecorder = null;
        stream = null;
      });

      this.captureRecorder.start();
    };

    let prepare = (tab, stream) => {
      // tab is only for screen size
      this.setCaptureBadgeDelay({
        tab: tab, 
        handleStream: handleStream,
        stream: stream
      });
    };

    let o = {
      video: config.userMediaVideo,
      audio: (soundCapture ? config.userMediaAudio : false)
    };
    let stream = await navigator.mediaDevices.getDisplayMedia(o);
    console.log("screen", o)

    if (stream) {
      let tab = await this.doInCurrentTab();
      prepare(tab, stream);
    } else alert("Cant access your Desktop")

    // webcam
    this.startCamera();
  }

/////
///// TAB
/////
  async fire_BG__POPUP__REFRESH() {
    let m = {};
    m.action = 'BG__POPUP__REFRESH';
    chrome.runtime.sendMessage(m);
  }
  async fireTab_BG__CONTENT__CAPTURE_TABWEBCAM_START() {
    let inserted = await this.isScriptsInserted();
    if (!inserted) await this.injectScriptsAndStyles();

    let tab = await this.doInCurrentTab();
    let tabId = tab ? tab.id : this.tabId;
    try{
      chrome.tabs.sendMessage(tabId, { action: "BG__CONTENT__CAPTURE_TABWEBCAM_START" });
    }catch{}
    
  }
  
  async fireTab_BG__CONTENT__CAPTURE_WEBCAM_STOP() {
    let tab = await this.doInCurrentTab();
    let tabId = tab ? tab.id : this.tabId;
    try{
      chrome.tabs.sendMessage(tabId, { action: "BG__CONTENT__CAPTURE_WEBCAM_STOP" });
    }catch{}
    
  }

  async fireTab_BG__CONTENT__TIMER(text) {
    let inserted = await this.isScriptsInserted();
    if (!inserted) await this.injectScriptsAndStyles();

    try{
      let tab = await this.doInCurrentTab();
      let tabId = tab ? tab.id : this.tabId;
      chrome.tabs.sendMessage(tabId, { action: "BG__CONTENT__TIMER", value: text });
    }
    catch{}
  }

/////
///// AREA
/////
  async fireTab_BG__CONTENT__CAPTURE_AREAWEBCAM_START() {
    let tab = await this.doInCurrentTab();
    let tabId = tab ? tab.id : this.tabId;
    try{
      chrome.tabs.sendMessage(tabId, { action: "BG__CONTENT__CAPTURE_AREAWEBCAM_START" });
    }
    catch{}
  }

  async fireTab_ALL__CONTENT__CAPTURE_AREA_ENABLE () {
    let tab = await this.doInCurrentTab();
    let tabId = tab ? tab.id : this.tabId;
    return new Promise(resolve => {
      try{
        chrome.tabs.sendMessage(tabId, { action: "ALL__CONTENT__CAPTURE_AREA_ENABLE" }, function (tabs) {
          if(!!tabs){
            resolve(true)
          }
          else{
            resolve(false)
          }
       });
  
      }
      catch{
        resolve(false)
      }
    })
  }

  async fireTab_BG__CONTENT__CAPTURE_AREA_DISABLE () {
    let tab = await this.doInCurrentTab();
    let tabId = tab ? tab.id : this.tabId;
    return new Promise(resolve => {
      try{
        chrome.tabs.sendMessage(tabId, { action: "BG__CONTENT__CAPTURE_AREA_DISABLE" }, function (tabs) {
          if(!!tabs){
            resolve(true)
          }
          else{
            resolve(false)
          }
        });
  
      }catch{
        resolve(false)
      }
    })
  }

  async tabHandle_CONTENT__BG__CAPTURE_AREA_START (tabid, data) {

    let dataKeys = Object.keys(data);
    // dataKeys.forEach(key=>{
    //   data[key] = data[key] * window.devicePixelRatio
    // });

    this.emergencyCancelCapture = false;

    this.capturearea = true;
    this.startCamera(true);

    let voiceCapture = await this.storage.getCaptureVoice();
    let soundCapture = await this.storage.getCaptureSound();
    this.videoRecorderSettings.mimeType = await this.storage.getCodec();

    let handleStream = async (stream) => {

      if (!stream) {
        console.error('Error starting tab capture: ' + (chrome.runtime.lastError.message || 'UNKNOWN'));
        this.stopCapturing();
        return;
      }

      // replaying tab audio if needed
      let clonedTabAudio = this.cloneAndPlayAudioStreamIfNeeded(soundCapture, stream.getAudioTracks().length > 0 ? stream.getAudioTracks()[0] : false);

      let rate = 1000 / 15;//config.frameRate;

      let collectAreaData = () => {
        console.log("paused:", this.capturePlayer.paused, " ended:", this.capturePlayer.ended);
        if (this.capturePlayer.paused || this.capturePlayer.ended) {
          
          stream.getTracks().forEach(track => track.stop()); 

          this.captureRecorder.stop();
          stream = null
          this.capturePlayer = null;
          clearTimeout(this.collectAreaTimer);
          return;
        }
        // clip video frame
        ctx.drawImage(this.capturePlayer, data.x, data.y, data.w, data.h, 0, 0, data.w, data.h);
        this.collectAreaTimer = setTimeout(collectAreaData, rate);
      };

      this.capturePlayer = document.createElement("video");
      this.capturePlayer.setAttribute("width", data.w);
      this.capturePlayer.setAttribute("height", data.h);
      this.capturePlayer.setAttribute("autoplay", true);

      this.captureCanvas = document.createElement("canvas");
      this.captureCanvas.setAttribute("width", data.w);
      this.captureCanvas.setAttribute("height", data.h);

      let ctx = this.captureCanvas.getContext("2d");
      this.capturePlayer.srcObject = stream;

      let originalAudioTrack = stream.getAudioTracks().length > 0 ? stream.getAudioTracks()[0] : false;

      this.capturePlayer.addEventListener("play", async () => {
        let stream = this.captureCanvas.captureStream(config.frameRate);
        this.captureRecorder = new MediaRecorder(stream, this.videoRecorderSettings);
        
        // mic
        let micStream = false;
        if (voiceCapture) {
          try {
            micStream = await navigator.mediaDevices.getUserMedia({ audio: this.audioCapturingSettings });
          } catch (e) {
            console.error('Error starting tab capture: ' + (chrome.runtime.lastError.message || 'UNKNOWN'));
            this.stopCapturing();
            return;
          }
          let micTrack = micStream.getAudioTracks()[0];
          stream.addTrack(micTrack);
        }
        // endmic
        let streamsAudioBup = [];
        if (micStream) {
          let audioTracks = originalAudioTrack ? this.mergeAudioStreams(new MediaStream([originalAudioTrack]), micStream) : this.mergeAudioStreams(stream, micStream);
          let audioTrack = audioTracks.length > 0 ? audioTracks[0] : micStream.getAudioTracks()[0];
          streamsAudioBup = stream.getAudioTracks();
          stream.getAudioTracks().filter(track => stream.removeTrack(track));
          stream.addTrack(audioTrack);
        } else {
          stream.addTrack(originalAudioTrack);
        }

        let chunks = [];
        let collectData = (e) => chunks.push(e.data);
        let sendData = () => {
          let blob = new Blob(chunks);
          this.downloadFile(blob, "rec-area.webm", true);
          blob = null;
          stream.getTracks().forEach(track => track.stop()); 
          if (micStream) micStream.getTracks().forEach(track => track.stop()); 
          micStream = null;

          this.stopPlayingAndRemoveCloneOfTabAudio(clonedTabAudio);

          if (streamsAudioBup.length > 0) streamsAudioBup.forEach(track => track.stop());

          stream = null;
          this.captureRecorder = null;
          this.captureCanvas = null;
          this.capturePlayer = null;
        };

        collectAreaData();
        this.captureRecorder.addEventListener("dataavailable", collectData)
        this.captureRecorder.addEventListener("stop", sendData)
        this.captureRecorder.start();
      });
    };

    let prepare = (tab) => {
      // delay
      let o = {
        video: true,
        audio: false,
        videoConstraints: {
          mandatory: {
            ...this.tabCaptureSettings.videoConstraints.mandatory,
            minWidth: tab.width,// * window.devicePixelRatio,
            maxWidth: tab.width,// * window.devicePixelRatio,
            minHeight: tab.height,// * window.devicePixelRatio,
            maxHeight: tab.height// * window.devicePixelRatio
          }
        }
      };
      if (soundCapture) {
        o.audio = true;
        o.audioConstraints = { ...this.tabCaptureSettings.audioConstraints };
      }

      console.log("area", o)

      this.setCaptureBadgeDelay({
        tab: tab,
        handleStream: handleStream,
        o: o
      });
    };

    chrome.tabs.get(tabid,prepare);
  }

  tabHandle_CONTENT__BG__CAPTURE_AREA_STOP (tabid) {
    this.emergencyCancelCapture = true;
    this.stopCapturing();
  }


// POPUP

  tabHandle_POPUP__BG__STOP () {
    this.stopCapturing();
  }

  
  handlePageUpdated (tabid, changeInfo, tabState) {
    if (changeInfo.status === "loading") {
      if (this.capturearea) this.stopCapturing();
    }
  };

  // on active changed
  async handleTabChanged (activeInfo) {
    // let tab = activeInfo.tabId;
    if (this.capturearea) this.stopCapturing();
  };

};


window.bgObj = new Background();



