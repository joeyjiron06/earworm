import Ember from 'ember';
import {AudioProperties} from 'earworm/components/audio-player/Constants';
import Utils from 'earworm/utils/utils';

export default Ember.Controller.extend({

  displayable : {
    properties : null
  },

  actions : {
    apStateItemUpdated(apStateItem) {
      let displayableProperties = [];

      for (let property of AudioProperties) {
        let value = apStateItem.get(property);

        if (Utils.isObject(value) || Utils.isArray(value)) {
          value = JSON.stringify(value);
        }

        displayableProperties.push({
          key      : property,
          value    : value
        });
      }

      //console.log('displayable properties', displayableProperties);

      this.set('displayable.properties', displayableProperties);
    }
  }

});
