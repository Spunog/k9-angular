(function () {
   'use strict';

   angular.module('k9.pets',[
     'ui.router',
     'k9.models.pets',
     'k9.models.nav',
     'k9.pets.create',
     'k9.pets.edit'
   ])

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.pets',{
         url: '/pets',
         views: {
                   'main@' : {
                               controller: 'PetController as petCtrl',
                               templateUrl: 'app/pets/pets.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Pets'; }
          }
       });

     })

     .controller("PetController",function PetCtrl(PetsModel,NavModel,$state,$mdDialog){

       var self = this;

       //Update Navigation State
       NavModel.setCurrentItem({
           title: 'Pets',
           sref: 'k9.pets'
       });

       self.isEditing = function isEditing(){
         if(self.currentPet.name.length > 0){
           return 'col-md-7';
         }else{
           return 'col-md-12';
         }
       };

       self.currentPet = PetsModel.getCurrentPet();

       // Index
       var getPets = function getPets(){
         PetsModel.getPets()
                     .then(function (pets) {
                       self.pets = pets;
                     });
       };

       // Go to edit
       self.editPet = function editPet(pet){
         $state.go('k9.pets.edit', { petID:pet.id} );
       };

       self.test = 'Alan';

       // On Controller Load
       getPets();

     }); //end pet ctrl

}()); //end use strict
