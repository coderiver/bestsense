function Menu() {

    var _       = this;
    var stepOne = 'step-1';
    var stepTwo = 'step-2';
    var delay   = 500;

    _.$menu    = $('.menu');
    _.$button  = $('.menu__btn');
    _.$menuNav = $('.menu__navigation');
    _.$links   = $('.menu__navigation a');
    _.active   = false;

    _.initEvents = function() {
        _.$button.on('click touchend', function(e) {
            e.preventDefault();
            _.toggle();
        });

        _.$menuNav.on('click', function(e) {
            _.deactivate();
        });

        // _.$links.on('click touchend', function(e) {
        //     e.preventDefault();
        //     _.scrollTo($(this).attr('href'));
        //     _.deactivate();
        // });
    };

    _.activate = function() {
        if (_.active) return;
        _.$menu.addClass(stepOne);
        setTimeout(function() {
            _.$menu.addClass(stepTwo);
        }, 200);

        _.active = true;
    };

    _.deactivate = function() {
        if (!_.active) return;
        _.$menu.removeClass(stepTwo);
        setTimeout(function() {
            _.$menu.removeClass(stepOne);
        }, delay);

        _.active = false;
    };

    _.toggle = function() {
        if (_.active) {
            _.deactivate();
        } else {
            _.activate();
        }
    };

    _.scrollTo = function(element) {
        var target = element instanceof jQuery ? element : $(element);
        var pos    = target.offset().top;

        console.log(pos);

        $('html, body').animate({scrollTop: pos}, 500);
    };

    _.init = function() {
        _.initEvents();
    };

}

module.exports = new Menu();
