angular.module('clients',[
  'ui.router',
  'k9.models.clients',
  'k9.models.nav',
])

.config(function config($stateProvider,$httpProvider,$urlRouterProvider){

  //State Providers
  $stateProvider.state('k9.clients',{
    url: '/clients',
    views: {
              'main@' : {
                          controller: 'ClientCtrl as clientCtrl',
                          templateUrl: 'app/clients/clients.tmpl.html'
                        },
              'nav@' : {
                          controller: 'NavCtrl as navCtrl',
                          templateUrl: 'app/nav/nav.tmpl.html'
                        }
           }
  });

})

.controller("ClientCtrl",function ClientCtrl(ClientsModel,NavModel){

  var self = this;

  //Update Navigation State
  NavModel.setCurrentItem({
      title: 'Clients',
      sref: 'k9.clients'
  });

  //Index
  ClientsModel.getClients()
              .then(function (data) {
                self.clients = data.clients;
              });
});
