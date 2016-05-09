import Ember from 'ember';

export default Ember.Controller.extend({


  // TEMPLATE VALUES
  _showCreateRoom : false,

  actions : {
    createRoom() {
      this.set('_showCreateRoom', true);
    }
  }
});