import AppConfig from 'earworm/config/app-config';
import HTTP from './../../routes/home/old-ui/Http';
import SearchFixtures from 'earworm/fixtures/search-john-mayer';


class SoundCloud {

  constructor(config, http) {
    this.config = config;
    this.http = http;
  }

  search(options) {
    if (this.config.useFixtures) {
      return Promise.resolve(SearchFixtures);
    }

    let baseUrl     = this.config.soundcloud.urls.BASE;
    let apiKey      = this.config.soundcloud.apiKey;
    let endpoint    = `/tracks?q=${options.query}&filter=${options.filter}`;


    return this.http.get(`${baseUrl}${endpoint}&client_id=${apiKey}`);
  }

  getUrl(url) {
    if (!url) {
      return url;
    }

    let apiKey      = this.config.soundcloud.apiKey;
    return `${url}?client_id=${apiKey}`;

  }

}

const instance = new SoundCloud(AppConfig, HTTP);


export default instance;