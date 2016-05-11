(function () {
  'use strict';

  angular.module('k9.pets.edit', [
    'ui.router',
    'k9.models.pets'
  ])

  .controller('EditPetController', function ($window,PhotosModel,appConfig,Upload,BreedsModel,$state, $stateParams, ClientsModel, PetsModel,$mdDialog) {

      var vm                =   this;
      vm.breeds             =   [];
      vm.clickIcon          =   'menu'; //Menu Icon Animation
      vm.editedPet          =   PetsModel.getCurrentPet();
      vm.cancelEditing      =   cancelEditing;
      vm.updatePet          =   updatePet;
      vm.selectedPhoto      =   null;
      vm.selectPhoto        =   selectPhoto;
      vm.goBack             =   goBack;

      // Uploading
      vm.uploadingImage     =   false;
      vm.uploadPetImage     =   uploadPetImage;
      vm.removePetImage     =   removePetImage;
      vm.toggleUploadForm   =   toggleUploadForm;
      vm.isUploading        =   false;
      vm.uploadButtonText   =   '';
      vm.updatePhotoDetails = updatePhotoDetails;

      //Onload
      getBreeds();
      toggleUploadingState(false);

      // setTimeout(function(){
      //    vm.clickIcon = 'keyboard_backspace';
      // }, 1); //removed as on some devices takes too long to animate
      vm.clickIcon = 'keyboard_backspace';

      PetsModel.getPetById($stateParams.petID)
                  .then(function (pet) {
                      if (pet) {
                          PetsModel.setCurrentPet(pet);
                      } else {
                          returnToPets(true);
                      }
                  });

      // Private

      function goBack(){
         $window.history.back();
      }

      function updatePhotoDetails(photo){
        PhotosModel.save(photo)
                   .then(function updatePhotoDetailsSuccess(response) {
                       vm.selectedPhoto=null;
                    });
      }

      function selectPhoto(photo){
        vm.selectedPhoto = photo;
      }

      function toggleUploadingState(on){
        if(on){
          vm.isUploading = true;
          vm.uploadButtonText = 'Uploading. Please wait...';
        }else{
          vm.isUploading = false;
          vm.uploadButtonText = 'Upload Photo';
        }
      }

      function toggleUploadForm(show){
        vm.uploadingImage = show;
      }

      function removePetImage(photo){
        PhotosModel.delete(photo)
                   .then(function removePetImageSuccess(response) {
                      //Remove from in memory array
                      _.remove(vm.editedPet.photos, function(c) {
                        return c.id == photo.id;
                      });
                   });
      }

      function uploadPetImage(photo){
        toggleUploadingState(true);
        Upload.upload({
            url: appConfig.API.baseURL + 'photos',
            method: 'POST',
            data: {
                    'photo[source]'   : photo.file,
                    'photo[title]'    : photo.title,
                    'photo[taken_at]' : photo.dateTaken,
                    'dog_id'          : vm.editedPet.id
                  }
        }).then(function (resp) {
            // Set newly updated image to model
            vm.newphoto = null;
            vm.editedPet.photos.push(resp.data.photo);
            toggleUploadForm(false);
            toggleUploadingState(false);
        }, function (resp) {
            console.log('Error uploading pet image. Status: ' + resp.status);
            toggleUploadingState(false);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('Upload Progress: ' + progressPercentage + '% ');
       });

      }

      function getBreeds(){
        BreedsModel.getBreeds()
                   .then(function (breeds) {
                      vm.breeds = breeds;
                   });
      }

      function returnToPets(reload) {
        PetsModel.resetCurrentPet();
        $state.go('k9.pets', {}, { reload: false });
      }

      function updatePet() {
        vm.pet = angular.copy(vm.editedPet);
        PetsModel.updatePet(vm.editedPet)
                 .then(function (pets) {
                   PetsModel.resetCurrentPet();
                   goBack();
                 });
      }

      vm.deletePet = function deletePet(pet){

        var confirm = $mdDialog.confirm()
                               .title('Are you sure you would like to delete this dog?')
                               .textContent('Deleting the dog will remove all associated records.')
                               .ok('Cancel')
                               .cancel('Delete Pet');

        $mdDialog.show(confirm).then(function(){
          // Default Confirm is to cancel delete
        }, function() {
          // Delete Pet
          PetsModel.deletePet(pet)
                      .then(function () {
                        ClientsModel.removeDogLocally(pet);
                        goBack();
                      });
        });

      };

      function cancelEditing() {
          returnToPets(false);
      }

  }) // end edit pet ctrl

  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.pets.edit',{
      url: '/pet/:petID/edit',
      views: {
                'main@' : {
                            controller: 'EditPetController as vm',
                            templateUrl: 'app/pets/edit/pet-edit.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
