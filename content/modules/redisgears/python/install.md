---
Title: Install RedisGears and the Python plugin 
linkTitle: Install 
description:
weight: 20
alwaysopen: false
toc: "true"
categories: ["Modules"]
---

Before you can use RedisGears with Python, you need to install the RedisGears module and Python plugin on your Redis Enterprise cluster and enable them for a database.

## Prerequisites

1. Redis Enterprise v6.0.12 or later

1. [Created a Redis Enterprise cluster]({{<relref "/rs/clusters/new-cluster-setup">}})

1. [Added nodes to the cluster]({{<relref "/rs/clusters/add-node">}})

1. [Installed RedisGears and the Python plugin]({{<relref "/modules/redisgears/installing-redisgears#install-redisgears">}})

## Enable RedisGears for a database

1. From the Redis Enterprise admin console's **databases** page, select the **Add** button to create a new database:

    {{<image filename="images/rs/icon_add.png" width="30px" alt="The Add icon">}}{{</image>}}

1. Confirm that you want to create a new Redis database with the **Next** button.

1. On the **create database** page, give your database a name.

1. For **Redis Modules**, select the **Add** button and choose RedisGears from the **Module** dropdown list.

1. Select **Add Configuration**, enter <nobr>`Plugin gears_python CreateVenv 1`</nobr> in the box, then select the **OK** button:

    {{<image filename="images/rs/icon_save.png" width="30px" alt="The Save icon">}}{{</image>}}

    {{<note>}}
Only RedisGears v1.2 and later require this configuration.
    {{</note>}}

1. Select the **Activate** button.

## Verify the install

Run the `RG.PYSTATS` command to view statistics and verify that you set up RedisGears and the Python plugin correctly:

```sh
redis> RG.PYSTATS
```
