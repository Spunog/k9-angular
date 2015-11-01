angular.module('clients',['ui.router'])

.config(function config($stateProvider,$httpProvider,$urlRouterProvider){

  //State Providers
  $stateProvider.state('clients',{
    url: '/clients',
    controller: 'ClientCtrl as client',
    templateUrl: 'app/clients/clients.tmpl.html'
  });

})

.controller("ClientCtrl",function ClientCtrl($http, appConfig){

  var self = this;
  self.clients = [];
  self.currentClient = {};

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

});
