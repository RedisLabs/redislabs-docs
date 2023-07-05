---
Title: Install RedisGears
linkTitle: Install
description:
weight: 60
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisgears/installing-redisgears/
---
Before you can use RedisGears, you have to install the RedisGears module on your Redis Enterprise cluster.

## Minimum requirements

- Redis Enterprise 6.0.12 or later
- The [cluster is setup]({{< relref "/rs/clusters/new-cluster-setup.md" >}}) and all of the nodes are joined to the cluster

## Install RedisGears

If your cluster uses Redis Enterprise v6.0.12 or later and has internet access, you only need to download the RedisGears package. It automatically fetches dependencies like the Python and JVM plugins during online installation.

Offline installation requires you to manually upload dependencies to the master node.

### Install RedisGears and dependencies

1. Download the **RedisGears** package from the Redis Enterprise [download center](https://app.redislabs.com/#/rlec-downloads).

    {{<note>}}
For offline installation of RedisGears v1.2 and later, you also need to download the **RedisGears Dependencies** packages for both Python and Java.
<br/>
For RedisGears v1.0, you only need the Python dependency package.
    {{</note>}}

1. Upload the RedisGears package to a node in the cluster.

1. For offline installation only, copy the dependencies to the following directory on the master node: `$modulesdatadir/rg/<version-integer>/deps/`
    ```sh
    $ cp redisgears-jvm.<OS>.<version>.tgz $modulesdatadir/rg/<version-integer>/deps/
    ```

    Replace these fields with your own values:

    - `<OS>`: the operating system running Redis Enterprise
    - `<version>`: the RedisGears version `(x.y.z)`
    - `<version-integer>`: the RedisGears version as an integer, calculated as <nobr>`(x*10000 + y*100 + z)`</nobr>

        For example, the `<version-integer>` for RedisGears version 1.2.5 is 10205.

    {{<note>}}
Skip this step unless your cluster does not have internet access.
    {{</note>}}

1. Add RedisGears to the cluster with a `POST` request to the master node's [`/v2/modules`]({{<relref "/rs/references/rest-api/requests/modules#post-module-v2">}}) REST API endpoint:

    ```sh
    POST https://[host][:port]/v2/modules
    {"module=@/tmp/redisgears.<OS>.<version>.zip"}
    ```

Here, the *module* parameter specifies the full path of the module package and must be submitted as form-data. In addition, the package must be available and accessible to the server processing the request.

After the install is complete, RedisGears will appear in the list of available modules on the **settings** and **create database** pages of the Redis Enterprise admin console.

### Enable RedisGears for a database

After installation, create a new database and enable RedisGears:

- [With Python]({{<relref "/stack/gears-v1/python/install">}})

- [With the JVM]({{<relref "/stack/gears-v1/jvm/install">}})

## Uninstall RedisGears

To uninstall RedisGears, make a [`DELETE` request to the `/v2/modules` REST API endpoint]({{<relref "/rs/references/rest-api/requests/modules#delete-module-v2">}}).
