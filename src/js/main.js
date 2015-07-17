global.$ = global.jQuery = require('jquery');
require('slick-carousel');
require('jquery.transit');
var ScrollMagic = require('scrollmagic');
var nav         = require('./modules/navigation.js');

$(document).ready(function() {

    var navigation       = $('#nav');
    var body             = $('body');
    var slider           = $('.slider');
    var win              = $(window);
    var scrollController = null;

    nav.init();

    navigation.on('mouseover', function() {
        body.addClass('nav-active');
    });

    navigation.on('mouseleave', function() {
        body.removeClass('nav-active');
    });

    slider.slick({
        autoplay: true,
        autoplaySpeed: 3000,
        slide: '.slide',
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function buildScrollScenes() {
        // add controller for scenes
        var picShift     = 700;
        var videoShift   = 500;
        var textShift    = 500;
        var pic          = $('.about-technology-picture');
        var video        = $('.video');
        var text         = $('.about-camera__text');
        scrollController = new ScrollMagic.Controller({loglevel: 2});

        // scene for video in #about-technology section
        new ScrollMagic.Scene({
            triggerElement: '#about-technology .wrapper',
            duration: '100%',
            offset: 100,
            triggerHook: 'onEnter'
        })
            .on('progress', function(e) {
                video.transition({y: videoShift * e.progress}, 0);
            })
            .addTo(scrollController);

        // scene for large picture in #event-structure section
        new ScrollMagic.Scene({
            triggerElement: '#event-structure .wrapper',
            duration: '100%',
            triggerHook: 'onEnter'
        })
            .on('progress', function(e) {
                pic.transition({y: picShift * e.progress}, 0);
            })
            .addTo(scrollController);

        // scene for text about camera in #about-camera section
        // new ScrollMagic.Scene({
        //     triggerElement: '.about-camera__left',
        //     duration: 500,
        //     offset: -120,
        //     triggerHook: 'onLeave'
        // })
        //     .on('progress', function(e) {
        //         text.transition({y: textShift * e.progress}, 0);
        //     })
        //     .addTo(scrollController);
    }

    function destroyScrollScenes() {
        scrollController.destroy(true);
        scrollController = null;
    }

    buildScrollScenes();

    win.on('resize', function() {
        var winWidth = win.width();
        if (winWidth < 950) {
            if (scrollController !== null) {
                destroyScrollScenes();
            }
        } else {
            if (scrollController === null) {
                buildScrollScenes();
            }
        }
    });

});
