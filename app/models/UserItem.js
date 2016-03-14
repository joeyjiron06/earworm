import Ember from 'ember';
import Utils from 'earworm/utils/utils';

let UserItem = Ember.Object.extend({
  id                 : null,
  authToken          : null,
  expiryTimeEpoch    : null,
  imageUrl           : null
});

UserItem.reopenClass({
  createFromResponse(data) {
    if (!data) {
      return null;
    }

    let user = UserItem.create();
    user.setProperties({
      id                 : Ember.get(data, 'uid'),
      authToken          : Ember.get(data, 'token'),
      expiryTimeEpoch    : Ember.get(data, 'expires'),
      imageUrl           : Ember.get(data, 'facebook.profileImageURL')
    });

    return user;
  }
});

export default UserItem;