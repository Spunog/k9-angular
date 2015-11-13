(function () {
   'use strict';

   angular.module('k9.clients',[
     'ui.router',
     'k9.models.clients',
     'k9.models.nav',
     'k9.clients.create',
     'k9.clients.edit'
   ])

     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.clients',{
         url: '/clients',
         views: {
                   'main@' : {
                               controller: 'ClientController as clientCtrl',
                               templateUrl: 'app/clients/clients.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as navCtrl',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                }
       });

     })

     .controller("ClientController",function ClientCtrl(ClientsModel,NavModel){

       var self = this;

       //Update Navigation State
       NavModel.setCurrentItem({
           title: 'Clients',
           sref: 'k9.clients'
       });

       self.isEditing = function isEditing(){
         if(self.currentClient.first_name.length > 0){
           return 'col-md-7';
         }else{
           return 'col-md-12';
         }
       };

       self.currentClient = ClientsModel.getCurrentClient();

       // Index
       var getClients = function getClients(){
         ClientsModel.getClients()
                     .then(function (clients) {
                       self.clients = clients;
                     });
       };

       // Delete
       self.deleteClient = function deleteClient(client){
         ClientsModel.deleteClient(client)
                     .then(function successCallback(response) {
                       _.remove(self.clients, function (c) {
                                       return c.id == client.id;
                                   });
                     }, function errorCallback(response) {
                         alert('Unable to delete client record at this time.');
                     });
       };

       // On Controller Load
       getClients();

     }); //end client ctrl

}()); //end use strict
