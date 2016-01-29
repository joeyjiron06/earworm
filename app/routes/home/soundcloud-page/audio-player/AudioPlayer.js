const AudioPlayer = function() {
  const my = this;

  let audio;
  let listener;

  // P U L B I C S

  my.setUrl         = (url) => {
    teardown();
    audio           = new Audio(url);
    setup();
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

  // P R I V A T E S

  const setup = () => {
    audio.addEventListener("canplay", audioEventListener.canplay);
    audio.addEventListener("durationchange", audioEventListener.durationchange);
    audio.addEventListener("ended", audioEventListener.ended);
    audio.addEventListener("error", audioEventListener.error);
    audio.addEventListener("pause", audioEventListener.pause);
    audio.addEventListener("play", audioEventListener.play);
    audio.addEventListener("playing", audioEventListener.playing);
    audio.addEventListener("timeupdate", audioEventListener.timeupdate);

  //  abort
  // canplaythrough
  //                     durationchange
  //emptied
  //                     ended
  //                     error
  //loadeddata
  //loadedmetadata
  //                     loadstart
  //                      pause
  //                      play
  //                      playing
  //progress
  //ratechange
  //seeked
  //seeking
  //stalled
  //suspend
  //                         timeupdate
  //volumechange
  //waiting
  };
  const teardown = () => {
    if (audio) {
      audio.pause();
      audio = null;
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
    }
  };


  return my;
};

export default AudioPlayer;
