import Ember from 'ember';
import Utils from 'earworm/utils/utils';

const urls = [
  'https://images.unsplash.com/photo-1460667177929-52b8e7325c36?crop=entropy&dpr=2&fit=crop&fm=jpg&h=900&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1225',
  'https://images.unsplash.com/photo-1431069767777-c37892aa0a07?crop=entropy&dpr=2&fit=crop&fm=jpg&h=950&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1225',
  'https://images.unsplash.com/photo-1416273567255-8abe875affcd?crop=entropy&dpr=2&fit=crop&fm=jpg&h=950&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1225',
  'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?crop=entropy&dpr=2&fit=crop&fm=jpg&h=950&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1700',
  'https://images.unsplash.com/photo-1449748040579-354c191a7934?crop=entropy&dpr=2&fit=crop&fm=jpg&h=950&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1700',
  'https://images.unsplash.com/photo-1459233313842-cd392ee2c388?crop=entropy&dpr=2&fit=crop&fm=jpg&h=950&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1700'
];

export default Ember.Controller.extend({

  _indexPageStyle : Ember.computed(function() {
    return `background-image: url("${urls[ Utils.random(urls.length-1)  ]}");`;
  }),


  _showModal : false,


  actions : {
    loginPressed() {
      this.set('_showModal', true);
    }
  },






});