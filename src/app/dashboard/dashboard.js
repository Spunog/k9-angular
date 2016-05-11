(function () {
   'use strict';

    angular.module('k9.dashboard',[
      'ui.router',
      'k9.models.nav',
      'k9.models.calendar_events'
    ])

    .controller("DashboardController",function DashboardCtrl($scope, $timeout, $mdSidenav, $log, NavModel,$compile,calendarConfig,CalendarEventsModel, $mdDialog, $state){

      //Public
      var vm                     =   this;
      vm.calendarEvents          =   [];
      vm.eventSources            =   [vm.calendarEvents]; //cal sources
      vm.calendar                =   calendarConfig.defaults;
      vm.calendar.dayClick       =   calendarDayClick;
      vm.calendar.eventClick     =   calendarEventClick;
      vm.calendar.remove         =   calendarRemove;
      vm.calendar.changeView     =   calendarChangeView;
      vm.calendar.renderCalender =   calendarRender;
      vm.calendar.eventRender    =   calendarEventRender;
      vm.refreshCalendar         =   calendarRefresh;
      vm.toggleLeft              =   NavModel.buildDelayedToggler('left');
      vm.isSaving                =   isSaving;
      vm.isLoading               =   isLoading;

      vm.refreshCalendar();
      updateNav();

      //Private
      var saving  = false;
      var loading = true;

      function isSaving(){
        return saving;
      }

      function isLoading(){
        return loading;
      }

      /*
        Calendar - http://fullcalendar.io/
                 - http://angular-ui.github.io/ui-calendar
      */

      function calendarDayClick(date, jsEvent, view) {

        var calendarEvent = angular.copy(CalendarEventsModel.newCalendarEvent());
        calendarEvent.start = date;

        // If using month view there is no valid month,
        // update to use next hour
        if(view.name==='month'){
          calendarEvent.start = calendarEvent.start
                                             .startOf('day')
                                             .hours(moment().hours() + 1);
        }

        $mdDialog.show({
          controller    : 'CreateAppointmentController as vm',
          templateUrl   : 'app/dashboard/create/appointment-create.tmpl.html',
          parent        :  angular.element(document.body),
          targetEvent   : jsEvent,
          clickOutsideToClose:true,
          locals: {selectedDate: calendarEvent}
        })
        .then(function(appointment) {
          vm.refreshCalendar();
        }, function() {
          // Cancelled
        });

      }

      function calendarEventClick( date, jsEvent, view){
          $mdDialog.show({
            controller    : 'CreateAppointmentController as vm',
            templateUrl   : 'app/dashboard/create/appointment-create.tmpl.html',
            parent        :  angular.element(document.body),
            targetEvent   : jsEvent,
            clickOutsideToClose:true,
            locals: {selectedDate: date}
          })
          .then(function(answer) {
            vm.refreshCalendar();
          }, function() {
            // Cancelled
          });
      }

      function calendarRemove(index) {
        vm.calendar.events.splice(index,1);
      }

      // View changed
      function calendarChangeView(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      }

      // Calendar Rendered
      function calendarRender(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      }

      // Tooltip
      function calendarEventRender( event, element, view ) {
          element.attr({'tooltip': event.title,
                       'tooltip-append-to-body': true});
          $compile(element)(vm.calendar);
      }

      function calendarRefresh(){
        loading = true;
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
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                allDay: event.allDay,
                stick: true,
                color: '#C2185B',
                dog: event.dog,
                activity: event.activity,
                charge: parseFloat(event.charge)
              };

              vm.calendarEvents.push(newEvent);

            });

            // Loading Complete
            loading = false;

          });
      }

      function updateNav(){
        NavModel.setCurrentItem({
            title: 'Dashboard',
            sref: 'k9.dashboard'
        });
      }

    })

    //Routes
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
                              controller: 'NavigationController as vm',
                              templateUrl: 'app/nav/nav.tmpl.html'
                            }
               },
           resolve: {
             // Page Title
             $title: function() { return 'Dashboard'; }
           },
           data : {
                      cssClassnames : 'page-dashboard'
                  }
      });

    });

}()); // end use strict
