angular.module("k9.models.clients",[])

.service('ClientsModel', function(appConfig, $http, $q){

  var self = this,
      URLS = {
        FETCH : appConfig.API.baseURL + 'clients'
      },
      clients,
      currentClient;

  function extract(result){
    return result.data;
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

  self.createClient = function createClient(client){

    $http({
      method  : 'POST',
      url     : appConfig.API.baseURL +'clients',
      data    : {
                  client: {
                    first_name  : client.firstname,
                    last_name   : client.lastname
                  }
                }

    }).then(function successCallback(response) {
      // self.getClients();
    }, function errorCallback(response) {
        alert('failed');
    });

  };

});
