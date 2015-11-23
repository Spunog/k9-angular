(function () {
  'use strict';

  angular.module('k9.clients.create', [
    'ui.router',
    'k9.models.clients'
  ])
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

  })

  .controller('CreateClientController', function($state, $stateParams, ClientsModel) {
    var vm = this;

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
                    $state.go('k9.clients', {clientID: clients.data.client.id}, { reload: true });
                  });
    }

    function resetForm(){
      vm.newClient = {
        first_name: '',
        last_name: ''
      };
    }

    // Public
    vm.cancel = cancelCreating;
    vm.createClient = createClient;

    // On Load
    resetForm();

  }); // end create client ctrl

}()); // end use strict
