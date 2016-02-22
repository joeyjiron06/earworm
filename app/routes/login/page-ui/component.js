import Ember from 'ember';
import Firebase from 'earworm/api/firebase/firebase';
import Utils from 'earworm/utils/utils';
import Earworm from 'earworm/application/earworm';

const STATE = {
  NOT_LOADED    : 0,
  LOADING       : 1,
  ERROR         : 2,
  LOADED        : 3
};


export default Ember.Component.extend({
  tagName              : 'login-page',
  classNames           : ['login-page', 'page'],

  // passed in
  router               : null,

  username             : null,
  isBadUsername        : false,
  isUsernameEnabled    : false,
  displayableLoginStatus : Ember.computed('state', function() {
    switch (this.get('state')) {
      case STATE.NOT_LOADED:
        return 'Login with Facebook';
      case STATE.LOADING:
        return 'Loading...';
      case STATE.ERROR:
        return 'Loading error';
      case STATE.LOADED:
        return 'Success!';
      default:
        return 'Uh oh!';
    }
  }),

  state                : STATE.NOT_LOADED,

  // A C T I O N S
  actions : {
    login() {
      let username = this.$('.login-input');
      if (this.get('isUsernameEnabled') && Utils.isNoE(username)) {
        this.set('isBadUsername', true);
      }

      else {
        this.set('isBadUsername', false);
        this.authWithFacebook();
      }
    }
  },


  authAnonymously() {
    this.set('state', STATE.LOADING);
    Firebase.authAnonomously()
      .then((firebaseResponse) => {
        console.log('success authing anonmously!', firebaseResponse);
        this.set('state', STATE.LOADED);

        setTimeout(() => {
          this.get('router').transitionToRoute('routes.home');
        }, 1000);
      })
      .catch((firebaseError) => {
        console.log('error authing anonmously!', firebaseError);

        this.set('state', STATE.ERROR);
      });
  },
  authWithFacebook() {
    this.set('state', STATE.LOADING);
    Firebase.authWithFacebookPopup()
      .then((fbResponse) => {
        let userData = fbResponse.get('data');
        console.log('success!', userData);
        this.set('state', STATE.LOADED);


        Earworm.LocalStorage.user.save(userData);
        Earworm.AppState.set('user', userData);


        setTimeout(() => {
          this.get('router').transitionToRoute('routes.home');
        }, 1000);
      })
      .catch((fbError) => {
        console.log('error authing anonmously!', fbError);
        this.set('state', STATE.ERROR);
      });
  }

});
