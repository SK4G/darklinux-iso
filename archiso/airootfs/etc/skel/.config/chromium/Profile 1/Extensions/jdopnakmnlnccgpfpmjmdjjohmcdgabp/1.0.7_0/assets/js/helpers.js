class Helpers {

  constructor() {
    this.handleMessages = this.handleMessages.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.injectScriptsAndStyles = this.injectScriptsAndStyles.bind(this);
    this.isScriptsInserted = this.isScriptsInserted.bind(this);
  }

  // files
  
  downloadFile(data, name = 'download', isBlob = false) {
    let link = document.createElement('a');

    let blob = data;
    if (!isBlob) blob = this.dataURLtoBlob(data);
    let objurl = URL.createObjectURL(blob);

    link.href = objurl;
    link.download = name;
    link.click();
  }

  blobToDataURL(blob, cb) {
    let reader = new FileReader();
    reader.onload = () => {
      let dataUrl = reader.result;
      let base64 = dataUrl;//.split(',')[1];
      cb(base64);
    };
    reader.readAsDataURL(blob);
  }

  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }

  // scripts

  async injectScriptsAndStyles() {
    let tab = await this.doInCurrentTab();
    if(tab.url.startsWith("chrome:")){
      return;
    }

    let tabid = tab.id;
    console.log("started loading scripts and css");
    let catchException = e => {
      console.dir(e);
      console.error(e)
    };

    await chrome.tabs.insertCSS(tabid, { file: "assets/css/content.css" }).catch(catchException);
    //await chrome.tabs.executeScript(tabid, { file: "assets/js/browser-polyfill.min.js", runAt: "document_start" }).catch(catchException);
    await chrome.tabs.executeScript(tabid, { file: "assets/js/content.js", runAt: "document_start" }).catch(catchException);
    console.log(tab.id, "scripts and styles loaded");
  }

  async isScriptsInserted() {
    let m = {};
    m.action = "BG__CONTENT__HEHEY";
    let tab = await this.doInCurrentTab();
    if(!tab){
      return;
    }
    let tabId = tab.id;
    return new Promise(async (resolve) => {
      try {
        await chrome.tabs.sendMessage(tabId, m);
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
  }

  // streams

  mergeAudioStreams (desktopStream, voiceStream) {
    const context = new AudioContext();
    const destination = context.createMediaStreamDestination();

    const hasDesktopAudioTracks = desktopStream && (desktopStream.getAudioTracks().length > 0);
    const hasMicAudioTracks = voiceStream && (voiceStream.getAudioTracks().length > 0);

    if (hasDesktopAudioTracks) {
      const source1 = context.createMediaStreamSource(desktopStream);
      const desktopGain = context.createGain();
      desktopGain.gain.value = 1;
      source1.connect(desktopGain).connect(destination);
    } else {
      console.log("mergeAudioStreams: There are no Desktop Audio tracks", desktopStream);
    }

    if (hasMicAudioTracks) {
      const source2 = context.createMediaStreamSource(voiceStream);
      const voiceGain = context.createGain();
      voiceGain.gain.value = 1;
      source2.connect(voiceGain).connect(destination);
    } else {
      console.log("mergeAudioStreams: There are no Mic Audio tracks", desktopStream);
    }

    return destination.stream.getAudioTracks();
  }

  cloneAndPlayAudioStreamIfNeeded(needed, track) {
    let tabAudio = false;
    if (needed && track) {
      tabAudio = document.createElement("audio");
      tabAudio.srcObject = new MediaStream([track]);
      tabAudio.play();
    }
    return tabAudio;
  }

  stopPlayingAndRemoveCloneOfTabAudio (tabAudio) {
    if (!tabAudio) return;
    tabAudio.srcObject.getTracks().forEach(track => track.stop());
    tabAudio.pause();
    tabAudio = null;
  }

  //tabs

  doInCurrentTab() {
    let q = {};
    q.currentWindow = true;
    q.active = true;
    return new Promise(resolve => {
      chrome.tabs.query(q, tabs => resolve(tabs[0]));
    });
    
  }

  async isTabNotRestricted() {
    var isOkTab = ';';
    return new Promise(resolve => {
      chrome.tabs.executeScript({ code: isOkTab }, function(result) {
        if(!result){
          resolve(false);
        }
        else{
          resolve(true);
        }
      });
    });
  }

  // messages

  handleMessages(req, sender, sendResponse) {
    if (req.hasOwnProperty("action")) {
      console.log(req.action)
      if (typeof (this['tabHandle_' + req.action]) !== 'undefined') {
        let tabid = sender.tab ? sender.tab.id : false;
        let data = req.data;
        this['tabHandle_' + req.action](tabid, data, sendResponse);
      }
    }
  }

}
export default Helpers;