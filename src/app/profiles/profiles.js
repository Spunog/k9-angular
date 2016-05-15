(function () {
   'use strict';

   angular.module('k9.profile',[
     'ui.router',
     'k9.models.nav',
     'k9.models.profiles'
   ])

     .controller("ProfileController",function ProfileCtrl(ProfilesModel,
       NavModel,$state,$mdDialog,$mdToast, $document){

       //Public
       var vm = this;
       vm.clickIcon           =   'keyboard_backspace';
       vm.toggleLeft          =   NavModel.buildDelayedToggler('left');
       vm.isLoading           =   isLoading;
       vm.isSaving            =   isSaving;
       vm.updateProfile       =   updateProfile;

       // On Load
       animateBackIcon();
       updateNav();
       getProfile();

       // Private
       var loading = true;
       var saving = false;

       //Update Navigation State
       function updateNav(){
         NavModel.setCurrentItem({
             title: 'Profile',
             sref: 'k9.profile'
         });
       }

       function updateProfile(profile){
         saving = true;
         ProfilesModel.updateProfile(profile)
                      .then(function (response) {

                        $mdToast.show(
                           $mdToast.simple()
                             .textContent('Profile Saved Successfully')
                             .position('top right')
                             .hideDelay(2400)
                             .parent('#profile-card')
                         );

                         saving = false;
                       });
       }

       function getProfile(){
         ProfilesModel.getProfile()
                      .then(function (response) {
                         var profile = response.data.profile;
                         ProfilesModel.setCurrentProfile(profile);
                         vm.profile = profile;
                         loading = false;
                       });
       }

       function isSaving(){
         return saving;
       }

       function isLoading(){
         return loading;
       }

       function animateBackIcon(){
         setTimeout(function(){
            vm.clickIcon = 'menu';
         }, 1);
       }

     }) //end profile controller

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.profile',{
         url: '/profile',
         views: {
                   'main@' : {
                               controller: 'ProfileController as vm',
                               templateUrl: 'app/profiles/profiles.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Profiles'; }
          }
       });

     });

}()); //end use strict
