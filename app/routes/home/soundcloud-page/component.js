import Ember from 'ember';
import SoundCloud from './SoundCloud';
import AppConfig from 'earworm/config/app-config';
import AudioPlayer from './audio-player/AudioPlayer';

let SoundCloudPlayer = new AudioPlayer();

export default Ember.Component.extend({
  tagName    : 'soundcloud-page',
  classNames : ['soundcloud-page'],

  query : null,
  items : null,

  didInsertElement() {
    this._super(...arguments);
    SoundCloudPlayer.setListener(this);
  },


  actions : {
    searchClicked() {
      this.searchWithMyApi();
    },
    itemClicked(song) {
      this.playSongWithMyPlayer(song);
    }
  },


  searchWithMyApi() {
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
  playSongWithMyPlayer(song) {
    console.log(song);
    let url = `${song['stream_url']}?client_id=${AppConfig.soundcloud.apiKey}`;
    SoundCloudPlayer.setUrl(url);
    SoundCloudPlayer.play();
  }
});
