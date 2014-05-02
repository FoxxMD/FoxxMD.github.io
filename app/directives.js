angular.module('app.directives', ['wu.masonry'])
    .directive('photosDir', ['$compile','$rootScope','$timeout', function ($compile,$rootScope, $timeout) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/photos.html',
            controller:function($scope){
                $scope.bricks = [
                    {type: 'wide', cat:'people', src:'http://fc09.deviantart.net/fs70/f/2012/362/9/4/watch_me_by_matthewfoxxphotos-d5pge3s.jpg', thumbSrc: "http://th01.deviantart.net/fs70/PRE/f/2012/362/9/4/watch_me_by_matthewfoxxphotos-d5pge3s.jpg"},
                    {cat:'people', thumbSrc: "http://th01.deviantart.net/fs70/PRE/f/2013/067/a/4/vintage_shopping_by_matthewfoxxphotos-d5xe74c.jpg"},
                    {type:'wide', cat: 'people', src:'http://fc02.deviantart.net/fs71/f/2013/080/c/3/hold_me_tight_by_matthewfoxxphotos-d5ytrjn.jpg', thumbSrc: "http://th05.deviantart.net/fs71/PRE/f/2013/080/c/3/hold_me_tight_by_matthewfoxxphotos-d5ytrjn.jpg"},
                    {cat:'people', thumbSrc: "http://th03.deviantart.net/fs70/PRE/f/2013/062/1/6/artist_in_action_sepia__by_matthewfoxxphotos-d5wvd4e.jpg"},
                    {type:'wide', cat: 'people', src:'http://fc00.deviantart.net/fs71/f/2014/038/f/c/snowday_skeleton_by_matthewfoxxphotos-d75innb.jpg', thumbSrc: "http://th01.deviantart.net/fs71/PRE/f/2014/038/f/c/snowday_skeleton_by_matthewfoxxphotos-d75innb.jpg"},
                    {type:'wide', cat: 'places', src:'http://fc00.deviantart.net/fs70/f/2013/100/f/e/there_s_a_hell_of_a_universe_next_door_by_matthewfoxxphotos-d615ezr.jpg', thumbSrc: "http://th02.deviantart.net/fs70/PRE/f/2013/100/f/e/there_s_a_hell_of_a_universe_next_door_by_matthewfoxxphotos-d615ezr.jpg"},
                    {cat:'people', thumbSrc: "http://th09.deviantart.net/fs71/PRE/f/2013/122/9/a/archaeopteryx_by_matthewfoxxphotos-d63untu.jpg"},
                    {type:'wide', cat:'places', src:'http://fc07.deviantart.net/fs71/f/2012/309/4/1/empty_roads_by_pianoblack97-d5k2f8x.jpg', thumbSrc: "http://fc09.deviantart.net/fs71/i/2012/309/6/2/empty_roads_by_pianoblack97-d5k2f8x.jpg"},
                    {type:'wide', cat:'people', src:'http://fc04.deviantart.net/fs70/f/2012/267/d/a/miranda_by_pianoblack97-d5ftczp.jpg', thumbSrc: "http://th09.deviantart.net/fs70/PRE/f/2012/267/d/a/miranda_by_pianoblack97-d5ftczp.jpg"},
                    {type:'wide', cat:'places', src:'http://fc04.deviantart.net/fs71/f/2012/255/f/6/baldwin_county_courthouse__est__1803_by_pianoblack97-d5eglwz.jpg', thumbSrc: "http://th06.deviantart.net/fs71/PRE/f/2012/255/f/6/baldwin_county_courthouse__est__1803_by_pianoblack97-d5eglwz.jpg"},
                    {cat:'places', thumbSrc:'http://th02.deviantart.net/fs70/PRE/f/2012/233/d/c/sunset_road_by_pianoblack97-d5byjrz.jpg'},
                    {type:'wide', cat:'people', src:'http://fc08.deviantart.net/fs71/f/2012/233/a/6/honest_tubing_by_pianoblack97-d5bvy1u.jpg', thumbSrc:'http://th07.deviantart.net/fs71/PRE/f/2012/233/a/6/honest_tubing_by_pianoblack97-d5bvy1u.jpg'},
                    {cat:'people', thumbSrc:'http://th03.deviantart.net/fs71/PRE/i/2012/202/d/1/good_to_see_you_by_pianoblack97-d584hbk.jpg'},
                    {type:'wide', cat:'things', src:'http://fc01.deviantart.net/fs70/f/2012/193/5/4/experience_comes_with_age_by_pianoblack97-d56y09i.jpg', thumbSrc:'http://th01.deviantart.net/fs70/PRE/f/2012/193/5/4/experience_comes_with_age_by_pianoblack97-d56y09i.jpg'},
                    {type:'wide', cat:'things', src:'http://fc08.deviantart.net/fs70/f/2012/189/d/0/cycle_of_life_by_pianoblack97-d56hlr4.jpg', thumbSrc:'http://th08.deviantart.net/fs70/PRE/f/2012/189/d/0/cycle_of_life_by_pianoblack97-d56hlr4.jpg'},
                    {type:'wide', cat:'places', src:'http://fc04.deviantart.net/fs71/f/2012/204/8/1/shrouded_by_pianoblack97-d58ba66.jpg', thumbSrc:'http://th06.deviantart.net/fs71/PRE/f/2012/204/8/1/shrouded_by_pianoblack97-d58ba66.jpg'},
                    {type:'wide', cat:'places', src:'http://fc09.deviantart.net/fs70/f/2012/177/a/8/bursting_finale_by_pianoblack97-d5503r3.jpg', thumbSrc:'http://th05.deviantart.net/fs70/PRE/f/2012/177/a/8/bursting_finale_by_pianoblack97-d5503r3.jpg'},
                    {type:'wide', cat:'people', thumbSrc:'http://th08.deviantart.net/fs70/PRE/f/2012/145/e/d/auschwitz_to_atlanta_1_by_pianoblack97-d512zgd.jpg'},
                    {type:'wide', cat:'things', src:'http://fc04.deviantart.net/fs71/f/2012/116/f/7/milledgeville_glass_by_pianoblack97-d4xpe21.jpg', thumbSrc:'http://th01.deviantart.net/fs71/PRE/f/2012/116/f/7/milledgeville_glass_by_pianoblack97-d4xpe21.jpg'},
                    {type:'wide', cat:'things', src:'http://fc02.deviantart.net/fs71/f/2012/120/7/6/last_light_by_pianoblack97-d4y4k87.jpg', thumbSrc:'http://th09.deviantart.net/fs71/PRE/f/2012/120/7/6/last_light_by_pianoblack97-d4y4k87.jpg'},
                    {type:'wide', cat:'people', src:'http://fc00.deviantart.net/fs71/f/2012/101/c/4/face_the_music_by_pianoblack97-d4vv5hm.jpg', thumbSrc:'http://th07.deviantart.net/fs71/PRE/f/2012/101/c/4/face_the_music_by_pianoblack97-d4vv5hm.jpg'},
                    {type:'wide', cat:'things', thumbSrc:'http://th00.deviantart.net/fs71/PRE/f/2012/079/9/f/redefine_your_life_by_pianoblack97-d4tctil.jpg'},
                    {cat:'places', thumbSrc:'http://th09.deviantart.net/fs70/PRE/f/2012/037/4/3/let_there_be_light_by_pianoblack97-d4ox2mq.jpg'},
                    {type:'wide', cat:'places', src:'http://fc00.deviantart.net/fs71/f/2011/340/4/a/midnight_train_by_pianoblack97-d4icuyl.jpg', thumbSrc:'http://th07.deviantart.net/fs71/PRE/f/2011/340/4/a/midnight_train_by_pianoblack97-d4icuyl.jpg'},
                    {cat:'places', src:'http://fc06.deviantart.net/fs71/f/2011/341/9/a/crystal_clear_by_pianoblack97-d4ieudg.jpg', thumbSrc:'http://th01.deviantart.net/fs71/PRE/f/2011/341/9/a/crystal_clear_by_pianoblack97-d4ieudg.jpg'},
                    {type:'wide', cat:'people', src:'http://fc07.deviantart.net/fs70/f/2011/332/9/d/waiting_for_a_train_by_pianoblack97-d4hlem9.jpg', thumbSrc:'http://th07.deviantart.net/fs70/PRE/f/2011/332/9/d/waiting_for_a_train_by_pianoblack97-d4hlem9.jpg'},
                    {type:'wide', cat:'places', src:'http://fc03.deviantart.net/fs71/f/2011/269/9/3/simply_sublime_by_pianoblack97-d4b0xt0.jpg', thumbSrc:'http://th02.deviantart.net/fs71/PRE/f/2011/269/9/3/simply_sublime_by_pianoblack97-d4b0xt0.jpg'},
                    {type:'wide', cat:'things', src:'http://fc08.deviantart.net/fs70/f/2011/265/a/b/season_of_color_by_pianoblack97-d4al586.jpg', thumbSrc:'http://th08.deviantart.net/fs70/PRE/f/2011/265/a/b/season_of_color_by_pianoblack97-d4al586.jpg'},
                    {type:'wide', cat:'things', src:'http://fc04.deviantart.net/fs71/f/2011/267/2/8/dueling_on_the_grate_by_pianoblack97-d4atcmm.jpg', thumbSrc:'http://th09.deviantart.net/fs71/PRE/f/2011/267/2/8/dueling_on_the_grate_by_pianoblack97-d4atcmm.jpg'}
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