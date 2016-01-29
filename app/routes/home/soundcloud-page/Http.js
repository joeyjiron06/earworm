import Ember from 'ember';

var HTTP = {};

HTTP.get = function(url) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    Ember.$.ajax({type:'GET', url:url})
      .done((response) => {
        resolve(response);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

export default HTTP;
