(function () {
  'use strict';

  angular.module('k9.login',['ui.router','ngMessages'])

    .config(function config($stateProvider){

      $stateProvider.state('k9.login',{
        url: '/login',
        views: {
                  'main@' : {
                              controller: 'LoginController as loginCtrl',
                              templateUrl: 'app/login/login.tmpl.html'
                            }
               }

      });

    })

    .controller("LoginController",function LoginCtrl(auth,$state){
      var self = this,
          isSigningIn;

      self.login = function login(user){
        var promise = auth.login(user);
        isSigningIn = true;
        promise.then(self.success, self.error);
      };

      self.success = function loginSuccess(response){
        localStorage.setItem('auth_token',response.data.token);
        localStorage.setItem('auth_email',response.data.email);
        isSigningIn = false;
        $state.go('k9.dashboard');
      };

      self.error = function loginSuccess(response){
        isSigningIn = false;
        self.wrongCredentials = true;
      };

      self.isSigningIn = function getSubmitMessage(){
        return isSigningIn;
      };

      self.getSubmitMessage = function getSubmitMessage(){
        return (isSigningIn) ? ' Signing In. Please wait...' : 'Sign In' ;
      };

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

      var self = this;

      self.isLoggedIn = function isLoggedIn(){
        return (localStorage.getItem('auth_token')) ? true : false;
      };

      self.logout = function logout(){
        // return $http.delete('');
        return 1;
      };

      self.login = function login(user){

        return $http.post(appConfig.API.baseURL + 'login', {
          user: {
                  email: user.email,
                  password: user.password
                }
        });

      };

    }); //end LoginCtrl

}()); // end use strict
