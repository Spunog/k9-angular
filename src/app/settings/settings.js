(function() {
  'use strict';

  angular.module('k9.settings', [
    'ui.router'
  ])

  .controller("SettingController", function SettingCtrl(NavModel, $state, $mdDialog) {

      //Public
      var vm = this;
      vm.toggleLeft = NavModel.buildDelayedToggler('left');
      vm.editSetting = editSetting;
      vm.breeds = [];

      // On Load
      updateNav();
      getBreeds();

      //Private

      // Go to edit
      function editSetting(setting){
        alert('going to edit...');
        $state.go('k9.settings.breed.edit', { settingID:setting.id} );
      }

      function getBreeds() {
        vm.breeds = [{
          id: 1,
          name: 'Bulldog'
        }, {
          id: 2,
          name: 'Beagle'
        }, {
          id: 3,
          name: 'Pom'
        }, {
          id: 4,
          name: 'Shitzu'
        }, {
          id: 5,
          name: 'Yorkshire Terrier'
        }, ];
      }

      function updateNav() {
        //Update Navigation State
        NavModel.setCurrentItem({
          title: 'Settings',
          sref: 'k9.setting'
        });
      }

    }) //end setting controller

  .config(function config($stateProvider, $httpProvider, $urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.settings', {
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
      },
      resolve: {
        // Page Title
        $title: function() {
          return 'Settings';
        }
      }
    });

  });

}()); //end use strict
