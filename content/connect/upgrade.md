---
Title: Upgrade Redis Connect components
linkTitle: Upgrade components
description: Shows how to upgrade Redis Connect components, including the CLI, the transformation engine, and RedisGears.
weight: $weight
alwaysopen: false
categories: ["Connect"]
aliases: /connect/install/
         /connect/install.md
---

Here, you learn how to upgrade Redis Connect components.

## Upgrade Redis Connect CLI

To upgrade the Redis Connect command-line interface (CLI), use the `--upgrade` switch to install the current version of the Python package:

``` console
pip3 install https://qa-onprem.s3.amazonaws.com/redis-connect/redis_connect_cli-latest-py3-none-any.whl --upgrade
```

If you're using virtual environments to manage multiple Python deployments, be sure to activate the correct environment before trying to upgrade the CLI.

## Upgrade transformation engine

The Redis Connect data transformation engine converts the source data to Redis data types.

Use the Redis Connect CLI `upgrade` command to update the data transformation engine in your Redis Connect instance to the one provided with Redis Connect CLI:

``` console
redis-connect upgrade
```

The `upgrade` command makes changes only when Redis Connect CLI is more recent than your Redis Connect instance.

## Upgrade RedisGears module

Redis Connect uses RedisGears to enable and implement the data transformation engine.  You can update RedisGears without downtime.  

The basic process is:

- Download the RedisGears Python package
- Install the RedisGears update to your cluster
- Update your Redis Connect instance to use the updated module

Parts of the process happen in the background.  As a result, each step must fully complete before the next step begins.  

These steps provide more details:

1. Download the most recent version of RedisGears

    ``` console
    curl -s http://redismodules.s3.amazonaws.com/redisgears/snapshots/redisgears_python.Linux-ubuntu18.04-x86_64.master.zip -o /tmp/redisgears.zip
    ```

2.  Use the `v2/modules/` REST endpoint to install the RedisGears update in your cluster

    ``` console
    curl -k -s -u "<CLUSTER_USER>:<CLUSTER_PASSWORD>" -F "module=@/tmp/redisgears.zip" https://<CLUSTER_HOST>:<CLUSTER_API_PORT>/v2/modules
    ```
    The response object includes an action ID to help track installation progress  
    
    Use the `/actions/` endpoint to determine installation progress:

    ``` console
    curl -k -s -u "<CLUSTER_USER>:<CLUSTER_PASSWORD>" https://<CLUSTER_HOST>:<CLUSTER_API_PORT>/v1/actions/${action_uid}
    ```

    This endpoint returns `complete` when installation is finished.

    Use the admin console to verify that the RedisGears update is available to your cluster

    From the **Settings** menu, select **Redis modules** and then verify that the RedisGears version matches the update

3.  Update the Redis Connect instance to use the RedisGears update
    
    Use `rladmin` to update your Redis Connect instance to the correct RedisGears version:

    ``` console
    rladmin upgrade module db_name redis-connect module_name rg version 999999 module_args keep_args
    ```

    The passed with the `rg version` parameter is the version number associated with the RedisGears update.  You can find this in the JSON file provided with your download.

    Be sure to specify the `keep_args` parameter; otherwise, the configuration will be reset, with unpredictable results.

    To verify the RedisGears version used with your RedisConnect instance:
    
    1.  Select the **Databases** menu of the admin console and then select redis-connect from the list of databases.  Select the **Configuration** tab and then locate the **Redis modules** section.
        
        If an information icon appears to the right of the RedisGears version, the update is available for use.
        
    2.  You can also also use `rladmin` to display the RedisGears version for your Redis Connect instance:
        
        ``` console
        rladmin status modules all
        ```
        
Updating a database configuration restarts shards associated with the database, which briefly interrupts availability across the cluster.