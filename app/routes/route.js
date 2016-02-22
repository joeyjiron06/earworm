import Ember from 'ember';
import Earworm from 'earworm/application/earworm';

export default Ember.Route.extend({
  beforeModel() {
    let user = Earworm.LocalStorage.user.get();


    // logged in, go to home
    if (user) {
      Earworm.AppState.set('user', user);
      this.transitionTo('routes.home');
    }

    // not logged in, go to login page
    else {
      this.transitionTo('routes.login');
    }
  }

});
