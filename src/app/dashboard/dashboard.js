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
                              controller: 'NavigationController as navCtrl',
                              templateUrl: 'app/nav/nav.tmpl.html'
                            }
               }
      });

    })

    .controller("DashboardController",function DashboardCtrl(NavModel,$scope){

      // Create list of font-icon names with color overrides
      var iconData = [
            {name: 'icon-home'        , color: "#777" },
            {name: 'icon-user-plus'   , color: "rgb(89, 226, 168)" },
            {name: 'icon-google-plus2', color: "#A00" },
            {name: 'icon-youtube4'    , color:"#00A" },
             // Use theming to color the font-icon
            {name: 'icon-settings'    , color:"#A00", theme:"md-warn md-hue-5"}
          ];
      // Create a set of sizes...
      $scope.sizes = [
        {size:48,padding:10},
        {size:36,padding:6},
        {size:24,padding:2},
        {size:12,padding:0}
      ];
      $scope.fonts = [].concat(iconData);





      //Update Navigation State
      NavModel.setCurrentItem({
          title: 'Dashboard',
          sref: 'k9.dashboard'
      });

    });

}()); // end use strict
