(function () {
  'use strict';

  angular.module('k9.clients.edit', [
    'ui.router',
    'k9.models.clients'
  ])

  .controller('EditClientController', function (Upload,$scope,$state,$stateParams, ClientsModel,$mdDialog) {

    console.log('about to try and upload file');
    $scope.upload = function (file) {
          Upload.upload({
              url: 'http://www.k9.dev/api/v1/clients/2',
              method: 'PUT',
              data: {'client[picture]': file, 'client[first_name]': 'xxxxxxxxy'}
          }).then(function (resp) {
              console.log(resp,'resp');
              console.log('Success uploaded. Response: ' + resp.data); //' + resp.config.data.file.name + '
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              console.log(evt,'evt');
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% '); //'+ evt.config.data.file.name'
          });
    };
    console.log('about to try and upload file');

      // $scope.upload = function () {
      //
      //   var test = Upload.upload({
      //       url: 'http://www.k9.dev/api/v1/clients/2',
      //       method: 'PUT',
      //       fields: { 'client[first_name]': 'JJ' },
      //       file: $scope.picture,
      //       fileFormDataName: 'client[picture]'
      //   });
      //
      //   console.log(test,'upload result');
      //
      //   console.log('done');
      //
      // };

      //Public
      var vm = this;
      vm.editedClient   =   ClientsModel.getCurrentClient();
      vm.deleteClient   =   deleteClient;
      vm.cancelEditing  =   cancelEditing;
      vm.updateClient   =   updateClient;
      vm.viewClient     =   viewClient;

      getClientById();

      //Private

      // $scope.uploadFile = function(files) {
      //     var fd = new FormData();
      //     //Take the first selected file
      //     fd.append("file", files[0]);
      //
      //     console.log(files[0],'files');
      //     console.log(fd,'fd');
      //
      //     vm.file = fd;
      //
      //     console.log('in the upload function!!!!!!!');
      //
      // };

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
