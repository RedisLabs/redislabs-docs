---
Title: Redis Enterprise Software for Pivotal Platform
description:
weight: 99
alwaysopen: false
categories: ["Platforms"]
aliases: [ /rs/getting-started/pcf/,
         /platforms/pcf/installing-pcf/,
         /platforms/pcf/,
         /platforms/pcf/_index.md,
         /kubernetes/deployment/tanzu/pcf/_index.md,
         /kubernetes/deployment/tanzu/pcf/_index/
]
---
This topic describes how to install and configure Redis Enterprise for Pivotal Platform (formerly Pivotal Cloud Foundry - PCF).

## Install Redis Enterprise for Pivotal Platform

1. Sign in to PivNet and download the product file from [Pivotal Network](https://network.pivotal.io/products/redis-enterprise-pack) to your local machine.

1. Navigate to the Ops Manager Installation Dashboard and click **Import a Product** to upload the product file.

    ![Import button](/images/platforms/pcf_import-product_tile.png)

1. Under the **Import a Product** button, click **+** next to the version number of Redis Enterprise for Pivotal Platform. This adds the tile to your staging area.

    ![Import button](/images/platforms/pcf_add-to-dash_tile.png)

## Configure and deploy Redis Enterprise for Pivotal Platform

1. Click the newly imported tile.

    ![Imported tile](/images/platforms/pcf_pre-install_tile.png)

1. Navigate to the **Assign AZs and Network** section on the right navigation bar.

    Ensure you have regions selected in each section and a network selected for the cluster to use.

1. Click **Save**.

    A banner appears at the top of the page indicating changes have been successfully applied.

    ![Import button](/images/platforms/pcf_config-success_tile.png)

1. Navigate to the **Cluster Configuration** section on the left navigation bar and enter the following details:

   - **Cluster Name**: Provide a subdomain for the cluster name. The Redis Enterprise cluster name is a subdomain under the system domain,
    which is found under the Pivotal Application Service (PAS) in Ops Manager (PAS->Settings->Domains).
    For example, set the cluster name as `CLUSTERNAME.sys.redislabs.com` if your system domain is `sys.redislabs.com`.
    The cluster name becomes part of the connection string for Redis apps when connecting to Redis Enterprise databases using DNS-based connections.
   - **Admin Email**: Provide an email for the account that you want to have full administrative privileges to the new Redis Enterprise cluster.
   - **Admin account password**: Provide the password for the administrative account.
   - Optionally, for production clusters, you can also provide a static IP address of a set of static IP addresses (comma-separated) to use for cluster nodes. You can also enable Multiple Availability Zone (Rack) awareness.
   - Save your changes by clicking **Save**.

    {{< note >}}
Make sure that the **Cluster Recovery** option is not selected during installation.
This option is only for when you recover a cluster.
    {{< /note >}}

    ![Import button](/images/platforms/pcf_rp_config_full_screen2.png)

1. Navigate to the **Routing** section on the left navigation bar.

    If you would like to enable TCP Routing, configure the fields in this section. Otherwise, select **Disable**.
    Save your changes by clicking **Save**.

1. Navigate to the **Service Plans** section on the left navigation bar.

    You can optionally add, remove or edit plans or choose to keep pre-configured plans.
    Save your changes by clicking **Save**.

1. Optionally, navigate to the **Loggregator** section on the left navigation bar.

    You can check the box to *enable exposing cluster metric* if you would like to enable Loggregator functionality.
    You can also set the *Metrics scrape interval* in seconds.
    The default is 15 second.
    Save your changes by clicking **Save**.

    ![Import button](/images/platforms/pcf_rc_loggregator.png)

1. Navigate to the **Resource Config** section on the left navigation bar.

    Ensure there are resources assigned to the required resources for Redis Enterprise.
    If you chose to enable metric export to **Loggregator**  in the previous step, you must ensure that exactly 1 *loggregator-agent* instance is configured.

    ![Import button](/images/platforms/pcf_resource_config.png)

    {{< note >}}
Ensure the capacity used for Redis Enterprise cluster nodes meet the [minimum hardware specification requirements]({{< relref "/rs/installing-upgrading/hardware-requirements.md" >}}) for Redis Enterprise.
    {{< /note >}}

1. Click **Save**.

1. Return to the Ops Manager Installation Dashboard and click **Apply Changes** to deploy Redis Enterprise for Pivotal Platform tile.

    ![Import button](/images/platforms/post-install-dashboard.png)

1. Optionally, double-click the tile, and then click the **Status** tab to view the state of the cluster nodes under the jobs named **redis-pack-node** and **redis-pack-service-broker**.

For information about Redis Enterprise, see the [Redis Enterprise documentation]({{< relref "/rs" >}}).
