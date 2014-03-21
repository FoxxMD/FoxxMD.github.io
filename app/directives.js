angular.module('app.directives', [])
    .directive('aDirective', ['$compile', function ($compile) {
        var directive = {
            restrict: 'AE',
            template: '',
            link: function (scope, element, attrs) {
            }
        };
        return directive;
    }]);