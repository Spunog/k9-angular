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
                              controller: 'DashboardController as vm',
                              templateUrl: 'app/dashboard/dashboard.tmpl.html'
                            },
                  'nav@' : {
                              controller: 'NavigationController as navCtrl',
                              templateUrl: 'app/nav/nav.tmpl.html'
                            }
               },
           resolve: {
             // Page Title
             $title: function() { return 'Dashboard'; }
           }
      });

    })

    .controller("DashboardController",function DashboardCtrl(NavModel,$scope){

      // Calendar
      var vm = this;

      vm.calendar = {
                        height: 570,
                        editable: true,
                        header:{
                          left: 'title',
                          center: 'agendaDay, basicWeek, month',
                          right: 'today prev,next'
                        },
                        dayClick: function(){
                            alert('day clicked');
                        },
                        allDaySlot: false,
                        // defaultDate: $.fullCalendar.moment('2015-11-10T16:15:00'),
                        defaultView: 'agendaDay',
                        buttonText: {
                                        today:    'Today',
                                        month:    'Month',
                                        week:     'Week',
                                        day:      'Day'
                                    }
                      };

      //Update Navigation State
      NavModel.setCurrentItem({
          title: 'Dashboard',
          sref: 'k9.dashboard'
      });

    });

}()); // end use strict
