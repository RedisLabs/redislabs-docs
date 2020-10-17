jQuery(document).ready(function() {
    var isLoggedIn = true; //localStorage.getItem('auth_token');
    handleInternalDocs(isLoggedIn);
    handleScroll();
    setupNavbar();
    setupMenuExpansion();
    handleImages();

	// Add link button (and internal docs if logged in) for every section
    var text, clip = new Clipboard('.anchor');
    var internalIndex = null;
    var internalContSectionCount = 0; //keep a count of sections that have internal content, so we hide the toggle button if there is no content
    var pagePath = null;

    if(isLoggedIn) {
        internalIndex = fetchInternalIndex();
        pagePath = location.href.substr(location.href.lastIndexOf(baseurl)+baseurl.length);

        if(pagePath.includes('?s=')) {
            // page opened from search results, so it contains some query params which are not needed, therefore cut them out
            pagePath = pagePath.substring(0, pagePath.lastIndexOf('/')+1);            
        }
    }

    $("h1,h2,h1~h2,h1~h3,h1~h4,h1~h5,h1~h6,h2~h3,h3~h4,h4~h5").append(function (index, html) {
        var element = $(this);
        var url = document.location.origin + document.location.path;
        var link = url + "#" + element[0].id;

        var clipElement = " <span class='anchor' data-clipboard-text='" + link + "'>"  +
        "</span>";

        if(isLoggedIn) {            
            var sectionID = element[0].id;
            var contentURI = null;

            if(sectionID) {
                contentURI = pagePath.slice(0, -1) + '_' + sectionID + '.md';                
            } else {
                contentURI = pagePath.slice(0, -1) + '.md';
            }

            // Check if section has any internal docs content using the index            
            var internal = internalIndex.find((item) => item.uri === 'content/' + contentURI);
            var internalContentMarkdown = internal? internal.content : null;            

            if(internalContentMarkdown) {
                internalContSectionCount++;
                var internalContentHTML = renderInternalContent(internalContentMarkdown);

                // Append the internal content button to section title
                clipElement += `
                <span class="anchor internal" onclick="toggleSectionInternalContent('`+ sectionID +`')">
                    <i class="fa fa-folder-o"></i>
                </span>
                <div id="internalContent_`+ sectionID +`" class="internal-content-area internal-content-section">
                    <span class="title">
                        <i class="fa fa-folder-o"></i> Internal
                        <i class="fa fa-close closeContent" onclick="hideInternalContent('`+ sectionID +`')"></i>
                    </span>
                    <div class="article">`+ internalContentHTML +`</div>
                </div>
                `;
            }
        }

        return clipElement;
    });
    
    if(internalContSectionCount === 0) {
        $('#showInternalBtn').hide();
        $('#hideInternalBtn').hide();
    } else {
        showAllInternalContent();
    }    

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

var handleScroll = function() {
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        var header = $('#header');
        if(scroll > 40) {
            header.css('height', '50px');
        } else {
            header.css('height', '70px');
        }
    });
}

var setupNavbar = function() {
    $("nav.shortcuts li").hover(
        function() {
            $(this).children('.submenu-wrapper').css('visibility', 'visible');
            $(this).children('.submenu-wrapper').css('opacity', 1);
        }, function() {
            $(this).children('.submenu-wrapper').css('visibility', 'hidden');
            $(this).children('.submenu-wrapper').css('opacity', 0);
        }
    );
}

var setupMenuExpansion = function() {
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
}

var handleImages = function() {
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
}

var handleInternalDocs = function(isLoggedIn) {
    var ii = jQuery('.internal-invoker');
    if(!ii) {
        return;
    }

    if(isLoggedIn) {
        ii.css('display', 'inline-block');
        return;
    }

    ii.hide();
}

var handleInternalDocsLogin = function() {
    var isLoggedIn = true; //localStorage.getItem('auth_token');

    if(isLoggedIn) {
        // Log out if already logged in
        localStorage.removeItem('auth_token');
        handleGoogleSignOut();
        $('#internalLoginLink').html('Internal Docs Login');
        window.location.reload();
        return;
    }

    // Go to login page if not logged in
    window.location.href = window.location.protocol + baseurl + 'login.html?red=' + location.href;
}

var handleGoogleSignOut = function() {
    // gapi.auth2.init();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

var handleInternalLoader = function() {
    var isLoggedIn = localStorage.getItem('auth_token');

    if(isLoggedIn) {
        $('#internalLoader').css('display', 'inline-block');
        $('#internalLoginLink').html('Internal Docs Logout')
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

var setPageFeedback = function(kind, pageTitle, category) {
    setFeedbackMessage(kind, category, pageTitle);

    if (window.ga) {
        window.ga('send', {
            hitType: 'event',
            eventCategory: 'Article feedback',
            eventAction: 'vote',
            eventLabel: window.location.pathname,
            eventValue: kind,
            hitCallback: function() {
                setFeedbackMessage();
            }
        });
    }
}

var setFeedbackMessage = function(kind, category, pageTitle) {
    if(kind === 1) {
        $('#page-feedback-open').html('Thanks for the feedback!');
    } else {
        $('#page-feedback-open')
        .html('Thanks for your feedback! You can help improve the page by opening a <a style="text-decoration: underline;cursor:pointer;" href="https://github.com/RedisLabs/redislabs-docs/issues/new?assignees=&labels=&template=documentation-bug-report.md&title='+ category + ' - ' + pageTitle +'" target="_blank" rel="noopener noreferrer">GitHub issue</a>.');
    }
    setTimeout(function() {
        $('.page-feedback').hide();
    }, 5000);
}

var hidePageFeedback = function() {
    $('#page-feedback-open').hide();
    $('#page-feedback-closed').show();
    localStorage.setItem('is-page-feedback-visible', 'no');
}

var showPageFeedback = function() {
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
})

var renderInternalContent = function(content, options) {
    var converter = new showdown.Converter();
    return converter.makeHtml(content);
    return;
    if(!options || !options.specificSection) {
        $('#internalContent .article').html(converter.makeHtml(content));
        $('#internalContent').show();
    } else if (options.specificSection && options.sectionID) {
        var id = '#internalContent_' + options.sectionID;
        $(id + ' .article').html(converter.makeHtml(content));
        $(id).show();
    }
}

var showAllInternalContent = function() {
    $('#showInternalBtn').hide();
    $('#hideInternalBtn').show();
    $('.internal-content-area').show();
}

var hideAllInternalContent = function() {
    $('#showInternalBtn').show();
    $('#hideInternalBtn').hide();
    $('.internal-content-area').hide();
}

var toggleSectionInternalContent = function(id) {
    var section = $('#internalContent_' + id);
    if(section.is(':visible')) {
        section.hide();
        handleInternalMainControl('hide');
        return;
    }

    section.show();
    handleInternalMainControl('show');
}

var handleInternalMainControl = function(intent) {
    var internalAreas = $('.internal-content-area');
    if(!internalAreas || internalAreas.length === 0) {
        return;
    }

    if(intent === 'hide' && $('.internal-content-area:visible').length === 0) {
        // Set text to "show all internal docs" if all internal sections are hidden
        $('#showInternalBtn').show();
        $('#hideInternalBtn').hide();
    }
    
    if (intent === 'show' && $('.internal-content-area:hidden').length === 0) {
        // Set text to "hide all internal docs" if all internal sections are visible
        $('#showInternalBtn').hide();
        $('#hideInternalBtn').show();
    }
}

var showInternalContent = function(id) {
    if(id) {
        $('#internalContent_' + id).show();
        return;
    }

    $('#internalContent').show();
    handleInternalMainControl('show');
}

var hideInternalContent = function(id) {
    $('#internalContent_' + id).hide();  
    handleInternalMainControl('hide');  
}

var setInternalContentLoader = function(state)  {
    if(state === 'on') {
        $('#internalContentLoader').show();
        return;
    }

    $('#internalContentLoader').hide();
}

// Fetch the index of internal docs
var fetchInternalIndex = function() {
    var url = window.INT_DOCS_API;
    var internalIndex = null;

    $.ajax({
        url: url, 
        type: 'get', 
        dataType: 'html',
        async: false,
        success: function(data) {
            internalIndex = JSON.parse(data);
        },
        error: function(error) {
            console.error("Error getting internal index: ", error);
            return null;
        }
    });   
    
    return internalIndex;
}