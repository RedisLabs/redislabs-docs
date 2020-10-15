// test
var lunrIndex, pagesIndex;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Initialize lunrjs using our generated index file
function initLunr() {
    if (!endsWith(baseurl,"/")){
        baseurl = baseurl+'/'
    };

    var internalIndex = null;
    var hasToken = localStorage.getItem('auth_token');

    if(hasToken) {        
        internalIndex = fetchInternalIndex();
    }

    // First retrieve the index file
    $.getJSON(baseurl +"index.json")
        .done(function(index) {
            if(hasToken && internalIndex) {                
                index = index.concat(internalIndex);
            }

            pagesIndex = index;

            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            lunrIndex = new lunr.Index
            lunrIndex.ref("uri");
            lunrIndex.field('title', {
                boost: 15
            });
            lunrIndex.field('tags', {
                boost: 10
            });
            lunrIndex.field("content", {
                boost: 5
            });
            lunrIndex.field("categories", {
                boost: 1
            });
            lunrIndex.field("description", {
                boost: 0
            });

            // Feed lunr with each file and let lunr actually index them
            pagesIndex.forEach(function(page) {            
                if((page.uriRel && !page.uriRel.startsWith('/embeds')) || page.description === 'internal_content') {
                    lunrIndex.add(page);
                }                
            });
            lunrIndex.pipeline.remove(lunrIndex.stemmer)
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index file:", err);
        });
}

// Fetch the index of internal docs
function fetchInternalIndex() {
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

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    // Find the item in our index corresponding to the lunr one to have more info
    return lunrIndex.search(query).map(function(result) {
            return pagesIndex.filter(function(page) {
                return page.uri === result.ref;
            })[0];
        });
}

// Let's get started
initLunr();
$( document ).ready(function() {
    var internalBaseUrl = baseurl.substring(0, baseurl.length-1);

    var searchList = new autoComplete({
        /* selector for the search box element */
        selector: $("#search-by").get(0),
        /* source is the callback to perform the search */
        source: function(term, response) {
            response(search(term));
        },
        /* renderItem displays individual search results */
        renderItem: function(item, term) {
            var numContextWords = 3;
            var regEx = "(?:\\s?(?:[\\w\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]+)\\s?){0";
            var text = item.content.match(
                regEx+numContextWords+"}" +
                    term+regEx+numContextWords+"}");
            if(text && text.length > 0) {
                var len = text[0].split(' ').length;
                item.context = len > 1? '...' + text[0].trim() + '...' : null;
            }
            item.cat = (item.categories && item.categories.length > 0)? item.categories[0] : '';

            // Set result item page URI
            var URI = item.uri;
            if(item.description === 'internal_content') {
                URI = URI.replace('content', '').replace('.md', '');

                if(URI.includes('_')) {
                    // A URI to internal section within a page, remove the _ and text after it to make the URI work
                    URI = URI.substring(0, URI.lastIndexOf('_'));
                }
            }
            
            URI = URI + '?s=' + term; //Add search term to URI for easier tracking with Analytics

            if(item.description === 'internal_content') {                
                // Internal section, therefore append a query param which makes the internal content visible when resulting page is open
                URI = internalBaseUrl + URI + '&si=true';
            }

            // Set item context, ie. preview of search result
            var context = item.context? item.context : item.content.substring(0, 50) + '...';

            return '<div class="autocomplete-suggestion" ' +
                'data-term="' + term + '" ' +
                'data-title="' + item.title + '" ' +
                'data-uri="'+ URI + '"' +
                'data-context="' + context + '">' +
                    '<div>' + item.title + '<strong class="category">' + item.cat + '</strong> </div>' +
                    '<div class="context">' + context +'</div>' +
                '</div>';
        },
        /* onSelect callback fires when a search suggestion is chosen */
        onSelect: function(e, term, item) {
            console.log(item.getAttribute('data-val'));
            location.href = item.getAttribute('data-uri');
        }
    });
});
