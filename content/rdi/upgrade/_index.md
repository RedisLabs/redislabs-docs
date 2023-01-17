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

```bash
pip3 install https://qa-onprem.s3.amazonaws.com/redis-di/redis_di_cli-latest-py3-none-any.whl --upgrade
```

## Upgrade RDI Engine

Upgrading the RDI Engine is done using the RDI CLI. This action will upgrade the version of the RDI Engine to be the same one currently used by the running RDI CLI (only when the CLI version is higher than the RDI Engine version).

```bash
redis-di upgrade
```

## Upgrade RedisGears Module

[RedisGears](https://redis.com/modules/redis-gears/) Module can be upgraded for a Redis Enterprise Cluster running Redis Data Integration without downtime. Please read the following section for exact instructions.

**Important**: Failing to follow these steps in the right order, will result with the Redis Data Integration still running the old RedisGears version.

In order to upgrade the RedisGears module once a new release is available, the following steps should be followed:

- Download the new version of RedisGears (Python package only):

  ```bash
  curl -s https://redismodules.s3.amazonaws.com/redisgears/snapshots/redisgears_python.Linux-ubuntu18.04-x86_64.master.zip -o /tmp/redisgears.zip
  ```

- Install it in the cluster:

  ```bash
  curl -v -k -s -u "<CLUSTER_USER>:<CLUSTER_PASSWORD>" -F "module=@/tmp/redisgears.zip" https://<CLUSTER_HOST>:<CLUSTER_API_PORT>/v2/modules
  ```

- The above endpoint returns an action ID that you can monitor to see the installation progress by invoking this endpoint:

  ```bash
  curl -k -s -u "<CLUSTER_USER>:<CLUSTER_PASSWORD>" https://<CLUSTER_HOST>:<CLUSTER_API_PORT>/v1/actions/${action_uid}
  ```

  Once the status returned by this endpoint is `completed`, the new module is installed in the cluster.

- Verify that the new version is installed via the Admin Console (settings → redis modules):

  {{<image filename="images/di/cluster-redis-modules.png" alt="Cluster Redis modules" >}}{{</image>}}

- From the Admin console, go to your Redis Data Integration configuration view (databases → Redis Data Integration → configuration), you’ll see an indication that there’s an update available to your RedisGears module:

  {{<image filename="images/di/redis-di-db-update-available.png" alt="Redis Data Integration Update Available" >}}{{</image>}}

  You can also see this indication via the `rladmin`:

  ```bash
  rladmin status modules all
  ```

  {{<image filename="images/di/rladmin-status-modules.png" alt="rladmin status modules" >}}{{</image>}}
  
- Now, we should upgrade the RedisGears module in this Redis Data Integration database:

  ```bash
  rladmin upgrade module db_name redis-di-<ID> module_name rg version 999999 module_args keep_args
  ```

  Expected output:

  ```
  Monitoring f3cdd38a-0c80-431e-ab3f-c5e2fea39414
  active - SMUpgradeBDB init
  active - SMUpgradeBDB restart
  .completed - SMUpgradeBDB
  Done
  ```

  Notes:

  - Replace the rg version with your version (can be taken from the json available in the zip file of the module, see [instructions](https://docs.redis.com/latest/modules/install/upgrade-module/)).
  - It’s important to specify `keep_args` argument so the configuration won’t be reset.
  - Warning - After you upgrade the module for a database, the database shards restart. This causes a short interruption in the availability of this database across the cluster.

- Verify that the new RedisGears is used by Redis Data Integration by navigating to databases → Redis Data Integration → configuration:

  {{<image filename="images/di/redis-di-upgraded-redis-gears.png" alt="Upgraded RedisGears" >}}{{</image>}}
