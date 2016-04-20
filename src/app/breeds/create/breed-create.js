(function () {
  'use strict';

  angular.module('k9.breeds.create', [
    'ui.router',
    'k9.models.breeds'
  ])
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.breeds.create',{
      url: '/breed/create',
      views: {
                'main@' : {
                            controller: 'CreateBreedController as vm',
                            templateUrl: 'app/breeds/create/breed-create.tmpl.html'
                          }
             }
    });

  })

  .controller('CreateBreedController', function($state, $stateParams, BreedsModel) {
    var vm = this;

    // Private
    function returnTobreeds(reload){
      $state.go('k9.settings.breeds', {}, { reload: reload });
    }

    function cancelCreating(){
      returnToBreeds(false);
    }

    function createBreed(breed){
      BreedsModel.createBreed(breed)
                  .then(function (breeds) {
                    BreedsModel.addBreed(breeds.data.breed);
                    $state.go('k9.breeds', {breedID: breeds.data.breed.id}, { reload: true });
                  });
    }

    function resetForm(){
      vm.newBreed = {
        name: ''
      };
    }

    // Public
    vm.cancel = cancelCreating;
    vm.createBreed = createBreed;

    // On Load
    resetForm();

  }); // end create breed ctrl

}()); // end use strict
