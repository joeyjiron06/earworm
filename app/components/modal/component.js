import Ember from 'ember';

export default Ember.Component.extend({
  tagName       : 'modal',
  classNames    : ['modal'],
  classNameBindings : ['show:is-showing:is-hiding'],


  // ATTRS
  show : false,


  // CLICK HANDLER
  click(e) {
    if (this._isBackgroundClick(e)) {
      this._hide();
      return false;
    }
  },


  // INTERNALS
  _show() {
    this.set('show', false);
  },
  _hide() {
    this.set('show', false);
  },
  _isBackgroundClick(event) {
    return event.target === this.$()[0];
  }
});