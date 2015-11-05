(function () {
  'use strict';

  angular.module('clients.create', [
    'ui.router',
    'k9.models.clients'
  ])
  .config(function ($stateProvider) {
      $stateProvider.state('k9.clients.create', {
        url: '/create',
        //target the un-named 'ui-view' in PARENT states template
        templateUrl: 'app/clients/create/client-create.tmpl.html',
        controller: 'CreateClientCtrl as createClientCtrl'
      });
  })

  .controller('CreateClientCtrl', function($state, $stateParams, ClientsModel) {
    var self = this;

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
                    $state.go('k9.clients.edit', {clientID: clients.data.client.id}, { reload: true });
                  });
    }

    function resetForm(){
      self.newClient = {
        first_name: '',
        last_name: ''
      };
    }

    // Public
    self.cancel = cancelCreating;
    self.createClient = createClient;

    // On Load
    resetForm();

  }); // end create client ctrl

}()); // end use strict
