jQuery(document).ready(function() {
    var ii = jQuery('.internal-invoker');
    if(ii && localStorage.getItem('auth_token')) {
        ii.css('display', 'inline-block');
    } else {
        ii.hide();
    }

    jQuery('.category-icon').on('click', function() {
        $( this ).toggleClass("fa-angle-down fa-angle-right");
        var x = $( this ).parent().parent().children('ul')
        x.toggle();

        if (x[0].style.display == 'block') {
            x[0].classList.add("menu-ul-expanded");
        } else {
            x[0].classList.remove("menu-ul-expanded");
        }

        setMenuExpansion();
        return false;
    });

    function setMenuExpansion() {
        var $menu = $('article > aside .menu .dd-item.parent.menu-root');
        var ulChildren = $('.parent.menu-root').children('ul').children('li').children('ul');        
        var hasExpandedChildren = false;
        ulChildren.each(function() {
            if($(this).css("display") == "block") {
                hasExpandedChildren = true;
                return false;
            }
        });

        if(hasExpandedChildren > 0) {
            // has expanded children, set to "collapse all"            
            $menu.removeClass('menu-collapsed').addClass('menu-expanded');                                        
            return;
        } else {
            // no expanded children, set to "expand all"
            $menu.removeClass('menu-expanded').addClass('menu-collapsed');            
            return;
        }
    }
        
    jQuery('.SideMenuToggle').on('click', function() {
        var $menu = $('article > aside .menu .dd-item.parent.menu-root');
        if($menu[0].classList.contains('menu-expanded')) {
            // menu is expanded, collapse it
            $('.parent.menu-root').children('ul').find('.fa.category-icon').removeClass('fa-angle-down').addClass('fa-angle-right');
            $menu.removeClass('menu-expanded').addClass('menu-collapsed');
            $('.parent.menu-root').children('ul').find('li').children('ul').toggle(false);
            return false;
        }

        // menu is collapsed, expand it
        $('.parent.menu-root').children('ul').find('.fa.category-icon').removeClass('fa-angle-right').addClass('fa-angle-down');
        $menu.removeClass('menu-collapsed').addClass('menu-expanded');
        $('.parent.menu-root').children('ul').find('li').children('ul').toggle(true);
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

var onSignIn = function(googleUser) {
    var profile = googleUser.getBasicProfile();

    if(!isProfileAllowed(profile)) {
        alert("Email address not allowed.");
        hideInternalDocsLoginDialog();
        handleGoogleSignOut();
        return;
    }

    if(!localStorage.getItem('auth_token')) {
        localStorage.setItem('auth_token', 'abc123');
        window.location.reload();
    }
}

var isProfileAllowed = function(profile) {
    var e = profile.getEmail();

    return /@redislabs.com\s*$/.test(e);
}

var toggleInternalLogin = function() {
    var isLoggedIn = localStorage.getItem('auth_token');
    
    if(isLoggedIn) {        
        localStorage.removeItem('auth_token');
        $('#internalToggle').html('Internal Docs Login');
        handleGoogleSignOut();
        window.location.reload();
        return;
    }
    
    $('#internalDocsLoginDialog').show();
}

var handleGoogleSignOut = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });    
}

var hideInternalDocsLoginDialog = function() {
    $('#internalDocsLoginDialog').hide(); 
}

var handleInternalLoader = function() {
    var isLoggedIn = localStorage.getItem('auth_token');

    if(isLoggedIn) {        
        $('#internalLoader').css('display', 'inline-block');
        $('#internalToggle').html('Internal Docs Logout')        
    }
}

handleInternalLoader();

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

function setPageFeedback(kind) {
    setFeedbackMessage();

    if (window.ga) {
        window.ga('send', {
            hitType: 'event',
            eventCategory: 'Article feedback',
            eventAction: 'vote',
            eventLabel: window.location.pathname,
            eventValue: kind,
            hitCallback: function() {
                console.log('GA Event sent');
                setFeedbackMessage();
            }
        });
    }
}

function setFeedbackMessage() {
    $('#page-feedback-open').html('Thanks for the feedback!');
    setTimeout(function() {
        $('.page-feedback').hide();
    }, 5000);
}

function hidePageFeedback() {
    $('#page-feedback-open').hide();
    $('#page-feedback-closed').show();
    localStorage.setItem('is-page-feedback-visible', 'no');
}

function showPageFeedback() {
    $('#page-feedback-closed').hide();
    $('#page-feedback-open').show();
    localStorage.setItem('is-page-feedback-visible', 'yes');
}

$(function() {
    $('.page-feedback').show();
    var isPageFeedbackVisible = localStorage.getItem('is-page-feedback-visible');
    if(isPageFeedbackVisible == 'no') {
        hidePageFeedback();
    } else {
        showPageFeedback();
    }
});
function renderInternalContent(content) {
    var converter = new showdown.Converter();
    $('#internalContent .article').html(converter.makeHtml(content));
    $('#internalContent').show();
}

function fetchInternalContent(pageID){
    var url = 'https://api.github.com/repos/HarunD/internal-md-experiment/contents/README.md';
    toggleInternalContentLoader('on');
    var result = null;
    $.ajax({
        url: url, 
        type: 'get', 
        dataType: 'html',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "token b323b8f5193c10bc475acf5573ba666fd9d88d70");
            xhr.setRequestHeader("Accept", "application/vnd.github.v3.raw");
        },        
        success: function(data) {
            toggleInternalContentLoader('off');
            renderInternalContent(data);
        },
        error: function() {
            toggleInternalContentLoader('off');
            alert("Error loading internal content");
        }
    });
    FileReady = true;
    return result;
}

var getInternalContent = function(page) {            
    var isLoggedIn = localStorage.getItem('auth_token');
    
    if(!isLoggedIn) return;

    var markdown_source = fetchInternalContent(page);
}

var hideInternalContent = function() {
    $('#internalContent').css('display', 'none');
}

var toggleInternalContentLoader = function(state)  {
    if(state === 'on') {
        $('#internalContentLoader').show();
        return;
    }

    $('#internalContentLoader').hide();
}