function Parallax(element, options) {

    var _       = this;
    var $window = $(window);
    var PREFIX = {
        webkit: '-webkit-',
        moz: '-moz-',
        ms: '-ms-',
        o: '-o-',
    };
    var defaults = {
        transition: 'transform 0.5s ease',
        translate: 300,
    };

    _.$el       = element instanceof jQuery ? element : $(element);
    _.scrollPos = $window.scrollTop();
    _.options = $.extend(defaults, options || {});

    $window.on('scroll', function() {
        _.scrollPos = $window.scrollTop();
    });

    _.init = function() {
        _.$el.css({
            '-webkit-transition': _.options.transition,
                '-ms-transition': _.options.transition,
                    'transition': _.options.transition,
        });
        _.move(0);
        console.log(_);
    };

    _.move = function(val) {
        _.$el.css({
            '-webkit-transform': 'translate3d(0, ' + val + ', 0)',
                '-ms-transform': 'translate3d(0, ' + val + ', 0)',
                    'transform': 'translate3d(0, ' + val + ', 0)',
        });
    };

    _.init()

    return _;

}

module.exports = Parallax;
