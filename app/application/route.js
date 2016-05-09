import Ember from 'ember';
import FireBase from 'earworm/api/firebase/firebase';
import Earworm from 'earworm/application/earworm';

export default Ember.Route.extend({
  //model() {
  //  console.log('application route model');
  //  // TEMPORARY - auth anonomously
  //  return FireBase.authWithFacebookPopup().then((firebaseResponse) => {
  //    const user = firebaseResponse.data;
  //    Earworm.AppState.set('user', user);
  //  });
  //}
});
