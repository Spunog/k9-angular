(function () {
   'use strict';

    angular.module("k9.models.photos",[])

    .service('PhotosModel', function(appConfig, $http, $q){

      //Public
      var vm    =   this;
      vm.find   =   getByID;
      vm.save   =   save;
      vm.delete =   deletePhoto;

      //Private
      var URLS = { INDEX : appConfig.API.baseURL + 'photos'},
          photos;

      // Returns one set of photo details for a given ID
      function getByID(photoID){
        return $http({
          method  : 'GET',
          url     : appConfig.API.baseURL +'photo/' + photoID
        });
      }

      // Saves a photo - Includes adding new photos or updating existing ones
      function save(photo){

        var saveMethod, saveURL;
        if(photo.id && photo.id > 0){
          saveMethod =  'PUT';
          saveURL = appConfig.API.baseURL +'photos/' + photo.id;
        }else{
          saveMethod = 'POST';
          saveURL = appConfig.API.baseURL +'photos';
        }

        return $http({
          method  : saveMethod,
          url     : saveURL,
          data    : {
                      photo: {
                        title  : photo.title
                      }
                    }
        });
      }

      // Function deletes a photo based on ID
      function deletePhoto(photo){
        return $http({
          method  : 'DELETE',
          url     :  appConfig.API.baseURL + 'photos/' + photo.id
        });
      }

    }); //end service photo model

}()); //end use strict
