(function () {
   'use strict';

   angular.module('k9.clients',[
     'ui.router',
     'k9.models.clients',
     'k9.models.nav',
     'k9.clients.create',
     'k9.clients.edit'
   ])

     .controller("ClientController",function ClientCtrl(ClientsModel,NavModel,$state,$mdDialog){

       //Public
       var vm = this;
       vm.currentClient     =   ClientsModel.getCurrentClient();
       vm.editClient        =   editClient;
       vm.viewClient        =   viewClient;
       vm.searchActive      =   false;
       vm.toggleSearch      =   toggleSearch;
       vm.clientSearchText  =   '';
       vm.toggleLeft        =   NavModel.buildDelayedToggler('left');
       vm.isLoading         =   isLoading;

       getClients();
       updateNav();

       //Private
       var loading = true;

       function isLoading(){
         return loading;
       }

       function toggleSearch(searchOn){
         vm.searchActive = searchOn;
         if(!searchOn){
           //Reset search if user turns off search
           vm.clientSearchText = '';
         }
       }

       //Update Navigation State
       function updateNav(){
         NavModel.setCurrentItem({
             title: 'Clients',
             sref: 'k9.clients'
         });
       }

       // Index
       function getClients(){
         loading = true;

         ClientsModel.getClients()
                     .then(function (clients) {
                       vm.clients = clients;
                       loading = false;
                     });
       }

       // Go to edit
       function editClient(client){
         $state.go('k9.clients.edit', { clientID:client.id} );
       }

       // Go to view
       function viewClient(client){
         $state.go('k9.clients.view', { clientID:client.id} );
       }

     }) //end client ctrl

     //Routes
     .config(function config($stateProvider,$httpProvider,$urlRouterProvider){

       //State Providers
       $stateProvider.state('k9.clients',{
         url: '/clients',
         views: {
                   'main@' : {
                               controller: 'ClientController as vm',
                               templateUrl: 'app/clients/clients.tmpl.html'
                             },
                   'nav@' : {
                               controller: 'NavigationController as vm',
                               templateUrl: 'app/nav/nav.tmpl.html'
                             }
                },
          resolve: {
            // Page Title
            $title: function() { return 'Clients'; }
          }
       });

     });

}()); //end use strict
