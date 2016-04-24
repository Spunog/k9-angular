(function () {
   'use strict';

    angular.module("k9.models.calendar_events",[])

    .service('CalendarEventsModel', function(appConfig, $http, $q){

      //Public
      var vm = this, calendarEvents;
      var URLS = {
                    APPOINTMENTS : appConfig.API.baseURL + 'appointments'
                  };

      vm.newCalendarEvent   =   newCalendarEvent;
      vm.getBookingTimes    =   getBookingTimes;
      vm.createAppointment  =   createAppointment;
      vm.updateAppointment  =   updateAppointment;
      vm.deleteAppointment  =   deleteAppointment;
      vm.getCalendarEvents  =   getCalendarEvents;

      //Private
      function newCalendarEvent(){
        return {
          id: '',
          title: '',
          description: '',
          note: '',
          start: '',
          end: '',
          dog: {},
          activity: {}
        };
      }

      function createAppointment(newAppointment){
        return _updateAppointment(newAppointment,'create');
      }

      function getBookingTimes(){
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
      }

      function updateAppointment(newAppointment){
        return _updateAppointment(newAppointment,'update');
      }

      function deleteAppointment(appointment){
        return $http({
          method  : 'DELETE',
          url     : URLS.APPOINTMENTS + '/' + appointment.id
        }).then(function (response) {
          //Remove from in memory array
          _.remove(calendarEvents, function(calEvents) {
            return calEvents.id == appointment.id;
          });
        });
      }

      function getCalendarEvents(){
        return (calendarEvents) ? $q.when(calendarEvents) : $http.get(URLS.APPOINTMENTS).then(cacheCalendarEvents);
      }

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

      function _updateAppointment(newAppointment,updateType){

        var appointment = angular.copy(newAppointment);

        //Concat Start Date and Time
        var start = concatDateAndTime(appointment.start,appointment.startTime.name);

        //New Record Vs Updating Record
        var updateParams = {
          methodx: 'POST',
          url: URLS.APPOINTMENTS,
          appointment: {
            title  : appointment.title,
            start  : start.format(),
            end    : start.format() //calendarAppointment.end
          }
        };

        if(updateType==='update'){
          // Update existing record
          updateParams.methodx = 'PUT';
          updateParams.url = URLS.APPOINTMENTS + '/' + appointment.id;
        }

        //Call backend API and update/create
        return $http({
          method  : updateParams.methodx,
          url     : updateParams.url,
          data    : {
                      appointment: updateParams.appointment
                    }
        }).then(function (response) {

          var newAppointment = response.data.appointment;

          // If user loads add page directly without
          // going through the index then calendarEvents was never retrieved
          if(calendarEvents){

            if(updateType==='update'){
              // Find existing record and update details
              var matchedCalendarEvent = _.find(calendarEvents, function (c) {
                  return c.id == parseInt(newAppointment.id, 10);
              });
              matchedCalendarEvent.title        =   newAppointment.title;
              matchedCalendarEvent.description  =   newAppointment.description;
              matchedCalendarEvent.note         =   newAppointment.note;
              matchedCalendarEvent.start        =   newAppointment.start;
              matchedCalendarEvent.end          =   newAppointment.end;
            }else{
              //New Appointment add to events list
              calendarEvents.push(newAppointment);
            }

          }

        });

      }

    }); //end service calendar events model

}()); //end use strict
