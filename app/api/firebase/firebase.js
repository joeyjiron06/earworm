import Ember from 'ember';
import Firebase from 'firebase';
import FirebaseError from './FirebaseError';
import FirebaseResponse from './FirebaseResponse';
import AppConfig from 'earworm/config/app-config';
import UserItem from 'earworm/models/UserItem';
import RoomItem from 'earworm/models/RoomItem';

export default Ember.Object.create({

  // firebase data
  _firebase          : null,


  init() {
    let firebase    = new Firebase(AppConfig.firebase.urls.BASE);
    this.set('_firebase', firebase);
  },


  /**
   * @return Ember.RSVP.Promise that resolves to a FirebaseResponse containing a UserItem
   * */
  authAnonomously() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let sessionParameters = {
        remember: "sessionOnly"
      };
      this._getFirebase().authAnonymously((error, data) => {
        if (error) {
          reject(FirebaseError.create({error : error}));
        }

        else {
          let userItem = UserItem.createFromResponse(data);
          resolve(FirebaseResponse.create({data: userItem}));
        }
      }, sessionParameters);
    });
  },

  /**
   * Auth with facebook
   * @return Ember.RSVP.Promise that resolves to a FirebaseResponse containing a UserItem
   * */
  authWithFacebookPopup() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getFirebase().authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          reject(FirebaseError.create({error: error}));
        }

        else {
          console.log('authed!!!', JSON.stringify(authData));
          resolve(FirebaseResponse.create({data: UserItem.createFromResponse(authData) }));
        }
      },
      {scope: "email,user_likes"});
    });
  },

  //  R O O M S
  getRooms() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getRoomsRef().once('value',
        (snapshot) => {
          let data = snapshot.val();
          resolve(FirebaseResponse.create({data:data}));
        },

        (error) => {
          reject(FirebaseError.create({error:error}));
        }
      );
    });
  },
  getRoom(roomId) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getRoomsRef().child(roomId).once('value',
        (snapshot) => {
          let data = snapshot.val();
          resolve(FirebaseResponse.create({data:  RoomItem.createFromResponse(data) }));
        },

        (error) => {
          reject(FirebaseError.create({error:error}));
        }
      );
    });
  },
  createNewRoom(roomName) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let roomsRef      = this._getRoomsRef();
      let newRoomRef    = roomsRef.push();

      let newRoom = {
        id           : newRoomRef.key(),
        name         : roomName,
        createdAt    : Firebase.ServerValue.TIMESTAMP
      };


      newRoomRef.set(newRoom, function(error) {
        if (error) {
          let fbError = FirebaseError.create({error : error});
          reject(fbError);
        }

        else {
          let fbResponse = FirebaseResponse.create({data: RoomItem.create(newRoom)});
          resolve(fbResponse);
        }
      });
    });
  },
  enterRoom(roomId, user) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const roomRef    = this._getRoomsRef().child(roomId);
      const userId     = Ember.get(user, 'id');
      const userRef    = roomRef.child('users').child(userId);

      // callback for user set
      const onUserSet = (error) => {
        if (error) {
          reject(FirebaseError.create({error:error}));
        }

        else {
          this.getRoom(roomId)
            .then((firebaseResponse) => { resolve(firebaseResponse); })
            .catch((firebaseError) => { reject(firebaseError); });
        }
      };


      // set user data in database
      userRef.set({id : userId, active: true}, onUserSet);

      // remove user from the room. the user is no longer online
      userRef.onDisconnect().remove();
    });
  },


  // INTERNALS
  _getFirebase() {
    return this.get('_firebase');
  },
  _getRoomsRef() {
    return this._getFirebase().child('rooms');
  }
});