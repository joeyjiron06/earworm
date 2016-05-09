import Ember from 'ember';
import Utils from 'earworm/utils/utils';
import FireBase from 'earworm/api/firebase/firebase';
import Earworm from 'earworm/application/earworm';

export default Ember.Controller.extend({

  init() {
    this._super(...arguments);
    const authToken = Earworm.LocalStorage.authToken.retrieve();
    if (authToken) {
      console.log('you have an aiuth tokent', authToken);
      FireBase.authWithToken(authToken).then((firebaseResponse) => {
        console.log('success authing', firebaseResponse);
      })
      .catch((firebaseError) => {
        console.log('error authing', firebaseError);
      });
    }

    else {
      console.log('no auth tokent');
    }
  },


  actions : {
    facebookPressed() {
      FireBase.authWithFacebookPopup().then((firebaseResponse) => {
        const user = firebaseResponse.data;
        Earworm.set('user', user);
        Earworm.LocalStorage.authToken.save(user.get('authToken'));
      })
      .catch((firebaseError) => {
        console.log('error authenticating', firebaseError);
      });
    }
  }
});