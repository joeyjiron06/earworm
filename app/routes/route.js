import Ember from 'ember';
import Earworm from 'earworm/application/earworm';
import UserItem from 'earworm/models/UserItem';

export default Ember.Route.extend({
  //beforeModel(transition) {
  //  // TODO update user
  //  let user = Earworm.LocalStorage.user.get();
  //
  //
  //  // logged in, go to home
  //  if (user) {
  //    Earworm.AppState.set('user', UserItem.create(user));
  //
  //    // there is a bug in transitionTo when routing with query params
  //    // to get around the bug I tried several things and this seemed to work
  //    // for me. the related issue is here https://github.com/emberjs/ember.js/issues/12169
  //    this.transitionTo('routes.home', {queryParams:transition.queryParams});
  //  }
  //
  //  // not logged in, go to login page
  //  else {
  //    Earworm.AppState.set('initialTransition', transition);
  //    this.transitionTo('routes.login', {queryParams:transition.queryParams});
  //  }
  //}

});
