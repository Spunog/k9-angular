(function () {
   'use strict';

    angular.module("k9.models.activities",[])

    .service('ActivitiesModel', function(appConfig, $http, $q){

      //Public
      var vm                     =   this;
      vm.getCurrentActivity      =   getCurrentActivity;
      vm.setCurrentActivity      =   setCurrentActivity;
      vm.resetCurrentActivity    =   resetCurrentActivity;
      vm.getActivities           =   getActivities;
      vm.addActivity             =   addActivity;
      vm.createActivity          =   createActivity;
      vm.getActivityById         =   getActivityById;
      vm.updateActivity          =   updateActivity;
      vm.deleteActivity          =   deleteActivity;

      //Private
      var URLS = { INDEX : appConfig.API.baseURL + 'activities'},
          activities;

      var currentActivity = {
        description: ''
      };

      function getCurrentActivity(activity){
        return currentActivity;
      }

      function setCurrentActivity(activity){
        currentActivity.id = activity.id;
        currentActivity.description = activity.description;
        currentActivity.default_charge = parseFloat(activity.default_charge);
        currentActivity.active = activity.active;
      }

      function resetCurrentActivity(){
        currentActivity.description = '';
      }

      function getActivities(){
        return (activities) ? $q.when(activities) : $http.get(URLS.INDEX).then(cacheActivities);
      }

      function addActivity(activity){
        if(activities){
            activities.unshift(activity);
        }
      }

      function createActivity(activity){

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'activities',
          data    : {
                      activity: {
                        description     : activity.description,
                        default_charge  : parseFloat(activity.default_charge),
                        active          : activity.active
                      }
                    }
        });

      }

      function getActivityById(activityID){
        var deferred = $q.defer();

        if (activities) {
            deferred.resolve(findActivity(activityID));
        } else {
            vm.getActivities().then(function () {
                deferred.resolve(findActivity(activityID));
            });
        }
        return deferred.promise;
      }

      function updateActivity(activity){
        return $http({
                        method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
                        url     : appConfig.API.baseURL + 'activities/' + activity.id,
                        data    : {
                                    activity: {
                                      description     : activity.description,
                                      default_charge  : parseFloat(activity.default_charge),
                                      active          : activity.active
                                    }
                                  }

                      }).then(function (response) {
                        var activity = response.data.activity;
                        var matchedActivity = _.find(activities, function (c) {
                            return c.id == parseInt(activity.id, 10);
                        });
                        matchedActivity.description     =   activity.description;
                        matchedActivity.default_charge  =   parseFloat(activity.default_charge);
                        matchedActivity.active          =   activity.active;
                      });
      }

      function deleteActivity(activity){

        return $http({
          method  : 'DELETE',
          url     :  appConfig.API.baseURL + 'activities/' + activity.id
        })
        .then(function deleteActivitiesuccessCallback(response) {
          //Remove from in memory array
          _.remove(activities, function(c) {
            return c.id == activity.id;
          });
        });

      }

      function extract(result){
        return result.data.activities;
      }

      function cacheActivities(result){
        activities = extract(result);
        return activities;
      }

      function findActivity(activityID) {
        var result = _.find(activities, function (c) {
            return c.id == parseInt(activityID, 10);
        });
        return result;
      }

    }); //end service activity model

}()); //end use strict
