async function ask() {
  var localization = new Localize();
  localization.init();

  let ok = await navigator.mediaDevices.getUserMedia({ audio: true });
  if (ok) {
    chrome.runtime.getBackgroundPage(function (bg) {
      bg.bgObj.storage.setCaptureVoice(true);
      document.getElementById("text").textContent = chrome.i18n.getMessage("msg_16");
      ok.getAudioTracks()[0].stop();
      ok = null;
    });
  }
}
ask();