angular.module('login',['ui.router'])

  .config(function config($stateProvider){

    $stateProvider.state('login',{
      url: '/login',
      controller: 'LoginCtrl as login',
      templateUrl: 'app/login/login.tmpl.html'
    });

  })

  .controller("LoginCtrl",function LoginCtrl(auth,$state){
    var self = this;

    self.login = function login(user){
      var promise = auth.login(user);
      promise.then(self.success, self.error);
    };

    self.success = function loginSuccess(response){
      localStorage.setItem('auth_token',response.data.token);
      localStorage.setItem('auth_email',response.data.email);
      $state.go('clients');
    };

    self.error = function loginSuccess(response){
      self.wrongCredentials = true;
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

  });
