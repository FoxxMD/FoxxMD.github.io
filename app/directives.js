angular.module('app.directives', ['wu.masonry'])
    .directive('photosDir', ['$compile', '$rootScope', '$timeout', function ($compile, $rootScope, $timeout) {
        var directive = {
            restrict: 'AE',
            templateUrl: '/app/templates/photos.html',
            controller: function ($scope) {
                $scope.bricks = [
                    {type: 'wide', cat: ['People', 'Featured'], thumbSrc: "http://th01.deviantart.net/fs70/PRE/f/2012/362/9/4/watch_me_by_matthewfoxxphotos-d5pge3s.jpg"},
                    {cat: ['People', 'Featured'], thumbSrc: "http://th01.deviantart.net/fs70/PRE/f/2013/067/a/4/vintage_shopping_by_matthewfoxxphotos-d5xe74c.jpg"},
                    {type: 'wide', cat: ['People'], thumbSrc: "http://th05.deviantart.net/fs71/PRE/f/2013/080/c/3/hold_me_tight_by_matthewfoxxphotos-d5ytrjn.jpg"},
                    {cat: ['People'], thumbSrc: "http://th03.deviantart.net/fs70/PRE/f/2013/062/1/6/artist_in_action_sepia__by_matthewfoxxphotos-d5wvd4e.jpg"},
                    {type: 'wide', cat: ['People', 'Featured'], thumbSrc: "http://th01.deviantart.net/fs71/PRE/f/2014/038/f/c/snowday_skeleton_by_matthewfoxxphotos-d75innb.jpg"},
                    {type: 'wide', cat: ['Places', 'Featured'], thumbSrc: "http://th02.deviantart.net/fs70/PRE/f/2013/100/f/e/there_s_a_hell_of_a_universe_next_door_by_matthewfoxxphotos-d615ezr.jpg"},
                    {cat: ['People', 'Featured'], thumbSrc: "http://th09.deviantart.net/fs71/PRE/f/2013/122/9/a/archaeopteryx_by_matthewfoxxphotos-d63untu.jpg"},
                    {type: 'wide', cat: ['Places', 'Featured'],  thumbSrc: "http://fc09.deviantart.net/fs71/i/2012/309/6/2/empty_roads_by_pianoblack97-d5k2f8x.jpg"},
                    {type: 'wide', cat: ['People'], thumbSrc: "http://th09.deviantart.net/fs70/PRE/f/2012/267/d/a/miranda_by_pianoblack97-d5ftczp.jpg"},
                    {type: 'wide', cat: ['Places'], thumbSrc: "http://th06.deviantart.net/fs71/PRE/f/2012/255/f/6/baldwin_county_courthouse__est__1803_by_pianoblack97-d5eglwz.jpg"},
                    {cat: ['Places'], thumbSrc: 'http://th02.deviantart.net/fs70/PRE/f/2012/233/d/c/sunset_road_by_pianoblack97-d5byjrz.jpg'},
                    {cat:['People'], thumbSrc:'http://th05.deviantart.net/fs70/PRE/f/2012/303/4/0/dogfighting_days_by_pianoblack97-d5jhefd.jpg'},
                    {type: 'wide', cat: ['People'],  thumbSrc: 'http://th07.deviantart.net/fs71/PRE/f/2012/233/a/6/honest_tubing_by_pianoblack97-d5bvy1u.jpg'},
                    {cat: ['People'], thumbSrc: 'http://th03.deviantart.net/fs71/PRE/i/2012/202/d/1/good_to_see_you_by_pianoblack97-d584hbk.jpg'},
                    {type: 'wide', cat: ['Things', 'Featured'], thumbSrc: 'http://th01.deviantart.net/fs70/PRE/f/2012/193/5/4/experience_comes_with_age_by_pianoblack97-d56y09i.jpg'},
                    {type: 'wide', cat: ['Things'], thumbSrc: 'http://th08.deviantart.net/fs70/PRE/f/2012/189/d/0/cycle_of_life_by_pianoblack97-d56hlr4.jpg'},
                    {type: 'wide', cat: ['Places', 'Featured'], thumbSrc: 'http://th06.deviantart.net/fs71/PRE/f/2012/204/8/1/shrouded_by_pianoblack97-d58ba66.jpg'},
                    {type: 'wide', cat: ['Places'], thumbSrc: 'http://th05.deviantart.net/fs70/PRE/f/2012/177/a/8/bursting_finale_by_pianoblack97-d5503r3.jpg'},
                    {type: 'wide', cat: ['People'], thumbSrc: 'http://th08.deviantart.net/fs70/PRE/f/2012/145/e/d/auschwitz_to_atlanta_1_by_pianoblack97-d512zgd.jpg'},
                    {type: 'wide', cat:['People'], src:'/assets/img/corp_2.jpg', thumbSrc: '/assets/img/corp_2_thumb.jpg'},
                    {type: 'wide', cat:['People'], src:'/assets/img/corp_finesse.jpg', thumbSrc: '/assets/img/corp_finesse_thumb.jpg'},
                    {type:'wide', cat:['Things'], thumbSrc:'http://th00.deviantart.net/fs70/PRE/f/2012/315/e/f/innocence_in_the_sun_by_pianoblack97-d5koy9s.jpg'},
                    {type:'wide', cat:['Places'], thumbSrc:'http://th02.deviantart.net/fs70/PRE/i/2013/041/f/2/forgotten_hallways_by_matthewfoxxphotos-d5uhjmr.jpg'},
                    {cat:['Things'], thumbSrc:'http://th03.deviantart.net/fs70/PRE/f/2011/339/6/1/traces_of_red_by_pianoblack97-d4i9vgd.jpg'},
                    {cat:['Things'], thumbSrc:'http://th05.deviantart.net/fs71/PRE/f/2012/211/a/9/csx_7701_by_pianoblack97-d597vub.jpg'},
                    {type:'wide', cat:['Things'], thumbSrc:'http://th02.deviantart.net/fs71/PRE/f/2011/259/0/3/the_last_drop_by_pianoblack97-d49zyfk.jpg'},
                    {type: 'wide', cat: ['Things', 'Featured'], thumbSrc: 'http://th01.deviantart.net/fs71/PRE/f/2012/116/f/7/milledgeville_glass_by_pianoblack97-d4xpe21.jpg'},
                    {type: 'wide', cat: ['Things'], thumbSrc: 'http://th09.deviantart.net/fs71/PRE/f/2012/120/7/6/last_light_by_pianoblack97-d4y4k87.jpg'},
                    {type: 'wide', cat: ['People'], thumbSrc: 'http://th07.deviantart.net/fs71/PRE/f/2012/101/c/4/face_the_music_by_pianoblack97-d4vv5hm.jpg'},
                    {type: 'wide', cat: ['Things'], thumbSrc: 'http://th00.deviantart.net/fs71/PRE/f/2012/079/9/f/redefine_your_life_by_pianoblack97-d4tctil.jpg'},
                    {cat: ['Places'], thumbSrc: 'http://th09.deviantart.net/fs70/PRE/f/2012/037/4/3/let_there_be_light_by_pianoblack97-d4ox2mq.jpg'},
                    {type: 'wide', cat: ['Places', 'Featured'], thumbSrc: 'http://th07.deviantart.net/fs71/PRE/f/2011/340/4/a/midnight_train_by_pianoblack97-d4icuyl.jpg'},
                    {cat: ['Places', 'Featured'], thumbSrc: 'http://th01.deviantart.net/fs71/PRE/f/2011/341/9/a/crystal_clear_by_pianoblack97-d4ieudg.jpg'},
                    {type: 'wide', cat: ['People'], thumbSrc: 'http://th07.deviantart.net/fs70/PRE/f/2011/332/9/d/waiting_for_a_train_by_pianoblack97-d4hlem9.jpg'},
                    {cat:['People'], thumbSrc:'http://th07.deviantart.net/fs71/PRE/f/2012/156/8/7/kevin_by_pianoblack97-d52frhe.jpg'},
                    {type: 'wide', cat: ['Places'], thumbSrc: 'http://th02.deviantart.net/fs71/PRE/f/2011/269/9/3/simply_sublime_by_pianoblack97-d4b0xt0.jpg'},
                    {type: 'wide', cat: ['Things', 'Featured'], thumbSrc: 'http://th08.deviantart.net/fs70/PRE/f/2011/265/a/b/season_of_color_by_pianoblack97-d4al586.jpg'},
                    {type: 'wide', cat: ['Things'], thumbSrc: 'http://th09.deviantart.net/fs71/PRE/f/2011/267/2/8/dueling_on_the_grate_by_pianoblack97-d4atcmm.jpg'}
                ];

            },
            link: function (scope, element, attrs) {

                var photos = $('.showcasePane'),
                    gallery = $(element).find('.masonryContainer');

               var sChangeOff =  $rootScope.$on('$stateChangeSuccess', function(){
                    gallery.css('overflow-y','hidden');
                    gallery.find('img').css('opacity','0');
                });

                scope.$on('$destroy', function () {
                    sChangeOff();
                    photos.removeAttr('style');
                });

                scope.imagesLoaded = false;

                gallery.masonry('on','layoutComplete', function(instance, items) {
                    $timeout.cancel(scope.showImages);
                    scope.showImages = $timeout(function () {
                        if (!scope.imagesLoaded) {
                            scope.imagesLoaded = true;
                            $timeout(function () {
                                $timeout(function () {
                                    gallery.masonry('layout');
                                    photos.css('height', gallery.outerHeight()+200);
                                }, 700);
                            }, 0);
                            $('.poptrox-popup').remove();
                            gallery.poptrox({
                                usePopupNav: true,
                                popupPadding: 0
                            });
                        }
                        photos.css('height', gallery.outerHeight()+200);
                    }, 500);
                });

                scope.selectedFilter = 'Featured';

                scope.photoFilter = function (photo) {
                    var found = false;
                    photo.cat.forEach(function (elem, index) {
                        if (elem == scope.selectedFilter)
                            found = true;
                    });
                    return found;
                };

                scope.changeFilter = function (filterName) {
                    scope.selectedFilter = filterName;
                    scope.imagesLoaded = false;
                };
            }
        };
        return directive;
    }]);