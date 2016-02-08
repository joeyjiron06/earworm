import AppConfig from 'earworm/config/app-config';
import HTTP from './Http';
import SearchFixtures from 'earworm/fixtures/soundcloud/search-john-mayer';


class SoundCloud {

  constructor(config, http) {
    this.config = config;
    this.http = http;
  }

  search(settings) {
    if (this.config.useFixtures) {
      return Promise.resolve(SearchFixtures);
    }

    let baseUrl     = this.config.soundcloud.urls.BASE;
    let apiKey      = this.config.soundcloud.apiKey;
    let endpoint    = `/tracks?q=${settings.query}&filter=${settings.filter}`;


    return this.http.get(`${baseUrl}${endpoint}&client_id=${apiKey}`);
  }
}

const instance = new SoundCloud(AppConfig, HTTP);


export default instance;