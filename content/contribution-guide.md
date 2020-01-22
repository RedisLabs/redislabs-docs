---
title: Contribution Guide
description: How to contribute to the Redis Labs documentation
draft: false
---
Redis Labs documentation is an open source project and we welcome edits of all types.

Just to get you started, here is a simple explanation of how to contribute content to the docs.

## Edit in GitHub vs. Open an Issue

If you see a problem on a page, either with content or formatting, and you think you can fix it,
you can click on the *Edit on GitHub- link, [edit the page, and submit the change]({{< relref "/editing-guide.md" >}}).

If you see a problem on a page but you don't know how to fix it,
go to [the Issues section of the repository](https://github.com/RedisLabs/redislabs-docs/issues) on GitHub and submit a *New Issue*.

{{% note %}}
If you do not have the information to enter into the issue, **DO NOT*- open a new blank issue.
{{% /note %}}

## Branches vs. Forks

The redislabs-docs repository is public but only members of the repository can create new branches in the repo.
New branches in the repo are automatically built into staging sites at: `http://docs.redislabs.com/staging/<branch>`
After every commit to a branch, the site is re-built within about 1 minute so you can see the live updates.

If you are not a member of the repository, you can fork the repository to a branch in your account
and make your changes on your private branch.
**You must*- use a new branch for every change.
If the changes that you make resolve two separate issues, make two separate PRs.

After you commit your changes to the public repo or your forked repo,
you can open a pull request to submit your changes for consideration.

## Adding Pages

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

## Adding Sections

To add a section to the docs that includes multiple articles, you must add a directory with a `_index.md` file.
The `_index.md` file is the landing page for the section that should contain the main information for the section.

Start the article with the header information as shown above
and fill the body with information that is relevant to all articles in the section.
If you do not have content that can serve as the landing page for the section,
you can use the `children` shortcode to show all of the sub-topics for the section.

```src
{{%/* children style="h2" description="true" */%}}
```

## Writing Article Content

The structure of an article is:

- Concepts
- Prerequisites (if necessary)
- Informational notices (if necessary)
- Procedure

Every article must relate to only one procedure,
and the concepts must explain any background information that is needed to know when and why to use the procedure.

### Writing structure

- The concept section consists of:
    - 2-4 paragraphs in the section or subsection
    - 2-4 sentences in each paragraph
    - 10-15 words in each sentence section
    - Break lines at logical sentence breaks (end of sentence, comma)
- The prerequisites are listed as bullet points
- List notes and warnings before the procedure
- For procedures:
    - No more than 10 steps
    - Sub-procedures must be one step with multiple sub-steps

        {{% expand "For example:" %}}

        1. To create service accounts, on each participating cluster:

            1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the CRDB.
                By default, the address is: `https://<RS_address>:8443`
            1. Go to **settings > team*- and click ![Add](/images/rs/icon_add.png#no-click "Add").
            1. Enter the name, email, and password for the user, select the **Admin*- role,
                and click ![Save](/images/rs/icon_save.png#no-click "Save").

            ![Service Account Creation](/images/rs/create-service-account.png)

        1. To make sure that there is network connectivity between the participating clusters,
            telnet on port 9443 from each participating cluster to each of the other participating clusters.

            ```src
            telnet <target FQDN> 9443
            ```

        {{% /expand %}}

### Writing guidelines

- Lead the sentence with the subject
- Use “must” instead of - needs, wants, has to, desire, ...
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
| Procedure | Please sign up for Redis Cloud Pro account. | Sign up for a Redis Cloud Pro account. | Do not use `please`. Do not skip `a`, `an`, or `the`. |
| Procedure | Enter the Deployment CIDR that you will need to use | Enter the required Deployment CIDR. | Do not use future tense or any other complex verbs |
