import Ember from 'ember';
import SoundCloud from 'earworm/api/soundcloud/SoundCloud';
import Earworm from 'earworm/application/earworm';
import FireBase from 'earworm/api/firebase/firebase';
import Utils from 'earworm/utils/utils';

const STATE = {
  NOT_LOADED    : 0,
  LOADING       : 1,
  LOADED        : 2,
  ERROR         : 3
};

export default Ember.Component.extend({
  tagName                   : 'home-page',
  classNames                : ['home-page'],

  // attrs
  qpRoomId                  : null, // query param



  searchValue               : null,
  items                     : null,
  audio                     : null,
  songTitle                 : null,
  user                      : null,
  songQueue                 : [],


  // room info
  roomState                 : STATE.NOT_LOADED,


  userDeepLink              : Ember.computed.alias('user.facebookDeepLink'),

  // displayable items
  displayableUserImage      : Ember.computed.alias('user.imageUrl'),
  displayableShowAddRoom    : false,
  displayableRoomName       : null,
  displayableRoomTitle      : Ember.computed.alias('room.name'),
  displayableRoomStatus     : Ember.computed('roomState', function() {
    const roomState  = this.get('roomState');

    switch (roomState) {
      case STATE.LOADING:
        return 'Loading...';
      case STATE.LOADED:
        return 'In Room';
      case STATE.ERROR:
        return 'Error joining room. Please refresh the page.';
    }

    return null;
  }),


  // LIFECYCLE
  init() {
    this._super(...arguments);

    this.set('audio', new Audio());
    this.set('user', Earworm.AppState.get('user'));
    console.log('user', this.get('user'));
  },
  didInsertElement() {
    this._super(...arguments);
    this.$('.mdl-textfield__input').keypress(this._onSearchInputKeyPress.bind(this));
  },


  // ACTIONS
  actions                   : {
    addRoom() {
      console.log('add room!');
      this.toggleProperty('displayableShowAddRoom');
    },
    playClicked(item) {
      let title             = item.title;
      let url               = SoundCloud.getUrl(item.stream_url);
      let audio             = this.get('audio');
      this.set('songTitle', title);
      audio.src             =  url;
      audio.play();

      console.log('play clicked', item);
    },
    addClicked(item) {
      console.log('add clicked', item);
      this.get('songQueue').addObject(item);
    },
    createRoom(roomName) {
      FireBase.createNewRoom(roomName)
        .then((firebaseResponse) => {
          let room          = firebaseResponse.data;
          let roomId        = room.get('id');
          this.set('qpRoomId', roomId); // set room id on query param. let query param observer get invoked to join room
        })
        .catch((firebaseError) => {
          console.log('error creating room!', firebaseError);
        });
    }
  },

  // INTERNALS
  _onSearchInputKeyPress(e) {
    // pressed enter
    if (e.which === 13) {
      let text       = this.get('searchValue');
      SoundCloud.search({query:text, filter:'public'})
        .then((data) => {
          this.set('items', data);
        })
        .catch((error) => {
          console.log('error searching', error);
        });
      return false;
    }
  },
  _onRoomIdChanged          : Ember.observer('qpRoomId', Ember.on('init', function() {
    let roomId              = this.get('qpRoomId');

    if (Utils.isNoE(roomId)) {
      return;
    }


    this.set('roomState', STATE.LOADING);

    FireBase.enterRoom(roomId, this.get('user'))
            .then((firebaseRespone) => {
              console.log('in room!', firebaseRespone.data);
              this.set('room', firebaseRespone.data);
              this.set('roomState', STATE.LOADED);
            })
            .catch((firebaseError) => {
              console.error('error joining room!', firebaseError);
              this.set('roomState', STATE.ERROR);
            });
  }))
});