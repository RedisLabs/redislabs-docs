(function() {

  const SEARCH_API_URL = "https://search-service.redislabs.com/search"
  const THIRTY_SECONDS = 30000
  const SEARCH_LOGO = '<a class="powered-by-redisearch" href="https://oss.redislabs.com/redisearch/"></a>'


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

      // super() ends up calling the superclass's version of initialize.
      // Why on earth would that be? I don't know. But we need to clean
      // up some styles we don't need.
      this.resultList.style.visibility = null;
      this.resultList.style.position = null;
      this.resultList.style['z-index'] = null;
      this.resultList.style.width = null;
      this.resultList.style['box-sizing'] = null;
      this.resultList.style['pointer-events'] = null;
      this.resultList.style.bottom = null;

      this.resultContainer = this.root.querySelector('.autocomplete-result-list-wrapper')

      this.resultContainer.style.position = "absolute"
      this.resultContainer.style['z-index'] = "1"
      this.resultContainer.style.width = "100%"
      this.resultContainer.style['box-sizing'] = "border-box"
      this.resultContainer.style.visibility = "hidden"
      this.resultContainer.style['pointer-events'] = "none"
      this.resultContainer.style.bottom = "100%"

      this.redisearchLogo = this.root.querySelector('.redisearch-logo')

      this.initialize()
    }

    // Set up aria attributes and events
    initialize = () => {
      this.root.style.position = 'relative'

      this.input.setAttribute('role', 'combobox')
      this.input.setAttribute('autocomplete', 'off')
      this.input.setAttribute('autocapitalize', 'off')
      this.input.setAttribute('autocorrect', 'off')
      this.input.setAttribute('spellcheck', 'false')
      this.input.setAttribute('aria-autocomplete', 'list')
      this.input.setAttribute('aria-haspopup', 'listbox')
      this.input.setAttribute('aria-expanded', 'false')

      this.resultList.setAttribute('role', 'listbox')

      this.resultContainer.style.position = 'absolute'
      this.resultContainer.style.zIndex = '1'
      this.resultContainer.style.width = '100%'
      this.resultContainer.style.boxSizing = 'border-box'

      // Generate ID for results list if it doesn't have one
      if (!this.resultList.id) {
        this.resultList.id = uniqueId(`${this.baseClass}-result-list-`)
      }

      this.input.setAttribute('aria-owns', this.resultList.id)

      // Remove the superclass event handlers so we can add our replacements.
      // Not sure why this is necessary if we're extending the class...
      this.input.removeEventListener('blur', this.core.handleBlur)
      this.input.removeEventListener('keydown', this.core.handleKeyDown)
      document.body.removeEventListener('click', this.handleDocumentClick)

      this.input.addEventListener('keydown', e => this.handleKeyDown(e))
      document.body.addEventListener('click', this.handleDocumentClickReplacement)
      this.input.addEventListener('input', this.core.handleInput)
      this.input.addEventListener('keydown', this.core.handleKeyDown)
      this.input.addEventListener('focus', this.core.handleFocus)
      this.resultList.addEventListener(
        'mousedown',
        this.core.handleResultMouseDown
      )
      this.resultList.addEventListener('click', this.core.handleResultClick)

      this.updateStyle()
    }

    handleBlurReplacement = (event) => {
      this.redisearchLogo.style.visibility = "hidden"
      this.core.handleBlur(event)
    }

    handleDocumentClickReplacement = (event) => {
      if (this.root.contains(event.target)) {
        return
      }
      this.core.hideResults()
    }

    updateStyle = () => {
      this.root.dataset.expanded = this.expanded
      this.root.dataset.loading = this.loading
      this.root.dataset.position = this.position

      this.redisearchLogo.style.visibility = this.expanded ? 'visible' : 'hidden'
      this.resultContainer.style.visibility = this.expanded ? 'visible' : 'hidden'
      this.resultContainer.style.pointerEvents = this.expanded ? 'auto' : 'none'
      if (this.position === 'below') {
        this.resultContainer.style.bottom = null
        this.resultContainer.style.top = '100%'
      } else {
        this.resultContainer.style.top = null
        this.resultContainer.style.bottom = '100%'
      }
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
            // Push a fake 'no results' document if there were no results.
            if (!data.results.length) {
              results = [{
                title: "",
                section_title: `No results found for "${trimmedInput}"`,
                body: "",
                hierarchy: ['']
              }]
            }
            else {
              results = data.results
            }

            setWithExpiry(url, results, THIRTY_SECONDS)
            resolve(results)
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
    },

    onUpdate: (results, selectedIndex) => {
      const redisearchLogo = document.querySelector('.redisearch-logo')
      if (results.length) {
        redisearchLogo.innerHTML = SEARCH_LOGO
      } else {
        redisearchLogo.innerHTML = ""
      }
    }
  })
})()
