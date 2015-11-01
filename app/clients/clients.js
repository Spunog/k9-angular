angular.module('clients',[
  'ui.router',
  'k9.models.clients'
])

.config(function config($stateProvider,$httpProvider,$urlRouterProvider){

  //State Providers
  $stateProvider.state('k9.clients',{
    url: '/clients',
    views: {
              'main@' : {
                          controller: 'ClientCtrl as clientCtrl',
                          templateUrl: 'app/clients/clients.tmpl.html'
                        }
           }
  });

})

.controller("ClientCtrl",function ClientCtrl(ClientsModel){

  var self = this;

  //Index
  ClientsModel.getClients()
              .then(function (data) {
                self.clients = data.clients;
              });

});
