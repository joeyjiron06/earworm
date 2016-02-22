import AppState from './items/appstate';
import LocalStorage from './items/localstorage';

export default {
  LocalStorage    : LocalStorage.create(),
  AppState        : AppState.create()
};