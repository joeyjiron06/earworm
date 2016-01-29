import Ember from 'ember';
import YouTube from './YouTube';


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
