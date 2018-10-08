jQuery('document').ready(function($) {
    var toc = $('#toc');
    var distance = toc.offset().top - 100,
    $window = $(window);

    $window.scroll(function() {
        if ( $window.scrollTop() >= distance ) {
            // Your div has reached the top
            toc.addClass('fixed-pos')
        }
        else {
            toc.removeClass('fixed-pos')
        }
    });

});