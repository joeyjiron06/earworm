import ENV from 'earworm/config/environment';


var config       =  {
  useFixtures    : false,

  youtube        : {
    apiKey       : ENV.APP.youtubeApiKey
  },

  soundcloud     : {
    urls         : {
      BASE       : 'https://api.soundcloud.com'
    },
    apiKey       : ENV.APP.soundCloudApiKey
  }
};

(function() {
  switch (ENV.environment) {
    case 'development' :
      // TODO: set use fixtures to true
      break;
  }
})();



export default config;