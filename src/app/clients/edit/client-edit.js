(function () {
  'use strict';

  angular.module('k9.clients.edit', [
    'ui.router',
    'k9.models.clients'
  ])

  .controller('EditClientController', function (Upload,$scope,$state,$stateParams, ClientsModel,$mdDialog) {

      //Public
      var vm = this;
      vm.editedClient   =   ClientsModel.getCurrentClient();
      vm.deleteClient   =   deleteClient;
      vm.cancelEditing  =   cancelEditing;
      vm.updateClient   =   updateClient;
      vm.viewClient     =   viewClient;
      vm.editedClient.picture = {};

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
            //After updating main client details (excluding picture) return to main details
            vm.viewClient(vm.editedClient);

            // Now upload image and refresh thumbnail when done
            // Done like this as image upload is slower and using 3rd party
            // no point making the end user wait for it to be complete

            ClientsModel.updateImage(vm.editedClient.picture)
                .then(function (resp) {
                    // Set newly updated image to model
                    vm.editedClient.picture_thumb_cropped = resp.data.client.picture_thumb_cropped;
                }, function (resp) {
                    console.log('Error uploading client image. Status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('Upload Progress: ' + progressPercentage + '% ');
            });

          }); //end client model update
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
