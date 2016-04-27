(function () {
  'use strict';

  angular.module('k9.pets.edit', [
    'ui.router',
    'k9.models.pets'
  ])

  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.pets.edit',{
      url: '/pet/:petID/edit',
      views: {
                'main@' : {
                            controller: 'EditPetController as vm',
                            templateUrl: 'app/pets/edit/pet-edit.tmpl.html'
                          }
             }
    });

  })

  .controller('EditPetController', function (BreedsModel,$state, $stateParams, ClientsModel, PetsModel,$mdDialog) {

      var vm            =   this;
      vm.breeds         =   [];
      vm.clickIcon      =   'menu'; //Menu Icon Animation
      vm.editedPet      =   PetsModel.getCurrentPet();
      vm.cancelEditing  =   cancelEditing;
      vm.updatePet      =   updatePet;

      //Onload
      getBreeds();

      setTimeout(function(){
         vm.clickIcon = 'keyboard_backspace';
      }, 1);

      PetsModel.getPetById($stateParams.petID)
                  .then(function (pet) {
                      if (pet) {
                          PetsModel.setCurrentPet(pet);
                      } else {
                          returnToPets(true);
                      }
                  });

      //Private
      function getBreeds(){
        BreedsModel.getBreeds()
                   .then(function (breeds) {
                      vm.breeds = breeds;
                   });
      }

      function returnToPets(reload) {
        PetsModel.resetCurrentPet();
        $state.go('k9.pets', {}, { reload: false });
      }

      function updatePet() {
        vm.pet = angular.copy(vm.editedPet);
        PetsModel.updatePet(vm.editedPet)
                 .then(function (pets) {
                   returnToPets(true);
                 });
      }

      vm.deletePet = function deletePet(pet){

        var confirm = $mdDialog.confirm()
                               .title('Are you sure you would like to delete this dog?')
                               .textContent('Deleting the dog will remove all associated records.')
                               .ok('Cancel')
                               .cancel('Delete Pet');

        $mdDialog.show(confirm).then(function(){
          // Default Confirm is to cancel delete
        }, function() {
          // Delete Pet
          PetsModel.deletePet(pet)
                      .then(function () {
                        ClientsModel.removeDogLocally(pet);
                        returnToPets(true);
                      });
        });

      };

      function cancelEditing() {
          returnToPets(false);
      }

  }); // end edit pet ctrl

}()); // end use strict
