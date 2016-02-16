import Ember from 'ember';
import Utils from 'earworm/utils/utils';
import AppConfig from 'earworm/config/app-config';
import {AudioEvents, AudioProperties} from './Constants';
import APStateItem from './APStateItem';

const debug = false;

Number.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  var time = '';
  if (hours !== '00') {
    time = hours+':';
  }
  time    += minutes+':'+seconds;
  return time;
};

const DisplayableRange = Ember.Object.extend({
  leftPercentage     : 0,
  widthPercentage    : 0
});


export default Ember.Component.extend({
  tagName             : 'audio-player',
  classNames          : ['audio-player'],


  // audio player
  audio               : null,
  audioStateItem      : null,


  options : {
    showPlayPauseButton : false
  },


  displayable         : {
    playPercentage    : null, // playPercentage
    playedTime        : '0:00',
    durationTime      : '0:00',
    playPauseState    : 'play',
    bufferedRanges    : null // [] of DisplayableRange
  },


  actions : {
    playPauseToggled() {
      let audio = this.getAudio();

      if (audio.paused) {
        audio.play();
      }

      else {
        audio.pause();
      }
    }
  },

  didInsertElement() {
    this._super.apply(...arguments);

    // set new html audio player
    this.set('audioStateItem', APStateItem.create());
    this.registerListener();
  },
  willDestroyElement() {
    this._super.apply(...arguments);
    this.getAudio().pause();
    this.getAudio().src = null;
    this.unregisterListener();
    this.set('audio', null);
  },




  registerListener() {
    let audio      = this.getAudio();

    if (!audio) {
      console.warn('[audio-player] :: no audio player');
      return;
    }

    let updated    = this.audioUpdated.bind(this);
    let events     = this.getAudioEventList();

    for (let event of events) {
      audio.addEventListener(event, updated);
    }
  },
  unregisterListener() {
    let audio      = this.getAudio();
    let updated    = this.audioUpdated.bind(this);
    let events     = this.getAudioEventList();

    for (let event of events) {
      audio.removeEventListener(event, updated);
    }
  },

  getAudio() {
    return this.get('audio');
  },
  getAudioEventList() {
    return AudioEvents;
  },
  getAudioPropertiesList() {
    return AudioProperties;
  },
  audioUpdated(e) {
    if (debug) {console.log('on audio updated : ' + e.type);}

    let audio                       = this.getAudio();
    let currentTime                 = audio.currentTime;
    let duration                    = audio.duration;
    let displayablePlayedTime       = '0:00';
    let displayableDurationTime     = '0:00';
    let displayablePlayPercentage   = '0:00';
    let bufferedRanges              = null;

    this.get('audioStateItem').updateWith(audio);

    if (Utils.isA(currentTime) && Utils.isA(duration)) {
      displayablePlayedTime         = currentTime.toHHMMSS();
      displayableDurationTime       = duration.toHHMMSS();

      if (currentTime !== 0 && duration !== 0) {
        displayablePlayPercentage   = (currentTime/duration*100);
      }
    }

    if (Utils.isA(this.get('audioStateItem.buffered'))) {
      let buffered = this.get('audioStateItem.buffered');
      bufferedRanges = [];


      for (let range of buffered) {
        let duration           = this.get('audioStateItem.duration');
        let leftPercentage     = (range.start/duration*100);
        let widthPercentage    = ((range.end-range.start)/duration*100);

        bufferedRanges.push(DisplayableRange.create({leftPercentage,widthPercentage}));
      }
    }


    // update displayable values
    this.set('displayable.playPauseState', audio.paused ? 'play' : 'pause');
    this.set('displayable.playedTime', displayablePlayedTime);
    this.set('displayable.durationTime', displayableDurationTime);
    this.set('displayable.playPercentage', displayablePlayPercentage);
    this.set('displayable.bufferedRanges', bufferedRanges);

    this.sendAction('apStateItemUpdated', this.get('audioStateItem'));
  }
});
