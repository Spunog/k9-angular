(function () {
  'use strict';

  angular.module('k9.login',['ui.router','ngMessages'])

    .controller("LoginController",function LoginCtrl(auth,$state){

      //Public
      var vm = this, isSigningIn;
      vm.login              =   login;
      vm.success            =   loginSuccess;
      vm.error              =   loginError;
      vm.isSigningIn        =   isSigningIn;
      vm.getSubmitMessage   =   getSubmitMessage;

      //Private
      function login(user){
        var promise = auth.login(user);
        isSigningIn = true;
        promise.then(vm.success, vm.error);
      }

      function loginSuccess(response){
        localStorage.setItem('auth_token',response.data.token);
        localStorage.setItem('auth_email',response.data.email);
        isSigningIn = false;
        $state.go('k9.dashboard');
      }

      function loginError(response){
        isSigningIn = false;
        vm.wrongCredentials = true;
      }

      function getSubmitMessage(){
        return (isSigningIn) ? ' Signing In. Please wait...' : 'Sign In' ;
      }

    })

    .config(function ($httpProvider){
      $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function($q){
      return {
        request: function(config){
          config.headers = config.headers || {};
          if (localStorage.auth_token && localStorage.auth_email){
            config.headers.Authorization = 'Token token=' + localStorage.auth_token + ', email="' + localStorage.auth_email + '"';
          }
          return config;
        }
      };
    })

    .service('auth', function($http, appConfig){

      //Public
      var vm          =   this;
      vm.isLoggedIn   =   isLoggedIn;
      vm.logout       =   logout;
      vm.login        =   login;

      //Private
      function isLoggedIn(){
        return (localStorage.getItem('auth_token')) ? true : false;
      }

      function logout(){
        return 1;
      }

      function login(user){

        return $http.post(appConfig.API.baseURL + 'login', {
          user: {
                  email: user.email,
                  password: user.password
                }
        });

      }

    }) //end Login Controller

    .config(function config($stateProvider){

      $stateProvider.state('k9.login',{
        url: '/login',
        views: {
                  'main@' : {
                              controller: 'LoginController as vm',
                              templateUrl: 'app/login/login.tmpl.html'
                            }
               }

      });

    });

}()); // end use strict
