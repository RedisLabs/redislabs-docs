---
Title: Redis Enterprise Software for Pivotal Cloud Foundry (PCF)
description: 
weight: 40
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise for Pivotal Cloud Foundry (PCF) exposes its service
plans on the Marketplace. Developers can provision highly available and
scalable Redis databases by creating instances of the service plans
using Apps Manager or the Cloud Foundry Command Line Interface (cf CLI).

## Installation and Configuration

### Step 1: Import the Redis Enterprise Software Tile

You will need to import the Redis Enterprise Software .pivotal file into
your Pivotal Cloud Foundry environment to get started.

- Download [the .pivotal file for Redis Enterprise
    Software](https://app.redislabs.com/#/sign-up/software?direct=true&download=pivotal_cf).
- Navigate to your Ops Manager URL and click on **Import a Product**
    button and select the downloaded .pivotal file for Redis Enterprise
    Software\
    ![pcf_view_ops_manger](/images/rs/pcf_view_ops_manger.png?width=800&height=205)

### Step 2: Configure Redis Enterprise Software

1. Click the newly imported tile.\

    ![pcf_pre-install_tile](/images/rs/pcf_pre-install_tile.png?width=189&height=189)
1. Navigate to the **Assign AZs and Network** section on the right
    navigation bar. Select the network for the cluster to use. In my
    environment that is **pcf-ert-network**.
1. From the **Settings** tab, click **Cluster Configuration** and
    complete the following fields and then click **Save**:
   - **Cluster Name**: Provide a sub-domain for the cluster name. The
        cluster name is a sub-domain under the **System Domain** which
        is found under the **Pivotal Elastic Runtime** in Ops Manager.
        This is the connection string for Redis applications will use to
        connect to Redis databases on Redis Enterprise Software.
   - **Admin Email**: Provide an email address for the administrative
        user who will have full administrative privileges to the new
        Redis Enterprise Software cluster.
   - **Admin account password**: Provide the password for the
        administrative account.
   - and enabled Multiple Availability Zone (Rack) awareness.
   - **Static IPs**: You may provide a set of static IPs addresses to
        use for cluster nodes or let the tile choose them for you from
        the previously selected PCF network.\

        ![Redis Enterprise for PCF tile configuration](/images/rs/rs_tile_config.png?_t=1520874329?width=800&height=604)
1. **Service Plans** You could add a new plan you want to offer it in
    Apps Manager, but for the moment, click the **Save** button.
1. **Syslog** Check **Disabled** for now as we do not want to utilize
    this functionality for this quick start.\

    ![Redis Enterprise for PCF syslog configuration](/images/rs/syslog_disable.png?width=800&height=557)
1. **Stemcell** Upload the proper stemcell requested on the page.

**Note**: It is important to ensure the capacity used for RP cluster
nodes meet the minimum HW specification requirements for Redis
Enterprise Software. See the [minimum HW
specifications]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

### Step 3: Deploy the Redis Enterprise Software Cluster

1. Once the tile configuration is done, you can save the changes and
    click the **Apply changes** to deploy the cluster.\

    ![post-install-dashboard](/images/rs/post-install-dashboard.png?width=800&height=227)
1. You can switch into the tile and to the **Status** tab to view the
    state of the cluster nodes under the jobs named
    **redis-pack-node** and **redis-pack-service-broker**.

### Step 4: Apps Manager Service Deployment

With the Ops Manager side complete, we turn our attention to deploying
a service in PCF Apps Manager.

1. Click on **Add A Service\

    ![apps_manager_add_service_button](/images/rs/apps_manager_add_service_button.png?width=1000&height=278)\
    **
1. [Select **Redis Enterprise**[ from the
    choices of Services\

    ![apps_manager_add_service-1](/images/rs/apps_manager_add_service-1.png?_t=1520885153?width=800&height=635)\
    
1. Select a plan from the list for the proper sized cluster for Redis
    Enterprise and then click the **Select Plan** button.
1. Type in the name of the service as **Instance Name**. Click the
    **Create** button.

You now have a Redis database on Redis Enterprise Software!
