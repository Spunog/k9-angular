angular.module('clients',[
  'ui.router',
  'k9.models.clients',
  'k9.models.nav',
  'clients.create',
  'clients.edit'
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

    // Index
    var getClients = function getClients(){
      ClientsModel.getClients()
                  .then(function (clients) {
                    self.clients = clients;
                  });
    };

    // Delete
    self.deleteClient = function deleteClient(client){
      ClientsModel.deleteClient(client)
                  .then(function successCallback(response) {
                    _.remove(self.clients, function (c) {
                                    return c.id == client.id;
                                });
                  }, function errorCallback(response) {
                      alert('Unable to delete client record at this time.');
                  });
    };

    // On Load
    getClients();

  });
