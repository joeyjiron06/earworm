import Ember from 'ember';
import SoundCloud from './SoundCloud';
import AppConfig from 'earworm/config/app-config';

export default Ember.Component.extend({
  tagName    : 'soundcloud-page',
  classNames : ['soundcloud-page'],

  query : null,
  items : null,

  outAudioItem : new Audio(),

  didInsertElement() {
    this._super(...arguments);

    //this.set('outAudioItem', );
  },


  actions : {
    searchClicked() {
      let query = this.get('query');
      let filter = 'public';
      let promise = SoundCloud.search({query:query, filter:filter})
        .then((data) => {
          console.log('success', data);
          this.set('items', data);
        });
      promise = promise.catch((error) => {
        console.log('error searching', error);
      });
    },
    itemClicked(song) {
      console.log('playing song', song);
      let songUrl     = song.stream_url;
      let finalUrl    = `${songUrl}?client_id=${AppConfig.soundcloud.apiKey}`;

      let audio = this.getAudio();
      audio.src = finalUrl;
      audio.play();
    }
  },



  getAudio() {
    return this.get('outAudioItem');
  }
});
