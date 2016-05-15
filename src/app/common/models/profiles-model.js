(function () {
   'use strict';

    angular.module("k9.models.profiles",[])

    .service('ProfilesModel', function(appConfig, $http, $q){

      //Public
      var vm                =   this;
      vm.getProfile         =   getProfile;
      vm.updateProfile      =   updateProfile;
      vm.setCurrentProfile  =   setCurrentProfile;

      //Private
      var URLS = { INDEX : appConfig.API.baseURL + 'profiles'},
          profiles;
      var currentProfile = {
        name: '',
        email: '',
        website: '',
        phone: '',
        mobile: '',
        address: '',
        logo: '',
        theme: '',
        tax_number: '',
      };

      function setCurrentProfile(profile){
        currentProfile.name         =   profile.name;
        currentProfile.email        =   profile.email;
        currentProfile.website      =   profile.website;
        currentProfile.phone        =   profile.phone;
        currentProfile.mobile       =   profile.mobile;
        currentProfile.address      =   profile.address;
        currentProfile.logo         =   profile.logo;
        currentProfile.theme        =   profile.theme;
        currentProfile.tax_number   =   profile.tax_number;
      }

      function getProfile(){
        return $http({
                  method  : 'GET',
                  url     : appConfig.API.baseURL + 'profiles/1'
                });
      }

      function updateProfile(profile){
        return $http({
                        method  : 'PATCH', //patch over put for update - https://goo.gl/JRPN2o
                        url     : appConfig.API.baseURL + 'profiles/1',
                        data    : {
                                    profile: {
                                      name        : profile.name,
                                      email       : profile.email,
                                      website     : profile.website,
                                      phone       : profile.phone,
                                      mobile      : profile.mobile,
                                      address     : profile.address,
                                      logo        : profile.logo,
                                      theme       : profile.theme,
                                      tax_number  : profile.tax_number
                                    }
                                  }

                      }).then(function (response) {
                        var profile = response.data.profile;
                        setCurrentProfile(profile);
                      });
      }

    }); //end service profile model

}()); //end use strict
