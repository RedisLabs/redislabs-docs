---
Title: Add a module to a cluster
linkTitle: Install
description:
weight: 10
alwaysopen: false
categories: ["Modules"]
aliases:
    - /modules/add-module-to-cluster/
---

{{<note>}}
Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x.
{{</note>}}

## Get packaged modules

To install or upgrade a module in a [Redis Enterprise]({{<relref "/rs">}}) cluster, you need a module package.

- For Redis Enterprise modules, download packages from the [Redis download center](https://redislabs.com/download-center/modules/).
- For custom-packaged modules, either download a [custom-packaged module](https://redislabs.com/community/redis-modules-hub/) from the developer or [package the module yourself]({{<relref "/modules/install/packaging-modules">}}).

## Add a module to a cluster

Use one of the following methods to add a module to a Redis Enterprise cluster:

- REST API [`POST` request to the `/v1/modules`]({{<relref "/rs/references/rest-api/requests/modules#post-module">}}) endpoint

- Redis Enterprise admin console

- For RedisGears, follow these [installation instructions]({{<relref "/modules/redisgears/installing-redisgears">}})

### REST API method

To add a module to the cluster using the REST API:

1. Download the module package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

1. Copy the package to a node in the cluster.

1. Add the module to the cluster with a [`POST` request to the `/v1/modules`]({{<relref "/rs/references/rest-api/requests/modules#post-module">}}) endpoint:

    ```sh
    curl -k -u "admin@redislabs.com:<password>" -F "module=@/tmp/redisearch.Linux-ubuntu16.04-x86_64.2.2.6.zip" https://localhost:9443/v1/modules
    ```

1. If the module installation succeeds, the `POST` request returns a [JSON object]({{<relref "/rs/references/rest-api/objects/module">}}) that represents the new module. If it fails, it may return a JSON object with an `error_code` and `description` with more details.

### Admin console method

To add a module to the cluster using the admin console:

1. In the Redis Enterprise admin console, select **settings**.
1. From **redis modules**, select the **Add module** button:

    {{<image filename="images/rs/button-add-module.png" alt="The Add module button">}}{{</image>}}

1. Use the file browser to select the packaged module.
1. Verify **Selected module** shows the correct filename and select the **Upload** button:

    {{<image filename="images/rs/button-upload-module.png" alt="The Upload module button">}}{{</image>}}

1. The new module version should appear in the list of Redis modules:


    {{<image filename="images/rs/settings-modules-list.png" width="300px" alt="The Redis modules list">}}{{</image>}}

    {{<note>}}
If you don't see the updated module version, refresh the page.
    {{</note>}}
