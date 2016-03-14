import Ember from 'ember';
import Utils from 'earworm/utils/utils';

let UserItem = Ember.Object.extend({
  id                  : null,
  authToken           : null,
  expiryTimeEpoch     : null,
  imageUrl            : null,
  firstName           : null,
  lastName            : null,
  email               : null,
  facebookDeepLink    : null
});

UserItem.reopenClass({
  createFromResponse(data) {
    if (!data) {
      return null;
    }

    let user = UserItem.create();
    user.setProperties({
      id                  : Ember.get(data, 'uid'),
      authToken           : Ember.get(data, 'token'),
      expiryTimeEpoch     : Ember.get(data, 'expires'),
      imageUrl            : Ember.get(data, 'facebook.profileImageURL'),
      firstName           : Ember.get(data, 'facebook.cachedUserProfile.first_name'),
      lastName            : Ember.get(data, 'facebook.cachedUserProfile.last_name'),
      email               : Ember.get(data, 'facebook.cachedUserProfile.email'),
      facebookDeepLink    : Ember.get(data, 'facebook.cachedUserProfile.link')
    });

    return user;
  }
});

export default UserItem;