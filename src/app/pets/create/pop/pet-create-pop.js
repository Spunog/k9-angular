(function () {
  'use strict';

  angular.module('k9.pet.pop.create', [
    'ui.router'
  ])

  .controller('CreatePetPopController', function(BreedsModel,client,
                                                  ClientsModel,PetsModel,
                                                  $log, $state, $stateParams,
                                                  $mdDialog) {

    //Public
    var vm              =   this;
    vm.pet              =   PetsModel.getCurrentPet() ;
    vm.createPetCancel  =   createPetCancel;
    vm.createPet        =   createPet;
    vm.breeds           =   [];
    vm.isSaving         =   isSaving;

    // On Load
    getBreeds();

    //Private
    var saving = false;

    function isSaving(){
      return saving;
    }

    function getBreeds(){
      BreedsModel.getBreeds()
                 .then(function (breeds) {
                    vm.breeds = breeds;
                 });
    }

    function createPet(pet){

      saving = true;

      if(!client){
        //Create pet
        PetsModel.createPet(pet)
                 .then(function (pets) {
                   PetsModel.addPet(pets.data.dog);
                   saving = false;
                   $mdDialog.hide();
                 });
      }else{
        //Create pet and associate to owner
        PetsModel.createPetWithOwner(pet,client.id)
                 .then(function (pets) {
                   PetsModel.addPet(pets.data.dog);
                   ClientsModel.addDogLocally(pets.data.dog);
                   saving = false;
                   $mdDialog.hide();
                 });
      }

    }

    function createPetCancel(){
      $mdDialog.cancel();
    }

  }) // end create pet pop controller

  //Routes
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.pet.pop.create',{
      url: '/pet/pop/create',
      views: {
                'main@' : {
                            controller: 'CreatePetPopController as vm',
                            templateUrl: 'app/pets/create/pop/pet-create-pop.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
