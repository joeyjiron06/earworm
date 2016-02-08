/* globals Firebase */

(function() {
  function vendorModule() {
    'use strict';

    return { 'default': Firebase };
  }

  define('firebase', [], vendorModule);
})();
