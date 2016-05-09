import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return new Ember.RSVP.Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

  },


  actions : {
    loading: function() {
      console.log("Loading data, go make some coffee.");
    }
  }


});
