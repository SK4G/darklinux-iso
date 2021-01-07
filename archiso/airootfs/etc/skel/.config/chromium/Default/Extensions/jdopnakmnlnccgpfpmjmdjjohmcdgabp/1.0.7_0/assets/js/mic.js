class Equaliser {
  constructor(stream) {
    this.context;
    this.analyser;
    this.maximum = 0;
    this.divs = document.querySelectorAll("div");

    this.error = this.error.bind(this);
    this.listen = this.listen.bind(this);

    if (stream) this.listen(stream);
    else navigator.getUserMedia({ video: true, audio: true }, this.listen, this.error);
  }

  error(e) {
    console.log("equaliser error:", e);
  }

  listen(stream) {
    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 1024;

    let node = this.context.createScriptProcessor(this.analyser.fftSize * 2, 1, 1);
    let input = this.context.createMediaStreamSource(stream);
    input.connect(this.analyser);
    this.analyser.connect(node);

    node.onaudioprocess = this.onAudioProcess;
    node.connect(this.context.destination);
  }

  render(val) {
    let c = Math.ceil(val / 12);
    this.divs.forEach((div, i) => {
      if (i < c) div.classList.add("shown");
      else div.classList.remove("shown");
    });
  }

  getRMS(spectrum) {
    let rms = 0;
    for (let i = 0; i < spectrum.length; i++) rms += spectrum[i] * spectrum[i];
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
  }

  onAudioProcess() {
    let spectrum = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(spectrum);

    let val = this.getRMS(spectrum);
    this.render(val);
  }
};

class AudioRecord {
  constructor(stream) {
    this.audioChunks;
    this.mediaRecorder;

    this.onDataAvailable = this.onDataAvailable.bind(this);
    this.onStop = this.onStop.bind(this);
    this.stop = this.stop.bind(this);

    if (stream) this.listen(stream);
    else navigator.getUserMedia({ audio: true }, this.record, this.error);
  }

  error(e) {
    console.log("equaliser error:", e);
  }

  stop() {
    this.mediaRecorder.stop();
  }

  record(stream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.start();

    this.mediaRecorder.addEventListener("dataavailable", this.onDataAvailable);
    this.mediaRecorder.addEventListener("stop", this.obStop);
  }

  onDataAvailable(event) {
    this.audioChunks.push(event.data);
  }

  onStop() {
    const audioBlob = new Blob(this.audioChunks);
    // const audioUrl = URL.createObjectURL(audioBlob);
    // const audio = new Audio(audioUrl);
    // audio.play();
  }
}

export default { AudioRecord: AudioRecord, Equaliser: Equaliser };