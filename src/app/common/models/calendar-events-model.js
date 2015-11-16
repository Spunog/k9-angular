(function () {
   'use strict';

    angular.module("k9.models.calendar_events",[])

    .service('CalendarEventsModel', function(appConfig, $http, $q){

      // Private
      var self = this,
          URLS = {
            INDEX : appConfig.API.baseURL + 'calendar_events'
          },
          calendarEvents;

      function extract(result){
        return result.data.calendar_events;
      }

      function cacheCalendarEvents(result){
        calendarEvents = extract(result);
        return calendarEvents;
      }

      // Public
      self.getCalendarEvents = function getCalendarEvents(){
        return (calendarEvents) ? $q.when(calendarEvents) : $http.get(URLS.INDEX).then(cacheCalendarEvents);
      };

    }); //end service calendar events model

}()); //end use strict
