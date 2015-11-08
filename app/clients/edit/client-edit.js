(function () {
  'use strict';

  angular.module('k9.clients.edit', [
    'ui.router',
    'k9.models.clients'
  ])

  .config(function ($stateProvider) {
      $stateProvider.state('k9.clients.edit', {
        url: '/client/:clientID/edit',
        //target the un-named 'ui-view' in PARENT states template
        templateUrl: 'app/clients/edit/client-edit.tmpl.html',
        controller: 'EditClientController as editClientCtrl'
      });
  })

  .controller('EditClientController', function ($state, $stateParams, ClientsModel) {
      var self = this;

      self.editedClient = ClientsModel.getCurrentClient();

      function returnToClients(reload) {
        ClientsModel.resetCurrentClient();
        $state.go('k9.clients', {}, { reload: reload });
      }

      function updateClient() {
          self.client = angular.copy(self.editedClient);
          ClientsModel.updateClient(self.editedClient)
                      .then(function (clients) {
                        returnToClients(true);
                      });
      }

      function cancelEditing() {
          returnToClients(false);
      }

      self.pickClient = function(){

        alert('hi');

        // ClientsModel.setCurrentClient = {
        //   id:22,
        //   first_name: 'Alan',
        //   last_name: 'Rice'
        // };
      };

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
