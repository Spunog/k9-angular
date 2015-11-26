(function () {
  'use strict';

  angular.module('k9.appointment.create', [
    'ui.router'
  ])

  .controller('CreateAppointmentController', function($state, $stateParams,CalendarEventsModel, $mdDialog, selectedDate) {

    //Public
    var vm = this;

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
