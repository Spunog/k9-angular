(function () {
   'use strict';

   angular.module("k9.models.nav",[])

  .service('NavModel', function(){

    var vm = this;
    var currentItem;

    var menuItem = function menuItem(title,sref,icon){
      // must be a nicer way to do this, feels wrong but not found it yet
      // only purpose is to make creating new object shorter later
      return {
        title : title,
        sref : sref,
        icon : icon
      };
    };

    //Default values
    var menuItems = [
      menuItem('Dashboard','k9.dashboard','dashboard'),
      menuItem('Clients','k9.clients','face'),
      menuItem('Pets','k9.pets','paw'),
      menuItem('Reports','k9.dashboard','my_library_books'), //assessment
      menuItem('Social Media','k9.dashboard','facebook-box'),
      menuItem('Settings','k9.dashboard','settings'),
    ];

    vm.menuItem = function menuItem(title,sref){
      return menuItem;
    };

    vm.menuIsSelected = function menuIsSelected(menuItem){
      if(!currentItem) return false; // in case there is no current item
      return (menuItem.title === currentItem.title) ? true : false;
    };

    vm.getMenuItems = function getMenuItems(){
      return menuItems;
    };

    vm.getCurrentItem = function getCurrentItem(){
      return currentItem;
    };

    vm.setCurrentItem = function setCurrentItem(menuItem){
      currentItem = menuItem;
    };

  }); //end nav model

}()); //end use strict
