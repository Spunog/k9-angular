(function () {
   'use strict';

   angular.module("k9.models.nav",[
     'ui.router'
   ])

  .service("NavModel", function NavModelService($timeout, $mdSidenav, $log, $compile, $state){

    //Public
    var vm = this;
    vm.menuItem             =   getMenuItem;
    vm.menuIsSelected       =   menuIsSelected;
    vm.getMenuItems         =   getMenuItems;
    vm.getCurrentItem       =   getCurrentItem;
    vm.setCurrentItem       =   setCurrentItem;
    vm.buildDelayedToggler  =   buildDelayedToggler;
    vm.closeSideMenu        =   closeSideMenu;

    //Private

    function closeSideMenu(){
      $mdSidenav('left').close();
    }

    function debounce(func, wait, context) {
      return function debounced() {
        $mdSidenav('left').toggle();
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

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
      menuItem('Reports','k9.report','my_library_books'), //assessment
      menuItem('Social Media','k9.social','facebook-box'),
      menuItem('Settings','k9.setting','settings'),
    ];

    function getMenuItem(title,sref){
      return menuItem;
    }

    function menuIsSelected(menuItem){
      if(!currentItem) return false; // in case there is no current item
      return (menuItem.title === currentItem.title) ? true : false;
    }

    function getMenuItems(){
      return menuItems;
    }

    function getCurrentItem(){
      return currentItem;
    }

    function setCurrentItem(menuItem){
      currentItem = menuItem;
    }

  }); //end navigation model

}()); //end use strict
