import LocalStorage from './items/localstorage';

export default Ember.Object.create({
  /**
   * A UserItem set on auth login
   * */
  user : null,

  /**
   * The current room the user is in
   * */
  room : null,

  LocalStorage    : LocalStorage.create(),
});