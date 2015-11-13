(function() {
  'use strict';

  angular
    .module('k9')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider.state('k9',{
      url: '',
      redirectTo: 'k9.dashboard'
    });

    $urlRouterProvider.otherwise("/login");

    // $locationProvider.html5Mode(true); //removes the hash url in supported browsers
  }

})();
