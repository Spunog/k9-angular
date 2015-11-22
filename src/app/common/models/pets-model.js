(function () {
   'use strict';

    angular.module("k9.models.pets",[])

    .service('PetsModel', function(appConfig, $http, $q){

      // Private
      var self = this,
          URLS = {
            INDEX : appConfig.API.baseURL + 'dogs'
          },
          pets;

      var currentPet = {
        name: ''
      };

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

      // Public
      self.getCurrentPet = function getCurrentPet(pet){
        return currentPet;
      };

      self.setCurrentPet = function setCurrentPet(pet){
        currentPet.id = pet.id;
        currentPet.name = pet.name;
      };

      self.resetCurrentPet = function resetCurrentPet(){
        currentPet.name = '';
      };

      self.getPets = function getPets(){
        return (pets) ? $q.when(pets) : $http.get(URLS.INDEX).then(cachePets);
      };

      self.addPet = function addPet(pet){
        pets.unshift(pet);
      };

      // Create
      self.createPet = function createPet(pet){

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'dogs',
          data    : {
                      dog: {
                        name  : pet.name
                      }
                    }
        });

      };

      // Read
      self.getPetById = function getPetById(petID){
        var deferred = $q.defer();

        if (pets) {
            deferred.resolve(findPet(petID));
        } else {
            self.getPets().then(function () {
                deferred.resolve(findPet(petID));
            });
        }
        return deferred.promise;
      };

      // Update
      self.updatePet = function updatePet(pet){
        return $http({
                        method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
                        url     : appConfig.API.baseURL + 'dogs/' + pet.id,
                        data    : {
                                    dog: {
                                      name  : pet.name
                                    }
                                  }

                      }).then(function (response) {
                        var pet = response.data.dog;
                        var matchedPet = _.find(pets, function (c) {
                            return c.id == parseInt(pet.id, 10);
                        });
                        matchedPet.name = pet.name;
                      });
      };


      // Delete
      self.deletePet = function deletePet(pet){

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

      };

    }); //end service pet model

}()); //end use strict
