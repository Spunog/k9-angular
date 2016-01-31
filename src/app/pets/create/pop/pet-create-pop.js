(function () {
  'use strict';

  angular.module('k9.pet.pop.create', [
    'ui.router'
  ])

  .controller('CreatePetPopController', function(client,ClientsModel,PetsModel, $log, $state, $stateParams, $mdDialog) {

    //Public
    var vm = this;
    vm.pet              =   PetsModel.getCurrentPet() ;
    vm.createPetCancel  =   createPetCancel;
    vm.createPet        =   createPet;

    //Private
    function createPet(pet){

      if(!client){
        console.log('adding pet');
        //Create pet
        PetsModel.createPet(pet)
                 .then(function (pets) {
                   PetsModel.addPet(pets.data.dog);
                   $mdDialog.hide();
                 });
      }else{
        console.log('adding pet with owner');
        //Create pet and associate to owner
        PetsModel.createPetWithOwner(pet,client.id)
                 .then(function (pets) {
                   PetsModel.addPet(pets.data.dog);
                   ClientsModel.addDogLocally(pets.data.dog);
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
