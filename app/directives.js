angular.module('app.directives', ['wu.masonry'])
    .directive('photosDir', ['$compile','$rootScope','$timeout', function ($compile,$rootScope, $timeout) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/photos.html',
            controller:function($scope){
                $scope.bricks = [
                    {src: "http://lorempixel.com/250/300/"},
                    {type:'w2', src: "http://lorempixel.com/500/350/"},
                    {type:'', src: "http://lorempixel.com/250/300/"},
                    {src: "http://lorempixel.com/250/150/"},
                    {src: "http://lorempixel.com/250/350/"},
                    {type:'w2', src: "http://lorempixel.com/500/250/"},
                    {src: "http://lorempixel.com/250/300/"},
                    {src: "http://lorempixel.com/250/200/"},
                    {type:'w2', src: "http://lorempixel.com/500/300/"},
                    {type:'', src: "http://lorempixel.com/250/150/"}
                ];
            },
            link: function (scope, element, attrs) {

                var photos = $('.showcasePane'),
                    showcaseHeight = photos.innerHeight();

                scope.$on('$destroy', function() {
                    $(element).find('img').removeClass('showPhoto');
                    photos.removeAttr('style');
                });
                scope.$on('masonry.layoutComplete', function(event, message){
                    message = message + 100;
                    if(showcaseHeight < message)
                    {
                        $('.showcasePane').css('height', message);
                    }

                });

                function shuffle(array) {
                    var tmp, current, top = array.length;

                    if(top) while(--top) {
                        current = Math.floor(Math.random() * (top + 1));
                        tmp = array[current];
                        array[current] = array[top];
                        array[top] = tmp;
                    }

                    return array;
                }

                scope.$on('allImagesLoaded',function(){
                        ranImages = shuffle($(element[0]).find('img'));
                        $timeout(function () {
                            ranImages.each(function (index, item) {
                                var waittime = Math.floor((Math.random() * 100) + 100);
                                $timeout(function () {
                                    $(item).addClass('showPhoto');
                                }, waittime);
                            });
                        }, 800);
                });
            }
        };
        return directive;
    }]);