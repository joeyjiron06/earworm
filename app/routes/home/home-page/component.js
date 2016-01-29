import Ember from 'ember';
import AppConfig from 'earworm/config/app-config';

let YouTube = Ember.Object.create({

  search(query) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let url = this.getUrl(query);
        Ember.$.ajax({type:'GET', url:url})
          .done((data) => {
            resolve(data);
          })
          .fail((error) => {
            reject(error);
          });
    });
  },

  getUrl(query) {
    let apiKey = AppConfig.youtube.apiKey;
    return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&videoEmbeddable=true&fields=items(id%2Csnippet)&key=${apiKey}`;
  }
});


export default Ember.Component.extend({
  tagName : 'home-home-page',
  classNames : ['home-home-page'],

  query : null,
  items : null,
  didInsertElement() {
    this._super(...arguments);



  },


  actions : {
    onKeyPressed() {
      let timerId = this.get('_timerId');
      clearTimeout(timerId);

      timerId = setTimeout(()=> {
        this.search();
      }, 500);

      this.set('_timerId', timerId);


    }
  },


  search() {
    YouTube.search(this.get('query'))
      .then((data) => {
        console.log('success', data);
        this.set('items', data.items);
      })
      .catch((error) => {
        console.log('error searching', error);
      });
  }
});
