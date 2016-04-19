(function () {
   'use strict';

   angular.module('k9.breeds',[
     'ui.router',
     'k9.models.nav',
     'k9.breeds.create',
     'k9.breeds.edit',
     'k9.models.breeds'
   ])

     .controller("BreedController",function BreedCtrl(BreedsModel,NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.clickIcon     =   'keyboard_backspace';
       vm.currentBreed    =   BreedsModel.getCurrentBreed();
       vm.editBreed       =   editBreed;
       vm.searchActive  =   false;
       vm.toggleSearch  =   toggleSearch;
       vm.breedSearchText = '';
       vm.toggleLeft    =   NavModel.buildDelayedToggler('left');

       animateBackIcon();
       getBreeds();
       updateNav();

       //Private
       function toggleSearch(searchOn){
         vm.searchActive = searchOn;
         if(!searchOn){
           vm.breedSearchText = '';
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
             title: 'Breeds',
             sref: 'k9.breeds'
         });
       }

       // Index
       function getBreeds(){
         BreedsModel.getBreeds()
                  .then(function (breeds) {
                     vm.breeds = breeds;
                  });
       }

       // Go to edit
       function editBreed(breed){
         $state.go('k9.breeds.edit', { breedID:breed.id} );
       }

     }) //end breed controller

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.breeds',{
         url: '/breeds',
         views: {
                   'main@' : {
                               controller: 'BreedController as vm',
                               templateUrl: 'app/breeds/breeds.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Breeds'; }
          }
       });

     });

}()); //end use strict
