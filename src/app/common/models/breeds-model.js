(function () {
   'use strict';

    angular.module("k9.models.breeds",[])

    .service('BreedsModel', function(appConfig, $http, $q){

      //Public
      var vm                =   this;
      vm.getCurrentBreed      =   getCurrentBreed;
      vm.setCurrentBreed      =   setCurrentBreed;
      vm.resetCurrentBreed    =   resetCurrentBreed;
      vm.getBreeds            =   getBreeds;
      vm.addBreed             =   addBreed;
      vm.createBreed          =   createBreed;
      vm.createBreedWithOwner =   createBreedWithOwner;
      vm.getBreedById         =   getBreedById;
      vm.updateBreed          =   updateBreed;
      vm.deleteBreed          =   deleteBreed;

      //Private
      var URLS = { INDEX : appConfig.API.baseURL + 'breeds'},
          breeds;

      var currentBreed = {
        name: ''
      };

      function getCurrentBreed(breed){
        return currentBreed;
      }

      function setCurrentBreed(breed){
        currentBreed.id = breed.id;
        currentBreed.name = breed.name;
      }

      function resetCurrentBreed(){
        currentBreed.name = '';
      }

      function getBreeds(){
        return (breeds) ? $q.when(breeds) : $http.get(URLS.INDEX).then(cacheBreeds);
      }

      function addBreed(breed){
        if(breeds){
            breeds.unshift(breed);
        }
      }

      function createBreed(breed){

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'breeds',
          data    : {
                      breed: {
                        name  : breed.name
                      }
                    }
        });

      }

      function createBreedWithOwner(breed,ownerID){
        // Function creates a new breed that is linked
        // to a particular owner

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL + 'clients/' + ownerID + '/breeds',
          data    : {
                      breed: {
                        name  : breed.name
                      }
                    }
        });

      }

      function getBreedById(breedID){
        var deferred = $q.defer();

        if (breeds) {
            deferred.resolve(findBreed(breedID));
        } else {
            vm.getBreeds().then(function () {
                deferred.resolve(findBreed(breedID));
            });
        }
        return deferred.promise;
      }

      function updateBreed(breed){
        return $http({
                        method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
                        url     : appConfig.API.baseURL + 'breeds/' + breed.id,
                        data    : {
                                    breed: {
                                      name  : breed.name
                                    }
                                  }

                      }).then(function (response) {
                        var breed = response.data.breed;
                        var matchedBreed = _.find(breeds, function (c) {
                            return c.id == parseInt(breed.id, 10);
                        });
                        matchedBreed.name = breed.name;
                      });
      }

      function deleteBreed(breed){

        return $http({
          method  : 'DELETE',
          url     :  appConfig.API.baseURL + 'breeds/' + breed.id
        })
        .then(function deleteBreedsuccessCallback(response) {
          //Remove from in memory array
          _.remove(breeds, function(c) {
            return c.id == breed.id;
          });
        });

      }

      function extract(result){
        return result.data.breeds;
      }

      function cacheBreeds(result){
        breeds = extract(result);
        return breeds;
      }

      function findBreed(breedID) {
        var result = _.find(breeds, function (c) {
            return c.id == parseInt(breedID, 10);
        });
        return result;
      }

    }); //end service breed model

}()); //end use strict
