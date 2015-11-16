(function () {
   'use strict';

    angular.module('k9.dashboard',[
      'ui.router',
      'k9.models.nav',
      'k9.models.calendar_events'
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

    .controller("DashboardController",function DashboardCtrl(NavModel,$compile,calendarConfig,CalendarEventsModel){

      var vm = this;

      /*
        Calendar

        # http://fullcalendar.io/
        # https://github.com/angular-ui/ui-calendar
        # http://angular-ui.github.io/ui-calendar
      */

      vm.eventSources   = [];
      vm.calendarEvents = [];
      vm.calendar       = calendarConfig.defaults;

      //Custom Events
      vm.calendar.dayClick = function(date, jsEvent, view) {
                              vm.alertMessage = 'Day was clicked';
                             };

      // Date Clicked
      vm.calendar.eventClick = function( date, jsEvent, view){
          vm.alertMessage = (date.title + ' was clicked ');
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

      // Add Booking
      vm.addBooking = function addBooking(){
        vm.alertMessage = 'Add booking feature coming soon';
      };

      // Tooltip
      vm.calendar.eventRender = function( event, element, view ) {
          element.attr({'tooltip': event.title,
                       'tooltip-append-to-body': true});
          $compile(element)(vm.calendar);
      };

      //Setup References to Sources
      vm.eventSources = [vm.calendarEvents];

      // Refresh Calendar using Calendar Service Model
      vm.refreshCalendar = function refreshCalendar(){
        CalendarEventsModel.getCalendarEvents()
          .then(function (calendarEvents) {

            // Important note about the below. Must empty array,
            // not replace it due to watcher and references
            // more info: http://stackoverflow.com/a/24051140/3807889

            // Remove items without breaking reference
            vm.calendarEvents.splice(0, vm.calendarEvents.length);

            // Build up custom event object and push to array
            // Note the stick: true setting which is required to fix rendering bug
            angular.forEach(calendarEvents,function(event, key){

              var newEvent = {
                title: event.title,
                start: event.start,
                end: event.event,
                allDay: event.allDay,
                stick: true,
                color: '#C2185B'
              };

              vm.calendarEvents.push(newEvent);

            });

          });
      };

      //Get latest items on first load
      vm.refreshCalendar();

      //Update Navigation State
      NavModel.setCurrentItem({
          title: 'Dashboard',
          sref: 'k9.dashboard'
      });

    });

}()); // end use strict
