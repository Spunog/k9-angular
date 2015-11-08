(function () {
   'use strict';

    angular.module("k9",[
      'ngAnimate',
      'ui.router',
      'k9.navigation',
      'k9.login',
      'k9.dashboard',
      'k9.models.clients',
      'k9.clients',
      'k9.clients.create',
      'k9.clients.edit'
    ])

      .constant('appConfig', {
        'API' : {
                    'baseURL' : 'http://api.k9.dev/v1/'
                }
      })

      .config(function config($stateProvider,$httpProvider,$urlRouterProvider, $locationProvider){
        //State Provider
        //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
        $stateProvider.state('k9', {
           url: '',
           abstract: true
        });
        $urlRouterProvider.otherwise("/login");

        $locationProvider.html5Mode(true); //removes the hash url in supported browsers

      })

      // Common directive for Focus
      .directive('focus',
      	function($timeout) {
      		return {
      			scope : {
      				trigger : '@focus'
      			},
      			link : function(scope, element) {
      				scope.$watch('trigger', function(value) {
      					if (value === "true") {
      						$timeout(function() {
      							element[0].focus();
      						});
      					}
      				});
      			}
      		};
      	}
      )

      .run(function ($rootScope, $state, $location, auth) {

        // http://stackoverflow.com/a/27215254
        // http://plnkr.co/edit/3kImqU?p=preview

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

          if(!auth.isLoggedIn()){

            var onLoginPage = toState.name === "k9.login";

            if(!onLoginPage){
              event.preventDefault(); // stop current execution
              $state.go('k9.login');     // go to login
            }

          }

        });

      }); //end run
}()); // end use strict
