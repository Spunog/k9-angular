angular.module("k9",[
  'ui.router',
  'login',
  'clients',
  'k9.models.clients'
])

.constant('appConfig', {
  'API' : {
              'baseURL' : 'http://api.k9.dev/v1/'
          }
})

.config(function config($stateProvider,$httpProvider,$urlRouterProvider){
  //State Provider
  $urlRouterProvider.otherwise("/login");
})

.run(function ($rootScope, $state, $location, auth) {

  // http://stackoverflow.com/a/27215254
  // http://plnkr.co/edit/3kImqU?p=preview

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

    if(!auth.isLoggedIn()){

      var onLoginPage = toState.name === "login";

      if(!onLoginPage){
        event.preventDefault(); // stop current execution
        $state.go('login');     // go to login
      }

    }

  });

});
