(function () {
  'use strict';

  angular.module('k9.appointment.create', [
    'ui.router'
  ])

  .controller('CreateAppointmentController', function(ActivitiesModel,PetsModel, $log, $state, $stateParams,CalendarEventsModel, $mdDialog, selectedDate) {

    //Public
    var vm = this;
    
    vm.isDisabled       = false;
    vm.pets             = loadAll();
    vm.querySearch      = querySearch;
    vm.newPet           = newPet;
    vm.activities       = [];
    vm.activityChanged  = activityChanged;

    //OnLoad
    getActivities();

    //Private

    function activityChanged(activityID){
      var activityPromise = ActivitiesModel.getActivityById(activityID);

      activityPromise.then(function(activity) {
        vm.newAppointment.charge = parseFloat(activity.default_charge);
      });

    }

    function getActivities(){
      ActivitiesModel.getActivities()
               .then(function (activities) {
                  vm.activities = activities;
               });
    }

    function newPet(pet) {
      alert("Sorry! More information needed for " + pet.name + " first!");
    }

    function querySearch (query) {
      var results = query ? vm.pets.filter( createFilterFor(query) ) : vm.pets;
      return results;
    }

    /**
     * Build `pets` list of key/value pairs
     */
    function loadAll() {
      return PetsModel.getPets().then(function(response) {
          vm.pets = response;
          return response;
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(pet) {
        return (pet.name.toLowerCase().indexOf(lowercaseQuery) === 0);
      };
    }

    // Create Array of Booking Times
    vm.bookingTimes             =   CalendarEventsModel.getBookingTimes();
    vm.createAppointment        =   createAppointment;
    vm.deleteAppointment        =   deleteAppointment;
    vm.createAppointmentCancel  =   createAppointmentCancel;

    vm.newAppointment = getNewAppointmentDefaults();

    //Private
    function getNewAppointmentDefaults(){
      var dog = (selectedDate.dog===null || !selectedDate.dog.id) ? '' : selectedDate.dog;
      return {
        id: selectedDate.id,
        title: selectedDate.title || '',
        start: selectedDate.start.toDate(),
        dog:  dog,
        charge: selectedDate.charge,
        activity:  selectedDate.activity || {},
        startTime:  {
                      id    : selectedDate.start.format("HH:00:00"),
                      name  : selectedDate.start.format("HH:00")
                   }
      };
    }

    function resetForm(){
      vm.newAppointment = {
        title: ''
      };
    }

    function createAppointmentCancel(){
      $mdDialog.cancel();
    }

    function createAppointment(appointment){

      if(appointment.id && appointment.id > 0){
        CalendarEventsModel.updateAppointment(appointment)
                           .then(function (response) {
                              $mdDialog.hide(appointment);
                           });
      }else{
        CalendarEventsModel.createAppointment(appointment)
                           .then(function (response) {
                              $mdDialog.hide(appointment);
                           });
      }

    }

    function deleteAppointment(appointment){
      CalendarEventsModel.deleteAppointment(appointment)
                         .then(function (response) {
                            $mdDialog.hide(appointment);
                         });
    }

  }) // end create appointment controller

  //Routes
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.dashboard.create',{
      url: '/create/appointment',
      views: {
                'main@' : {
                            controller: 'CreateAppointmentController as vm',
                            templateUrl: 'app/dashboard/create/appointment-create.tmpl.html'
                          }
             }
    });

  });

}()); // end use strict
