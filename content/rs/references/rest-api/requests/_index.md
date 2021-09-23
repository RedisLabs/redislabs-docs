---
Title: Redis Enterprise REST API requests
linkTitle: Requests
description: Documents the requests supported by the Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

This page serves as the entry page for the endpoint reference section of the RS REST API docs.

When finished, it will contain:

- General information that applies to all endpoints that hasn't already been documented in the RST API entry page.

- An allchildren macro that displays a list of available object reference pages.

Pages will be adapted from the HTML shipped in the REST API tarball provided with RS 6.2.4.

One page will be created for each unique endpoint, which will in turn contain sections for each supported HTTP method.

Each page will distinguish between collection and individual entity versions of the endpoint.  Example:

- List entities

    Syntax: `GET endpoint`

- Get entity

    Syntax: `GET endpoint/${ID}`

The underlying design intent is to provide one page for each unique endpoint "branch" in the URL path--unless an interim path cannot be legitimately called as a standalone endpoint.

For example, consider `/debuginfo/all/bdb`.  If `debuginfo` or `debuginfo/all` aren't considered supported API calls, then we won't created pages for them.  Instead, we'll create one page that:

- sets filename to debuginfo-all-bdb.md
- documents the full path as the sytnax (`GET /debuginfo/all/bdb`)
- includes a comment that the other calls aren't intended to be called directly.

