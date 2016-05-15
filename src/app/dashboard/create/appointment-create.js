(function () {
  'use strict';

  angular.module('k9.appointment.create', [
    'ui.router'
  ])

  .controller('CreateAppointmentController', function(
      appConfig, $http, MessagesModel, ActivitiesModel,PetsModel, $log, $state,
      $stateParams,CalendarEventsModel, $mdDialog, selectedDate) {

    //Public
    var vm = this;

    vm.isDisabled               =   false;
    vm.pets                     =   loadAll();
    vm.querySearch              =   querySearch;
    vm.newPet                   =   newPet;
    vm.activities               =   [];
    vm.activityChanged          =   activityChanged;
    vm.isSaving                 =   isSaving;

    // Create Array of Booking Times
    vm.bookingTimes             =   CalendarEventsModel.getBookingTimes();
    vm.createAppointment        =   createAppointment;
    vm.deleteAppointment        =   deleteAppointment;
    vm.createAppointmentCancel  =   createAppointmentCancel;
    vm.newAppointment           =   getNewAppointmentDefaults();
    vm.printReceipt             =   printReceipt;
    vm.sendSMSReminder          =   sendSMSReminder;
    vm.isSMSSent                =   isSMSSent;
    vm.smsSendingDisabled       =   smsSendingDisabled;
    vm.getSMSButtonText         =   getSMSButtonText;

    //OnLoad
    getActivities();

    //Private
    var saving = false;
    var SMSSent = false;

    function getSMSButtonText(){
      var label = 'Send SMS Reminder';
      if(SMSSent){
        label = 'Reminder Sent';
      }else if (saving){
        label = 'Sending. Please wait...';
      }
      return label;
    }

    function smsSendingDisabled(){
      return (saving || SMSSent);
    }

    function isSaving(){
      return saving;
    }

    function isSMSSent(){
      return SMSSent;
    }

    function printReceipt(appointment){

      saving = true;

      //Report URL
      // /api/v1/appointments/:appointment_id/receipt
      var reportURL = appConfig.API.baseURL +
                      'appointments/' +
                      appointment.id +
                      '/receipt' +'.pdf';

      // Get file as blob and display
      // Based on http://stackoverflow.com/a/25808659
      // Cannot just open in new tab as need to pass
      // authentication headers and this is not possible by opening new tab
      $http.get(reportURL, {
          responseType: 'arraybuffer'
        })
        .success(function(data) {
          var file = new Blob([data], {
            type: 'application/pdf'
          });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          saving = false;  //revert state
        });
    }

    function sendSMSReminder(appointment_id){
      saving = true;
      MessagesModel.sendReminderSMS(appointment_id)
                   .then(function(activity) {
                      saving = false;
                      SMSSent = true;
                    });
    }

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

    // Build `pets` list of key/value pairs
    function loadAll() {
      return PetsModel.getPets().then(function(response) {
          vm.pets = response;
          return response;
      });
    }

    // Create filter function for a query string
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(pet) {
        return (pet.name.toLowerCase().indexOf(lowercaseQuery) === 0);
      };
    }

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

      console.log(createAppointment,'new appointmetn obj');

      // Set Saving state to true
      saving = true;

      if(appointment.id && appointment.id > 0){
        CalendarEventsModel.updateAppointment(appointment)
                           .then(function (response) {
                              $mdDialog.hide(appointment);
                              saving = false;
                           }, function errorCallback(response) {
                                saving = false;
                                alert('Unable to save at this time...');
                            });
      }else{
        CalendarEventsModel.createAppointment(appointment)
                           .then(function (response) {
                              $mdDialog.hide(appointment);
                              saving = false;
                           }, function errorCallback(response) {
                              saving = false;
                              alert('Unable to save at this time...');
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
