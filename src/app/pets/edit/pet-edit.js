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
                            controller: 'EditPetController as editPetCtrl',
                            templateUrl: 'app/pets/edit/pet-edit.tmpl.html'
                          }
             }
    });

  })

  .controller('EditPetController', function ($state, $stateParams, PetsModel,$mdDialog) {
      var self = this;


      //Menu Icon Animation
      self.clickIcon = 'menu';
      setTimeout(function(){
         self.clickIcon = 'keyboard_backspace';
      }, 1);

      self.editedPet = PetsModel.getCurrentPet();

      function returnToPets(reload) {
        PetsModel.resetCurrentPet();
        $state.go('k9.pets', {}, { reload: false });
      }

      function updatePet() {
        self.pet = angular.copy(self.editedPet);
        PetsModel.updatePet(self.editedPet)
                    .then(function (pets) {
                      returnToPets(true);
                    });
      }

      self.deletePet = function deletePet(pet){

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
                        returnToPets(true);
                      });
        });

      };

      function cancelEditing() {
          returnToPets(false);
      }

      PetsModel.getPetById($stateParams.petID)
                  .then(function (pet) {
                      if (pet) {
                          PetsModel.setCurrentPet(pet);
                      } else {
                          returnToPets(true);
                      }
                  });

      self.cancelEditing = cancelEditing;
      self.updatePet = updatePet;

  }); // end edit pet ctrl

}()); // end use strict
