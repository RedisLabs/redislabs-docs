_The master branch_ => [![CircleCI](https://circleci.com/gh/RedisLabs/redislabs-docs/tree/master.svg?style=svg)](https://circleci.com/gh/RedisLabs/redislabs-docs/tree/master)

# Redis Labs Documentation Center

The Redis Labs Documentation Center is built with [Hugo]( https://gohugo.io/ ) and is based on the [DocDock]( https://github.com/vjeantet/hugo-theme-docdock.git ) theme.

## Installing the Redis Labs Documentation Center

To run the Redis Labs Documentation Center locally:

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

To access the site, go to: http://localhost:1313

<!-- ## Staging

Version branches are automatically built to https://docs.Redis Labs.co.

When you commit a change to any other branch, the site is built to the staging directory  so you can preview and share your changes before publishing them in the official public documentation.

Your staging website is available at: https://docs.Redis Labs.co/staging/<branch_name>

Don't worry about cluttering - staging websites are automatically removed after 21 days.

## Publishing

Official version documentation is published through the version build branches (for example 4.3.0-build).

The master branch is published to https://docs.Redis Labs.co/staging/dev and represents the latest documentation for the latest publicly available release. This branch is published to the latest official version site once a day.

The next branch is published to https://docs.Redis Labs.co/staging/next and represents the latest documentation for the upcoming release. This branch is published to the community documentation site https://docs.Redis Labs.co/community each time a community milestone is released. -->

## Contributing to the documentation

Whether you see a typo or you want to suggest a change to the technical content, we encourage you to fork this repository and submit a pull request.

The "Edit on GitHub" link that is in the upper-left corner of every page opens the source file of that page so you can easily submit a change.

## Content organization

Articles are organized in directories that present the articles in a heirarchy in the site sidebar. When you add a file to a directory, it is automatically listed in that section in the sidebar.

The metadata (front matter) of a page is used to:

* Order the articles in a section by the 'weight' parameter (Remember, lower weight = higher priority
* Mark articles as `draft: true` so that they are not published

To add a new section in the sidebar, you must add a directory and add an `_index.md` file in that directory. The content of the _index.md file is shown when you click on the category in the sidebar, and the `weight` of the _index.md file determines the order in which the category is listed in the sidebar.

<!-- ## Link to latest 

To create a link that will always direct to the latest version of the docs use 'latest/' syntax:
```
[Latest home page](http://docs.Redis Labs.co/latest)
```
Goes to: `http://docs.Redis Labs.co/<latest_version_number>`

For example: [Latest home page](http://docs.Redis Labs.co/latest)

## Markdown

For more information about markdown syntax, see the [cheatsheet](http://www.redislabs.com/docs/latest/cheatsheet). -->
