import Ember from 'ember';
import {AudioProperties} from './Constants';

export default Ember.Object.extend({
  audioTracks            : null,
  autoplay               : null,
  buffered               : null,
  controller             : null,
  controls               : null,
  crossOrigin            : null,
  currentSrc             : null,
  currentTime            : null,
  defaultMuted           : null,
  defaultPlaybackRate    : null,
  duration               : null,
  ended                  : null,
  error                  : null,
  loop                   : null,
  mediaGroup             : null,
  muted                  : null,
  networkState           : null,
  paused                 : null,
  playbackRate           : null,
  played                 : null,
  preload                : null,
  readyState             : null,
  seekable               : null,
  seeking                : null,
  src                    : null,
  startDate              : null,
  volume                 : null,


  updateWith(audio) {
    if (!audio) {
      return;
    }

    Ember.changeProperties(() => {
      for (let property of AudioProperties) {
        let value    = audio[property];

        if (property === 'buffered' || property === 'played' || property === 'seekable') {
            value      = this.getTimeRanges(value);
        }

        else if (property === 'readyState') {
          value = this.getNetworkState(value);
        }

        this.set(property, value);
      }
    });
  },


  getTimeRanges(timeRanges) {
    if (!timeRanges) {
      return null;
    }

    let parsedRanges = [];
    for (let i=0; i < timeRanges.length; ++i) {
      let timeRange = Ember.Object.create({
        start    : timeRanges.start(i),
        end      : timeRanges.end(i)
      });
      parsedRanges.push(timeRange);
    }
    return parsedRanges;
  },
  getNetworkState(state) {
    switch (state) {
      case 0:
        return 'HAVE_NOTHING 0';
      case 1:
        return 'HAVE_METADATA 1';
      case 2:
        return 'HAVE_CURRENT_DATA 2';
      case 3:
        return 'HAVE_FUTURE_DATA 3';
      case 4:
        return 'HAVE_ENOUGH_DATA 4';
      default:
        return null;
    }
  }

});