(function() {

  const SEARCH_API_URL = "https://search-service.redislabs.com/search"
  const THIRTY_SECONDS = 30000


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

  class RedisLabsAutocomplete extends Autocomplete {
    constructor(
      root,
      opts = {}
    ) {
      super(root, opts)

      this.input.removeEventListener('keydown', this.core.handleKeyDown)
      this.input.addEventListener('keydown', e => this.handleKeyDown(e))
    }

    handleKeyDown(event) {
      const { key } = event

      switch (key) {
        case 'Up': // IE/Edge
        case 'Down': // IE/Edge
        case 'ArrowUp':
        case 'ArrowDown': {
          const selectedIndex =
            key === 'ArrowUp' || key === 'Up'
              ? this.core.selectedIndex - 1
              : this.core.selectedIndex + 1
          event.preventDefault()
          this.core.handleArrows(selectedIndex)
          break
        }
        case 'Tab': {
          this.core.selectResult()
          break
        }
        case 'Enter': {
          const selectedResult = this.core.results[this.core.selectedIndex]

          // Avoid closing the search box on Enter if a result is not selected.
          if (!selectedResult) {
            return;
          }

          this.core.selectResult()
          this.core.onSubmit(selectedResult)
          break
        }
        case 'Esc': // IE/Edge
        case 'Escape': {
          this.core.hideResults()
          this.core.setValue()
          break
        }
        default:
          return
      }
    }
  }


  new RedisLabsAutocomplete('#autocomplete', {
    debounceTime: 2,

    search: input => {
      const trimmedInput = input.trim()
      const url = `${SEARCH_API_URL}?q=${trimmedInput}*`

      if (input.length === 0) {
        return []
      }

      try { xhr.abort(); } catch(e){}

      // Save the query so we can append it to a selected result URL later.
      // We use this to track search queries.
      this.lastQuery = trimmedInput

      const cachedResults = getWithExpiry(url)

      if (cachedResults) {
        return cachedResults
      }

      return new Promise(resolve => {
        $.getJSON(url)
          .fail(function(jqxhr, textStatus, error) {
            const err = `${textStatus}, ${error}`
            console.error("Error querying search API:", err)
            resolve([])
          })
          .done(function(data) {
            setWithExpiry(url, data.results, THIRTY_SECONDS)

            if (!data.results.length) {
              // Push a fake 'no results' document.
              results = [{
                title: "",
                section_title: `No results found for "${trimmedInput}"`,
                body: "",
                hierarchy: ['']
              }]
              resolve(results)
            }
            else {
              resolve(data.results)
            }
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
        const lastQuery = encodeURIComponent(this.lastQuery)
        window.open(`${result.url}?s=${lastQuery}`, "_top")
      }
    }
  })

})()
