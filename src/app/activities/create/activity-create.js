(function () {
  'use strict';

  angular.module('k9.activities.create', [
    'ui.router',
    'k9.models.activities'
  ])
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.activities.create',{
      url: '/activity/create',
      views: {
                'main@' : {
                            controller: 'CreateActivityController as vm',
                            templateUrl: 'app/activities/create/activity-create.tmpl.html'
                          }
             }
    });

  })

  .controller('CreateActivityController', function($state, $stateParams, ActivitiesModel) {
    var vm = this;

    // Private
    function returnToactivities(reload){
      $state.go('k9.settings.activities', {}, { reload: reload });
    }

    function cancelCreating(){
      returnToActivities(false);
    }

    function createActivity(activity){
      ActivitiesModel.createActivity(activity)
                  .then(function (activities) {
                    ActivitiesModel.addActivity(activities.data.activity);
                    $state.go('k9.settings.activities', {activityID: activities.data.activity.id}, { reload: true });
                  });
    }

    function resetForm(){
      vm.newActivity = {
        name: ''
      };
    }

    // Public
    vm.cancel = cancelCreating;
    vm.createActivity = createActivity;

    // On Load
    resetForm();

  }); // end create activity ctrl

}()); // end use strict
