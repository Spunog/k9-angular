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

    .controller("DashboardController",function DashboardCtrl(NavModel,$compile,calendarConfig){

      var vm = this;

      /*
        Calendar

        # http://fullcalendar.io/
        # https://github.com/angular-ui/ui-calendar
        # http://angular-ui.github.io/ui-calendar
      */

      vm.eventSources = []; //must be defined before calendar config
      vm.calendar = calendarConfig.defaults;

      //Custom Events
      vm.calendar.dayClick = function(date, jsEvent, view) {
                              vm.alertMessage = 'Day click woohoo';
                             };

      // Date Clicked
      vm.calendar.eventClick = function( date, jsEvent, view){
          vm.alertMessage = (date.title + ' was clicked ');
      };

      // Date Dropped
       vm.calendar.eventDrop = function(event, delta, revertFunc, jsEvent, ui, view){
         vm.alertMessage = ('Event Droped to make dayDelta ' + delta);
      };

      // Event Resized
      vm.calendar.eventResize = function(event, delta, revertFunc, jsEvent, ui, view ){
         vm.alertMessage = ('Event Resized to make dayDelta ' + delta);
      };

      // Remove Event Source
      vm.calendar.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
        angular.forEach(sources,function(value, key){
          if(sources[key] === source){
            sources.splice(key,1);
            canAdd = 1;
          }
        });
        if(canAdd === 0){
          sources.push(source);
        }
      };

      // Remove Event
      vm.calendar.remove = function(index) {
        vm.calendar.events.splice(index,1);
      };

      // View changed
      vm.calendar.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };

      // Calendar Rendered
      vm.calendar.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      };

      // Tooltip
      vm.calendar.eventRender = function( event, element, view ) {
          element.attr({'tooltip': event.title,
                       'tooltip-append-to-body': true});
          $compile(element)(vm.calendar);
      };

      //Testing Code
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      var calendarEvents = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
      ];

      //Set Calendar datasources (can have multiple sources)
      vm.eventSources = [calendarEvents];

      //Update Navigation State
      NavModel.setCurrentItem({
          title: 'Dashboard',
          sref: 'k9.dashboard'
      });

    });

}()); // end use strict
