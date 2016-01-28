(function () {
   'use strict';

   angular.module('k9.navigation',[
     'k9.models.nav'
   ])

     .controller("NavigationController",function NavigationController(NavModel,auth,$state,$window){

       //Public
       var vm = this;
       vm.menuItems           =   NavModel.getMenuItems();
       vm.isSelected          =   isSelected;
       vm.setCurrentItem      =   setCurrentItem;
       vm.logout              =   logout;
       vm.close               =   closeSideMenu;

       //Private

       function closeSideMenu(){
         NavModel.closeSideMenu();
       }

       function isSelected(menuItem){
         return NavModel.menuIsSelected(menuItem);
       }

       function setCurrentItem(menuItem){
         NavModel.setCurrentItem(menuItem);
       }

       function logout(){
         var promise = auth.logout();
         localStorage.removeItem('auth_token');
         localStorage.removeItem('auth_email');
         $state.go('k9.login');
       }

     });

}()); // end use strict
