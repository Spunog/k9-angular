(function () {
   'use strict';

    angular.module("k9.models.clients",[])

    .service('ClientsModel', function(appConfig, $http, $q){

      //Public
      var vm = this, clients;
      var URLS = {INDEX : appConfig.API.baseURL + 'clients'};

      vm.getCurrentClient     =   getCurrentClient;
      vm.setCurrentClient     =   setCurrentClient;
      vm.resetCurrentClient   =   resetCurrentClient;
      vm.getClients           =   getClients;
      vm.addClient            =   addClient;
      vm.createClient         =   createClient;
      vm.getClientById        =   getClientById;
      vm.updateClient         =   updateClient;
      vm.deleteClient         =   deleteClient;
      vm.addDogLocally        =   addDogLocally;

      //Private
      var currentClient = {
        first_name: '',
        last_name: '',
        dogs: []
      };

      function addDogLocally(dog){
        currentClient.dogs.push(dog);
      }

      function getCurrentClient(client){
        return currentClient;
      }

      function setCurrentClient(client){
        currentClient.id = client.id;
        currentClient.first_name = client.first_name;
        currentClient.last_name = client.last_name;
        currentClient.dogs = client.dogs;
      }

      function resetCurrentClient(){
        currentClient.first_name = '';
        currentClient.last_name = '';
      }

      function getClients(){
        return (clients) ? $q.when(clients) : $http.get(URLS.INDEX).then(cacheClients);
      }

      function addClient(client){
        clients.unshift(client);
      }

      function createClient(client){

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'clients',
          data    : {
                      client: {
                        first_name  : client.firstname,
                        last_name   : client.lastname
                      }
                    }
        });

      }

      function getClientById(clientID){
        var deferred = $q.defer();

        if (clients) {
            deferred.resolve(findClient(clientID));
        } else {
            vm.getClients().then(function () {
                deferred.resolve(findClient(clientID));
            });
        }
        return deferred.promise;
      }

      function updateClient(client){
        return $http({
                        method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
                        url     : appConfig.API.baseURL + 'clients/' + client.id,
                        data    : {
                                    client: {
                                      first_name  : client.first_name,
                                      last_name   : client.last_name
                                    }
                                  }

                      }).then(function (response) {
                        var client = response.data.client;
                        var matchedClient = _.find(clients, function (c) {
                            return c.id == parseInt(client.id, 10);
                        });
                        matchedClient.first_name = client.first_name;
                        matchedClient.last_name  = client.last_name;
                      });
      }

      function deleteClient(client){

        return $http({
          method  : 'DELETE',
          url     :  appConfig.API.baseURL + 'clients/' + client.id
        })
        .then(function deleteClientSuccessCallback(response) {
          //Remove from in memory array
          _.remove(clients, function(c) {
            return c.id == client.id;
          });
        });

      }

      function extract(result){
        return result.data;
      }

      function cacheClients(result){
        clients = extract(result);
        return clients;
      }

      function findClient(clientID) {

        var result = _.find(clients, function (c) {
            return c.id == parseInt(clientID, 10);
        });
        return result;
      }

    }); //end service client model

}()); //end use strict
