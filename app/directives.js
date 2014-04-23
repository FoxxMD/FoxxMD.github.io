angular.module('app.directives', [])
    .directive('introDir', ['$compile', function ($compile) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/home.html',
            link: function (scope, element, attrs) {
                $(document).ready(function(){
                    $(element).find('#introPage').fullpage({
                        easing:'easeOutExpo',
                        navigation: true,
                        scrollingSpeed: 900
                    });
                });
            }
        };
        return directive;
    }]);