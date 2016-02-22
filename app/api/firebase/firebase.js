import Ember from 'ember';
import Firebase from 'firebase';
import FirebaseError from './FirebaseError';
import FirebaseResponse from './FirebaseResponse';
import AppConfig from 'earworm/config/app-config';
import UserItem from 'earworm/models/UserItem';

export default Ember.Object.create({

  // firebase data
  firebase          : null,
  roomsRef : null,


  // data
  user : null,



  init() {
    let firebase    = new Firebase(AppConfig.firebase.urls.BASE);

    this.set('firebase', firebase);
    this.set('roomsRef', firebase.child('rooms'));
  },

  getFirebase() {
    return this.get('firebase');
  },

  /**
   * @return Ember.RSVP.Promise that resolves to a FirebaseResponse containing a UserItem
   * */
  authAnonomously() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let sessionParameters = {
        remember: "sessionOnly"
      };
      this.getFirebase().authAnonymously((error, data) => {
        if (error) {
          reject(FirebaseError.create({error : error}));
        }

        else {
          let userItem = UserItem.createFromResponse(data);

          this.set('user', userItem);

          resolve(FirebaseResponse.create({data: userItem}));
        }
      }, sessionParameters);
    });
  },
  authWithFacebookPopup() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.getFirebase().authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          reject(FirebaseError.create({error: error}));
        }

        else {
          resolve(FirebaseResponse.create({data: authData}));
        }
      },
      {scope: "email,user_likes"});
    });
  },

  //  R O O M S
  getRooms() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('roomsRef').once('value',
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
      this.get('roomsRef').child(roomId).once('value',
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
  createNewRoom(roomName) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let roomsRef      = this.get('roomsRef');
      let newRoomRef    = roomsRef.push();

      let newRoom = {
        id : newRoomRef.key(),
        name : roomName,
        createdAt: Firebase.ServerValue.TIMESTAMP
      };


      newRoomRef.set(newRoom, function(error) {
        if (error) {
          let fbError = FirebaseError.create({error : error});
          reject(fbError);
        }

        else {
          let fbResponse = FirebaseResponse.create({data: newRoom});
          resolve(fbResponse);
        }
      });
    });
  },
  enterRoom(roomId) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let roomRef    = this.get('roomsRef').child(roomId);
      let userId     = this.get('user.id');
      let userRef    = roomRef.child('users').child(userId);

      userRef.set({id : userId, active: true},
        (error) => {
          if (error) {
            reject(FirebaseError.create({error:error}));
          }

          else {
            this.getRoom(roomId)
              .then((firebaseResponse) => {
                let room = firebaseResponse.get('data');
                console.log('got room!', room);
                resolve(FirebaseResponse.create({data:room}));
              })
              .catch((firebaseError) => {
                let error = firebaseError.get('error');
                reject(FirebaseError.create({error:error}));
              });
          }
      });

      // remove user from the room. the user is no longer online
      userRef.onDisconnect().remove();
    });
  }
});