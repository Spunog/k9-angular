(function () {
   'use strict';

    angular.module("k9.models.clients",[])

    .service('ClientsModel', function(appConfig, $http, $q){

      // Private
      var self = this,
          URLS = {
            INDEX : appConfig.API.baseURL + 'clients'
          },
          clients;

      var currentClient = {
        first_name: '',
        last_name: ''
      };

      function extract(result){
        return result.data.clients;
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

      // Public
      self.getCurrentClient = function getCurrentClient(client){
        return currentClient;
      };

      self.setCurrentClient = function setCurrentClient(client){
        currentClient.id = client.id;
        currentClient.first_name = client.first_name;
        currentClient.last_name = client.last_name;
      };

      self.resetCurrentClient = function resetCurrentClient(){
        currentClient.first_name = '';
        currentClient.last_name = '';
      };

      self.getClients = function getClients(){
        return (clients) ? $q.when(clients) : $http.get(URLS.INDEX).then(cacheClients);
      };

      self.addClient = function addClient(client){
        clients.unshift(client);
      };

      // Create
      self.createClient = function createClient(client){

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

      };

      // Read
      self.getClientById = function getClientById(clientID){
        var deferred = $q.defer();

        if (clients) {
            deferred.resolve(findClient(clientID));
        } else {
            self.getClients().then(function () {
                deferred.resolve(findClient(clientID));
            });
        }
        return deferred.promise;
      };

      // Update
      self.updateClient = function updateClient(client){
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
      };


      // Delete
      self.deleteClient = function deleteClient(client){

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

      };

    }); //end service client model

}()); //end use strict
