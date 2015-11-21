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
               .startOf('day') // reset time before adding values from form
               .add(hours, 'hours')
               .add(minutes, 'minutes');
      }

      //
      // Public
      //

      vm.newCalendarEvent = function newCalendarEvent(){
        return {
          id: '',
          title: '',
          description: '',
          note: '',
          start: '',
          end: ''
        };
      };

      vm.getBookingTimes = function getBookingTimes(){
        var times = [];
        var day1 = moment("2015-01-01"); // pick any day range
        var day2 = moment("2015-01-02");

        // Start at 00:00 and loop over every 30mins to build up times
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
        var start = concatDateAndTime(appointment.start,appointment.startTime.name);

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

          // If user loads add page directly without going through the index
          // then calendarEvents may never have been retrieved
          if(calendarEvents){
            calendarEvents.push(newAppointment);
          }

        });

      };

      // Update
      vm.updateAppointment = function updateAppointment(newAppointment){

        var appointment = angular.copy(newAppointment);

        //Concat Start Date and Time
        var start = concatDateAndTime(appointment.start,appointment.startTime.name);

        return $http({
          method  : 'PUT',
          url     : URLS.APPOINTMENTS + '/' + appointment.id,
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

            var matchedCalendarEvent = _.find(calendarEvents, function (c) {
                return c.id == parseInt(newAppointment.id, 10);
            });

            matchedCalendarEvent.title        =   newAppointment.title;
            matchedCalendarEvent.description  =   newAppointment.description;
            matchedCalendarEvent.note         =   newAppointment.note;
            matchedCalendarEvent.start        =   newAppointment.start;
            matchedCalendarEvent.end          =   newAppointment.end;

          }

        });

      };

      // Index
      vm.getCalendarEvents = function getCalendarEvents(){
        return (calendarEvents) ? $q.when(calendarEvents) : $http.get(URLS.APPOINTMENTS).then(cacheCalendarEvents);
      };

    }); //end service calendar events model

}()); //end use strict
