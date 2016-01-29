import Ember from 'ember';
import AppConfig from 'earworm/config/app-config';

export default Ember.Object.create({

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
