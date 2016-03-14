import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    qpRoomId: {
      replace: true
    }
  }
});
