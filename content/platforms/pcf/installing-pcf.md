---
Title: Installing Redis Enterprise Software on Pivotal Cloud Foundry (PCF)
description: 
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/getting-started/pcf/
---
This topic describes how to install and configure Redis Enterprise for Pivotal Cloud Foundry (PCF).

## Install Redis Enterprise for PCF

1. Download the product file from [Pivotal Network](https://network.pivotal.io/products/redis-enterprise-pack).

1. Navigate to the Ops Manager Installation Dashboard and click **Import a Product** to upload the product file.

1. Under the **Import a Product** button, click **+** next to the version number of Redis Enterprise for PCF. This adds the tile to your staging area.

1. Click **Save**.

1. Return to the Ops Manager Installation Dashboard and click **Apply Changes** to install Redis Enterprise for PCF tile.

## Configure and Deploy Redis Enterprise for PCF

1. Click the newly imported tile.

    ![Imported tile](/images/platforms/pcf_pre-install_tile.png)

1. Navigate to the **Assign AZs and Network** section on the right navigation bar. Ensure you have a network selected for the cluster to use.

1. Navigate to the **Redis Enterprise** section on the right navigation bar. Enter the following details:

1. From the **Settings** tab, click **Redis Enterprise** and complete the following fields:

   - **Cluster Name**: Provide a subdomain for the cluster name.
    The Redis Enterprise cluster name is a subdomain under the system domain, which is found under the Pivotal Elastic Runtime in Ops Manager.
    For example, set the cluster name as `CLUSTERNAME.redislabs.com` if your system domain is `redislabs.com`.
    The cluster name specified represents part of the connection string for Redis apps when connecting to Redis Enterprise databases using DNS-based connections.
   - **Admin Email**: Provide an email that has full administrative privileges to the new Redis Enterprise cluster.
   - **Admin account password**: Provide the password for the administrative account.
    For production clusters, you can also provide a set of static IPs addresses to use for cluster nodes and enabled Multiple Availability Zone (Rack) awareness.

    ![Import button](/images/platforms/pcf_rp_config_full_screen2.png)

1. Navigate to the **Resource Config** section on the right navigation bar.
    Ensure there are resources assigned to the required resources for Redis Enterprise.

    ![Import button](/images/platforms/pcf_resource_config.png)

    {{% note %}}
Ensure the capacity used for Redis Enterprise cluster nodes meet the [minimum hardware specification requirements]
({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}) for Redis Enterprise.
    {{% /note %}}

1. Click **Save**.

1. Return to the Ops Manager Installation Dashboard and click **Apply Changes** to deploy Redis Enterprise for PCF tile.
    ![Import button](/images/platforms/post-install-dashboard.png)

1. (Optional) Double-click the tile, and then click the **Status** tab to view the state of the cluster nodes under the jobs named **redis-pack-node** and **redis-pack-service-broker**.

## Create a New Database on the Redis Enterprise Cluster

1. Connect to the Redis Enterprise Admin Console by putting the **Cluster Name** you previously specified in the URL: `https://rpadmin.CLUSTER-NAME`

1. Log in using the Administrator email account and password you specified in the tile configuration above.

1. Navigate to the **databases** tab and create a new database by selecting **redis db**.

    ![Import button](/images/platforms/pcf-new-redis-db.png)

1. On the **new redis db** page, in the **Name** field, enter `database1` and then click the **Show advanced options** link.

1. In the **Endpoint port number** field, enter `12000`.

    ![Import button](/images/platforms/pcf-new-redis-db2.png)

1. Click **Activate** to create your database.

You now have a Redis database on Redis Enterprise for PCF.

## Connect to Redis Database Using redis-cli

`redis-cli` is a simple command-line tool for interacting with Redis Database.

To connect to Redis Database, do the following:

1. Connect to one of the IP addresses of the nodes through SSH and find `redis-cli` under `/opt/redislabs/bin/redis-cli`.

1. Change to the `/opt/redislabs/bin` directory and run `redis-cli` to connect to port 12000, and to the database-endpoint that is reported in the database properties after you created the database.

    ```src
    sudo /opt/redislabs/bin/redis-cli -p 12000 -h database-endpoint
    ```

1. To store and retrieve a key in `database1`, run the following commands:

    ```src
    127.0.0.1:16653> set key1 123
    OK
    127.0.0.1:16653> get key1
    "123"
    ```

For information about Redis Enterprise, see the [Redis Enterprise documentation]({{< relref "/rs" >}}).
