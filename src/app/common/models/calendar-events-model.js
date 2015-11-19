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

      function concatDateAndTime(appointmentDate,appointmentTime){

        var parsedTime  =   appointmentTime.split(':');
        var hours       =   parsedTime[0];
        var minutes     =   parsedTime[1];

        return moment(appointmentDate)
               .add(hours, 'hours')
               .add(minutes, 'minutes');
      }

      //
      // Public
      //

      vm.getBookingTimes = function getBookingTimes(){
        var times = [];
        var day1 = moment("2015-01-01");
        var day2 = moment("2015-01-02");

        while(day1.diff(day2) < 0){
            times.push({
             id: day1.format("HH:mm:ss"),
             name: day1.format("HH:mm")
            });
            day1.add(30, 'minutes');
        }
        return times;
      };

      // Create
      vm.createAppointment = function createAppointment(newAppointment){

        var appointment = angular.copy(newAppointment);

        //Concat Start Date and Time
        var start = concatDateAndTime(appointment.start,appointment.startTime);

        return $http({
          method  : 'POST',
          url     : URLS.APPOINTMENTS,
          data    : {
                      appointment: {
                        title  : appointment.title,
                        start  : start.format(),
                        end    : start.format() //calendarAppointment.end
                      }
                    }
        }).then(function (response) {
          var newAppointment = response.data.appointment;

          // If user loads add page directly without
          // going through the index then calendarEvents was never retrieved
          if(calendarEvents){
            calendarEvents.push(newAppointment);
          }

        });

      };

      // Index
      vm.getCalendarEvents = function getCalendarEvents(){
        return (calendarEvents) ? $q.when(calendarEvents) : $http.get(URLS.APPOINTMENTS).then(cacheCalendarEvents);
      };

    }); //end service calendar events model

}()); //end use strict
