(function () {
   'use strict';

    angular.module("k9.models.clients",[])

    .service('ClientsModel', function(Upload,appConfig, $http, $q){

      //Public
      var vm = this, clients;
      var URLS = {
                    INDEX : appConfig.API.baseURL + 'clients'
                  };

      vm.getCurrentClient       =   getCurrentClient;
      vm.setCurrentClient       =   setCurrentClient;
      vm.resetCurrentClient     =   resetCurrentClient;
      vm.getClients             =   getClients;
      vm.addClient              =   addClient;
      vm.createClient           =   createClient;
      vm.getClientById          =   getClientById;
      vm.updateClient           =   updateClient;
      vm.deleteClient           =   deleteClient;
      vm.addDogLocally          =   addDogLocally;
      vm.removeDogLocally       =   removeDogLocally;
      vm.updateImage            =   updateImage;
      vm.setCurrentClientImages = setCurrentClientImages;

      //Private
      var currentClient = {
        id:0,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address:'',
        dogs: [],
        picture_thumb_cropped: ''
      };

      function setCurrentClientImages(images){

        // Image to show while main image is uploaded
        var processingCropped = '/app/assets/img/placeholder_client_processing.png';
        var croppedImage = (images.cropped  && images.cropped.length > 0) ?
                                            images.cropped : processingCropped;

        // Update Client in List
        var matchedClient = _.find(clients, function (c) {
            return c.id == parseInt(currentClient.id, 10);
        });

        // Update Object In List
        // (this should be reviewed, 2 diff ref to same model, 1 on edit, 1 on list)
        currentClient.picture_thumb_cropped = croppedImage;
        currentClient.thumbnail_menu = images.menu;

        matchedClient.picture_thumb_cropped = croppedImage;
        matchedClient.thumbnail_menu = images.menu;

      }

      function updateImage(file){
        // only ever need PUT method as will only allow images to be
        // attached to existing Clients

        return Upload.upload({
            url: URLS.INDEX + '/' + currentClient.id,
            method: 'PUT',
            data: {'client[picture]': file}
            // Other data can be passed if required... data: {'client[picture]':
            // file, 'client[first_name]': 'xxxxxxxxy'}
        });

      }

      function addDogLocally(dog){
        currentClient.dogs.push(dog);
      }

      function removeDogLocally(pet){
        _.remove(currentClient.dogs, function(c) {
          return c.id == pet.id;
        });
      }

      function getCurrentClient(client){
        return currentClient;
      }

      function setCurrentClient(client){
        currentClient.id          = client.id;
        currentClient.first_name  = client.first_name;
        currentClient.last_name   = client.last_name;
        currentClient.phone       = client.phone;
        currentClient.email       = client.email;
        currentClient.dogs        = client.dogs;
        currentClient.address     = client.address;

        if(client.picture_thumb_cropped.length > 0 ||
          client.picture_thumb_cropped == 'undefined'){
          // Show image stored on client record
          currentClient.picture_thumb_cropped = client.picture_thumb_cropped;
        }else{
          // No image recorded against Client show placeholder
          currentClient.picture_thumb_cropped = '/app/assets/img/placeholder_client.png';
        }

      }

      function resetCurrentClient(){
        currentClient.id          = 0;
        currentClient.first_name  = '';
        currentClient.last_name   = '';
        currentClient.phone       = '';
        currentClient.email       = '';
        currentClient.address     = '';
        currentClient.dogs        = [];
        currentClient.picture_thumb_cropped='';
      }

      function getClients(){
        return (clients) ? $q.when(clients) : $http.get(URLS.INDEX).then(cacheClients);
      }

      function addClient(client){
        if(clients.length > 0){
          clients.unshift(client);
        }
      }

      function createClient(client){

        return $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'clients',
          data    : {
                      client: {
                        first_name  : client.firstname,
                        last_name   : client.lastname,
                        phone       : client.phone,
                        email       : client.email,
                        address     : client.address
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
                                      last_name   : client.last_name,
                                      phone       : client.phone,
                                      email       : client.email,
                                      address     : client.address
                                    }
                                  }

                      }).then(function (response) {
                        var client = response.data.client;
                        var matchedClient = _.find(clients, function (c) {
                            return c.id == parseInt(client.id, 10);
                        });
                        matchedClient.first_name = client.first_name;
                        matchedClient.last_name  = client.last_name;
                        matchedClient.phone      = client.phone;
                        matchedClient.email      = client.email;
                        matchedClient.address    = client.address;
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
