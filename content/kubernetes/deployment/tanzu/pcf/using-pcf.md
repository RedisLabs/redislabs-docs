---
Title: Using Redis Enterprise Software on Pivotal Platform
description: 
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /rs/getting-started/pcf/,
    /platforms/pcf/using-pcf/,
    /platforms/pcf/using-pcf.md,
    /kubernetes/deployment/tanzu/pcf/using-pcf.md,
    /kubernetes/deployment/tanzu/pcf/using-pcf/

]
---
This topic describes how to use Redis Enterprise Software (RS) for Pivotal Platform.

## Creating a Redis Enterprise database instance via cf CLI and service broker using service plans

1. Perform 'cf login' to your foundation.

1. Run the `cf create-service redislabs [SERVICE PLAN] [SERVICE INSTANCE]` where SERVICE PLAN uses one of the available Redis Enterprise service plans and SERVICE INSTANCE is the new service instance name.

    For example:

    ```sh
    # cf create-service redislabs small-redis redis2
    Creating service instance redis2 in org RedisLabs  space space1 as admin...
    OK
    ```

Available service plans are listed in either:

- The tile's Ops Manager configuration, under **Settings** > **Service Plans**:

    ![Import button](/images/platforms/pcf_ops_service_plan.png)

- **Apps  Manager** > **Marketplace screen**.

    ![Import button](/images/platforms/pcf_apps_service_plans.png)

## Creating a Redis Enterprise database instance via Pivotal Platform Apps Manager

1. From Pivotal Platform Apps Manager go to Marketplace and select Redis Enterprise on Pivotal Platform.

    ![Import button](/images/platforms/pcf_apps_marketplace.png)

2. Select a plan from the available plans listed and click **Select This Plan**.

    ![Import button](/images/platforms/pcf_apps_service_plan.png)

3. Write an instance name and optionally choose to bind to a deployed app then click **Create**.

    ![Import button](/images/platforms/pcf_apps_config_create.png)
    ![Import button](/images/platforms/pcf_ops_service_plan_created.png)

## Accessing the Redis Enterprise cluster UI

1. Connect to the Redis Enterprise admin console by placing the **Cluster Management Console Subdomain** in the host part of the following URL: `https://[Cluster Management Console Subdomain].[System Domain]`.

    For example: `https://console-redis.sys.my-domain.cf-app.com`

1. Log in using the Administrator email account and password you specified in the tile configuration above.

    {{< note >}}
Do not create or delete databases through the Redis Enterprise Cluster UI.
Use the cf creates/delete/update-service commands or use the Pivotal Apps Manager admin console to create and manage databases through available plans.
    {{< /note >}}

## Installing a license key in an existing cluster

1. Connect to the Redis Enterprise UI per the instructions above.

1. Log in using the Administrator email account and password you specified in the tile configuration.

1. Navigate to the **Settings** section and then the **General** tab.

    ![Import button](/images/platforms/pcf_add_license.png)

1. Paste the license key you received from Redis into the **Cluster key** form field and click the **Save** button.

    {{< note >}}
If your license is already expired, changes to the cluster configuration, such as a version upgrade, cause cluster failure.
Always apply a valid license key before making such changes.
    {{< /note >}}

## Connect to Redis database using redis-cli

`redis-cli` is a simple command-line tool for interacting with Redis Database.

To connect to Redis Database, do the following:

1. Connect to one of the IP addresses of the nodes through SSH and find `redis-cli` under `/opt/redislabs/bin/redis-cli`.

1. Change to the `/opt/redislabs/bin` directory and run `redis-cli` to connect to port 12000 and to the database-endpoint that is reported in the database properties after you created the database.

    ```sh
    sudo /opt/redislabs/bin/redis-cli -p 12000 -h database-endpoint
    ```

1. To store and retrieve a key in `database1`, run the following commands:

    ```sh
    set key1 123
    get key1
    ```

For example:

```sh
127.0.0.1:16653> set key1 123

OK

127.0.0.1:16653> get key1

"123"
```

For information about Redis Enterprise, see the [Redis Enterprise documentation]({{< relref "/rs" >}}).
