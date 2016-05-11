(function() {
  'use strict';

  angular.module('k9.settings', [
    'ui.router'
  ])

  .controller("SettingController", function SettingCtrl(NavModel, $state, $mdDialog) {

      //Public
      var vm          =   this;
      vm.selectedTab  =   $state.current.data.selectedTab |= 0;
      vm.toggleLeft   =   NavModel.buildDelayedToggler('left');

      // On Load
      updateNav();

      //Private
      function updateNav() {
        //Update Navigation State
        NavModel.setCurrentItem({
          title: 'Settings',
          sref: 'k9.settings'
        });
      }

    }) //end setting controller

  .config(function config($stateProvider, $httpProvider, $urlRouterProvider) {

    //State Providers
    $stateProvider

    // Settings > Abstract Root Level
      .state('k9.settings', {
      abstract: true,
      url: '/settings',
      views: {
        'main@': {
          controller: 'SettingController as vm',
          templateUrl: 'app/settings/settings.tmpl.html'
        },
        'nav@': {
          controller: 'NavigationController as vm',
          templateUrl: 'app/nav/nav.tmpl.html'
        }
      }
    })

    // Settings > Breeds
    .state('k9.settings.breeds', {
      url: '/breeds',
      data: {
        'selectedTab': 0
      },
      views: {
        'breeds': {
          controller: 'BreedController as vm',
          templateUrl: 'app/settings/breeds/settings-breeds.tmpl.html'
        }
      }
    })

    // Settings > Activity
    .state('k9.settings.activities', {
      url: '/activities',
      data: {
        'selectedTab': 1
      },
      views: {
        'activities': {
          controller: 'ActivityController as vm',
          templateUrl: 'app/settings/activity/settings-activity.tmpl.html'
        }
      }
    });


  });

}()); //end use strict
