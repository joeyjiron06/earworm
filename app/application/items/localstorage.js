import Ember from 'ember';
import Utils from 'earworm/utils/utils';

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
    if (Utils.isObject(value)) {
      value = '[LS-AUTO-STRANGD]' + JSON.stringify(value);
    }

    window.localStorage.setItem(key, value);
    return true;
  } catch(e) {
    return false;
  }
}
function retrieve(key) {
  try {
    let val                 = window.localStorage.getItem(key);

    if (Utils.isString(val) && val.indexOf('[LS-AUTO-STRANGD]') === 0) {
      let lengthOfPrefix    = '[LS-AUTO-STRANGD]'.length;
      val                   = JSON.parse(val.substring(lengthOfPrefix));
    }

    return val;
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


