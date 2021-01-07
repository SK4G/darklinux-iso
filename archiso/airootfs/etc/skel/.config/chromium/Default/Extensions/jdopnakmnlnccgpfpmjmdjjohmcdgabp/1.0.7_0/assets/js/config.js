let badge = {
  rec: {
    black: {
      "16": "assets/badges/icon-rec.png",
      "48": "assets/badges/icon-rec-48x48.png",
      "128": "assets/badges/icon-rec-128x128.png"
    },
    red: {
      "16": "assets/badges/icon-rec-red.png",
      "48": "assets/badges/icon-rec-red-48x48.png",
      "128": "assets/badges/icon-rec-red-128x128.png"
    }
  },
  backgroundColor: "#4E5A66",
  defaultPopup: "popup.html"
};

let recorder = {
  mimeType: "video/webm;codecs=H264",
  audioBitsPerSecond: 320000,
  videoBitsPerSecond: 6000000
};

let frameRate = 30;

let tabCapture = {
  video: true,
  audio: true,
  audioConstraints: {
    mandatory: { echoCancellation: true }
  },
  videoConstraints: {
    mandatory: {
      minWidth: window.innerWidth * window.devicePixelRatio,
      maxWidth: window.innerWidth * window.devicePixelRatio,
      minHeight: window.innerHeight * window.devicePixelRatio,
      maxHeight: window.innerHeight * window.devicePixelRatio,
      maxFrameRate: frameRate
    }
  }
};

let userMediaVideo = {
  cursor: "motion",
  width: { ideal: 3840 },
  height: { ideal: 2160 },
  aspectRatio: 1.777777778,
  frameRate: {
    ideal: frameRate
  }
};

let userMediaAudio = {
  echoCancellation: true,
  noiseSuppression: true,
  sampleRate: 44100,
  channelCount: 2
};

let captureDelay = 3;

export default {
  badge: badge,
  recorder: recorder,
  tabCapture: tabCapture,
  frameRate: frameRate,
  captureDelay: captureDelay,
  userMediaVideo: userMediaVideo,
  userMediaAudio: userMediaAudio,
};