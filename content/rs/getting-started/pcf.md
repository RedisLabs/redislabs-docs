---
Title: Redis Enterprise Software for Pivotal Cloud Foundry (PCF)
description: $description
weight: 40
alwaysopen: false
---
Redis Enterprise for Pivotal Cloud Foundry (PCF) exposes its service
plans on the Marketplace. Developers can provision highly available and
scalable Redis databases by creating instances of the service plans
using Apps Manager or the Cloud Foundry Command Line Interface (cf CLI).

[]{#install}Installation and Configuration
------------------------------------------

### Step 1 -- Import the Redis Enterprise Software Tile

You will need to import the Redis Enterprise Software .pivotal file into
your Pivotal Cloud Foundry environment to get started.

-   Download [the .pivotal file for Redis Enterprise
    Software](https://app.redislabs.com/#/sign-up/software?direct=true&download=pivotal_cf).
-   Navigate to your Ops Manager URL and click on **Import a Product**
    button and select the downloaded .pivotal file for Redis Enterprise
    Software\
    ![](/wp-content/uploads/2017/06/pcf_view_ops_manger.png){.alignnone
    .size-full .wp-image-27349 width="800" height="205"}

### Step 2 -- Configure Redis Enterprise Software

1.  Click the newly imported tile.\
    ![](/wp-content/uploads/2017/06/pcf_pre-install_tile.png){.alignnone
    .wp-image-27350 width="189" height="189"}
2.  Navigate to the **Assign AZs and Network** section on the right
    navigation bar. Select the network for the cluster to use. In my
    environment that is **pcf-ert-network**.
3.  From the **Settings** tab, click **Cluster Configuration** and
    complete the following fields and then click **Save**:
    -   **Cluster Name**: Provide a sub-domain for the cluster name. The
        cluster name is a sub-domain under the **System Domain** which
        is found under the **Pivotal Elastic Runtime** in Ops Manager.
        This is the connection string for Redis applications will use to
        connect to Redis databases on Redis Enterprise Software.
    -   **Admin Email**: Provide an email address for the administrative
        user who will have full administrative privileges to the new
        Redis Enterprise Software cluster.
    -   **Admin account password**: Provide the password for the
        administrative account.
    -   and enabled Multiple Availability Zone (Rack) awareness.
    -   **Static IPs**: You may provide a set of static IPs addresses to
        use for cluster nodes or let the tile choose them for you from
        the previously selected PCF network.\
        ![Redis Enterprise for PCF tile
        configuration](/wp-content/uploads/2017/06/rs_tile_config.png?_t=1520874329){.alignnone
        .wp-image-36758 .size-full width="800" height="604"}
4.  **Service Plans** You could add a new plan you want to offer it in
    Apps Manager, but for the moment, click the **Save** button.
5.  **Syslog** Check **Disabled** for now as we do not want to utilize
    this functionality for this quick start.\
    ![Redis Enterprise for PCF syslog
    configuration](/wp-content/uploads/2017/06/syslog_disable.png){.alignnone
    .size-full .wp-image-36760 width="800" height="557"}
6.  **Stemcell** Upload the proper stemcell requested on the page.

**Note**: It is important to ensure the capacity used for RP cluster
nodes meet the minimum HW specification requirements for Redis
Enterprise Software. See the [minimum HW
specifications](/redis-enterprise-documentation/installing-and-upgrading/hardware-software-requirements/).

### Step 3 -- Deploy the Redis Enterprise Software Cluster

1.  Once the tile configuration is done, you can save the changes and
    click the **Apply changes** to deploy the cluster.\
    ![](/wp-content/uploads/2017/06/post-install-dashboard.png){.alignnone
    .size-full .wp-image-27353 width="800" height="227"}
2.  You can switch into the tile and to the **Status** tab to view the
    state of the cluster nodes under the jobs named
    **redis-pack-node** and **redis-pack-service-broker**.

### Step 4 -- Apps Manager Service Deployment

[With the Ops Manager side complete, we turn our attention to deploying
a service in PCF Apps Manager.]{style="font-weight: 400;"}

1.  Click on **Add A Service\
    ![](/wp-content/uploads/2017/06/apps_manager_add_service_button.png){.alignnone
    .size-full .wp-image-36784 width="1000" height="278"}\
    **
2.  [Select ]{style="font-weight: 400;"}**Redis Enterprise**[ from the
    choices of Services\
    ![](/wp-content/uploads/2017/06/apps_manager_add_service-1.png?_t=1520885153){.alignnone
    .wp-image-36788 .size-full width="800" height="635"}\
    ]{style="font-weight: 400;"}
3.  Select a plan from the list for the proper sized cluster for Redis
    Enterprise and then click the **Select Plan** button.
4.  Type in the name of the service as **Instance Name**. Click the
    **Create** button.

You now have a Redis database on Redis Enterprise Software!
