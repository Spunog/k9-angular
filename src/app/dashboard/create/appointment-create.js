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

  .controller('CreateAppointmentController', function($state, $stateParams,CalendarEventsModel, $mdDialog) {
    var vm = this;

    //Private
    function resetForm(){
      vm.newAppointment = {
        title: ''
      };
    }

    function createAppointmentCancel(){
      console.log('cancelling...');
      $mdDialog.cancel();
    }

    function createAppointment(appointment){
      CalendarEventsModel.createAppointment(appointment)
                         .then(function (appointment) {
                            $mdDialog.hide();
                         });
    }

    //
    // Public
    //

    // Create Array of Booking Times
    vm.bookingTimes = CalendarEventsModel.getBookingTimes();
    vm.selectedTime = { id: '02:30:00', name: '02:30' };

    // Create Appointment
    vm.createAppointment = createAppointment;

    //Cancel Creation
    vm.createAppointmentCancel = createAppointmentCancel;

    // On Load
    resetForm();

  }); // end create client ctrl

}()); // end use strict
