/* global moment:false */
(function() {
  'use strict';

  angular
    .module('k9')
    .constant('moment', moment)
    .constant('appConfig', {
      'API' : {
                  'baseURL' : 'http://api.k9.dev/v1/'
              }
    })
    .constant('calendarConfig', {
      'defaults' : {
                        height: 620, //temp hard coding
                        editable: true,
                        header:{
                          left: 'title',
                          center: 'basicWeek, month', //agendaWeek, agendaDay
                          right: 'today prev,next'
                        },
                        allDaySlot: false,
                        defaultView: 'month',
                        buttonText: {
                                        today:    'Today',
                                        month:    'Month',
                                        week:     'Week',
                                        day:      'Day',
                                        agendaWeek: 'Agenda Week'
                                    }
                      }
    });

})();
