(function () {
   'use strict';

   angular.module('k9.pets',[
     'ui.router',
     'k9.models.pets',
     'k9.models.nav',
     'k9.pets.create',
     'k9.pets.edit'
   ])

     .controller("PetController",function PetCtrl(PetsModel,NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.clickIcon     =   'keyboard_backspace';
       vm.currentPet    =   PetsModel.getCurrentPet();
       vm.editPet       =   editPet;
       vm.searchActive  =   false;
       vm.toggleSearch  =   toggleSearch;
       vm.petSearchText = '';

       animateBackIcon();
       getPets();
       updateNav();

       //Private
       function toggleSearch(searchOn){
         vm.searchActive = searchOn;
         if(!searchOn){
           vm.petSearchText = '';
         }
       }

       function animateBackIcon(){
         setTimeout(function(){
            vm.clickIcon = 'menu';
         }, 1);
       }

       function updateNav(){
         //Update Navigation State
         NavModel.setCurrentItem({
             title: 'Pets',
             sref: 'k9.pets'
         });
       }

       // Index
       function getPets(){
         PetsModel.getPets()
                  .then(function (pets) {
                     vm.pets = pets;
                  });
       }

       // Go to edit
       function editPet(pet){
         $state.go('k9.pets.edit', { petID:pet.id} );
       }

     }) //end pet controller

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

     });

}()); //end use strict
