import Ember from 'ember';
import Utils from 'earworm/utils/utils';

const KEYS = {
  'USER' : 'USER'
};
const LSProperty = Ember.Object.extend({
  key : null,

  save(data) {
    save(this.get('key'), data);
  },
  retrieve() {
    return retrieve(this.get('key'));
  },
  delete() {
    remove(this.get('key'));
  }
});

export default Ember.Object.extend({
  authToken : LSProperty.create({key : 'authToken'})
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


