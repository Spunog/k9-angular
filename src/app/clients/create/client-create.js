(function () {
  'use strict';

  angular.module('k9.clients.create', [
    'ui.router',
    'k9.models.clients'
  ])

  .controller('CreateClientController', function($state, $stateParams, ClientsModel) {

    //Public
    var vm = this;
    vm.cancel = cancelCreating;
    vm.createClient = createClient;

    resetForm();

    // Private
    function returnToClients(reload){
      $state.go('k9.clients', {}, { reload: reload });
    }

    function cancelCreating(){
      returnToClients(false);
    }

    function createClient(client){

      ClientsModel.createClient(client)
                  .then(function (clients) {
                      ClientsModel.addClient(clients.data.client);
                      $state.go(
                                  'k9.clients.view',
                                  {clientID: clients.data.client.id},
                                  { reload: true }
                                );
                  });
    }

    function resetForm(){
      ClientsModel.resetCurrentClient();
      vm.newClient = angular.copy(ClientsModel.getCurrentClient());
    }

  }) // end create client controller

  //Routes
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.clients.create',{
      url: '/client/create',
      views: {
                'main@' : {
                            controller: 'CreateClientController as vm',
                            templateUrl: 'app/clients/create/client-create.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
