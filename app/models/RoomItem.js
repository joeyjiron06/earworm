import Ember from 'ember';
import Utils from 'earworm/utils/utils';

let UserItem = Ember.Object.extend({
  id           : null,
  name         : null,
  createdAt    : null
});

export default UserItem;