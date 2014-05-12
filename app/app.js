//initialize app
var app = angular.module('app', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'app.directives','wu.masonry','angulartics','angulartics.google.analytics']);

//configure routing
//hydrate all states for application in order to setup site structure
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                templateUrl: '/app/templates/home.html',
                url: '/'
            })
            .state('work',{
                templateUrl:'/app/templates/work.html',
                url:'/work'
            })
            .state('photos',{
                template:'<div photos-dir></div>',
                url:'/photos',
                resolve:{
                    dependencies: function($q){
                        var deferred = $q.defer();
                        $script.ready('masonryResources',function(){
                            deferred.resolve('ok');
                        });
                        return deferred.promise;
                    }
                }
            })
            .state('projects',{
                templateUrl:'/app/templates/projects.html',
                url:'/projects'
            })
            .state('404', {
                templateUrl: 'app/templates/shared/404.html',
                url: '/404'
            });
        //make sure root goes to home state
        $urlRouterProvider.when('', '/');
        //anything else gets 404'd
        $urlRouterProvider.otherwise('404');
    }]);

app.run(function ($rootScope, $state) {
    $(window).resize(function(){
        var showcase = $('.showcasePane'),
            content = $('.contentPane');
        if($state.current.name != 'photos')
        {
            if(showcase.innerHeight() < content.outerHeight())
            {
                showcase.css('height', content.outerHeight());
            }
        }
        else{
            showcase.removeAttr('style');
        }
    });
});


/*

 ============== Controllers ================

 */

//Site skeleton controller
/*

 Will control site navigation and login/register actions and user notification.
 Basically everything on the menu bar.

 */
app.controller('cnc', ['$scope', '$state', '$rootScope','$animate', function ($scope, $state, $rootScope, $animate) {

    $scope.state = $state;

    $rootScope.generateTri = function() {
        var t = new Trianglify({
            noiseIntensity: 0
        });
        var pattern = t.generate((window.innerWidth*1.5), (window.innerHeight*2));
        $rootScope.tridata = pattern.dataUrl;
    };
    $rootScope.generateTri();

    }]);