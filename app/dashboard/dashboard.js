angular.module('dashboard',[
  'ui.router',
  'k9.models.nav',
])

  .config(function config($stateProvider){

    //State Providers
    $stateProvider.state('k9.dashboard',{
      url: '/dashboard',
      views: {
                'main@' : {
                            controller: 'DashboardCtrl as dashboardCtrl',
                            templateUrl: 'app/dashboard/dashboard.tmpl.html'
                          },
                'nav@' : {
                            controller: 'NavCtrl as navCtrl',
                            templateUrl: 'app/nav/nav.tmpl.html'
                          }
             }
    });

  })

  .controller("DashboardCtrl",function DashboardCtrl(NavModel){

    var self = this;

    //Update Navigation State
    NavModel.setCurrentItem({
        title: 'Dashboard',
        sref: 'k9.dashboard'
    });

  });
