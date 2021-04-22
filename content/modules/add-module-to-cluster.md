---
Title: Adding a Module to a Cluster
description:
weight: 4
alwaysopen: false
categories: ["Modules"]
aliases:
    - /modules/upgrading/rs/
    - /rs/developing/modules/upgrading/
    - /modules/upgrading-rs/
---
We are constantly working to improve the modules.
To get the latest features and fixes for a module, you must upgrade the module in Redis.

{{< note >}}

- Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x.
- We recommend that you test module upgrade commands in a test environment before you upgrade modules in a production environment. The module upgrade arguments are not validated during the upgrade process and incorrect arguments can cause unexpected downtime.
- Upgrading a cluster with a single node does not load the new modules that are bundled with the new cluster version.
- Before you upgrade a database with RediSearch Module to Redis 5.0, you must upgrade the RediSearch Module to version 1.4.2 or above.

{{< /note >}}

## Getting the packaged modules

- Redis Enterprise modules - To download the upgrades to the modules,
    go to the [Redis Labs Download Center](https://redislabs.com/download-center/modules/).
- Custom packaged modules - Either download the [custom packaged module](https://redislabs.com/community/redis-modules-hub/) from the developer or [package the module yourself]({{< relref "/modules/packaging-modules.md" >}}).

## Adding a module to Redis Enterprise Software cluster

To deploy an upgraded package:

1. In the Redis Enterprise web UI, go to the: **settings**
1. In **redis modules**, click **Add Module**.

    ![upgrade_module-1](/images/rs/upgrade_module-1.png?width=1600&height=956)

1. Browse to the packaged module and upload
    it.
1. Note the version number of the new module version.
1. In **databases**, select the configuration section.

    The database configuration shows that a new version of the module is available for the database.

    ![update_available-1](/images/rs/update_available-1.png?width=1346&height=1600)


[Adding modules to a database]({{< relref "/modules/add-module-to-database.md">}}).
[Upgrading a database's module]({{< relref "/modules/add-module-to-database.md">}}).
