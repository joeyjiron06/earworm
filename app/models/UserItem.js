import Ember from 'ember';
import Utils from 'earworm/utils/utils';

let UserItem = Ember.Object.extend({
  id                 : null,
  authToken          : null,
  expiryTimeEpoch    : null
});

UserItem.reopenClass({
  createFromResponse(data) {
    if (!data) {
      return null;
    }

    let user = UserItem.create();
    user.setProperties({
      id                 : data['uid'],
      authToken          : data['token'],
      expiryTimeEpoch    : data['expires']
    });

    return user;
  }
});

export default UserItem;