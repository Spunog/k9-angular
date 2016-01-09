/* global moment:false */
(function() {
  'use strict';

  angular
    .module('k9')
    .constant('moment', moment)
    .constant('appConfig', {
      'API' : {
                  'baseURL' : 'http://www.k9.dev/api/v1/'
                  //'baseURL' : 'http://api.groomk9.com/v1/'
              }
    })
    .constant('calendarConfig', {
      'defaults' : {
                        height: 620, //temp hard coding
                        editable: true,
                        header:{
                          left: 'title',
                          center: 'agendaDay, agendaWeek, month', //agendaWeek, agendaDay
                          right: 'today prev,next'
                        },
                        allDaySlot: false,
                        defaultView: 'month',
                        buttonText: {
                                        today:    'Today',
                                        month:    'Month',
                                        week:     'Week',
                                        day:      'Day',
                                        agendaWeek: 'Week'
                                    }
                      }
    });

})();
