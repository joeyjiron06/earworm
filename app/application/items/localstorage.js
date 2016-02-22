import Ember from 'ember';

const KEYS = {
  'USER' : 'USER'
};
export default Ember.Object.extend({
  user : {
    save(data) {
      save(KEYS.USER, data);
    },
    get() {
      return retrieve(KEYS.USER);
    },
    delete() {
      remove(KEYS.USER);
    }
  }
});
function save(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch(e) {
    return false;
  }
}
function retrieve(key) {
  try {
    return window.localStorage.getItem(key);
  } catch(e) {
    return undefined;
  }
}
function remove(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch(e) {
    return false;
  }
}


