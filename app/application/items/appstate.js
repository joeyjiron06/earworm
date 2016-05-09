import Ember from 'ember';

export default Ember.Object.extend({
  /**
   * A UserItem either retrieved from local storage or set on auth login
   * */
  user : null,

  /**
   * The current room the user is in
   * */
  room : null
});