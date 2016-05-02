/* global moment:false */
(function() {
  'use strict';

  var development = true;
  var baseURL = development ? 'http://www.k9.dev/api/v1/' : 'https://k9g.herokuapp.com/api/v1/';

  angular
    .module('k9')
    .constant('moment', moment)
    .constant('appConfig', {
      'API' : {
                   'baseURL' : baseURL
              }
    })
    .constant('calendarConfig', {
      'defaults' : {
                        height: 'auto', //620
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
