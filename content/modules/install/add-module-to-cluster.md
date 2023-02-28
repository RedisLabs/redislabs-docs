---
Title: Install a module on a cluster
linkTitle: Install on a cluster
description:
weight: 10
alwaysopen: false
categories: ["Modules"]
aliases:
    - /modules/add-module-to-cluster/
---

[Redis Enterprise]({{<relref "/rs">}}) comes packaged with several modules. You can view the installed modules and their versions from **settings > redis modules** in the Redis Enterprise admin console.

To use other modules or upgrade an existing module to a more recent version, you need to install the new module package on your cluster.

{{<note>}}
Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x.
{{</note>}}

## Get packaged modules

To install or upgrade a module on a [Redis Enterprise]({{<relref "/rs">}}) cluster, you need a module package.

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
    POST https://[host][:port]/v1/modules
    {"module=@/tmp/redisearch.Linux-ubuntu16.04-x86_64.2.2.6.zip"}
    ```

    Here, the *module* parameter specifies the full path of the module package and must be submitted as form-data. In addition, the package must be available and accessible to the server processing the request.

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

## Next steps

- Create a database and [enable the new module]({{<relref "/modules/install/add-module-to-database">}}).
- [Upgrade a module]({{<relref "/modules/install/upgrade-module">}}) to the new version.
