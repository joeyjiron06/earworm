// meant to be used in the browser

const AudioPlayer = function() {
  const my = this;

  let audio;
  let listener;

  const init = () => {
    audio = new Audio();
    addListener();
  };

  // P U L B I C
  my.setUrl         = (url) => {
    teardown();
    audio           = new Audio(url);
    addListener();
  };
  my.play           = () => {
    audio.play();
  };
  my.setMuted       = (muted) => {
    audio.muted = muted;
  };
  my.toggleMuted    = () => {
    if (!audio) {
      throw new Error('no session alive');
    }

    my.setMuted(!my.isMuted());
  };
  my.isMuted        = () => {
    return audio && audio.muted;
  };
  my.setListener    = (inListener) => {
    listener = inListener;
  };

  // P R I V A T E
  const addListener      = () => {
    audio.addEventListener("canplay", notifyUpdated);
    audio.addEventListener("durationchange", notifyUpdated);
    audio.addEventListener("ended", notifyUpdated);
    audio.addEventListener("error", notifyUpdated);
    audio.addEventListener("pause", notifyUpdated);
    audio.addEventListener("play", notifyUpdated);
    audio.addEventListener("playing", notifyUpdated);
    audio.addEventListener("timeupdate", notifyUpdated);
    audio.addEventListener("abort", notifyUpdated);
    audio.addEventListener("canplaythrough", notifyUpdated);
    audio.addEventListener("emptied", notifyUpdated);
    audio.addEventListener("loadeddata", notifyUpdated);
    audio.addEventListener("loadedmetadata", notifyUpdated);
    audio.addEventListener("loadstart", notifyUpdated);
    audio.addEventListener("progress", notifyUpdated);
    audio.addEventListener("ratechange", notifyUpdated);
    audio.addEventListener("seeked", notifyUpdated);
    audio.addEventListener("seeking", notifyUpdated);
    audio.addEventListener("stalled", notifyUpdated);
    audio.addEventListener("suspend", notifyUpdated);
    audio.addEventListener("volumechange", notifyUpdated);
    audio.addEventListener("waiting", notifyUpdated);
  };
  const notifyUpdated    = () => {
    if (listener && listener.audioPlayerUpdated) {
      listener.audioPlayerUpdated();
    }
  };
  const audioEventListener = {
    canplay(e) {
      console.log('canplay', arguments);
    },
    durationchange(e) {
      console.log('durationchange', arguments);
    },
    ended(e) {
      console.log('ended', arguments);
    },
    error(e) {
      console.log('error', arguments);
    },
    pause(e) {
      console.log('pause', arguments);
    },
    play(e) {
      console.log('play', arguments);
    },
    playing(e) {
      console.log('playing', arguments);
    },
    timeupdate(e) {
      console.log('timeupdate :: currentTime ' + audio.currentTime);
    },
    abort(e) {

    },
    canplaythrough(e) {

    },
    emptied() {

    },
    loadeddata() {

    },
    loadedmetadata() {

    },
    loadstart() {

    },
    progress() {

    },
    ratechange() {
    },
    seeked() {
    },
    seeking() {
    },
    stalled() {
    },
    suspend() {
    },
    volumechange() {
    },
    waiting() {
    }
  };


  init();

  return my;
};

export default AudioPlayer;
