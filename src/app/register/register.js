(function () {
  'use strict';

  angular.module('k9.register',['ui.router','ngMessages'])

    .controller("RegisterController",function RegisterCtrl(auth,$state,appConfig, $http, $q){

      //Public
      var isRegistering     =   false;
      var vm                =   this;
      vm.register           =   register;
      vm.isRegistering      =   getRegistering;
      vm.getRegisterMessage =   getRegisterMessage;
      vm.errorMessage       =   '';

      // Private
      function getRegistering(){
        return isRegistering;
      }

      function getRegisterMessage(){
          return (isRegistering) ? 'Creating Account. Please wait...' : 'Register Now';
      }

      function register(user){
        isRegistering = true;
        console.log('registering now...');

        $http({
          method  : 'POST',
          url     : appConfig.API.baseURL +'users',
          data    : {
                      user: {
                        email     : user.email,
                        password  : user.password
                      }
                    }
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available

          // Attempt to Sign In user
          auth.login(user).then(
            function(response){
              localStorage.setItem('auth_token',response.data.token);
              localStorage.setItem('auth_email',response.data.email);
              isRegistering = false;
              $state.go('k9.dashboard');
            },
            function(response){
              vm.errorMessage = 'Account Registered but unable to sign in at this time.';
              isRegistering = false;
            }
          );

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          vm.errorMessage = 'Unable to register account at this time';
          isRegistering = false;
        });

      }

    })


    .config(function config($stateProvider){

      $stateProvider.state('k9.register',{
        url: '/register',
        views: {
                  'main@' : {
                              controller: 'RegisterController as vm',
                              templateUrl: 'app/register/register.tmpl.html'
                            }
               },
         data : {
                    cssClassnames : 'page-register'
                }

      });

    });

}()); // end use strict
