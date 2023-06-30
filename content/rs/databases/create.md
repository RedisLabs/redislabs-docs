---
title: Create a Redis Enterprise Software database
linkTitle: Create a database
description: Create a database with Redis Enterprise Software.
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
db_type: database
aliases: [
    /rs/administering/creating-databases/_index.md,
    /rs/administering/database-operations/creating-database/,
    /rs/databases/create-database.md,
    /rs/databases/create-database/,
    /rs/administering/creating-databases/,
    /rs/databases/create.md,
    /rs/databases/create/,
]
---
Redis Enterprise Software lets you create databases and distribute them across a cluster of nodes.

To create a new database:

1. In your web browser, open the admin console of the cluster that you want to connect to in order to create the database.

    The default URL is: `https://<hostname>:8443`

1. Use one of the following methods to create a new database:

    - [Quick database](#quick-database)

    - [Create database](#create-database) with additional configuration

1. If you did not specify a port number for the database, you can find the port number in the **Endpoint** field in the **Databases > Configuration > General** section.

1. [Test client connectivity]({{<relref "/rs/databases/connect/test-client-connectivity">}}).

{{< note >}}
For databases with Active-Active replication for geo-distributed locations,
see [Create an Active-Active database]({{< relref "/rs/databases/active-active/create.md" >}}).
{{< /note >}}

## Quick database

To quickly create a database and skip additional configuration options during initial creation:

1. On the **Databases** screen, select **Quick database**.

1. Configure basic database settings:

    - Database name

    - Port (optional; set by the cluster if not set manually)

    - Memory limit (GB)

    - Modules and modules parameters (optional)

1. Optionally select **Full options** to configure additional settings.

1. Select **Create**.

## Create database

To create a new database and configure additional settings:

1. On the **Databases** screen, select **Create database**.

1. Enter a **Database name**.

    - Maximum of 63 characters

    - Only letters, numbers, or hyphens (-) are valid characters

    - Must start and end with a letter or digit

    - Not case-sensitive

1. To configure additional database settings, expand each relevant section to make changes.

    See [Configuration settings]({{<relref "/rs/databases/configure#config-settings">}}) for more information about each setting.

1. Select **Create**.
