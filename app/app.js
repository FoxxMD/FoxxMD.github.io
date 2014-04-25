//initialize app
var app = angular.module('app', ['ngAnimate', 'ngStorage', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'app.directives']);

//configure routing
//hydrate all states for application in order to setup site structure
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                template: '<div skeleton-dir></div>',
                abstract: true
            })
            .state('home', {
                templateUrl: '/app/templates/home.html',
                url: '/',
                parent: 'index'
            })
            .state('work',{
                templateUrl:'/app/templates/work.html',
                url:'/work',
                parent:'index'
            })
            .state('404', {
                templateUrl: 'app/templates/shared/404.html',
                url: '/404',
                parent: 'index'
            });
        //make sure root goes to home state
        $urlRouterProvider.when('', '/');
        //anything else gets 404'd
        $urlRouterProvider.otherwise('404');
    }]);

app.run(function ($rootScope) {
/*    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            //might use this...
        });*/
});


/*

 ============== Controllers ==================

 */

//Site skeleton controller
/*

 Will control site navigation and login/register actions and user notification.
 Basically everything on the menu bar.

 */
app.controller('cnc', ['$scope', '$state', '$rootScope','$timeout', function ($scope, $state, $rootScope, $timeout) {

    $scope.state = $state;

    $rootScope.generateTri = function() {
        var t = new Trianglify({
            noiseIntensity: 0
        });
        var pattern = t.generate((window.innerWidth*1.5), (window.innerHeight*1.5));
        $rootScope.tridata = pattern.dataUrl;
    };
    $rootScope.generateTri();
    }]);