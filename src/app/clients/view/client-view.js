(function () {
  'use strict';

  angular.module('k9.clients.view', [
    'ui.router',
    'k9.models.clients'
  ])

  .controller('ViewClientController', function ($state, $stateParams, ClientsModel,$mdDialog) {

      //Public
      var vm = this;
      vm.client       =   ClientsModel.getCurrentClient();
      vm.editClient   =   editClient;
      vm.createPet    =   createPet;

      getClientById();

      //Private

      function createPet(jsEvent){

          $mdDialog.show({
            controller    : 'CreatePetPopController as vm',
            templateUrl   : 'app/pets/create/pop/pet-create-pop.tmpl.html',
            parent        :  angular.element(document.body),
            targetEvent   : jsEvent,
            clickOutsideToClose:true,
            locals: {client: vm.client}
          });

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

      // Go to edit
      function editClient(client){
        $state.go('k9.clients.edit', { clientID:client.id} );
      }

      function returnToClients(reload) {
        ClientsModel.resetCurrentClient();
        $state.go('k9.clients', {}, { reload: false });
      }

  }) // end view client controller

  //Routes
  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.clients.view',{
      url: '/client/:clientID/view',
      views: {
                'main@' : {
                            controller: 'ViewClientController as vm',
                            templateUrl: 'app/clients/view/client-view.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
