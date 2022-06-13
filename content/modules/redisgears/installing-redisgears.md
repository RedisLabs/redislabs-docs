---
Title: Install RedisGears 
linkTitle: Install
description:
weight: 60
alwaysopen: false
categories: ["Modules"]
---
Before you can use RedisGears, you have to install the RedisGears module on your Redis Enterprise cluster.

## Minimum requirements

- Redis Enterprise 6.0.12 or later
- The [cluster is setup]({{< relref "/rs/clusters/new-cluster-setup.md" >}}) and all of the nodes are joined to the cluster

## Install RedisGears

If your cluster uses Redis Enterprise v6.0.12 or later and has internet access, you only need to download the RedisGears package. It automatically fetches dependencies like the Python and JVM plugins during online installation.

Offline installation requires you to manually upload dependencies to the master node.

### Install RedisGears and dependencies

1. Download the **RedisGears** package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

    {{<note>}}
For offline installation of RedisGears v1.2 and later, you also need to download the **RedisGears Dependencies** packages for both Python and Java.
<br></br>
For RedisGears v1.0, you only need the Python dependency package.
    {{</note>}}

1. Upload the RedisGears package to a node in the cluster.

1. For offline installation only, copy the dependencies to the following directory on the master node: `$modulesdatadir/rg/<version_integer>/deps/`
    ```sh
    $ cp redisgears-jvm.Linux-ubuntu18.04-x86_64.1.2.2.tgz $modulesdatadir/rg/10201/deps/
    ```

    {{<note>}}
Skip this step unless your cluster does not have internet access. 
    {{</note>}}

1. Add RedisGears to the cluster with a `POST` request to the master node's [`/v2/modules`]({{<relref "/rs/references/rest-api/requests/modules#post-module-v2">}}) REST API endpoint:

    ```sh
    $ curl -k -u "<user>:<password>" -F "module=@/tmp/redisgears.linux-centos7-x64.1.2.1.zip" https://localhost:9443/v2/modules
    ```

After the install is complete, RedisGears will appear in the list of available modules on the **settings** and **create database** pages of the Redis Enterprise admin console.

### Enable RedisGears for a database

After installation, create a new database and enable RedisGears:

- [With Python]({{<relref "/modules/redisgears/python/install">}})

- [With the JVM]({{<relref "/modules/redisgears/jvm/install">}})

## Uninstall RedisGears

To uninstall RedisGears, make a [`DELETE` request to the `/v2/modules` REST API endpoint]({{<relref "/rs/references/rest-api/requests/modules#delete-module-v2">}}).