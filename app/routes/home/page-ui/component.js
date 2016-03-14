import Ember from 'ember';
import SoundCloud from 'earworm/api/soundcloud/SoundCloud';
import SearchFixtures from 'earworm/fixtures/soundcloud/search-john-mayer';
import Earworm from 'earworm/application/earworm';
import FireBase from 'earworm/api/firebase/firebase';
import Utils from 'earworm/utils/utils';

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


  // displayable items
  displayableUserImage      : Ember.computed.alias('user.imageUrl'),
  displayableShowAddRoom    : false,
  displayableRoomName       : null,

  // LIFECYCLE
  init() {
    this._super(...arguments);

    this.set('audio', new Audio());
    this.set('user', Earworm.AppState.get('user'));
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

    debugger;
    FireBase.enterRoom(roomId, this.get('user'))
            .then((firebaseRespone) => {
              console.log('in room!', firebaseRespone.data);
            })
            .catch((firebaseError) => {
              console.error('error joining room!', firebaseError);
            });
  }))
});