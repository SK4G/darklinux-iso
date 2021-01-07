// import Mic from './mic.js';
var homepage = function () {return chrome.runtime.getManifest().homepage_url};

class Popup {
  constructor() {
    var localization = new Localize();
    localization.init();

    document.querySelector('.teaser').href = `https://addons.opera.com/en/extensions/details/${chrome.runtime.id}`;
    document.querySelector('.navbar-brand').href = `${homepage()}`;
    document.querySelector('#defaultSettings').title = chrome.i18n.getMessage("msg_12");
    document.querySelector('#gDrive').title = chrome.i18n.getMessage("text_6");
    document.querySelector('#gDrive').addEventListener("click", function(e){
      e.preventDefault();
      chrome.tabs.create({ 'url': `${homepage()}recorder` });
    });
    document.querySelector('#tutorial').title = chrome.i18n.getMessage("text_tutorial");
    document.querySelector('#tutorial').addEventListener("click", function(e){
      e.preventDefault();
      chrome.tabs.create({ 'url': `${homepage()}tutorial` });
    });

    // binding local methods
    this.messageHandler = this.messageHandler.bind(this);
    this.restorePopup = this.restorePopup.bind(this);
    
    this.handleCaptureAreaClick = this.handleCaptureAreaClick.bind(this);
    this.handleCaptureTabClick = this.handleCaptureTabClick.bind(this);
    this.handleCaptureVoiceClick = this.handleCaptureVoiceClick.bind(this);
    this.handleCaptureSoundClick = this.handleCaptureSoundClick.bind(this);
    this.handleCaptureCameraClick = this.handleCaptureCameraClick.bind(this);
    this.handleCaptureDesktopClick = this.handleCaptureDesktopClick.bind(this);
    this.restoreDefaults = this.restoreDefaults.bind(this);
    this.onIconClicked = this.onIconClicked.bind(this);

    // modes
    this.capturearea = false;
    this.capturetab = false;

    this.isLight = true;

    this.onIconClicked();

    this.init();
  };

  onIconClicked() {
    console.log("click");
    try{
      this.getActiveTabPromise().then(tab => {
        console.log('inside');
        console.log(tab);
          if(tab.url.startsWith("chrome:")){
            $("#settings-panel > a:nth-child(2)").hide();
            $("#settings-panel > a:nth-child(3)").hide();
            return;
          }
          const url = new URL(tab.url);
          const tabId = tab.id;
          chrome.tabs.executeScript({code: "window.__r_ecorder_ext"}, function(result) {
            console.log('result:', result);
            if (result && !result[0]) {
                chrome.tabs.insertCSS(tabId, {
                    file: "/assets/css/content.css",
                }, () => {
                      chrome.tabs.executeScript(tabId, {
                          file: "/assets/js/content.js",
                    });
                });
            }
          });
    
        /*chrome.tabs.executeScript(tabId, {
          file: "inject.js",
        });*/
  
      });  
  
    }
    catch{}
  }

  getActiveTabPromise() {
    return new Promise(resolve => {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, tabs => resolve(tabs[0]));
    });
 }
  events() {

    document.getElementById('capture-area').addEventListener('click', this.handleCaptureAreaClick, false);
    document.getElementById('capture-tab').addEventListener('click', this.handleCaptureTabClick, false);
    document.getElementById('capture-desktop').addEventListener('click', this.handleCaptureDesktopClick, false);
    document.getElementById('defaultSettings').addEventListener('click', this.restoreDefaults, false);

    // listen to runtime messages
    chrome.runtime.onMessage.addListener(this.messageHandler);

  }


  changeColor(sw, color){
    $(sw).next().css('color',color);
    $(sw).next().next().css('color',color);
  }



  async init () {
    let that = this;
    
    $('#capture-voice').change(async function(){
      if($(this).is(':checked')){

        if(that.isLight){
          that.changeColor(this,"#00bcd4");
        }
        else{
          that.changeColor(this,"#00bcd4");
        }
      }
      else{
        that.changeColor(this,"#c0c0c0");
      }
      that.handleCaptureVoiceClick();
    });   

    $('#capture-sound').change(async function(){
      if($(this).is(':checked')){

        if(that.isLight){
          that.changeColor(this,"#00bcd4");
        }
        else{
          that.changeColor(this,"#00bcd4");
        }
      }
      else{
        that.changeColor(this,"#c0c0c0");
      }
      that.handleCaptureSoundClick();
    });   

    $('#capture-camera').change(async function(){
      if($(this).is(':checked')){

        if(that.isLight){
          that.changeColor(this,"#00bcd4");
        }
        else{
          that.changeColor(this,"#00bcd4");
        }
      }
      else{
        that.changeColor(this,"#c0c0c0");
      }
      that.handleCaptureCameraClick();
    });   

    // load storage
    this.storage = await this.getStorage();
    this.events();

    $('#switch-1').change(function(){
      if($(this).is(':checked')){
        $(this).next().text(chrome.i18n.getMessage("text_4"));
        that.storage.setIsDay(false);
        that.isLight = false;
        that.toggleLightDark();
      }
      else{
        $(this).next().text(chrome.i18n.getMessage("text_5"));
        that.storage.setIsDay(true);
        that.isLight = true;
        that.toggleLightDark();
      }
      if(that.isLight){
        that.changeColor($('#capture-voice'),"#00bcd4");
        that.changeColor($('#capture-sound'),"#00bcd4");
      }
      else{
        that.changeColor($('#capture-voice'),"#00bcd4");
        that.changeColor($('#capture-sound'),"#00bcd4");
      }
      
    });       

    let tab = await this.doInCurrentTab();
    let tabId = tab.id;

    let tabData = await this.storage.getTab(tabId);
    this.restorePopup(tabData)

    let m = {};
    m.action = "POPUP__BG__RESTORE";
    m.tab = tabId;
    chrome.runtime.sendMessage(m);

    this._populateCodecs();
  }

  restorePopup (tab) {
    this.tab = tab;
    console.log(tab);

    let isDay = tab["isDay"];
    if(!isDay){
      setTimeout(function(){
        $("#mdl-switch-1")[0].MaterialSwitch.on();
        $("#switch-1").attr("checked", true).change();
      }, 200);
      
    }
    else{
      setTimeout(function(){
        $("#mdl-switch-1")[0].MaterialSwitch.off();
        $("#switch-1").attr("checked", false).change();
        
      }, 200);
      
    }

    let isVoice = tab['capturevoice'];
    if (isVoice) {
      setTimeout(function(){
        $("#mdl-capture-voice")[0].MaterialSwitch.on();
        $("#capture-voice").attr("checked", true).change();
      }, 200);
      
    }
    else{
      setTimeout(function(){
        $("#mdl-capture-voice")[0].MaterialSwitch.off();
        $("#capture-voice").attr("checked", false).change();
        /*
        if(host !== "www.youtube.com"){
          $("#switch-2").attr("disabled", "disabled").change();
        }
        */
        
      }, 200);
    }

    let isSound = tab['capturesound'];
    if (isSound) {
      setTimeout(function(){
        $("#mdl-capture-sound")[0].MaterialSwitch.on();
        $("#capture-sound").attr("checked", true).change();
      }, 200);
      
    }
    else{
      setTimeout(function(){
        $("#mdl-capture-sound")[0].MaterialSwitch.off();
        $("#capture-sound").attr("checked", false).change();
      }, 200);
    }

    let isCamera = tab['capturecamera'];
    if (isCamera) {
      setTimeout(function(){
        $("#mdl-capture-camera")[0].MaterialSwitch.on();
        $("#capture-camera").attr("checked", true).change();
      }, 200);
      
    }
    else{
      setTimeout(function(){
        $("#mdl-capture-camera")[0].MaterialSwitch.off();
        $("#capture-camera").attr("checked", false).change();
      }, 200);
    }

    this.codec_selected = tab["codecSelected"];

  }

  getStorage(cb) {
    return new Promise(resolve => {
      chrome.runtime.getBackgroundPage(bgW=>{
        resolve(bgW.bgObj.getStorage());
      });
      
      

      });
  };

  // handle every message 
  async messageHandler(req, sender, sendResponse) {
    if (!req.hasOwnProperty("action")) return;
    if (req.action === 'BG__POPUP__TAB_CHANGED') {
      let tabId = sender.tab.id;
      let tabData = await this.storage.getTab(tabId);
      this.handleTabChanged(tabData);
    } else if (req.action === 'BG__POPUP__REFRESH') {
      let tabData = await this.storage.getTab(0);
      this.restorePopup(tabData);
    }
  }

  async doInCurrentTab() {
    let q = {};
    q.currentWindow = true;
    q.active = true;
    return new Promise( (resolve, reject) => {
      chrome.tabs.query(q, res => resolve(res[0]));
    });
  };

  close() { // close popup
    window.close();
  }

  handleTabChanged(tab) {
    this.render(tab);
  }

  // sound
  async handleCaptureSoundClick(e) {
    let input = document.getElementById('mdl-capture-sound').querySelector("input[type=checkbox]");
    let m = {};
    m.action = "POPUP__BG__CAPTURE_SOUND",
    m.data = { checked: input.checked };
    chrome.runtime.sendMessage(m);
  }

  // mic
  async handleCaptureVoiceClick(e) {

    let input = document.getElementById('mdl-capture-voice').querySelector("input[type=checkbox]");
    let checked = input.checked;
    let hasAccess = (await navigator
        .mediaDevices
        .enumerateDevices())
        .filter(d => d.kind == 'audioinput' && d.label != '').length > 0;
    let that = this;
    if (!hasAccess && checked) {
      swal({
        title: chrome.i18n.getMessage("msg_5"),
        text: chrome.i18n.getMessage("msg_1"),
        icon: "warning",
        buttons: [
          chrome.i18n.getMessage("msg_6"),
          chrome.i18n.getMessage("msg_11")
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
        if (isConfirm) {
          swal({
            title: chrome.i18n.getMessage("msg_8"),
            text: chrome.i18n.getMessage("msg_7"),
            icon: 'success'
          }).then(function() {
            chrome.tabs.create({ 'url': chrome.extension.getURL('confirm.mic.html') });
          });
        } else {
          $("#mdl-capture-voice")[0].MaterialSwitch.off();
          $("#capture-voice").attr("checked", false).change();
          let m = {};
          m.action = "POPUP__BG__CAPTURE_VOICE",
          m.data = { checked: false };
          chrome.runtime.sendMessage(m);
      
          swal(chrome.i18n.getMessage("msg_9"), chrome.i18n.getMessage("msg_10"), "warning");

        }
      })    
      return false;  
    }
    let m = {};
    m.action = "POPUP__BG__CAPTURE_VOICE",
    m.data = { checked: checked };
    chrome.runtime.sendMessage(m);
  }

  // camera
  async handleCaptureCameraClick(e) {

    let input = document.getElementById('mdl-capture-camera').querySelector("input[type=checkbox]");
    let checked = input.checked;
    let hasAccess = (await navigator
        .mediaDevices
        .enumerateDevices())
        .filter(d => d.kind == 'videoinput' && d.label != '').length > 0;
    if (!hasAccess && checked) {
      /*let ok = window.confirm("msg_2");
      input.checked = false;
      if (ok) chrome.tabs.create({ 'url': chrome.extension.getURL('confirm.camera.html') });
      this.buttonCaptureCamera.classList.add("disabled")
      return false;*/

      swal({
        title: chrome.i18n.getMessage("msg_5"),
        text: chrome.i18n.getMessage("msg_2"),
        icon: "warning",
        buttons: [
          chrome.i18n.getMessage("msg_6"),
          chrome.i18n.getMessage("msg_11")
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
        if (isConfirm) {
          swal({
            title: chrome.i18n.getMessage("msg_8"),
            text: chrome.i18n.getMessage("msg_13"),
            icon: 'success'
          }).then(function() {
            chrome.tabs.create({ 'url': chrome.extension.getURL('confirm.camera.html') });
          });
        } else {
          $("#mdl-capture-camera")[0].MaterialSwitch.off();
          $("#capture-camera").attr("checked", false).change();
          let m = {};
          m.action = "POPUP__BG__CAPTURE_CAMERA";
          m.data = { checked: false };
          chrome.runtime.sendMessage(m)
          swal(chrome.i18n.getMessage("msg_9"), chrome.i18n.getMessage("msg_14"), "warning");

        }
      })    
      return false;  

    }

    /*
    if (input.checked) this.buttonCaptureCamera.classList.remove("disabled")
    else this.buttonCaptureCamera.classList.add("disabled")
    */

    let m = {};
    m.action = "POPUP__BG__CAPTURE_CAMERA";
    m.data = { checked: checked };
    chrome.runtime.sendMessage(m)
  }

  // are we able to inject scripts?
  async isTabNotRestricted () {
    var isOkTab = ';';
    return new Promise(resolve => {
      chrome.tabs.executeScript({ code: isOkTab }, function(result){
        if(!result){
          resolve(false);
        }
        else{
          resolve(true);
        }
        
      });
    });
  }

  // is content scripts injected?
  async isScriptsInserted () {
    let m = {};
    m.action = "POPUP__CONTENT__HEHEY";
    let tab = await this.doInCurrentTab();
    let tabId = tab.id;
    return new Promise(async (resolve) => {
      try {
        await chrome.tabs.sendMessage(tabId, m);
        resolve(true);
      } catch(e) {
        resolve(false);
      }
    });
  }

  async enableAreaMessage() {
    let m = {};
    m.action = "POPUP__BG__CAPTURE_AREA_ENABLE";
    m.data = {};
    await chrome.runtime.sendMessage(m);
  }

  // area
  async handleCaptureAreaClick(e) {
    

    let ok = await this.isTabNotRestricted();
    if (!ok) {
      swal(chrome.i18n.getMessage("msg_4"), chrome.i18n.getMessage("msg_3"), "error");
      return;
    }

    // send message anyway
    this.enableAreaMessage();
    this.close();
  };

  // tab
  handleCaptureTabClick(e) {
    

    let m = {};
    m.action = "POPUP__BG__CAPTURE_TAB_START";
    chrome.runtime.sendMessage(m);
    this.close();
  };

  // desktop
  async handleCaptureDesktopClick(e) {
    
    let m = {};
    m.action = "POPUP__BG__CAPTURE_DESKTOP_START";
    chrome.runtime.sendMessage(m);
    this.close();
  };

  // rendering methods / styling
  setButtonStyle(b, checked) {
    if (checked) b.classList.add("checked");
    else b.classList.remove("checked");
  }

  // render popup
  render(tab) {
    console.log("state:", JSON.stringify(tab));
    // apply settings to elements
  }

  _populateCodecs(){
    var ddlCodecs = document.querySelector('select#ddlCodecs');
    this.removeAllOptions(ddlCodecs);
    
    
    this._addCodec("video/webm\;codecs=h264");  
    this._addCodec("video/mpeg4");
    this._addCodec("video/mp4");
    this._addCodec("video/webm;codecs=daala");
    this._addCodec("video/webm");
    this._addCodec("video/webm;codecs=vp8");
    this._addCodec("video/webm;codecs=vp9");
    this._addCodec("video/webm;codecs=vp8.0");
    this._addCodec("video/webm;codecs=vp9.0");
    // "video/webm" supports audio codec specification, see
    // http://www.webmproject.org/docs/container/
    this._addCodec("video/webm;codecs=vp8,opus");
    this._addCodec("video/webm;codecs=vp8,pcm");
    this._addCodec("video/WEBM;codecs=VP8,OPUS");
    this._addCodec("video/webm;codecs=vp9,opus");
    this._addCodec("video/webm;codecs=vp8,vp9,opus");
    //this._addCodec("video/x-matroska;codecs=avc1");   
    this._addCodec("video/3gpp");  
    this._addCodec("video/mpeg"); 


    $(ddlCodecs).off("change");
    let that = this;
    $(ddlCodecs).on("change", function(e){
      that.storage.setCodec(e.target.value);
      //chrome.storage.local.set({"codec_selected":e.target.value}, function () {});

    });
  }
  
  removeAllOptions(sel, removeGrp) {
    var len, groups, par;
    if (removeGrp) {
        groups = sel.getElementsByTagName('optgroup');
        len = groups.length;
        for (var i=len; i; i--) {
            sel.removeChild( groups[i-1] );
        }
        
    }
    
    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
    }
  }
  
  _addCodec(codec, isEmpty){
    var ddlCodecs = document.querySelector('select#ddlCodecs');
    if(isEmpty){
      var opt = document.createElement('option');
      opt.appendChild( document.createTextNode("") );
      opt.value = '';
      ddlCodecs.appendChild(opt);     
    }
    else if(MediaRecorder.isTypeSupported(codec)){
      
      // create new option element
      var opt = document.createElement('option');
      // create text node to add to option element (opt)
      opt.appendChild( document.createTextNode(codec) );
      // set value property of opt
      opt.value = codec; 
      let isSelected = codec === this.codec_selected;
      if(isSelected){
        opt.selected = true;
      }
      // add opt to end of select box (sel)
      ddlCodecs.appendChild(opt);       
    }
  }  

  toggleLightDark(){
    if(!this.isLight){
      this.removejscssfile("/assets/css/popup.css", "css");
      this.removejscssfile("/assets/mdl/material.red-orange.min.css", "css");
        
      this.loadjscssfile("/assets/mdl/material.dark.min.css", "css");
      this.loadjscssfile("/assets/css/popup-dark.css", "css");
    }
    else{
      this.removejscssfile("/assets/css/popup-dark.css", "css");
      this.removejscssfile("/assets/mdl/material.dark.min.css", "css");
        
      this.loadjscssfile("/assets/mdl/material.red-orange.min.css", "css");
      this.loadjscssfile("/assets/css/popup.css", "css");

    }
  }  

  loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
  }

  removejscssfile(filename, filetype){
      var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
      var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
      var allsuspects=document.getElementsByTagName(targetelement)
      for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
          allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
      }

  }

  async restoreDefaults(){
    this.storage.setIsDay(true);
    this.isLight = true;
    this.toggleLightDark();

    this.storage.setCodec("video/webm\;codecs=h264");
    this.storage.setCaptureVoice(false);
    this.storage.setCaptureSound(true);
    this.storage.setCaptureCamera(false);
    
    let tab = await this.doInCurrentTab();
    let tabId = tab.id;

    let tabData = await this.storage.getTab(tabId);
    this.restorePopup(tabData);
    this._populateCodecs();


  }

}


document.addEventListener('DOMContentLoaded', () => {
  window.popup = new Popup();
});