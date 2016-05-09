// Directive - Client Thumbnail
(function() {
  'use strict';

  angular.module('k9')
    .directive('k9ClientThumb', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/common/directives/client-thumbnail/client-thumbnail.tmpl.html'
      };
    });

}());
