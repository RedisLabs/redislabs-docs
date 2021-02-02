---
title: Contribution Guide
description: How to contribute to the Redis Labs documentation
draft: false
---
Redis Labs documentation is an open source project and we welcome edits of all types.

Just to get you started, here is a simple explanation of how to contribute content to the docs.


## Edit in GitHub vs. open an issue

If you see a problem on a page, either with content or formatting, and you think you can fix it,
you can click on the **Edit on GitHub** link, [edit the page, and submit the change]({{< relref "/editing-guide.md" >}}).

<mark>If you see a problem on a page but you don't know how to fix it,
go to [the Issues section of the repository](https://github.com/RedisLabs/redislabs-docs/issues) on GitHub and submit a **New Issue**.

{{< note >}}
If you do not have the information to enter into the issue, **DO NOT** open a new blank issue.
{{< /note >}}</mark>

## Branches vs. forks

The redislabs-docs repository is public but only members of the repository can create new branches in the repo.
New branches in the repo are automatically built into staging sites at: `http://docs.redislabs.com/staging/<branch>`
After every commit to a branch, the site is re-built within about 1 minute so you can see the live updates.

If you are not a member of the repository, you can fork the repository to a branch in your account
and make your changes on your private branch.
**You must** use a new branch for every change.
If the changes that you make resolve two separate issues, make two separate PRs.

After you commit your changes to the public repo or your forked repo,
you can open a pull request to submit your changes for consideration.

## Serving the docs site locally

After you clone the repository to your local machine, you can serve the site locally with Hugo and then browse to http://localhost:1313 to see how it looks.

The Redis Labs documentation site does not run on the latest version of [Hugo](http://gohugo.io).
You can go to the readme page of the redislabs-docs repository to find the version of Hugo that is currently supported.

To run an older version of Hugo on your local machine:

1. Go to the [Hugo releases](https://github.com/gohugoio/hugo/releases) and find the release version you want.
1. Download your selected binary — by default, it goes to your Downloads folder.
1. In terminal, navigate to: /usr/local/bin
1. Create a directory for this version of Hugo and name it something sensible, like “hugo-0.57.2”.
1. In your terminal, cd to your newly created Hugo-version folder, and run: `tar zxf ~/Downloads/<hugo_archive>`
1. Confirm it’s working from the command line now: `./hugo version`
1. Make a shell config file alias, for example: `alias hugo57='/usr/local/bin/hugo-0.57.2/hugo'`
1. Go to your redislabs-docs repo and use the alias to build the docs, for example: `hugo57 serve`

## Adding pages

Every article in the docs is an individual markdown file.
To add a new article in the docs, you must add a markdown file in the hierarchy of the content directory.

The markdown file must include these metadata in the header of the file:

- `Title:` - The title of the article
- `description:` - A short description of the article (Currently not used)
- `weight:` - A number that indicates the location of the article among the articles in the directory (0 is top)
- `alwaysopen: false` - The article is by default hidden in the table of contents in the directory
- `categories:` - The product that the article relates to: `RC`, `RS`, `Platforms`, `Modules`

For example:

```yaml
---
Title: Usage Reports
description:
weight: 70
alwaysopen: false
categories: ["RC"]
---
```

## Adding sections

To add a section to the docs that includes multiple articles, you must add a directory with a `_index.md` file.
The `_index.md` file is the landing page for the section that should contain the main information for the section.

Start the article with the header information as shown above
and fill the body with information that is relevant to all articles in the section.
If you do not have content that can serve as the landing page for the section,
you can use the `children` shortcode to show all of the sub-topics for the section.

```sh
{{%/* children style="h2" description="true" */%}}
```

## Writing article content

The structure of an article is:

- A short description (2-4 sentences) of the article.
- Concepts
- Prerequisites (if necessary)
- <mark> Informational notices (if necessary)</mark>
- Procedure

Every article must relate to only one procedure,
and the concepts must explain any background information necessary about when and why to use the procedure.

### Writing structure

- The concept section consists of:
    - <mark> 2-4 paragraphs in the section or subsection </mark>
    - <mark> 2-4 sentences in each paragraph </mark>
    - <mark> 10-15 words in each sentence section </mark>
    - <mark> Break lines at logical sentence breaks (end of sentence, comma)</mark>
- The prerequisites are listed as bullet points
- <mark> List notes and warnings before the procedure</mark>
- For procedures:
    - No more than 10 steps
    - Sub-procedures must be one step with multiple sub-steps

        {{% expand "For example:" %}}

        1. To create service accounts, on each participating cluster:

            1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the CRDB.
                By default, the address is: `https://<RS_address>:8443`
            1. Go to **settings > team** and click ![Add](/images/rs/icon_add.png#no-click "Add").
            1. Enter the name, email, and password for the user, select the **Admin** role,
                and click ![Save](/images/rs/icon_save.png#no-click "Save").

            ![Service Account Creation](/images/rs/create-service-account.png)

        1. To make sure that there is network connectivity between the participating clusters,
            telnet on port 9443 from each participating cluster to each of the other participating clusters.

            ```sh
            telnet <target FQDN> 9443
            ```

        {{% /expand %}}

### Writing guidelines

- We recommend that you use a markdown linter in your IDE to maintain good markdown syntax.
- Format names of UI controls in bold - **OK**
- Format commands, filenames, and input text in code - `rladmin`
- <mark> Introduce a procedure with the goal of the procedure and a colon (:) - To authenticate to the Swagger UI:</mark>
- <mark> Lead the sentence with the subject
- Use “must” instead of - needs, wants, has to, desire, ... </mark>
- Subject and verb must agree in number - blueprint exists, blueprints exist
- Don’t start a sentence with “also”
- Instead of writing “In this section” write what is in the section:
    - Incorrect - `In this section detailed description of available development tools, like built-in features, widget objects, functions, template mechanism and available libraries is provided.`
    - Correct - `The widget development tools include built-in features, widget objects, functions, template mechanism and available libraries.`
- Link from text itself instead of “see …”. For example:
    - Incorrect - `Using the React Utility is the recommended method, and it requires a build operation. You must use the build system described in [Widget building]({{< relref "rs/_index.md" >}}) section.`
    - Correct - `Using the React Utility is the recommended method, and it requires a build operation in the [widget build system]({{< relref "rs/_index.md" >}}).`
- Terminology for APIs:
    - Your code calls an API, which usually returns something.
    - A call to a REST API sends an HTTP Request to the API URL and the server that hosts that URL usually returns an HTTP Response.
    - The Request and the Response usually consist of Headers and a Body. Query and Form parameters can also be part of the Request.
    - The Request Method determines the action that the Server should perform to process the Request.
    - The CRUD actions are what the server does when it processes the POST, GET, PATCH/PUT, DELETE methods.

### Writing tone

We use a friendly but functional tone.
Use simple language in your writing so that it is easy for non-English speakers to understand your writing.
At the same time, do not skip words just to save space.

Here are some examples:

|  Text type | Wrong                                       | Correct                                | Explanation                                           |
| --- | ------------------------------------------- | -------------------------------------- | ----------------------------------------------------- |
| Procedure | Sign up for Redis Cloud Pro account. | Sign up for a Redis Cloud Pro account. | Do not use `please`. Do not skip `a`, `an`, or `the`. |
| Procedure | Enter the Deployment CIDR that you will need to use | Enter the required Deployment CIDR. | Do not use future tense or any other complex verbs |

### Common syntax gotchas

- Lists
    - List procedures in numbered lists preceded with a blank line -

        ```sh
        To add your name:

        1. Click here.
        1. Enter your name.
        1. Click **OK**.
        ```

- List items in bulleted lists preceded with a blank line -

        ```sh
        The ingredients are:

        - Potatoes
        - Chocolate
        ```

- To add more information about a step in a procedure, add a blank line and a tab before the sentence -

        ```sh
        1. Click here.

            Here means where you need to click.

        1. Enter your name.
        ```

- When you list types of items, put the name of the item in bold followed by a dash (-) and then describe the item:

        ```sh
        Some API operations require input, such as:

        - **Parameters** - When an API operation requires URI parameters, such as "get subscription by subscription id,
        you can enter the values for the parameters.

        - **JSON Request Body** - For API operations that require a JSON request body, you can either:

            - Use the **model display** to write the request based on the expected JSON structure and parameters.

            - Use the **Try it now** sample JSON created by Swagger as a base template that you can edit and execute.
        ```

### Images and notices

- Add images below text at the same tab level as the text -

        ```sh
       The API response is shown in the **Responses** section of the API operation.
       The results include an example of how you to execute the same operation in a standard command-line utility using `cURL`.

       ![swagger-query-results](/images/rv/api/swagger-query-results.png)
       ```

- Use info boxes to add additional information and note boxes to add information that can avoid problems.

        ```sh
        {{% info %}}
        We use `cURL` and Linux shell scripts to provide examples on using the API.
        {{% /info %}}

        {{< note >}}
        The key values are not saved when you refresh the page.
        {{< /note >}}
        ```

- When you add info, note or warning boxes below indented text, you must indent the open and close tags and not indent the content.

        ```sh
        {{< note >}}
        The key values are not saved when you refresh the page.
        {{< /note >}}
        ```

## Related Info

For more info about editing and writing our documents:

- [Editing guide]({{<relref "content/editing-guide.md">}})
- [Markdown cheatsheet]({{<relref "content/cheatsheet.md">}})
