async function start() {
  var localization = new Localize();
  localization.init();

  let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  let viewer = document.getElementById("video");
  viewer.srcObject = stream;
  viewer.play();
}
start();