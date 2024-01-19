---
Title: Enable a module for a database
linkTitle: Enable for a database
description:
weight: 30
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases:
  - /modules/rs
  - /rs/developing/modules/upgrading/
  - /rs/developing/modules/installing/
  - /modules/create-database-rs/
  - /modules/add-module-to-database/
  - /modules/install/add-module-to-database/

---

Modules add additional functionality to Redis databases for specific use cases. You can enable modules when you create a database.

## Prerequisites

- [Installed the module on the cluster]({{<relref "/stack/install/add-module-to-cluster">}})
- [Upgraded the module]({{<relref "/stack/install/upgrade-module">}}) to the latest version

## Create a database with a module

{{<note>}}
You can only add modules to a database when you first create it. You cannot add modules to an existing database.
{{</note>}}

In the Redis Enterprise Cluster Manager UI, follow these steps to add modules to a database:

1. From the **Databases** screen, select **Quick database** or **Create database**.

1. In the **Modules** section, select which modules to add to your database.

    {{<image filename="images/rs/screenshots/databases/quick-db-modules.png" width="75%" alt="Select which modules to add to your database.">}}{{</image>}}

    {{<note>}}
You cannot use RediSearch 1.x and RediSearch 2.x in the same database.
    {{</note>}}

1. To use custom configuration with a module:

    1. Select **Modules parameters**.
    
    1. Enter the [configuration options](#module-configuration-options).
    
    1. Select **Done**.

1. Configure additional database settings.

    {{<note>}}
Depending on the [features supported by an enabled module]({{<relref "/stack/enterprise-capabilities#module-feature-support">}}), certain database configuration fields may not be available.
    {{</note>}}

1. Select **Create**.

## Module configuration options

- [RediSearch configuration options]({{<relref "/stack/search/config">}})

- [RedisTimeSeries configuration options]({{<relref "/stack/timeseries/config">}})

- [RedisBloom configuration options]({{<relref "/stack/bloom/config">}})