(function () {
   'use strict';

    angular.module("k9.models.calendar_events",[])

    .service('CalendarEventsModel', function(appConfig, $http, $q){

      //
      // Private
      //

      var vm = this,
          URLS = {
            APPOINTMENTS : appConfig.API.baseURL + 'appointments'
          },
          calendarEvents;

      function extract(result){
        return result.data.appointments;
      }

      function cacheCalendarEvents(result){
        calendarEvents = extract(result);
        return calendarEvents;
      }

      //
      // Public
      //

      // Create
      vm.createAppointment = function createAppointment(newAppointment){

        return $http({
          method  : 'POST',
          url     : URLS.APPOINTMENTS,
          data    : {
                      appointment: {
                        title  : newAppointment.title,
                        start  : newAppointment.start,
                        end    : newAppointment.end,
                      }
                    }
        }).then(function (response) {
          var appointment = response.data.appointment;
          calendarEvents.push(appointment);
        });

      };

      // Index
      vm.getCalendarEvents = function getCalendarEvents(){
        return (calendarEvents) ? $q.when(calendarEvents) : $http.get(URLS.APPOINTMENTS).then(cacheCalendarEvents);
      };

    }); //end service calendar events model

}()); //end use strict
