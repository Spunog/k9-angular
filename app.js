angular.module("app",['ui.router'])

.constant('appConfig', {
  'API' : {
              'baseURL' : 'http://api.k9.dev/v1/'
          }
})

.config(function ($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
})

.config(function config($stateProvider,$httpProvider,$urlRouterProvider){

  //State Providers
  $stateProvider.state('dogs',{
    url: '/dogs',
    controller: 'DogCtrl as dog',
    templateUrl: 'views/dogs.html'
  });

  $stateProvider.state('clients',{
    url: '/clients',
    controller: 'ClientCtrl as client',
    templateUrl: 'views/clients.html'
  });

  $stateProvider.state('users',{
    url: '/users',
    controller: 'UserCtrl as user',
    templateUrl: 'views/users.html'
  });

  $stateProvider.state('login',{
    url: '/login',
    controller: 'LoginCtrl as login',
    templateUrl: 'views/login.html'
  });

  $urlRouterProvider.otherwise("/login");

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
    $state.go('dogs');
  };

  self.error = function loginSuccess(response){
    self.wrongCredentials = true;
  };

})

.controller("DogCtrl",function DogCtrl($http, auth, $state, appConfig){
  var self = this;

  self.logout = function logout(){
    var promise = auth.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
    $state.go('login'); // go to login
    // promise.then(function(){
    //   localStorage.removeItem('auth_token');
    //   localStorage.removeItem('auth_email');
    //   $state.go('login'); // go to login
    // });
  };

  $http({
    method: 'GET',
    url: appConfig.API.baseURL + "dogs"
  }).then(function successCallback(response) {
      self.dogs = response.data.dogs;
  }, function errorCallback(response) {
      alert('failed');
  });

})

.controller("ClientCtrl",function ClientCtrl($http, appConfig){

  var self = this;
  self.clients = [];
  self.currentClient = {};

  //States
  var _isEditing = false;
  var _isCreating = false;

  self.startEditing = function startEditing(person){
    _isCreating = false;
    _isEditing = true;

    self.currentClient = person;
  };

  self.startCreating = function startCreating(){
    _isEditing = false;
    _isCreating = true;
  };

  self.cancelEditingAndUpdating = function cancelEditingAndUpdating(){
    self.cancelEditing();
    self.cancelCreating();
  };

  self.cancelEditing = function cancelEditing(){
    _isEditing = false;
  };

  self.cancelCreating = function cancelCreating(){
    _isCreating = false;
  };

  self.shouldShowEditing = function shouldShowEditing(){
    return _isEditing;
  };

  self.shouldShowCreating = function shouldShowCreating(){
    return _isCreating;
  };

  //--------------------------------------------------------------------------
  // CRUD
  //--------------------------------------------------------------------------

  //Delete
  self.deleteClient = function deleteClient(clientDetails){

    $http({
      method  : 'DELETE', //patch over put for update - https://goo.gl/JRPN2o
      url     :  appConfig.API.baseURL + 'clients/' + clientDetails.id

    }).then(function successCallback(response) {
      self.getClients(); //temp code to refresh
      self.cancelEditingAndUpdating();
    }, function errorCallback(response) {
        alert('failed');
    });

  };

  //Update
  self.updateClient = function updateClient(clientDetails){

    $http({
      method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
      url     : 'http://api.k9.dev/v1/clients/' + clientDetails.id,
      data    : {
                  client: {
                    first_name  : clientDetails.first_name,
                    last_name   : clientDetails.last_name
                  }
                }

    }).then(function successCallback(response) {
      self.getClients(); //temp code to refresh
    }, function errorCallback(response) {
        alert('failed');
    });

  };

  //Create
  self.createClient = function createClient(clientDetails){

    $http({
      method  : 'POST',
      url     : appConfig.API.baseURL +'clients',
      data    : {
                  client: {
                    first_name  : clientDetails.firstname,
                    last_name   : clientDetails.lastname
                  }
                }

    }).then(function successCallback(response) {
      self.clients.unshift(response.data.client); //unshift same as but at start of array rather than end
      self.cancelEditingAndUpdating();
    }, function errorCallback(response) {
        alert('failed');
    });

  };

  //Read
  self.getClients = function getClients(){
    $http({
      method: 'GET',
      url: appConfig.API.baseURL + 'clients'
    }).then(function successCallback(response) {
        self.clients = response.data.clients;
    }, function errorCallback(response) {
        alert('failed');
    });
  };

  //On Load
  self.getClients();

})

.controller("UserCtrl",function UserCtrl($http, appConfig){

  var self = this;

  $http({
    method: 'GET',
    url: appConfig.API.baseURL + 'users'
  }).then(function successCallback(response) {
      self.users = response.data.users;
  }, function errorCallback(response) {
      alert('failed');
  });

})

// .directive('superman', function(){
//   return{
//     restrict: 'E',
//     template: '<div>Here I am to save the day!</div>'
//   };
// })

.run(function ($rootScope, $state, $location, auth) {

  // http://stackoverflow.com/a/27215254
  // http://plnkr.co/edit/3kImqU?p=preview

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

    if(!auth.isLoggedIn()){

      var onLoginPage = toState.name === "login";

      if(!onLoginPage){
        event.preventDefault(); // stop current execution
        $state.go('login');     // go to login
      }

    }

  });

});
