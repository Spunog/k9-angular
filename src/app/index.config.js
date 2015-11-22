(function() {
  'use strict';

  angular
    .module('k9')
    .config(config)
    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
           return moment(date).format('DD-MM-YYYY');
        };
    })
    .config(function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
          .defaultIconSet("./assets/svg/avatars.svg"              , 128)
          .icon("menu"       , "./assets/svg/menu.svg"            , 24)
          .icon("email"      , "./assets/svg/email.svg"           , 24)
          .icon("key"        , "./assets/svg/key.svg"             , 24)
          .icon("share"      , "./assets/svg/share.svg"           , 24)
          .icon("add"        , "./assets/svg/add.svg"             , 24)
          .icon("google_plus", "./assets/svg/google_plus.svg"     , 512)
          .icon("hangouts"   , "./assets/svg/hangouts.svg"        , 512)
          .icon("twitter"    , "./assets/svg/twitter.svg"         , 512)
          .icon("phone"      , "./assets/svg/phone.svg"           , 512)
          .icon("arrow_left" , "./assets/svg/arrow_left_24px.svg" , 24)
          .icon("more_vert"  , "./assets/svg/more_vert.svg"       , 24)
          .icon("delete_white","./assets/svg/ic_delete_white_24px.svg", 24)
          .icon("close_white","./assets/svg/ic_close_white_24px.svg", 24)
          .icon("pets_black","./assets/svg/ic_pets_black_24px.svg", 24);

        // Update the theme colors to use themes on font-icons
        $mdThemingProvider.theme('default')
              .primaryPalette("pink")
              .accentPalette('amber')
              .warnPalette('red')
              .backgroundPalette('grey');

        //Defaults
        // primary - indigo
        // accent - pink
        // warn - red
        // background - grey (note that white is in this palette)

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
