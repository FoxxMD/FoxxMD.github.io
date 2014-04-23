//initialize app
var app = angular.module('app', ['ngAnimate', 'ngStorage', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'app.directives']);

//configure routing
//hydrate all states for application in order to setup site structure
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                templateUrl: 'app/templates/shared/skeleton.html',
                abstract: true
            })
            .state('home', {
                template: '<div intro-dir></div>',
                url: '/',
                parent: 'index'
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
    $rootScope.$on('broadcast', function (e, data) {
        if (undefined == data.with) {
            $rootScope.$broadcast(data.say);
        }
        else {
            $rootScope.$broadcast(data.say, data.with);
        }
    });

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            //might use this...
        })
});


/*

 ============== Controllers ==================

 */

//Site skeleton controller
/*

 Will control site navigation and login/register actions and user notification.
 Basically everything on the menu bar.

 */
app.controller('cnc', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
    $rootScope.changeCss = function(theClass)
    {
        $rootScope.currentClass = theClass;
    };
    $rootScope.generateTri = function(){
        var t = new Trianglify();
        var pattern = t.generate(document.body.clientWidth, document.body.clientHeight);
        $rootScope.tridata = pattern.dataUrl;
    }
    }]);