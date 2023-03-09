---
Title: Redis Enterprise Software Release Notes 5.5 Preview (April 2019)
linkTitle: 5.5 preview (April 2019)
description: Preview release.  Databases support multiple modules.  
weight: 81
alwaysopen: false
categories: ["RS"]
aliases: /rs/release-notes/rs-5-5-preview-april-2019/
---
Redis Enterprise Software (RS) 5.5 Preview Edition is now available.

RS 5.5 is a preview version that includes all the capabilities of Redis Enterprise 5.4,
plus support for creation of Redis databases with multiple modules and support for these modules:

- RediSearch (GA)
- RedisGraph (GA)
- RedisBloom (GA)
- RedisJSON (GA)
- RedisAI (Preview Version)
- RedisTimeSeries (Preview Version)
- RedisGears (Preview Version)

## New features

RS 5.5 lets you create Redis databases with multiple Redis modules.

{{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

## Preview considerations

This preview version is a standalone version and is not supported for production environments.
You cannot upgrade to it from a lower version or upgrade from it to a higher version.
Unexpected behaviors/issues found in this release will be addressed in future releases.

This preview version is not supported for networks that are isolated from the internet.

## Installation instructions

To set up a cluster with nodes that can host databases with multiple modules, you must follow this procedure on each node in the cluster:

1. [Install RS 5.5](https://docs.redis.com/latest/rs/installing-upgrading/get-started-redis-enterprise-software/).
1. To install the modules, run: `sudo ./install-modules.sh`
1. Either:
    - Set up the node as the [first node in the cluster](https://docs.redis.com/latest/rs/clusters/new-cluster-setup/).
    - [Join the node to an existing cluster](https://docs.redis.com/latest/rs/clusters/add-node/).
