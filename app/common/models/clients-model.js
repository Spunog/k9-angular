angular.module("k9.models.clients",[])

.service('ClientsModel', function(appConfig, $http, $q){

  var self = this,
      URLS = {
        FETCH : appConfig.API.baseURL + 'clients'
      },
      clients,
      currentClient;

  function extract(result){
    return result.data.clients;
  }

  function cacheClients(result){
    clients = extract(result);
    return clients;
  }

  self.getClients = function getClients(){
    return $http.get(URLS.FETCH).then(cacheClients);
  };

  self.setCurrentClient = function setCurrentClient(client){
    currentClient = client;
  };

  self.getCurrentClient = function getCurrentClient(client){
    return currentClient;
  };

  function findClient(clientID) {

    var result = _.find(clients, function (c) {
        return c.id == parseInt(clientID, 10);
    });
    return result;
  }

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

                  });
  };


  // Delete
  self.deleteClient = function deleteClient(client){

    return $http({
      method  : 'DELETE', //patch over put for update - https://goo.gl/JRPN2o
      url     :  appConfig.API.baseURL + 'clients/' + client.id
    });

  };

});
