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
                        height: 570, //temp hard coding
                        editable: true,
                        header:{
                          left: 'title',
                          center: 'agendaDay, basicWeek, month',
                          right: 'today prev,next'
                        },
                        allDaySlot: false,
                        defaultView: 'agendaDay',
                        buttonText: {
                                        today:    'Today',
                                        month:    'Month',
                                        week:     'Week',
                                        day:      'Day'
                                    }
                      }
    });

})();
