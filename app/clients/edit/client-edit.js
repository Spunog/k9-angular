angular.module('clients.edit', [
  'ui.router'
])
  .config(function ($stateProvider) {
      $stateProvider.state('k9.clients.edit', {
        url: '/create/:clientID/edit',
        //target the un-named 'ui-view' in PARENT states template
        templateUrl: 'app/clients/edit/client-edit.tmpl.html',
        controller: 'EditClientCtrl as editClientCtrl'
      });
  })
  .controller('EditClientCtrl', function() {

  });
