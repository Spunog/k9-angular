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
      'ngMdIcons',
      'toastr',
      'k9.navigation',
      'k9.login',
      'ui.calendar',
      'k9.models.calendar_events',
      'k9.dashboard',
      'k9.appointment.create',
      'ui.router.title',
      'k9.models.clients',
      'k9.clients',
      'k9.clients.create',
      'k9.clients.edit',
      'k9.models.pets',
      'k9.pets',
      'k9.pets.create',
      'k9.pets.edit'
    ]);

})();
