---
title: Contribution Guide
description: How to contribute to the Redis Labs documentation
draft: false
---
Redis Labs documentation is an open source project and we welcome edits of all types.

Just to get you started, here is a simple explanation of how to contribute content to the docs.

## Branches vs. Forks

The redislabs-docs repository is public but only members of the repository can create new branches in the repo.
New branches in the repo are automatically built into staging sites at: http://docs.redislabs.com/staging/<branch>
After every commit to a branch, the site is re-built within about 1 minute so you can see the live updates.

If you are not a member of the repository, you can fork the repository to a branch in your account.

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
- `categories:` - The product that the article relates to: `RC Essentials`, `RC Pro`, `RS`, `Platforms`

For example:

```yaml
---
Title: Usage Reports
description:
weight: 70
alwaysopen: false
categories: ["RC Pro"]
---
```

## Adding Sections

To add a section to the docs, you must add a directory with a `_index.md` file.
The `_index.md` file is the landing page for the section that should contain the main information for the section.
If you do not have an article that can serve as the landing page for the section,
you can use the `children` shortcode to show all of the sub-topics for the section.

## Writing an Article

The structure of an article is:

- Concepts
- Prerequisites (if necessary)
- Informational notices (if necessary)
- Procedure

Every article must relate to only one procedure,
and the concepts must explain any background information that is needed to know when and why to use the procedure.

### Writing tone

We use a friendly but functional tone.
Use simple language in your writing so that it is easy for non-English speakers to understand your writing.
At the same time, do not skip words just to save space.

Here are some examples:

|  Text type | Wrong                                       | Correct                                | Explanation                                           |
| --- | ------------------------------------------- | -------------------------------------- | ----------------------------------------------------- |
| Procedure | Please sign up for Redis Cloud Pro account. | Sign up for a Redis Cloud Pro account. | Do not use `please`. Do not skip `a`, `an`, or `the`. |
| Prodedure | Enter the Deployment CIDR that you will need to use | Enter the required Deployment CIDR. | Do not use future tense or any other complex verbs |

### Writing structure

The concept section consists of:

- 2-4 paragraphs in the section or subsection
- 2-4 sentences in each paragraph
- 10-15 words in each sentence section
- A sentences are divided into sections by commas
