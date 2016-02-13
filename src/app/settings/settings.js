(function () {
   'use strict';

   angular.module('k9.setting',[
     'ui.router'
   ])

     .controller("SettingController",function SettingCtrl(NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.toggleLeft    =   NavModel.buildDelayedToggler('left');

       updateNav();

       //Private
       function updateNav(){
         //Update Navigation State
         NavModel.setCurrentItem({
             title: 'Settings',
             sref: 'k9.setting'
         });
       }

     }) //end setting controller

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.setting',{
         url: '/setting',
         views: {
                   'main@' : {
                               controller: 'SettingController as vm',
                               templateUrl: 'app/settings/settings.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Setting'; }
          }
       });

     });

}()); //end use strict
