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


  static addQueryParam(url, key, value) {
    if (Utils.isNoE(url) || Utils.isNoE(key)) {
      return null;
    }


    if (url.indexOf('?') === -1) {
      url += '?';
    }

    else {
      url += '&';
    }

    return `${url}${key}=${value}`;

  }

  static secondsToHHMMSS(inSeconds) {
    var sec_num = parseInt(inSeconds, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    var time = '';
    if (hours !== '00') {
      time = hours+':';
    }
    time    += minutes+':'+seconds;
    return time;
  }

  static random(max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }
}
