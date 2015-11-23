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
                               controller: 'PetController as vm',
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

       var vm = this;

       //Menu Icon Animation
       vm.clickIcon = 'keyboard_backspace';
       setTimeout(function(){
          vm.clickIcon = 'menu';
       }, 1);

       //Update Navigation State
       NavModel.setCurrentItem({
           title: 'Pets',
           sref: 'k9.pets'
       });

       vm.isEditing = function isEditing(){
         if(vm.currentPet.name.length > 0){
           return 'col-md-7';
         }else{
           return 'col-md-12';
         }
       };

       vm.currentPet = PetsModel.getCurrentPet();

       // Index
       var getPets = function getPets(){
         PetsModel.getPets()
                     .then(function (pets) {
                       vm.pets = pets;
                     });
       };

       // Go to edit
       vm.editPet = function editPet(pet){
         $state.go('k9.pets.edit', { petID:pet.id} );
       };

       // On Controller Load
       getPets();

     }); //end pet ctrl

}()); //end use strict
