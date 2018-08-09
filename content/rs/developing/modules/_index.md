---
Title: Developing with Redis Modules in Redis Enterprise Software (RS)
description: $description
weight: $weight
alwaysopen: false
---
Note: Modules are not supported in Redis Enterprise Software on
RHEL/CentOS 6.x

Redis Labs' Packaged Modules {#packaged_modules}
----------------------------

There are three modules Redis Labs has developed, certified, and
packaged for use with Redis Enterprise Software (RS) clusters. They are:

-   RediSearch Enterprise
    -   [Quick
        Start](/redis-enterprise-documentation/getting-started/creating-database/redisearch/)
    -   [Developing with RediSearch
        Enterprise](/redis-enterprise-documentation/developing/modules/redisearch/)
-   ReJSON
    -   [Quick
        Start](/redis-enterprise-documentation/getting-started/creating-database/rejson-quick-start/)
    -   [Developing
        with ReJSON](/redis-enterprise-documentation/developing/modules/rejson/)
-   ReBloom
    -   [Quick
        Start](/redis-enterprise-documentation/getting-started/creating-database/rebloom/)
    -   [Developing with
        ReBloom](/redis-enterprise-documentation/developing/modules/bloom-filters/)

[In 5.0.2 and later, enterprise modules (RediSearch Enterprise, ReJSON,
ReBloom) come pre-installed.]{style="font-weight: 400;"}

To download these modules, please go to the [Redis Enterprise downloads
page](/products/redis-pack/downloads/).

To upgrade these modules, please go to [Upgrading a
Module](/redis-enterprise-documentation/developing/modules/upgrading/).

Critical: Redis Labs does not and can not support third party modules or
databases created with them.

Packaging Non-Certified Modules {#non-certified-modules}
-------------------------------

In addition to the ones Redis Labs packages and certifies, there are
other modules that can be installed and extend Redis databases in Redis
Enterprise Software. While many are compatible with RS, not all of them
are. If they work, they must be packaged so RS knows how to deploy and
use them in the cluster.

Deploying a custom module and creating a database utilizing that modules
require six steps:

1.  Get the module from git
2.  Compile the module
3.  Install ramp-packer utility
4.  Wrap the custom module using ramp utility
5.  Deploy the custom module to the cluster using the web UI
6.  Create a database that utilizes the module

### Get the Module from Github

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ git clone https://github.com/account/myModule.git
```

### Compile the Module

To compile the module just run:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ cd myModule/;make
```

### Install ramp-packer Utility

[RAMP](https://github.com/RedisLabs/RAMP) or "Redis Automatic Module
Packaging", is a utility created by Redis Labs for packaging up modules
to be installed into Redis Enterprise.

Run the next command to install ramp-packer:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ pip install ramp-packer
```

### Wrap the Custom Module Using Ramp Utility

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ ramp pack <PATH_TO_myModule.so> -a "Your Name" -e "yourname@emailaddress.com" 
-A "x86_64" -d "My Module" -h "https://www.mymodule.com/" -l "LicenseType" 
-r "4.0.2"
```

Go to [the
ramp ](https://github.com/RedisLabs/RAMP)github[page](https://github.com/RedisLabs/RAMP)
for more information each command line switch in ramp.

To deploy the packaged module, see [Installing a
Module](/redis-enterprise-documentation/developing/modules/installing/).
