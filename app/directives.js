angular.module('app.directives', [])
    .directive('skeletonDir', ['$compile','$rootScope', function ($compile,$rootScope) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/shared/skeleton.html',
            link: function (scope, element, attrs) {
                    $rootScope.$on('$stateChangeStart',
                 function (event, toState, toParams, fromState, fromParams) {
                 var s = $(element).find('.showcasePane').outerHeight();
                     $(element).find('.showcasePane').css('height', s);
                 });
            }
        };
        return directive;
    }]);