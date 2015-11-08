(function () {
   'use strict';

    angular.module('k9.dashboard',[
      'ui.router',
      'k9.models.nav',
    ])

    .config(function config($stateProvider){

      //State Providers
      $stateProvider.state('k9.dashboard',{
        url: '/dashboard',
        views: {
                  'main@' : {
                              controller: 'DashboardController as dashboardCtrl',
                              templateUrl: 'app/dashboard/dashboard.tmpl.html'
                            },
                  'nav@' : {
                              controller: 'NavCtrl as navCtrl',
                              templateUrl: 'app/nav/nav.tmpl.html'
                            }
               }
      });

    })

    .controller("DashboardController",function DashboardCtrl(NavModel){

      var self = this;

      //Update Navigation State
      NavModel.setCurrentItem({
          title: 'Dashboard',
          sref: 'k9.dashboard'
      });

    });

}()); // end use strict
