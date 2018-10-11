jQuery('document').ready(function($) {
    var toc = $('#toc');
    if (toc.length > 0) {
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
    }
    $('.hamburger').click(function() {
        var w = $(window).width(),
            nav = $('#navModal');
        console.log(w/2);
        // nav.css('width' , w/2);
        $(this).toggleClass('is-active');
        nav.slideToggle(300);
    });


$('.main-content-right .nav li a').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 80
    }, 750, 'swing');
});


});

