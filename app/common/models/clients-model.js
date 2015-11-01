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
    return (clients) ? $q.when(clients) : $http.get(URLS.FETCH).then(cacheClients);
    // promise code here just for learning, prob dont' want it for this though
    // will always want to get the newest list of clients
  };

});
