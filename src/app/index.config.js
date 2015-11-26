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
              .primaryPalette("pink")
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
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
