(function () {
   'use strict';

   angular.module('k9.social',[
     'ui.router'
   ])

     .controller("SocialController",function PetCtrl(NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.toggleLeft    =   NavModel.buildDelayedToggler('left');

       updateNav();

       //Private
       function updateNav(){
         //Update Navigation State
         NavModel.setCurrentItem({
             title: 'Social Media',
             sref: 'k9.social'
         });
       }

     }) //end social controller

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.social',{
         url: '/social',
         views: {
                   'main@' : {
                               controller: 'SocialController as vm',
                               templateUrl: 'app/social/social.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Social'; }
          }
       });

     });

}()); //end use strict
