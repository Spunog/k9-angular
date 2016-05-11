(function() {
  'use strict';

  angular.module('k9.report', [
    'ui.router'
  ])

  .controller("ReportController",
      function ReportCtrl($http, appConfig, NavModel, $state, $mdDialog) {

        // Public
        var vm                    =   this;
        vm.showReport             =   showReport;
        vm.toggleLeft             =   NavModel.buildDelayedToggler('left');
        vm.createReportBtnLabel   =   '';
        vm.iconReportTitle        =   iconReportTitle;

        // State
        vm.isCreatingReport = false;
        vm.report = {
          reportType: 'Appointment'
        };

        // Onload
        updateNav();
        toggleCreatingReport(false);

        //Private
        function iconReportTitle(title) {
          var formattedTitle;
          var maxLength = 8;
          if (title.length > maxLength) {
            formattedTitle = title.substring(0, maxLength - 1) + '...';
          } else {
            formattedTitle = title + ' List';
          }
          return formattedTitle;
        }

        function toggleCreatingReport(on) {
          if (on) {
            vm.isCreatingReport = true;
            vm.createReportBtnLabel = 'Creating Report. Please wait...';
          } else {
            vm.isCreatingReport = false;
            vm.createReportBtnLabel = 'Download Report';
          }
        }

        function showReport(reportType) {

          toggleCreatingReport(true); //update state + labels

          //Report URL
          var reportURL = appConfig.API.baseURL + 'report/' +
            reportType + '.pdf';

          // Get file as blob and display
          // Based on http://stackoverflow.com/a/25808659
          // Cannot just open in new tab as need to pass
          // authentication headers and this is not possible by opening new tab
          $http.get(reportURL, {
              responseType: 'arraybuffer'
            })
            .success(function(data) {
              var file = new Blob([data], {
                type: 'application/pdf'
              });
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              toggleCreatingReport(false); //revert state
            });

        }

        function updateNav() {
          //Update Navigation State
          NavModel.setCurrentItem({
            title: 'Reports',
            sref: 'k9.report'
          });
        }

      }) //end report controller

  .config(function config($stateProvider, $httpProvider, $urlRouterProvider) {

    //State Providers
    $stateProvider.state('k9.report', {
      url: '/report',
      views: {
        'main@': {
          controller: 'ReportController as vm',
          templateUrl: 'app/reports/reports.tmpl.html'
        },
        'nav@': {
          controller: 'NavigationController as vm',
          templateUrl: 'app/nav/nav.tmpl.html'
        }
      },
      resolve: {
        // Page Title
        $title: function() {
          return 'Report';
        }
      }
    });

  });

}()); //end use strict
