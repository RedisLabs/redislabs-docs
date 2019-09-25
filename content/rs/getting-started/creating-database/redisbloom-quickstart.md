---
Title: RedisBloom Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/getting-started/creating-database/redisbloom/
---
For this quick start, you will need the following:

- [A Redis Enterprise Software cluster with set up already
    complete]({{< relref "/rs/getting-started/quick-setup.md" >}})
- Any redis-cli or RedisBloom enabled client

### Create a new database that uses the Module

1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the RedisBloom module.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    For example:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click the **Activate** button

## Using Bloom filters in Redis Enterprise Software

{{< embed-md "tryout-redisbloom.md" >}}

You can find more information in:

- [Developing with Bloom Filters]({{< relref "/modules/redisbloom/_index.md" >}})
- [Original Cuckoo Filter paper](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf)
