import AppConfig from 'earworm/config/app-config';
import HTTP from './Http';

const SoundCloud = function(config, http) {
  const my = this;

  // PUBLIC
  my.search = (settings) => {
    return get(`/tracks?q=${settings.query}&filter=${settings.filter}`);
  };

  // PRIVATE
  const get = (url) =>  {
    return http.get(`${config.soundcloud.urls.BASE}${url}&client_id=${config.soundcloud.apiKey}`);
  };


  return my;
};


const fixtures = {};
fixtures.search = {};

const instance = new SoundCloud(AppConfig, HTTP);


export default instance;