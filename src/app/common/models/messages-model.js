(function () {
   'use strict';

    angular.module("k9.models.messages",[])

    .service('MessagesModel', function(appConfig, $http, $q){

      //Public
      var vm              =   this;
      vm.sendReminderSMS  =   sendReminderSMS;

      //Private
      var URLS = { INDEX : appConfig.API.baseURL + 'messages'};

      // Saves a photo - Includes adding new photos or updating existing ones
      function sendReminderSMS(appointment_id){

        var saveMethod, saveURL;

        return $http({
          method  : 'POST',
          url     : URLS.INDEX + '/reminder',
          data    : {
                      message: {
                        appointment_id : appointment_id
                      }
                    }
        });
      }

    }); //end messages model

}()); //end use strict
