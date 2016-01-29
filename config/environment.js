/* jshint node: true */
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'earworm',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      youtubeApiKey       : getYoutubeApiKey(),
      soundCloudApiKey    : getSoundCloudApiKey()
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
var getYoutubeApiKey = function() {
  try {
    return require('./youtube-api-key');
  } catch(e) {
    console.log('***** NO YOUTUBE API KEY FOUND');
    return null;
  }
};
var getSoundCloudApiKey = function() {
  try {
    return require('./soundCloudApiKey.local');
  } catch(e) {
    console.log('***** NO YOUTUBE API KEY FOUND');
    return null;
  }
};
