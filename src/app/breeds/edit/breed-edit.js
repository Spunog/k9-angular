(function () {
  'use strict';

  angular.module('k9.breeds.edit', [
    'ui.router',
    'k9.models.breeds'
  ])

  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.breeds.edit',{
      url: '/breed/:breedID/edit',
      views: {
                'main@' : {
                            controller: 'EditBreedController as vm',
                            templateUrl: 'app/breeds/edit/breed-edit.tmpl.html'
                          }
             }
    });

  })

  .controller('EditBreedController', function ($state, $stateParams, ClientsModel, BreedsModel,$mdDialog) {

      var vm = this;

      //Menu Icon Animation
      vm.clickIcon = 'menu';
      setTimeout(function(){
         vm.clickIcon = 'keyboard_backspace';
      }, 1);

      vm.editedBreed = BreedsModel.getCurrentBreed();

      function returnToBreeds(reload) {
        BreedsModel.resetCurrentBreed();
        $state.go('k9.breeds', {}, { reload: false });
      }

      function updateBreed() {
        vm.breed = angular.copy(vm.editedBreed);
        BreedsModel.updateBreed(vm.editedBreed)
                    .then(function (breeds) {
                      returnToBreeds(true);
                    });
      }

      vm.deleteBreed = function deleteBreed(breed){

        var confirm = $mdDialog.confirm()
                               .title('Are you sure you would like to delete this dog?')
                               .textContent('Deleting the dog will remove all associated records.')
                               .ok('Cancel')
                               .cancel('Delete Breed');

        $mdDialog.show(confirm).then(function(){
          // Default Confirm is to cancel delete
        }, function() {
          // Delete Breed
          BreedsModel.deleteBreed(breed)
                      .then(function () {
                        ClientsModel.removeDogLocally(breed);
                        returnToBreeds(true);
                      });
        });

      };

      function cancelEditing() {
          returnToBreeds(false);
      }

      BreedsModel.getBreedById($stateParams.breedID)
                  .then(function (breed) {
                      if (breed) {
                          BreedsModel.setCurrentBreed(breed);
                      } else {
                          returnToBreeds(true);
                      }
                  });

      vm.cancelEditing = cancelEditing;
      vm.updateBreed = updateBreed;

  }); // end edit breed ctrl

}()); // end use strict
