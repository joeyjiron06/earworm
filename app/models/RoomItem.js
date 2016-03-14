import Ember from 'ember';
import Utils from 'earworm/utils/utils';

const RoomItem = Ember.Object.extend({
  id           : null,
  name         : null,
  createdAt    : null
});

RoomItem.reopenClass({
  createFromResponse(data) {
    if (Utils.isNoE(data)) {
      return null;
    }

    return RoomItem.create({
      id           : Ember.get(data, 'id'),
      name         : Ember.get(data, 'name'),
      createdAt    : Ember.get(data, 'createdAt')
    });
  }
});


export default RoomItem;