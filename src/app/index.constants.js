/* global moment:false */
(function() {
  'use strict';

  angular
    .module('k9')
    .constant('moment', moment)
    .constant('appConfig', {
      'API' : {
                  'baseURL' : 'http://api.k9.dev/v1/'
              }
    });

})();
