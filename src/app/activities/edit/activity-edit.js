(function () {
  'use strict';

  angular.module('k9.activities.edit', [
    'ui.router',
    'k9.models.activities'
  ])

  .controller('EditActivityController', function ($state, $stateParams, ClientsModel, ActivitiesModel,$mdDialog) {

      var vm = this;

      //Menu Icon Animation
      vm.clickIcon = 'menu';
      setTimeout(function(){
         vm.clickIcon = 'keyboard_backspace';
      }, 1);

      vm.editedActivity = ActivitiesModel.getCurrentActivity();

      function returnToActivities(reload) {
        ActivitiesModel.resetCurrentActivity();
        $state.go('k9.settings.activities', {}, { reload: false });
      }

      function updateActivity() {
        vm.activity = angular.copy(vm.editedActivity);
        ActivitiesModel.updateActivity(vm.editedActivity)
                    .then(function (activities) {
                      returnToActivities(true);
                    });
      }

      vm.deleteActivity = function deleteActivity(activity){

        var confirm = $mdDialog.confirm()
                               .title('Are you sure you would like to delete this activity?')
                               .textContent('Deleting the activity will remove all associated records.')
                               .ok('Cancel')
                               .cancel('Delete Activity');

        $mdDialog.show(confirm).then(function(){
          // Default Confirm is to cancel delete
        }, function() {
          // Delete Activity
          ActivitiesModel.deleteActivity(activity)
                      .then(function () {
                        ClientsModel.removeDogLocally(activity);
                        returnToActivities(true);
                      });
        });

      };

      function cancelEditing() {
          returnToActivities(false);
      }

      ActivitiesModel.getActivityById($stateParams.activityID)
                  .then(function (activity) {
                      if (activity) {
                          ActivitiesModel.setCurrentActivity(activity);
                      } else {
                          returnToActivities(true);
                      }
                  });

      vm.cancelEditing = cancelEditing;
      vm.updateActivity = updateActivity;

  }) // end edit activity ctrl

  .config(function ($stateProvider,$httpProvider,$urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.activities.edit',{
      url: '/activity/:activityID/edit',
      views: {
                'main@' : {
                            controller: 'EditActivityController as vm',
                            templateUrl: 'app/activities/edit/activity-edit.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
