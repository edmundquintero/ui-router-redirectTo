'use strict';

(function () {

  var moduleDependencies = [
    'ui.router'
  ];

  redirectTo.$inject = ['$rootScope', '$state'];
  function redirectTo ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      if (toState.redirectTo) {
        event.preventDefault();
        $state.go(toState.redirectTo, toParams);
      }
    });

  }

  angular
    .module('ui.router.redirectTo', moduleDependencies)
    .run(redirectTo);

})();
