_The master branch_ => [![CircleCI](https://circleci.com/gh/RedisLabs/redislabs-docs/tree/master.svg?style=svg)](https://circleci.com/gh/RedisLabs/redislabs-docs/tree/master)

# Redis Documentation Center

The Redis Documentation Center is built with [Hugo]( https://gohugo.io/ ) version 0.48 and is based on the [DocDock]( https://github.com/vjeantet/hugo-theme-docdock.git ) theme.

## Installing the Redis Documentation Center

To run the Redis Documentation Center locally:

1. Install the latest Hugo:

    * On CentOS:

        1. Install the copr plugin for yum: `sudo yum install yum-plugin-copr`
        1. Enable the Hugo repository: `sudo yum copr enable daftaupe/hugo`
        1. Install Hugo: `sudo yum install hugo`

    * On Ubuntu:
    
        * Install Hugo: `sudo apt-get install hugo`

    * On Windows:

        1. Install [chocolatey](https://chocolatey.org/install).
        1. Install Hugo: `choco install hugo -confirm`
        
    * On MacOS:

        1. Install [homebrew](https://brew.sh/)
        2. Install Hugo: `brew install hugo`

1. Verify that Hugo is installed: `hugo version`
1. Clone this repository to your local host.
1. Change directory to the redislabs-docs directory.
1. Start the hugo web server: `hugo server`

When the site builds successfully, open a browser window to http://localhost:1313 in order to preview your changes.


## Resolving build errors

If you receive build errors when trying to start the web server, you need to resolve the errors before you can preview your changes.

Common errors involve invalid filenames, generally caused by typos in filename references associated with Hugo shortcodes (e.g. `relref`, `image`, and so on).  Use examples throughout the site to resolve such issues.  

If you're running Windows, you might encounter the following errors when building the site:

``` console
Error <datetime stamp> Alias <filename> contains component with a trailing space or period, problematic on Windows
Error: Error building site: cannot create <filename>: Windows filename restriction
```

If this happens, try adding the following to `\config.toml`, in the section _above_ the `[params]` section: 

``` console
disableAliases=true
```

Save your changes and then try rebuilding the site.  It should work.

If you need to do this, please use care to _not_ check in your updated `config.toml`.  (Consider adding it to your local `.gitignore` file.)

## Publishing

The latest branch is the latest stable version of documentation for the latest publicly available release at: https://docs.redis.com/latest

Documentation for previous versions is published through the version build branches (for example 5.2-build).

The master branch is published to https://docs.redis.com/staging/dev and represents the unstable version of documentation for the latest publicly available release. When stable, this branch is published to the latest branch.

## Contributing to the documentation

Whether you see a typo or you want to suggest a change to the technical content, we encourage you to fork this repository and submit a pull request.

An "Edit on GitHub" link appears in the upper-left corner of every page; it opens the source file in a GitHub editing session, which let you submit changes quickly and easily.

## Content organization

Articles are organized in directories that present the articles in a hierarchy in the site sidebar. When you add a file to a directory, it is automatically listed in that section in the sidebar.

The metadata (front matter) of a page is used to:

* Order the articles in a section by the 'weight' parameter (Remember, lower weight = higher priority
* Mark articles as `draft: true` so that they are not published

To add a new section in the sidebar, you must add a directory and add an `_index.md` file in that directory. The content of the _index.md file is shown when you click on the category in the sidebar, and the `weight` of the _index.md file determines the order in which the category is listed in the sidebar.

## Markdown

For more information about markdown syntax for our docs, see the [cheatsheet](https://docs.redis.com/latest/cheatsheet).
