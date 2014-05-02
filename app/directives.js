angular.module('app.directives', ['wu.masonry'])
    .directive('photosDir', ['$compile','$rootScope','$timeout', function ($compile,$rootScope, $timeout) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/photos.html',
            controller:function($scope){
                $scope.bricks = [
                    {type: 'wide', cat:'people', thumbSrc: "http://th01.deviantart.net/fs70/PRE/f/2012/362/9/4/watch_me_by_matthewfoxxphotos-d5pge3s.jpg"},
                    {cat:'people', thumbSrc: "http://th01.deviantart.net/fs70/PRE/f/2013/067/a/4/vintage_shopping_by_matthewfoxxphotos-d5xe74c.jpg"},
                    {thumbSrc: "http://lorempixel.com/600/800/"},
                    {thumbSrc: "http://lorempixel.com/500/700/"},
                    {type:'wide', thumbSrc: "http://lorempixel.com/800/550/"},
                    {type:'wide', thumbSrc: "http://lorempixel.com/900/600/"},
                    {thumbSrc: "http://lorempixel.com/400/600/"},
                    {thumbSrc: "http://lorempixel.com/500/700/"},
                    {type:'wide', thumbSrc: "http://lorempixel.com/700/500/"},
                    {thumbSrc: "http://lorempixel.com/500/750/"}
                ];
            },
            link: function (scope, element, attrs) {

                var photos = $('.showcasePane'),
                    showcaseHeight = photos.innerHeight();

                scope.$on('$destroy', function() {
                    $(element).find('img').removeClass('showPhoto');
                    photos.removeAttr('style');
                });
                var imagesLoaded = false;
                scope.$on('masonry.layoutComplete', function(event, message){
                    message = message + 200;
                    if(showImages){
                        $timeout.cancel(showImages);
                    }
                    var showImages = $timeout(function() {
                        if (!imagesLoaded)
                        {
                            imagesLoaded = true;
                            ranImages = shuffle($(element).find('img'));
                        $timeout(function () {
                            ranImages.each(function (index, item) {
                                var waittime = Math.floor((Math.random() * 100) + 100);
                                $timeout(function () {
                                    $(item).addClass('showPhoto');
                                }, waittime);
                            });
                            var gallery = $(element).find('.masonryContainer');
                            gallery.poptrox({
                                usePopupNav: true,
                                popupPadding: 0
                            });
                        }, 0);
                    }
                    },700);

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
            }
        };
        return directive;
    }]);