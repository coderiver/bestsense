global.$ = global.jQuery = require('jquery');

$(document).ready(function() {

    var navigation = $('#nav');
    var body       = $('body');

    navigation.on('mouseover', function() {
        body.addClass('nav-active');
    });

    navigation.on('mouseleave', function() {
        body.removeClass('nav-active');
    });

});
