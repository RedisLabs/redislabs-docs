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

    $('.hamburger').click(function() {
        var w = $(window).width(),
            nav = $('#navModal');
        console.log(w/2);
        // nav.css('width' , w/2);
        $(this).toggleClass('is-active');
        nav.slideToggle(300);
    });



});