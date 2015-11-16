(function () {
   'use strict';

   angular.module('k9.navigation',[
     'k9.models.nav'
   ])

     .controller("NavigationController",function NavigationController(NavModel,auth,$state,$window){
       var self = this;

       self.menuItems = NavModel.getMenuItems();

       self.isSelected = function isSelected(menuItem){
         return NavModel.menuIsSelected(menuItem);
       };

       self.setCurrentItem = function setCurrentItem(menuItem){
         NavModel.setCurrentItem(menuItem);
       };

       self.logout = function logout(){
         var promise = auth.logout();
         localStorage.removeItem('auth_token');
         localStorage.removeItem('auth_email');
         $state.go('k9.login'); // go to login
         // promise.then(function(){
         //   localStorage.removeItem('auth_token');
         //   localStorage.removeItem('auth_email');
         //   $state.go('k9.login'); // go to login
         // });
       };

     });

}()); // end use strict
