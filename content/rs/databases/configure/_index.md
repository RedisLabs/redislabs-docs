---
title: Configure database settings
linktitle: Configure
description: Configure settings specific to each database.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
   /rs/databases/configure/_index.md,
   /rs/databases/configure/_index/,
   /rs/databases/configure/edit-delete-db/,
   /rs/databases/configure/edit-delete-db.md,
   /rs/administering/database-operations/updating-configurations/,
   /rs/administering/database-operations/updating-configurations.md,
]
---

You can manage your Redis Enterprise Software databases with several different tools:

- Admin console (the web-based user interface)
- Command-line tools
- [REST API]({{<relref "/rs/references/rest-api/_index.md">}})

## Admin console

You can change the configuration of a Redis Enterprise Software database at any time.<!--more-->

To edit the configuration of a database using the admin console:

1. Go to **Database** and select the database that you want to edit.
1. Go to **Configuration** and click **Edit** at the bottom of the page.
    The database settings appear.
1. Change any of the [configurable database settings]({{< relref "/rs/databases/configure/" >}}).

    {{< note >}}
For [Active-Active database instances]({{<relref "/rs/databases/active-active">}}), most database settings only apply to the instance that you are editing.
    {{< /note >}}

1. Click **Update**.

## Command-line tools

For details on using command line tools see:
- [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) for standalone database configuration
- [`crdb-cli`]({{<relref "/rs/references/cli-utilities/crdb-cli">}}) for Active-Active database configuration
- [`redis-cli`](https://redis.io/docs/manual/cli/) for open source Redis configuration

## REST API

See the [REST API reference]({{<relref "/rs/references/rest-api/_index.md">}}) for details on using the API to configure your database. 

