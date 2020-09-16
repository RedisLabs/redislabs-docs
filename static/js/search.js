const SEARCH_API_URL = "https://docsearch-dot-redislabs-university.appspot.com/search"
const THIRTY_SECONDS = 30000
const EVENT_LOCAL_CACHE = "search:served_from_local_cache"
const EVENT_LIVE_SEARCH_FAILED = "search:live_search:failed"
const EVENT_LIVE_SEARCH_SUCCESS = "search:live_search:success"

function stripRoot(url) {
  return url.split("q=")[1]
}

function setWithExpiry(key, value, ttl) {
	const now = new Date()

	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}


function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}

	analytics.track(EVENT_LOCAL_CACHE, {query: stripRoot(key)})
	return item.value
}


new Autocomplete('#autocomplete', {
  debounceTime: 2,

  search: input => {
    const url = SEARCH_API_URL + "?q=" + input.trim() + "*"

    if (input.length === 0) {
      return []
    }

    try { xhr.abort(); } catch(e){}

    const cachedResults = getWithExpiry(url)

    if (cachedResults) {
      return cachedResults
    }

    return new Promise(resolve => {
      query = stripRoot(url)

      $.getJSON(url)
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error querying search API:", err);
            analytics.track(EVENT_LIVE_SEARCH_FAILED, {query: query})
            resolve([])
        })
        .done(function(data) {
          setWithExpiry(url, data.results, THIRTY_SECONDS)
          analytics.track(EVENT_LIVE_SEARCH_SUCCESS, {query: query, count: data.total,
                                                      page_size: data.results.length})
          resolve(data.results)
        })
    })
  },

  renderResult: (result, props) => {
    const root = result.hierarchy[0]

    if (result.section_title) {
      return `
        <li ${props}>
          <div class="search-root">
            ${root}
          </div>
          <div class="search-left">
            <div class="search-title">
              ${result.title}
            </div>
          </div>
          <div class="search-right">
            <div class="search-section-title">
              ${result.section_title}
            </div>
            <div class="search-body">
              ${result.body}
            </div>
          </div>
        </li>
      `
    } else {
      return `
        <li ${props}>
          <div class="search-root">
            ${root}
          </div>
          <div class="search-left">
            <div class="search-title">
              ${result.title}
            </div>
          </div>
          <div class="search-right">
            <div class="search-section-title">
              ${result.title}
            </div>
            <div class="search-body">
              ${result.body}
            </div>
          </div>
        </li>
      `
    }
  },

  getResultValue: result => "",

  // Open the selected article in
  // a new window
  onSubmit: result => {
    if (result) {
      window.open(`${result.url}`)
    }
  }
})

