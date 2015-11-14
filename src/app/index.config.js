(function() {
  'use strict';

  angular
    .module('k9')
    .config(config)
    .config(function($mdThemingProvider){
        // Update the theme colors to use themes on font-icons
        $mdThemingProvider.theme('default')
              .primaryPalette("red")
              .accentPalette('green')
              .warnPalette('blue');
      })
    .config(function($mdThemingProvider, $mdIconProvider){

    $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg"          , 128)
        .icon("menu"       , "./assets/svg/menu.svg"        , 24)
        .icon("share"      , "./assets/svg/share.svg"       , 24)
        .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
        .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
        .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
        .icon("phone"      , "./assets/svg/phone.svg"       , 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red')
            .warnPalette('blue');

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
