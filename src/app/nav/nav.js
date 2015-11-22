(function () {
   'use strict';

   angular.module('k9.navigation',[
     'k9.models.nav'
   ])

     .controller("NavigationController",function NavigationController(NavModel,auth,$state,$window){
       var vm = this;

       vm.menuItems = NavModel.getMenuItems();

       vm.isSelected = function isSelected(menuItem){
         return NavModel.menuIsSelected(menuItem);
       };

       vm.setCurrentItem = function setCurrentItem(menuItem){
         NavModel.setCurrentItem(menuItem);
       };

       vm.logout = function logout(){
         var promise = auth.logout();
         localStorage.removeItem('auth_token');
         localStorage.removeItem('auth_email');
         $state.go('k9.login');
       };

     });

}()); // end use strict
