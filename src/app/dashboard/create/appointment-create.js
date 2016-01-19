(function () {
  'use strict';

  angular.module('k9.appointment.create', [
    'ui.router'
  ])

  .controller('CreateAppointmentController', function(PetsModel, $log, $state, $stateParams,CalendarEventsModel, $mdDialog, selectedDate) {

    //Public
    var vm = this;

    vm.simulateQuery = false;
    vm.isDisabled    = false;
    vm.pets        = loadAll();
    vm.querySearch   = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;
    vm.newPet = newPet;

    function newPet(pet) {
      alert("Sorry! More information needed for " + pet.name + " first!");
    }


    function querySearch (query) {
      var results = query ? vm.pets.filter( createFilterFor(query) ) : vm.pets;
      return results;
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
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
      return {
        id: selectedDate.id,
        title: selectedDate.title || '',
        start: selectedDate.start.toDate(),
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
