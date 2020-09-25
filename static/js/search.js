const SEARCH_API_URL = "http://34.107.129.53/search"
const THIRTY_SECONDS = 30000
const EVENT_LOCAL_CACHE = "search:served_from_local_cache"
const EVENT_LIVE_SEARCH_FAILED = "search:live_search:failed"
const EVENT_LIVE_SEARCH_SUCCESS = "search:live_search:success"


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

	return item.value
}


new Autocomplete('#autocomplete', {
  debounceTime: 2,

  search: input => {
    const trimmedInput = input.trim()
    const url = `${SEARCH_API_URL}?q=${trimmedInput}*`
    const shouldTrack = input.length > 4

    if (input.length === 0) {
      return []
    }

    try { xhr.abort(); } catch(e){}

    const cachedResults = getWithExpiry(url)

    if (cachedResults && shouldTrack) {
      analytics.track(EVENT_LOCAL_CACHE, {query: trimmedInput})
      return cachedResults
    }

    return new Promise(resolve => {
      $.getJSON(url)
        .fail(function(jqxhr, textStatus, error) {
          const err = `${textStatus}, ${error}`
          console.error("Error querying search API:", err)
          if (shouldTrack) {
            analytics.track(EVENT_LIVE_SEARCH_FAILED, {query: trimmedInput})
          }
          resolve([])
        })
        .done(function(data) {
          setWithExpiry(url, data.results, THIRTY_SECONDS)
          if (shouldTrack) {
            analytics.track(EVENT_LIVE_SEARCH_SUCCESS, {
              query: trimmedInput,
              count: data.total,
              page_size: data.results.length
            })
          }
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

