---
Title: Developing with Redis Modules in Redis Enterprise Software (RS)
description:
weight: $weight
alwaysopen: false
categories: ["Modules"]
aliases: /rs/developing/modules/
---
Note: Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x

## Redis Labs Packaged Modules

Redis Labs develops, certifies, and packages modules for use with Redis Enterprise
Software (RS) clusters. The available modules are:

- RediSearch
    - [Quick Start]({{< relref "/modules/redisearch/redisearch-quickstart.md" >}})
    - [Developing with RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
    - [Deployment Sizing Calculator](https://redislabs.com/redis-enterprise/redis-search/redisearch-sizing-calculator/)
- RedisBloom
    - [Quick Start]({{< relref "/modules/redisbloom/redisbloom-quickstart.md" >}})
    - [Developing with RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
- RedisTimeSeries
    - [Quick Start]({{< relref "/modules/redistimeseries/redistimeseries-quickstart.md" >}})
    - [Developing with RedisTimeSeries]({{< relref "/modules/redistimeseries/_index.md" >}})
    - [Deployment Sizing Calculator](https://redislabs.com/redis-enterprise/redis-time-series/time-series-calculator/)    
- RedisGraph (Preview)
    - [Quick Start]({{< relref "/modules/redisgraph/redisgraph-quickstart.md" >}})
    - [Developing with RedisGraph]({{< relref "/modules/redisgraph/_index.md" >}})
    - [Deployment Sizing Calculator](https://redislabs.com/redis-enterprise/redis-graph/redisgraph-calculator/)
- RedisJSON (Preview)
    - [Quick Start]({{< relref "/modules/redisjson/redisjson-quickstart.md" >}})
    - [Developing with RedisJSON]({{< relref "/modules/redisjson/_index.md" >}})

Enterprise modules are pre-installed with RS.

- To download later versions of these modules, go to: [Redis Enterprise downloads
page](https://redislabs.com/products/redis-pack/downloads/)
- To upgrade the modules, go to: [Upgrading a
Module]({{< relref "/modules/upgrading.md" >}})

{{% warning %}}
Redis Labs does not and cannot support third party modules or databases created with them.
{{% /warning %}}

## Packaging Non-Certified Modules

In addition to the ones Redis Labs packages and certifies, there are
other modules that can be installed and extend Redis databases in Redis
Enterprise Software. While many are compatible with RS, not all of them
are. If they work, they must be packaged so RS knows how to deploy and
use them in the cluster.

Deploying a custom module and creating a database utilizing that modules
require six steps:

1. Get the module from git
1. Compile the module
1. Install ramp-packer utility
1. Wrap the custom module using ramp utility
1. Deploy the custom module to the cluster using the web UI
1. Create a database that utilizes the module

### Get the Module from GitHub

```src
git clone https://github.com/account/myModule.git
```

### Compile the Module

To compile the module just run:

```src
cd myModule/;make
```

### Install ramp-packer Utility

[RAMP](https://github.com/RedisLabs/RAMP) or "Redis Automatic Module
Packaging", is a utility created by Redis Labs for packaging up modules
to be installed into Redis Enterprise.

Run the next command to install ramp-packer:

```src
pip install ramp-packer
```

### Wrap the Custom Module Using Ramp Utility

```src
$ ramp pack <PATH_TO_myModule.so> -a "Your Name" -e "yourname@emailaddress.com"
-A "x86_64" -d "My Module" -h "https://www.mymodule.com/" -l "LicenseType"
-r "4.0.2"
```

Go to [the ramp](https://github.com/RedisLabs/RAMP) github [page](https://github.com/RedisLabs/RAMP)
for more information each command line switch in ramp.

To deploy the packaged module, see [Installing a Module]({{< relref "/modules/installing.md" >}}).
