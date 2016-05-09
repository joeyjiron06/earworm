import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {


  this.route('routes', {path:''}, function() {
    this.route('dev', function() {
      this.route('audio');
      this.route('login');
    });
    this.route('home');
    this.route('login');
    this.route('my-route');

    this.route('room',  { path: '/room/:room_name/:room_id' });

  });
});

export default Router;
