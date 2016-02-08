import Ember from 'ember';
import Firebase from 'earworm/api/firebase/firebase';
import Utils from 'earworm/utils/utils';

const STATE = {
  IDLE       : 0,
  LOADING    : 1,
  ERROR      : 2,
  LOADED     : 3
};


export default Ember.Component.extend({
  tagName              : 'login',
  classNames           : ['login'],

  // passed in
  router               : null,

  username             : null,
  isBadUsername        : false,
  isUsernameEnabled    : false,


  state                : STATE.IDLE,
  isIdle               : Ember.computed.equal('state', STATE.IDLE),
  isLoading            : Ember.computed.equal('state', STATE.LOADING),
  isError              : Ember.computed.equal('state', STATE.ERROR),
  isLoaded             : Ember.computed.equal('state', STATE.LOADED),


  // A C T I O N S
  actions : {
    login() {
      let username = this.$('.login-input');
      if (this.get('isUsernameEnabled') && Utils.isNoE(username)) {
        this.set('isBadUsername', true);
      }

      else {
        this.set('isBadUsername', false);
        this.doAuth();
      }
    }
  },


  doAuth() {
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
  }

});
