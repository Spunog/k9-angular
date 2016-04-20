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
      function editSetting(setting) {
        alert('going to edit...');
        $state.go('k9.settings.breed.edit', {
          settingID: setting.id
        });
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
      },
      controller: function($scope) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          $scope.currentTab = toState.data.selectedTab;
        });
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
    .state('k9.settings.activity', {
      url: '/activity',
      data: {
        'selectedTab': 1
      },
      views: {
        'activity': {
          controller: function(NavModel, $state, $mdDialog) {
            var vm = this;
            vm.name = 'activity';
          },
          templateUrl: 'app/settings/activity/settings-activity.tmpl.html'
        }
      }
    });


  });

}()); //end use strict
