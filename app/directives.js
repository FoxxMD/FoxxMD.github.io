angular.module('app.directives', [])
    .directive('introDir', ['$compile', function ($compile) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/home.html',
            link: function (scope, element, attrs) {
            }
        };
        return directive;
    }]);