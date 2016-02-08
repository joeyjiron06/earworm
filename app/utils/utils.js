export default class Utils {
  static isNoE(item) {

    if (!Utils.isA(item)) {
      return true;
    }

    if (Utils.isArray(item)) {
      return item.length === 0;
    }

    if (Utils.isString(item)) {
      return item.trim() === '';
    }

    if (Utils.isObject(item)) {
      return Object.keys(item).length === 0;
    }


    return false;
  }

  static isA(item) {
    if (Utils.isNumber(item)) {
      return !isNaN(item);
    }

    return item !== null && item !== undefined;
  }

  static isArray(item) {
    return Object.prototype.toString.call(item) === '[object Array]';
  }

  static isString(item) {
    return Object.prototype.toString.call(item) === '[object String]';
  }

  static isObject(item) {
    return Object.prototype.toString.call(item) === '[object Object]';
  }

  static isNumber(item) {
    return Object.prototype.toString.call(item) === '[object Number]';
  }

  static isFunction(item) {
    return Object.prototype.toString.call(item) === '[object Function]';
  }

  static parseWindowParameter(keyToFind) {
    let args = window.location.search.substr(1).split("&");

    for (let arg of args) {
      let keyValPairs    = arg.split("=");
      let key            = keyValPairs[0];
      if (key === keyToFind) {
        return decodeURIComponent(keyValPairs[1]);
      }
    }

    return null;
  }
}
