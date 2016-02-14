import Ember from 'ember';
import SoundCloud from './SoundCloud';
import AppConfig from 'earworm/config/app-config';
import Firebase from 'earworm/api/firebase/firebase';
import Utils from 'earworm/utils/utils';

const ROOM_STATE = {
  IDLE       : 0,
  LOADING    : 1,
  ERROR      : 2,
  SUCCESS    : 3
};

export default Ember.Component.extend({
  tagName                   : 'home-page',
  classNames                : ['home-page'],

  query                     : null,
  items                     : null,

  outlets                   : {
    audio                   : new Audio()
  },
  displayable               : {
    roomId                  : null,
    room                    : null,
  },
  roomState                 : ROOM_STATE.IDLE,
  isEnteringRoom            : Ember.computed.equal('roomState', ROOM_STATE.LOADING),
  isErrorEnteringRoom       : Ember.computed.equal('roomState', ROOM_STATE.ERROR),
  isSuccessEnteringRoom     : Ember.computed.equal('roomState', ROOM_STATE.SUCCESS),

  flags                     : {
    newRoomButtonEnabled    : false
  },

  // I N I T
  init() {
    this._super(...arguments);
    //console.log('Utlils parameters', Utils.parseWindowParameter('roomId'));
    this.enterRoom('-K9eyoaGFEU0lCB6gZpS');
  },


  // A C T I O N S
  actions : {
    itemClicked(song) {
      console.log('playing song', song);
      let songUrl     = song.stream_url;
      let finalUrl    = `${songUrl}?client_id=${AppConfig.soundcloud.apiKey}`;

      let audio = this.getAudio();
      audio.src = finalUrl;
      audio.play();
    },
    enterPressed() {
      this.search(this.get('query'));
    },


    newRoomClicked() {
      if (!this.get('flags.newRoomButtonEnabled')) { return; }


      this.set('flags.newRoomButtonEnabled', false);

      Firebase.createNewRoom('joeysTestRoom')
        .then((fbResponse) => {
          console.log('success creating room!', fbResponse);

        })
        .catch((fbError) => {
          console.log('error creating room!', fbError);
        });

      console.log('new room!');
    }
  },

  getAudio() {
    return this.get('outAudioItem');
  },
  search(text) {
    let filter = 'public';
    let promise = SoundCloud.search({query:text, filter:filter})
      .then((data) => {
        console.log('success', data);
        this.set('items', data);
      });
    promise = promise.catch((error) => {
      console.log('error searching', error);
    });
  },
  enterRoom(roomId) {
    this.set('displayable.roomId', roomId);
    this.set('roomState', ROOM_STATE.LOADING);
    Firebase.enterRoom(roomId)
      .then((firebaseReponse) => {
        this.set('roomState', ROOM_STATE.SUCCESS);

        let room = firebaseReponse.get('data');

        console.log('romm!!!!!!!', room);
        let users = [];

        for (let userId of Object.keys(room.users)) {
          users.push({id:userId});
        }
        room.displayableUsers = users;


        this.set('displayable.room', room);
        console.log('success entering room ', room);
      })
      .catch((firebaseError) => {
        this.set('roomState', ROOM_STATE.ERROR);
        console.log('error entering room ' + roomId, firebaseError);
      });
  }


});
