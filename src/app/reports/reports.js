(function () {
   'use strict';

   angular.module('k9.report',[
     'ui.router'
   ])

     .controller("ReportController",function ReportCtrl(NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.toggleLeft    =   NavModel.buildDelayedToggler('left');

       updateNav();

       //Private
       function updateNav(){
         //Update Navigation State
         NavModel.setCurrentItem({
             title: 'Reports',
             sref: 'k9.report'
         });
       }

     }) //end report controller

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.report',{
         url: '/report',
         views: {
                   'main@' : {
                               controller: 'ReportController as vm',
                               templateUrl: 'app/reports/reports.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Report'; }
          }
       });

     });

}()); //end use strict
