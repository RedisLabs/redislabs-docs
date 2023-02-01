---
Title: Upgrade guide
linkTitle: Upgrade guide
description: Shows how to upgrade an existing Redis Data Integration installation to the latest avilable version.
weight: 60
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

## Upgrade RDI CLI

To upgrade the [`redis-di`]({{<relref "/rdi/reference/redis-di">}}) utility, download the latest version and then use the Python `pip` utility to install it using the `--upgrade` option: 

```bash
pip3 install https://qa-onprem.s3.amazonaws.com/redis-di/redis_di_cli-latest-py3-none-any.whl --upgrade
```

## Upgrade RDI Engine

Use the [`redis-di`]({{<relref "/rdi/reference/redis-di">}}) utility to upgrade the Redis Data Integration (RDI) Engine:


```bash
redis-di upgrade
```

When the version of the utility is higher than the version of the RDI Engine, this command upgrades the RDI Engine.


## Upgrade RedisGears Module

You can upgrade the [RedisGears](https://redis.com/modules/redis-gears/) module on a cluster running Redis Data Integration without downtime. 

The follow steps show how.  (Use care to follow the steps as specified; otherwise, the module may not upgrade properly.)

1. Download the new Python package for the latest version of RedisGears and copy it to a temporary location:

    ```bash
    curl -s https://redismodules.s3.amazonaws.com/redisgears/snapshots/redisgears_python.Linux-ubuntu18.04-x86_64.master.zip -o /tmp/redisgears.zip
    ```

1. Install the downloaded package to the cluster:

    ```bash
    curl -v -k -s -u "<CLUSTER_USER>:<CLUSTER_PASSWORD>" \
        -F "module=@/tmp/redisgears.zip" \
        https://<CLUSTER_HOST>:<CLUSTER_API_PORT>/v2/modules
    ```

    When successful, this returns an action ID you can use to monitor installation progress.

1. Use the following command to check installation progress:

    ```bash
    curl -k -s -u "<CLUSTER_USER>:<CLUSTER_PASSWORD>" \ 
       https://<CLUSTER_HOST>:<CLUSTER_API_PORT>/v1/actions/${action_uid}
    ```

    When this command returns a `completed` status, RedisGears has been successfully installed on the cluster.

1. Use the admin console to verify that the new module version (Settings | Redis modules):

    {{<image filename="images/rdi/cluster-redis-modules.png" alt="Cluster Redis modules" >}}{{</image>}}

1. From the **databases** command of the admin console, select the Redis Data Integration database and then select the **Configuration** tab.

    {{<image filename="images/rdi/redis-di-db-update-available.png" alt="Redis Data Integration Update Available" >}}{{</image>}}

    This should tell you that an upgrade is available. 

    You can also use `rladmin`to view the notification:

    ```bash
    rladmin status modules all
    ```

    {{<image filename="images/rdi/rladmin-status-modules.png" alt="rladmin status modules" >}}{{</image>}}
  
1. Use `rladmin` to upgrade the RedisGears module for the RDI database:

    ```bash
    rladmin upgrade module db_name redis-di-<ID> module_name \
       rg version 999999 module_args keep_args
    ```

    The output should be similar to the following:

    ```console
    Monitoring f3cdd38a-0c80-431e-ab3f-c5e2fea39414
    active - SMUpgradeBDB init
    active - SMUpgradeBDB restart
    .completed - SMUpgradeBDB
    Done
    ```

    When upgrading the module, keep the following mind:

    - Replace the `rg version` value with your version, which is shown in the JSON file provided with the module archive.  (See [Upgrade modules]({{<relref "/modules/install/upgrade-module">}}) for details.)

    - Be sure to specify the `keep_args` argument; otherwise, your configuration will be reset.

    - Database shards reset when modules are updated; this causes a brief service interruption across the cluster.

1.  You can use the admin console to verify that RedisGears has been successfully upgraded by checking the module's version number on the Configuration tab.

    {{<image filename="/images/rdi/redis-di-upgraded-redisgears.png" alt="Upgraded RedisGears" >}}{{</image>}}
