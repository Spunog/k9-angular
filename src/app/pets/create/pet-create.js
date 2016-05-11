(function () {
  'use strict';

  angular.module('k9.pets.create', [
    'ui.router',
    'k9.models.pets'
  ])
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.pets.create',{
      url: '/pet/create',
      views: {
                'main@' : {
                            controller: 'CreatePetController as vm',
                            templateUrl: 'app/pets/create/pet-create.tmpl.html'
                          }
             }
    });

  })

  .controller('CreatePetController', function($state, $stateParams, PetsModel) {
    var vm = this;
    vm.isSaving             =   isSaving;

    //Private
    var saving = false;

    function isSaving(){
      return saving;
    }

    function returnTopets(reload){
      $state.go('k9.pets', {}, { reload: reload });
    }

    function cancelCreating(){
      returnToPets(false);
    }

    function createPet(pet){
      saving = true;
      PetsModel.createPet(pet)
                  .then(function (pets) {
                    PetsModel.addPet(pets.data.dog);
                    saving = false;
                    $state.go('k9.pets', {petID: pets.data.dog.id}, { reload: true });
                  });
    }

    function resetForm(){
      vm.newPet = {
        name: ''
      };
    }

    // Public
    vm.cancel = cancelCreating;
    vm.createPet = createPet;

    // On Load
    resetForm();

  }); // end create pet ctrl

}()); // end use strict
