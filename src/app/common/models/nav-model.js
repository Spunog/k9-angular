(function () {
   'use strict';

   angular.module("k9.models.nav",[])

  .service('NavModel', function(){

    var self = this;
    var currentItem;

    var menuItem = function menuItem(title,sref,avatar){
      // must be a nicer way to do this, feels wrong but not found it yet
      // only purpose is to make creating new object shorter later
      return {
        title : title,
        sref : sref,
        avatar : avatar
      };
    };

    //Default values
    var menuItems = [
      menuItem('Dashboard','k9.dashboard','home'),
      menuItem('Clients','k9.clients','face'),
      menuItem('Pets','k9.pets','face')
    ];

    self.menuItem = function menuItem(title,sref){
      return menuItem;
    };

    self.menuIsSelected = function menuIsSelected(menuItem){
      if(!currentItem) return false; // in case there is no current item
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
