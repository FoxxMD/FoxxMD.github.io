angular.module('app.directives', ['wu.masonry'])
    .directive('photosDir', ['$compile','$rootScope','$timeout', function ($compile,$rootScope, $timeout) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/photos.html',
            controller:function($scope){
                $scope.bricks = [
                    {src: "http://lorempixel.com/300/400/"},
                    {type:'w2', src: "http://lorempixel.com/450/300/"},
                    {type:'w2', src: "http://lorempixel.com/450/300/"},
                    {src: "http://lorempixel.com/300/400/"},
                    {src: "http://lorempixel.com/300/350/"},
                    {type:'w2', src: "http://lorempixel.com/450/350/"},
                    {src: "http://lorempixel.com/300/300/"},
                    {src: "http://lorempixel.com/300/200/"},
                    {type:'w2', src: "http://lorempixel.com/450/350/"},
                    {type:'w2', src: "http://lorempixel.com/450/350/"}
                ];
            },
            link: function (scope, element, attrs) {

                var height = '400px';
                var photos = $('.showcasePane');
                photos.css('height', height);

                scope.$on('$destroy', function() {
                    $(element).find('img').removeClass('showPhoto');
                    photos.css('height','400px');
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
                        $('.showcasePane').css('height', $(element).height());
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