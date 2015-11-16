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
                },
          resolve: {
            // Page Title
            $title: function() { return 'Clients'; }
          }
       });

     })

     .controller("ClientController",function ClientCtrl(ClientsModel,NavModel,$state,$mdDialog){

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

       // Go to edit
       self.editClient = function editClient(client){
         $state.go('k9.clients.edit', { clientID:client.id} );
       };

       // On Controller Load
       getClients();

     }); //end client ctrl

}()); //end use strict
