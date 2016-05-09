import Ember from 'ember';
import Utils from 'earworm/utils/utils';
import UserItem from './UserItem';

const RoomItem = Ember.Object.extend({
  id           : null,
  name         : null,
  createdAt    : null,
  users        : null,


  _ref : null,

  _refChanged : Ember.observer('_ref', function() {
    if (this.get('_ref')) {
      this.get('_ref').child('users').on('value', this._usersChanged.bind(this));
    }
  }),

  _usersChanged(dataSnapShot) {
    let users = RoomItem.mapUsers(dataSnapShot.val());
    this.set('users', users);

    console.log('RoomItem : _usersChanged', dataSnapShot.val());
    console.log('RoomItem : _usersChanged mapValues', this.get('users'));
  }
});

RoomItem.reopenClass({
  createFromResponse(data) {
    if (Utils.isNoE(data)) {
      return null;
    }

    let item = RoomItem.create({
      id           : Ember.get(data, 'id'),
      name         : Ember.get(data, 'name'),
      createdAt    : Ember.get(data, 'createdAt')
    });

    item.set('users', RoomItem.mapUsers(data.users));

    return item;
  },


  mapUsers(userData) {
    if (!Utils.isObject(userData)) {
      return null;
    }

    let users = [];

    for (let key of Object.keys(userData)) {
      let user = userData[key];
      users.push(UserItem.create(user));
    }

    return users;
  }
});


export default RoomItem;