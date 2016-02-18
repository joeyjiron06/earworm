import Ember from 'ember';
import SoundCloud from 'earworm/api/soundcloud/SoundCloud';
import SearchFixtures from 'earworm/fixtures/soundcloud/search-john-mayer';


export default Ember.Component.extend({
  tagName          : 'home-page',
  classNames       : ['home-page'],

  searchValue      : null,
  items            : null,
  audio            : new Audio(),
  songTitle        : null,

  songQueue        : [],


  didInsertElement() {
    this._super(...arguments);
    this.$('.mdl-textfield__input').keypress(this.onSearchInputKeyPress.bind(this));
  },

  actions          : {
    playClicked(item) {
      let title = item.title;
      let url = SoundCloud.getUrl(item.stream_url);
      let audio = this.get('audio');
      this.set('songTitle', title);
      audio.src =  url;
      audio.play();

      console.log('play clicked', item);
    },
    addClicked(item) {
      console.log('add clicked', item);
      this.get('songQueue').addObject(item);
    }
  },


  onSearchInputKeyPress(e) {
    if (e.which === 13) {
      this.search();
      return false;
    }
  },


  search() {
    let text       = this.get('searchValue');
    let promise    = SoundCloud.search({query:text, filter:'public'})
      .then((data) => {
        console.log('success', data);
        this.set('items', data);
      });
    promise = promise.catch((error) => {
      console.log('error searching', error);
    });
  }

});