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

1. Created a Redis Enterprise cluster TODO link

1. Added nodes to the cluster TODO link

1. Install RedisGears and the Python plugin TODO link to installation instructions


## Enable RedisGears for a database

TODO this section needs to focus on python

1. From the Redis Enterprise admin console's **databases** page, select the **Add** button to create a new database:

    {{<image filename="images/rs/icon_add.png" width="30px" alt="The Add icon">}}{{</image>}}

1. Confirm that you want to create a new Redis database with the **Next** button.

1. On the **create database** page, give your database a name.

1. For **Redis Modules**, select the **Add** button and choose RedisGears from the **Module** dropdown list.

1. Select **Add Configuration**, enter `Plugin gears_jvm` in the box, then select the **OK** button:

    {{<image filename="images/rs/icon_save.png" width="30px" alt="The Save icon">}}{{</image>}}

    {{<note>}}
You can configure additional JVM options in this box. For example:<br></br>
`Plugin gears_jvm JvmOptions `<nobr>`'-Dproperty1=value1`</nobr> <nobr>`-Dproperty2=value2'`</nobr>
    {{</note>}}

1. Select the **Activate** button.

## Verify the install

Run the `RG.JSTATS` command from a database shard to view statistics and verify that you set up RedisGears and the JVM plugin correctly:

```sh
$ shard-cli 3
172.16.0.1:12345> RG.JSTATS
```
