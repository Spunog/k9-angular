(function () {
  'use strict';

  angular.module('k9.breed.pop.create', [
    'ui.router'
  ])

  .controller('CreateBreedPopController', function(client,ClientsModel,BreedsModel, $log, $state, $stateParams, $mdDialog) {

    //Public
    var vm = this;
    vm.breed              =   BreedsModel.getCurrentBreed() ;
    vm.createBreedCancel  =   createBreedCancel;
    vm.createBreed        =   createBreed;

    //Private
    function createBreed(breed){

      if(!client){
        //Create breed
        BreedsModel.createBreed(breed)
                 .then(function (breeds) {
                   BreedsModel.addBreed(breeds.data.dog);
                   $mdDialog.hide();
                 });
      }else{
        //Create breed and associate to owner
        BreedsModel.createBreedWithOwner(breed,client.id)
                 .then(function (breeds) {
                   BreedsModel.addBreed(breeds.data.dog);
                   ClientsModel.addDogLocally(breeds.data.dog);
                   $mdDialog.hide();
                 });
      }

    }

    function createBreedCancel(){
      $mdDialog.cancel();
    }

  }) // end create breed pop controller

  //Routes
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.breed.pop.create',{
      url: '/breed/pop/create',
      views: {
                'main@' : {
                            controller: 'CreateBreedPopController as vm',
                            templateUrl: 'app/breeds/create/pop/breed-create-pop.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
