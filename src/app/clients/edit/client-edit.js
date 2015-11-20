(function () {
  'use strict';

  angular.module('k9.clients.edit', [
    'ui.router',
    'k9.models.clients'
  ])

  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.clients.edit',{
      url: '/client/:clientID/edit',
      views: {
                'main@' : {
                            controller: 'EditClientController as editClientCtrl',
                            templateUrl: 'app/clients/edit/client-edit.tmpl.html'
                          }
             }
    });

  })

  .controller('EditClientController', function ($state, $stateParams, ClientsModel,$mdDialog) {
      var self = this;

      self.editedClient = ClientsModel.getCurrentClient();

      function returnToClients(reload) {
        ClientsModel.resetCurrentClient();
        $state.go('k9.clients', {}, { reload: false });
      }

      function updateClient() {
        self.client = angular.copy(self.editedClient);
        ClientsModel.updateClient(self.editedClient)
                    .then(function (clients) {
                      returnToClients(true);
                    });
      }

      self.deleteClient = function deleteClient(client){

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

      };

      function cancelEditing() {
          returnToClients(false);
      }

      ClientsModel.getClientById($stateParams.clientID)
                  .then(function (client) {
                      if (client) {
                          ClientsModel.setCurrentClient(client);
                      } else {
                          returnToClients(true);
                      }
                  });

      self.cancelEditing = cancelEditing;
      self.updateClient = updateClient;

  }); // end edit client ctrl

}()); // end use strict
