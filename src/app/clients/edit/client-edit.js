(function () {
  'use strict';

  angular.module('k9.clients.edit', [
    'ui.router',
    'k9.models.clients'
  ])

  .controller('EditClientController', function ($state, $stateParams, ClientsModel,$mdDialog) {

      //Public
      var vm = this;
      vm.editedClient   =   ClientsModel.getCurrentClient();
      vm.deleteClient   =   deleteClient;
      vm.cancelEditing  =   cancelEditing;
      vm.updateClient   =   updateClient;
      vm.viewClient     =   viewClient;

      getClientById();

      //Private

      function viewClient(client){
        $state.go('k9.clients.view', { clientID:client.id} );
      }

      function getClientById() {
        ClientsModel.getClientById($stateParams.clientID)
                    .then(function (client) {
                        if (client) {
                            ClientsModel.setCurrentClient(client);
                        } else {
                            returnToClients(true);
                        }
                    });
      }

      function returnToClients(reload) {
        ClientsModel.resetCurrentClient();
        vm.viewClient(vm.editedClient);
        // $state.go('k9.clients', {}, { reload: false });
      }

      function updateClient() {
        var client = angular.copy(vm.editedClient);
        ClientsModel.updateClient(vm.editedClient)
                    .then(function (clients) {
                      // returnToClients(true);
                      vm.viewClient(vm.editedClient);
                    });
      }

      function deleteClient(client){

        var confirm = $mdDialog.confirm()
                               .title('Are you sure you would like to delete this client?')
                               .textContent('Deleting the client will remove all associated records.')
                               .ok('Cancel')
                               .cancel('Delete Client');

        $mdDialog.show(confirm).then(function(){
          // Default Confirm is to cancel delete
        }, function() {
          // Delete Client
          ClientsModel.deleteClient(client)
                      .then(function () {
                        returnToClients(true);
                      });
        });

      }

      function cancelEditing() {
          returnToClients(false);
      }

  }) // end edit client controller

  //Routes
  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.clients.edit',{
      url: '/client/:clientID/edit',
      views: {
                'main@' : {
                            controller: 'EditClientController as vm',
                            templateUrl: 'app/clients/edit/client-edit.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
