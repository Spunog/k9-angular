angular.module('nav',[
  'k9.models.nav'
])

  .controller("NavCtrl",function NavCtrl(NavModel){
    var self = this;

    self.menuItems = NavModel.getMenuItems();

    self.isSelected = function isSelected(menuItem){
      return NavModel.menuIsSelected(menuItem);
    };

    self.setCurrentItem = function setCurrentItem(menuItem){
      NavModel.setCurrentItem(menuItem);
    };

  });
