import Ember from 'ember';
import BaseModal from '../component';
import FireBase from 'earworm/api/firebase/firebase';
import Earworm from 'earworm/application/earworm';


const STATE = {
  INITIAL                  : 'INITIAL',
  CREATING_ROOM            : 'CREATING_ROOM',
  CREATING_ROOM_SUCCESS    : 'CREATING_ROOM_SUCCESS',
  CREATING_ROOM_ERROR      : 'CREATING_ROOM_ERROR',
};

export default BaseModal.extend({
  tagName : 'create-room-modal',
  classNames : ['create-room-modal'],

  // template values
  _roomNameRegex : '^[A-Za-z0-9\_\-]+$',
  _roomName : null,


  init() {
    this._super(...arguments);
    this.set('_createRoomState', STATE.INITIAL);
  },


  // ACTIONS
  actions : {
    createRoomPressed() {
      // NOT A VALID ROOM NAME - bail
      if (!this._isValidRoomName()) {
        return;
      }

      // CREATING ROOM IN PROGRESS
      if (this.get('_createRoomState') === STATE.CREATING_ROOM) {
        return;
      }

      this._createRoom();
    }
  },


  // INTERNALS
  _createRoomState     : STATE.INITIAL,
  _isInInitialState    : Ember.computed.equal('_createRoomState', STATE.INITIAL),
  _isCreatingRoom      : Ember.computed.equal('_createRoomState', STATE.CREATING_ROOM),
  _isCreatingRoomError : Ember.computed.equal('_createRoomState', STATE.CREATING_ROOM_ERROR),
  _isCreatingRoomSuccess : Ember.computed.equal('_createRoomState', STATE.CREATING_ROOM_SUCCESS),


  _isInputDisabled     : Ember.computed.not('_isInInitialState'),
  _isButtonDisabled    : Ember.computed.not('_isInInitialState'),


  _isValidRoomName() {
    const roomName = this.get('_roomName');

    if (!roomName) {
      return false;
    }


    const regex = new RegExp(this.get('_roomNameRegex'));



    return regex.test(roomName);
  },
  _createRoom() {
    const roomName = this.get('_roomName');

    this.set('_createRoomState', STATE.CREATING_ROOM);
    FireBase.createNewRoom(roomName)
      .then((firebaseResponse) => {
        Ember.run(() => {
          this.set('_createRoomState', STATE.CREATING_ROOM_SUCCESS);

          const room        = firebaseResponse.data;
          const roomName    = room.get('name');
          const roomId      = room.get('id');

          Earworm.AppState.set('room', room);
          this.get('router').transitionTo(`/room/${roomName}/${roomId}`);
        });
      })
      .catch((firebaseError) => {
        Ember.run(() => {
          this.set('_createRoomState', STATE.CREATING_ROOM_ERROR);
          console.log('error creating room!', firebaseError);
        });
      });
  },

});