async function ask() {
  var localization = new Localize();
  localization.init();

  let ok = await navigator.mediaDevices.getUserMedia({ video: true });
  if (ok) {
    chrome.runtime.getBackgroundPage(function (bg) {
      bg.bgObj.storage.setCaptureCamera(true);
      document.getElementById("text").textContent = chrome.i18n.getMessage("msg_15");
      ok.getVideoTracks()[0].stop();
      ok = null;
    });
  }
}
ask();