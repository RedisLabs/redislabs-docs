---
Title: Using Redis Enterprise for VMware Tanzu
description:
weight: 11
alwaysopen: false
hidden: true
aliases: 
---
## Creating a Redis Enterprise Database instance via cf CLI and service broker using service plans

1. Perform 'cf login' to your foundation.

1. Run the ``# cf create-service redislabs [SERVICE PLAN] [SERVICE INSTANCE]`` where SERVICE PLAN uses one of the available Redis Enterprise service plans and SERVICE INSTANCE is the new service instance name.

  For example:

  ```
  # cf create-service redislabs small-redis redis2`
  Creating service instance redis2 in org RedisLabs  space space1 as admin...
  OK
  ```

  Available service plans are listed in either the tile's Ops Manager configuration, under **Settings** > **Service Plans** or in the Apps  Manager > **Marketplace** screen.

  ![Service plans shown in tile configuration](/images/tas/pcf_service_plans.png)

  ![Service plans shown in Apps Manager](/images/tas/pcf_apps_service_plans.png)

## Creating a Redis Enterprise Database instance via VMware Tanzu Apps Manager

1. From VMware Tanzu Apps Manager go to Marketplace and select Redis Enterprise on VMware Tanzu.

   ![Marketplace in Apps Manager](/images/tas/pcf_apps_marketplace.png)

2. Select a plan from the available plans listed and click **Select This Plan**.

   ![Selecting a service plan](/images/tas/pcf_apps_service_plans.png)

3. Write an instance name and optionally choose to bind to a deployed app then click **Create**.

    ![Creating a new instance](/images/tas/pcf_apps_config_create.png)

    ![Instance successfully created](/images/tas/pcf_ops_service_plan_created.png)


## Accessing the Redis Enterprise Cluster UI

1. Connect to the Redis Enterprise Admin Console by placing the **Cluster Management Console Subdomain** in the host part of the following URL: `https://[Cluster Management Console Subdomain].[System Domain]`. For example: ``https://console-redis.sys.my-domain.cf-app.com``

1. Log in using the Administrator email account and password you specified in the tile configuration above.

{{<note>}}
Do not create or delete databases through the Redis Enterprise Cluster UI. Use the cf create/delete/update-service commands or use the the Apps Manager web UI to create and manage databases through available plans.
{{</note>}}

## Installing a License Key in an Existing Cluster

1. Connect to the Redis Enterprise UI per the instructions above
1. Log in using the Administrator email account and password you specified in the tile configuration.
1. Navigate to the **Settings** section and then the **General** tab.

    ![General Settings](/images/tas/pcf_add_license.png)

1. Paste the license key you received from Redis into the **Cluster key** form field and click **Save**.

{{<note>}}
In case your license is already expired, changes to the cluster configuration, such as a version upgrade, will result in cluster failure. Always apply a valid license key in advance of making such changes.
{{</note>}}

## Connect to Redis Database Using redis-cli

`redis-cli` is a simple command-line tool for interacting with Redis Database.

To connect to Redis Database, do the following:

1. Connect to one of the IP addresses of the nodes through SSH and find `redis-cli` under `/opt/redislabs/bin/redis-cli`.

1. Change to the `/opt/redislabs/bin` directory and run `redis-cli` to connect to port 12000 and to the database-endpoint that is reported in the database properties after you created the database.

  ```
  # sudo /opt/redislabs/bin/redis-cli -p 12000 -h database-endpoint
  ```

1. To store and retrieve a key in `database1`, run the following commands:

  ```
  set key1 123

  get key1
  ````

  For example:

  ```
   127.0.0.1:16653> set key1 123

   OK

   127.0.0.1:16653> get key1

   "123"
  ```
