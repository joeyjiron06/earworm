import Ember from 'ember';
import Utils from 'earworm/utils/utils';

export default Ember.Component.extend({
  tagName : 'search-item',
  classNames : ['search-item'],


  item : null,

  emit : {
    playClicked(item, component) {
      component.sendAction('playClicked', item, component);
    },
    addClicked(item, component) {
      component.sendAction('addClicked', item, component);
    }
  },


  displayableTime : Ember.computed('item', function() {
    let item = this.get('item');
    if (!item) {
      return null;
    }

    let duration = Ember.get(item, 'duration') / 1000;

    return Utils.secondsToHHMMSS(duration);
  }),

  actions :{
    addClicked() {
      this.emit.addClicked(this.get('item'), this);
    },
    playClicked() {
      this.emit.playClicked(this.get('item'), this);
    }
  }




});
