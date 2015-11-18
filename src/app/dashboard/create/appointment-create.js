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

    vm.bookingTimes = [
      { id: '00:00:00', name: '00:00' },
      { id: '00:30:00', name: '00:30' },
      { id: '01:00:00', name: '01:30' },
      { id: '02:00:00', name: '02:00' },
      { id: '02:30:00', name: '02:30' },
    ];
    vm.selectedTime = { id: '02:30:00', name: '02:30' };


    //Public
    vm.createAppointment = createAppointment;

    // On Load
    resetForm();

  }); // end create client ctrl

}()); // end use strict
