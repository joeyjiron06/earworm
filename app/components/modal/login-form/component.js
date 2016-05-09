import Ember from 'ember';
import BaseModal from '../component';
import FireBase from 'earworm/api/firebase/firebase';
import Earworm from 'earworm/application/earworm';


const STATE = {
  INITIAL                  : 'INITIAL'
};

export default BaseModal.extend({
  tagName       : 'login-modal',
  classNames    : ['login-modal'],

});