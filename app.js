angular.module("k9",[
  'ui.router',
  'nav',
  'login',
  'k9.models.clients',
  'clients',
  'clients.create',
  'clients.edit',
  'dashboard'
])

.constant('appConfig', {
  'API' : {
              'baseURL' : 'http://api.k9.dev/v1/'
          }
})

.config(function config($stateProvider,$httpProvider,$urlRouterProvider){
  //State Provider
  //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
  $stateProvider.state('k9', {
     url: '',
     abstract: true
  });
  $urlRouterProvider.otherwise("/login");
})

.run(function ($rootScope, $state, $location, auth) {

  // http://stackoverflow.com/a/27215254
  // http://plnkr.co/edit/3kImqU?p=preview

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

    if(!auth.isLoggedIn()){

      var onLoginPage = toState.name === "k9.login";

      if(!onLoginPage){
        event.preventDefault(); // stop current execution
        $state.go('k9.login');     // go to login
      }

    }

  });

});
