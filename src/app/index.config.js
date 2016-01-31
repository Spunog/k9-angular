(function() {
  'use strict';

  angular
    .module('k9')
    .config(config)
    .config(function($mdDateLocaleProvider) {
        //Default date format
        $mdDateLocaleProvider.formatDate = function(date) {
           return moment(date).format('DD-MM-YYYY');
        };
    })
    .config(function($mdThemingProvider, $mdIconProvider){
        // Update the theme colors to use themes on font-icons
        $mdThemingProvider.theme('default')
              .primaryPalette("blue")
              .accentPalette('amber')
              .warnPalette('red')
              .backgroundPalette('grey');

        $mdThemingProvider.theme('night')
              .primaryPalette("pink")
              .accentPalette('amber')
              .warnPalette('red')
              .backgroundPalette('grey');
  });

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
