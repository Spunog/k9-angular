(function () {
   'use strict';

   angular.module('k9.activities',[
     'ui.router',
     'k9.models.nav',
     'k9.activities.create',
     'k9.activities.edit',
     'k9.models.activities'
   ])

     .controller("ActivityController",function ActivityCtrl(ActivitiesModel,NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.clickIcon           =   'keyboard_backspace';
       vm.currentActivity     =   ActivitiesModel.getCurrentActivity();
       vm.editActivity        =   editActivity;
       vm.searchActive        =   false;
       vm.toggleSearch        =   toggleSearch;
       vm.activitySearchText  =   '';
       vm.toggleLeft          =   NavModel.buildDelayedToggler('left');
       vm.isLoading       =   isLoading;

       animateBackIcon();
       getActivities();
       updateNav();

       //Private
       var loading = true;

       function isLoading(){
         return loading;
       }

       function toggleSearch(searchOn){
         vm.searchActive = searchOn;
         if(!searchOn){
           vm.activitySearchText = '';
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
             title: 'Activities',
             sref: 'k9.activities'
         });
       }

       // Index
       function getActivities(){
         loading = true;
         ActivitiesModel.getActivities()
                  .then(function (activities) {
                     vm.activities = activities;
                     loading = false;
                  });
       }

       // Go to edit
       function editActivity(activity){
         $state.go('k9.activities.edit', { activityID:activity.id} );
       }

     }) //end activity controller

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.activities',{
         url: '/activities',
         views: {
                   'main@' : {
                               controller: 'ActivityController as vm',
                               templateUrl: 'app/activities/activities.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Activities'; }
          }
       });

     });

}()); //end use strict
