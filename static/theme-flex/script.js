jQuery(document).ready(function() {
    jQuery('.category-icon').on('click', function() {
        $( this ).toggleClass("fa-angle-down fa-angle-right") ;
        $( this ).parent().parent().children('ul').toggle() ;
        return false;
    });
    

    // Images
    // Execute actions on images generated from Markdown pages
    var images = $("article img").not(".inline");
    // Wrap image inside a featherlight (to get a full size view in a popup)
    images.wrap(function () {
        var image = $(this);
        if (!image.parent("a").length) {
            return "<a href='" + image[0].src + "' data-featherlight='image'></a>";
        }
    });
    // Change styles, depending on parameters set to the image
    images.each(function (index) {
        var image = $(this);
        var o = getUrlParameter(image[0].src);
        if (typeof o !== "undefined") {
            var h = o["height"];
            var w = o["width"];
            var c = o["classes"];
            image.css({
                width: function () {
                    if (typeof w !== "undefined") {
                        return w;
                    }
                },
                height: function () {
                    if (typeof h !== "undefined") {
                        return h;
                    }
                }
            });
            if (typeof c !== "undefined") {
                var classes = c.split(',');
                $.each(classes, function(i) {
                    image.addClass(classes[i]);
                });
            }
        }
    });


	// Clipboard
	// Add link button for every
    var text, clip = new Clipboard('.anchor');
    $("h1,h2,h1~h2,h1~h3,h1~h4,h1~h5,h1~h6,h2~h3,h3~h4,h4~h5").append(function (index, html) {
        var element = $(this);
        var url = document.location.origin + document.location.pathname;
        var link = url + "#" + element[0].id;
        return " <span class='anchor' data-clipboard-text='" + link + "'>"  +
            "</span>";
    });

    $(".anchor").on('mouseleave', function (e) {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
    });

    clip.on('success', function (e) {
        e.clearSelection();
        $(e.trigger).attr('aria-label', 'Link copied to clipboard!').addClass('tooltipped tooltipped-s');
    });


    var ajax;
    jQuery('[data-search-input]').on('input', function() {
        var input = jQuery(this),
            value = input.val(),
            items = jQuery('[data-nav-id]');
        items.removeClass('search-match');
        if (!value.length) {
            $('ul.menu').removeClass('searched');
            items.css('display', 'block');
            sessionStorage.removeItem('search-value');
            return;
        }

        sessionStorage.setItem('search-value', value);

        if (ajax && ajax.abort) ajax.abort();

        jQuery('[data-search-clear]').on('click', function() {
            jQuery('[data-search-input]').val('').trigger('input');
            sessionStorage.removeItem('search-input');
        });
    });

    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    if (sessionStorage.getItem('search-value')) {
        var searchValue = sessionStorage.getItem('search-value')
        sessionStorage.removeItem('search-value');
        var searchedElem = $('article').find(':contains(' + searchValue + ')').get(0);
        searchedElem && searchedElem.scrollIntoView();
    }

    // clipboard
    var clipInit = false;
    $('pre code').each(function() {
        var code = $(this),
            text = code.text();

        if (text.length > 5) {
            if (!clipInit) {
                var text, clip = new Clipboard('.copy-to-clipboard', {
                    text: function(trigger) {
                        text = $(trigger).next('code').text();
                        return text.replace(/^\$\s/gm, '');
                    }
                });

                var inPre;
                clip.on('success', function(e) {
                    e.clearSelection();
                    inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                    $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                });

                clip.on('error', function(e) {
                    inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                    $(e.trigger).attr('aria-label', fallbackMessage(e.action)).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                    $(document).one('copy', function(){
                        $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                    });
                });

                clipInit = true;
            }

            code.before('<span class="copy-to-clipboard" title="Copy to clipboard"><span class="icon-icons_Copy" aria-hidden="true"></span></span>');
            $('.copy-to-clipboard').on('mouseleave', function() {
                $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
            });
        }
    });

    // allow keyboard control for prev/next links
    jQuery(function() {
        jQuery('.nav-prev').click(function(){
            location.href = jQuery(this).attr('href');
        });
        jQuery('.nav-next').click(function() {
            location.href = jQuery(this).attr('href');
        });
    });
    jQuery(document).keydown(function(e) {
      // prev links - left arrow key
      if(e.which == '37') {
        jQuery('.nav.nav-prev').click();
      }
      // next links - right arrow key
      if(e.which == '39') {
        jQuery('.nav.nav-next').click();
      }
    });

    $('article a:not(:has(img)):not(.btn)').addClass('highlight');
});

$(function() {
    $('a[rel="lightbox"]').featherlight({
        root: 'article'
    });
});

// Get Parameters from some url
var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
        var sURLVariables = url[1].split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            obj[sParameterName[0]] = sParameterName[1];
        }
        return obj;
    } else {
        return undefined;
    }
};
