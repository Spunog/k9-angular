// Directive - Client Thumbnail
(function() {
  'use strict';

  angular.module('k9')
    .directive('k9FullPageLoader', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/common/directives/full-page-loader/fullpage-loader.tmpl.html'
      };
    });

}());
