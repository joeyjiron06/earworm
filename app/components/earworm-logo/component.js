import Ember from 'ember';
import Utils from 'earworm/utils/utils';

const UI_STATE       = {
  NOT_CREATED      : 0,
  CREATING_ROOM    : 1
};

export default Ember.Component.extend({
  tagName                    : 'earworm-logo',
  classNames                 : ['earworm-logo'],

  // TEMPLATE VALUES

  displayableRoomName         : null,
  displayableRoomNameRegex    : '^[A-Za-z0-9\_\-]+$',
  displayableShowAddRoom     : Ember.computed.equal('uiState', UI_STATE.CREATING_ROOM),
  displayableText            : Ember.computed('uiState', function() {
    switch (this.get('uiState')) {
      case UI_STATE.NOT_CREATED:
        return 'New Room';

      case UI_STATE.CREATING_ROOM:
        return 'Cancel';

      default:
        return null;
    }
  }),


  emit : {
    createClicked(roomName, component) {
      component.sendAction('createClicked', roomName, component);
    }
  },


  // INTERNALS
  uiState          : UI_STATE.NOT_CREATED,
  actions          : {
    onButtonClicked() {
      switch (this.get('uiState')) {
        case UI_STATE.NOT_CREATED:
          this.set('uiState', UI_STATE.CREATING_ROOM);
          break;

        case UI_STATE.CREATING_ROOM:
          this.set('uiState', UI_STATE.NOT_CREATED);
          break;
      }
    },

    createClicked() {
      let regEx = new RegExp(this.get('displayableRoomNameRegex'));
      let text = this.get('displayableRoomName');

      if (!regEx.test(text)) {
        return;
      }

      this.set('uiState', UI_STATE.NOT_CREATED);


      this.emit.createClicked(text, this);
    }
  }
});