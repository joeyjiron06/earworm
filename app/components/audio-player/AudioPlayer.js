import Ember from 'ember';
import PlayerState from './PlayerState';
import {AudioEvents, AudioProperties} from './Constants';

export default Ember.Object.extend(Ember.Evented, {

  // binable state item
  stateItem : null,

  // PUBLIC
  setUrl(url) {
    this._audio.src = url;
  },
  play() {
    this._audio.play();
  },
  stop() {
    this._audio.stop();
  },


  // LIFECYCLE
  init() {
    this._super(...arguments);
    this._audio = new Audio();
    this.set('stateItem', PlayerState.create());
    this._addListener();
  },
  willDestroy() {
    this._removeListener();
    this.stop();
  },


  _addListener() {
    let audio      = this._audio;

    if (!audio) {
      console.warn('[audio-player] :: no audio player');
      return;
    }

    let updated    = this._audioUpdated.bind(this);
    let events     = AudioEvents;

    for (let event of events) {
      audio.addEventListener(event, updated);
    }
  },
  _removeListener() {
    let audio      = this._audio;
    let updated    = this._audioUpdated.bind(this);
    let events     = AudioEvents;

    for (let event of events) {
      audio.removeEventListener(event, updated);
    }
  },

  _audioUpdated() {
    this.get('stateItem').updateWith(this._audio);
  },



});