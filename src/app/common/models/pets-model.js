(function () {
   'use strict';

    angular.module("k9.models.pets",[])

    .service('PetsModel', function(appConfig, $http, $q){

      //Public
      var vm                =   this;
      vm.getCurrentPet      =   getCurrentPet;
      vm.setCurrentPet      =   setCurrentPet;
      vm.resetCurrentPet    =   resetCurrentPet;
      vm.getPets            =   getPets;
      vm.addPet             =   addPet;
      vm.createPet          =   createPet;
      vm.createPetWithOwner =   createPetWithOwner;
      vm.getPetById         =   getPetById;
      vm.updatePet          =   updatePet;
      vm.deletePet          =   deletePet;

      //Private
      var URLS = { INDEX : appConfig.API.baseURL + 'dogs'},
          pets;

      var currentPet = {
        name: '',
        note:'',
        breed: {
          id:'',
          name:''
        },
        photos:[]
      };

      function getCurrentPet(pet){
        return currentPet;
      }

      function setCurrentPet(pet){
        currentPet.id = pet.id;
        currentPet.name = pet.name;
        currentPet.note = pet.note;
        currentPet.breed = {
          id: (pet.breed !== null) ? pet.breed.id : 0,
          name: (pet.breed !== null) ? pet.breed.name : ''
        };
        currentPet.photos = pet.photos;
        console.log('model pet', currentPet);
      }

      function resetCurrentPet(){
        currentPet.name   = '';
        currentPet.note   = '';
        currentPet.photos = [];
        currentPet.breed  = {
                              id:'',
                              name:''
                            };
      }

      function getPets(){
        return (pets) ? $q.when(pets) : $http.get(URLS.INDEX).then(cachePets);
      }

      function addPet(pet){
        if(pets){
            pets.unshift(pet);
        }
      }

      function createPet(pet){

        //Check for breed
        if(pet.breed){
            pet.breed_id = pet.breed.id; //Makes API call easier
        }

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'dogs',
          data    : {
                      dog: pet
                    }
        });

      }

      function createPetWithOwner(pet,ownerID){
        // Function creates a new dog that is linked
        // to a particular owner

        //Check for breed
        if(pet.breed){
            pet.breed_id = pet.breed.id; //Makes API call easier
        }

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL + 'clients/' + ownerID + '/dogs',
          data    : {
                      dog: pet
                    }
        });

      }

      function getPetById(petID){
        var deferred = $q.defer();

        if (pets) {
            deferred.resolve(findPet(petID));
        } else {
            vm.getPets().then(function () {
                deferred.resolve(findPet(petID));
            });
        }
        return deferred.promise;
      }

      function updatePet(pet){

        //Check for breed
        if(pet.breed){
            pet.breed_id = pet.breed.id; //Makes API call easier
        }

        return $http({
                        method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
                        url     : appConfig.API.baseURL + 'dogs/' + pet.id,
                        data    : {
                                    dog: pet
                                  }

                      }).then(function (response) {
                        // Update pet in local array
                        var pet = response.data.dog;

                        var matchedPet = _.find(pets, function (c) {
                            return c.id == parseInt(pet.id, 10);
                        });

                        matchedPet.name = pet.name;
                        matchedPet.note = pet.note;
                        matchedPet.photos = pet.photos;

                        // Breed
                        if(pet.breed !== null){
                          matchedPet.breed = {
                            id: pet.breed.id,
                            name: pet.breed.name
                          };
                        }else{
                          matchedPet.breed = null;
                        }

                      });
      }

      function deletePet(pet){

        return $http({
          method  : 'DELETE',
          url     :  appConfig.API.baseURL + 'dogs/' + pet.id
        })
        .then(function deletePetsuccessCallback(response) {
          //Remove from in memory array
          _.remove(pets, function(c) {
            return c.id == pet.id;
          });
        });

      }

      function extract(result){
        return result.data.dogs;
      }

      function cachePets(result){
        pets = extract(result);
        return pets;
      }

      function findPet(petID) {
        var result = _.find(pets, function (c) {
            return c.id == parseInt(petID, 10);
        });
        return result;
      }

    }); //end service pet model

}()); //end use strict
