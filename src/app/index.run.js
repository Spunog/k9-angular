(function() {
  'use strict';

  angular
    .module('k9')
    .run(runBlock)
    .run(k9AuthCheck);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

  function k9AuthCheck($rootScope, $state, $location, auth) {
    // http://stackoverflow.com/a/27215254
    // http://plnkr.co/edit/3kImqU?p=preview

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      if(!auth.isLoggedIn()){

        var onLoginPage = toState.name === "k9.login";

        if(!onLoginPage){
          event.preventDefault(); // stop current execution
          $state.go('k9.login');     // go to login
        }

      }else{
        //Redirect code: http://stackoverflow.com/a/29491412
        if (toState.redirectTo) {
          event.preventDefault();
          $state.go(toState.redirectTo, toParams);
        }
      }

    });

  }

})();
