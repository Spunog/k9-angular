(function () {
  'use strict';

  angular.module('k9.appointment.create', [
    'ui.router'
  ])
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

  })

  .controller('CreateAppointmentController', function($state, $stateParams,CalendarEventsModel, $mdDialog, selectedDate) {
    var vm = this;

    //Private
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
                           .then(function (appointment) {
                              $mdDialog.hide();
                           });
      }else{
        CalendarEventsModel.createAppointment(appointment)
                           .then(function (appointment) {
                              $mdDialog.hide();
                           });
      }


    }

    //
    // Public
    //

    // Create Array of Booking Times
    vm.bookingTimes = CalendarEventsModel.getBookingTimes();

    // New Appointment Defaults
    vm.newAppointment = {
      id: selectedDate.id,
      title: selectedDate.title || '',
      start: selectedDate.start.toDate(),
      startTime:  {
                    id    : moment().add(1,'hours').format("HH:00:00"),
                    name  : moment().add(1,'hours').format("HH:00")
                 }
    };

    // Create Appointment
    vm.createAppointment = createAppointment;

    //Cancel Creation
    vm.createAppointmentCancel = createAppointmentCancel;

  }); // end create appointment ctrl

}()); // end use strict
