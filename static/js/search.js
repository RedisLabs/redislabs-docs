const SEARCH_API_URL = "http://docs.andrewbrookins.com:8001/search"

/**
 * Trigger a search and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    try { xhr.abort(); } catch(e){}
    return $.getJSON(SEARCH_API_URL + "?q=" + query + "*")
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error querying search API:", err);
        });
}

// Let's get started
$( document ).ready(function() {
    var searchList = new autoComplete({
        delay: 0,
        minChars: 2,
        /* selector for the search box element */
        selector: $("#search-by").get(0),
        /* source is the callback to perform the search */
        source: function(term, response) {
            search(term).done(function(data) {
                console.log(data.results);
                response(data.results);
            });
        },
        /* renderItem displays individual search results */
        renderItem: function(item, term) {
            var numContextWords = 3;
            var regEx = "(?:\\s?(?:[\\w\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]+)\\s?){0";
            var text = item.body.match(
                regEx+numContextWords+"}" +
                    term+regEx+numContextWords+"}");
            if(text && text.length > 0) {
                var len = text[0].split(' ').length;
                item.context = len > 1? '...' + text[0].trim() + '...' : null;
            }
            item.cat = item.root_page;
            return '<div class="autocomplete-suggestion" ' +
                'data-term="' + term + '" ' +
                'data-title="' + item.title + '" ' +
                'data-uri="'+ item.url + '?s=' + term + '"' +
                'data-context="' + item.section_title + '">' +
                    '<div>' + item.title + '<strong class="category">' + item.root_page + '</strong> </div>' +
                    '<div class="context">' + item.section_title +'</div>' +
                '</div>';
        },
        /* onSelect callback fires when a search suggestion is chosen */
        onSelect: function(e, term, item) {
            console.log(item.getAttribute('data-val'));
            location.href = item.getAttribute('data-uri');
        }
    });
});
