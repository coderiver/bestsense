var ScrollMagic = require('scrollmagic');

function Navigation() {

    var _             = this;
    var win           = $(window);
    var doc           = $(document);
    var activeClass   = 'is-active';
    var drawLineClass = 'draw-line';

    _.$nav       = $('#nav');
    _.$items     = _.$nav.find('.nav__list-item');
    _.$links     = _.$nav.find('.nav__link');
    _.$sections = _.$links.map(function(index, el) {
        var section = $(el).attr('href');
        return $(section)[0];
    });

    _.correction = 100; // height of fixed header in px

    _.scrollTo = function(element) {
        var target = element instanceof jQuery ? element : $(element);
        var pos    = target.offset().top - _.correction;

        $('html, body').animate({scrollTop: pos}, 500);
    };

    _.initEvents = function() {
        _.$links.on('click', function(e) {
            e.preventDefault();
            _.scrollTo($(this).attr('href'));
        });

        win.on('resize', function() {
            // rebuild scroll scenes
            _.controller.destroy(true);
            _.buildScenes();
            _.controller.update();
        });
    };

    _.buildScenes = function() {
        _.controller = new ScrollMagic.Controller({container: 'body', loglevel: 1});
        $.each(_.$sections, function(index, section) {
            new ScrollMagic.Scene({
                triggerElement: section,
                duration: $(section).outerHeight(),
                triggerHook: 'onCenter'
            })
                .on('start', function(e) {
                    if (e.scrollDirection == 'FORWARD') {
                        $(_.$links[index]).addClass(activeClass);
                        if (index > 0) {
                            $(_.$links[index - 1]).addClass(drawLineClass);
                        }
                    }

                    if (e.scrollDirection == 'REVERSE') {
                        $(_.$links[index]).removeClass(activeClass);
                        if (index > 0) {
                            $(_.$links[index - 1]).removeClass(drawLineClass);
                        }
                    }
                })
                .addTo(_.controller);
        });
    };

    _.init = function() {
        // add active class to first item of navigation
        $(_.$links[0]).addClass(activeClass);
        _.initEvents();
        _.buildScenes();

        console.log(_);
    };

}

module.exports = new Navigation();
