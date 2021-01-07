import config from "./config.js";

class Badge {

  // static setPopup () {
  //   chrome.browserA(config.badge.backgroundColor);
  // }
  constructor (sharedState) {
    this.state = sharedState;
  }

  set (cb) {
    if (this.state.capturing) {
      this.setAction(cb);
      this.setEmptyPopup();
      this.setIconStop();
    } else this.setDefaultPopup();
  }

  setBackgroundColor() {
    chrome.browserAction.setBadgeBackgroundColor({ color: config.badge.backgroundColor });
  }

  setAction (cb) {
    chrome.browserAction.onClicked.addListener(cb);
  }

  setIcon () {
    if (this.state.capturing) chrome.browserAction.setIcon({ path: config.badge.rec.red });
    else chrome.browserAction.setIcon({ path: config.badge.rec.black });
  }

  setIconStop () {
    chrome.browserAction.setIcon({ path: config.badge.rec.red });
  }

  setIconNormal () {
    chrome.browserAction.setIcon({ path: config.badge.rec.black });
  }

  setText (text) {
    chrome.browserAction.setBadgeText({ text: ("" + text) });
  }

  setPopup () {
    if (this.state.capturing) chrome.browserAction.setPopup({ popup: "" });
    else chrome.browserAction.setPopup({ popup: "popup.html" });
  }

  setDefaultPopup () {
    chrome.browserAction.setPopup({ popup: "popup.html" });
    /*chrome.browserAction.onClicked.addListener(function(activeTab)
    {
        chrome.tabs.create({ url: "/popup.html" });
    });*/
    
  }

  setEmptyPopup () {
    chrome.browserAction.setPopup({ popup: "" });
  }

}
export default Badge;