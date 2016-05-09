import Ember from 'ember';
import FireBase from 'earworm/api/firebase/firebase';
import Earworm from 'earworm/application/earworm';


export default Ember.Route.extend({
  model(params) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello');

      }, 3000);

    });



    //return Ember.RSVP.Promise.reject(new Error('hello error!'));


    //const roomId = params.room_id;
    //const user = Earworm.AppState.get('user');
    //
    //return FireBase.enterRoom(roomId, user).then((firebaseResponse) => {
    //  const room = firebaseResponse.data;
    //  Earworm.AppState.set('room', room);
    //  return room;
    //});
  },


  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('routes.room');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    },

    error(error, transition) {
      if (error) {
        return this.transitionTo('errorPage');
      }
    }
  }

});
