(function () {
  'use strict';

  angular.module('k9.appointment.create', [
    'ui.router'
  ])
  .config(function ($stateProvider) {

    //State Providers
    $stateProvider.state('k9.dashboard.create',{
      url: '/dashboard/create/appointment',
      views: {
                'main@' : {
                            controller: 'CreateAppointmentController as vm',
                            templateUrl: 'app/dashboard/create/appointment-create.tmpl.html'
                          }
             }
    });

  })

  .controller('CreateAppointmentController', function($state, $stateParams,CalendarEventsModel) {
    var vm = this;

    //Private
    function resetForm(){
      vm.newAppointment = {
        title: ''
      };
    }

    function createAppointment(appointment){
      CalendarEventsModel.createAppointment(appointment)
                         .then(function (appointment) {
                            $state.go('k9.dashboard', {},{ reload: true });
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

    // On Load
    resetForm();

  }); // end create client ctrl

}()); // end use strict
