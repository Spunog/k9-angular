(function() {
  'use strict';

  angular
    .module('k9', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ngMaterial',
      'toastr',
      'k9.navigation',
      'k9.login',
      'k9.dashboard',
      'k9.models.clients',
      'k9.clients',
      'k9.clients.create',
      'k9.clients.edit'
    ]);

})();
