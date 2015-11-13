(function () {
   'use strict';

   angular.module("k9.models.nav",[])

  .service('NavModel', function(){

    var self = this;
    var currentItem;

    var menuItem = function menuItem(title,sref){
      // must be a nicer way to do this, feels wrong but not found it yet
      // only purpose is to make creating new object shorter later
      return {
        title : title,
        sref : sref
      };
    };

    //Default values
    var menuItems = [
      menuItem('Dashboard','k9.dashboard'),
      menuItem('Clients','k9.clients')
    ];

    self.menuItem = function menuItem(title,sref){
      return menuItem;
    };

    self.menuIsSelected = function menuIsSelected(menuItem){
      return (menuItem.title === currentItem.title) ? true : false;
    };

    self.getMenuItems = function getMenuItems(){
      return menuItems;
    };

    self.getCurrentItem = function getCurrentItem(){
      return currentItem;
    };

    self.setCurrentItem = function setCurrentItem(menuItem){
      currentItem = menuItem;
    };

  }); //end nav model

}()); //end use strict
