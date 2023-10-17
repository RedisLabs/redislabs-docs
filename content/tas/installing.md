---
Title: Installing and Configuring Redis Enterprise for VMware Tanzu
description:
weight: 10
alwaysopen: false
hidden: true
aliases: 
---

This page describes how to install and configure Redis Enterprise for VMware Tanzu.

## Add Redis Enterprise for VMware Tanzu to VMware Tanzu Ops Manager

1. Sign in to VMware Tanzu Network and download the product file from [VMware Tanzu Network](https://network.pivotal.io/products/redis-enterprise-pack) to your local machine.

1. Navigate to the Ops Manager Installation Dashboard and click **Import a Product** to upload the product file.

   ![import product](/images/pcf_import-product_tile.png)

1. Under the **Import a Product** button, click **+** next to the version number of Redis Enterprise for VMware Tanzu. This adds the tile to your staging area.

   ![add tile](/images/pcf_add-to-dash_tile.png)

## Configure and Deploy Redis Enterprise for VMware Tanzu

1. Click the newly imported tile.

   ![pre-install tile](/images/pcf_pre-install_tile.png)

2. Navigate to the **Assign AZs and Network** section on the right navigation bar. Ensure you have regions selected in each section and a network selected for the cluster to use. Click **Save**. A banner appears at the top of the page indicating changes have been successfully applied.

   ![alt-text=""](./images/pcf_rp_config_full_screen.png)

   ![alt-text=""](./images/pcf_config-success_tile.png)

3. Navigate to the **Cluster Configuration** section on the left navigation bar. Enter the following details:

   * **Cluster Name**: Provide a subdomain for the cluster name. The Redis Enterprise cluster name is a subdomain under the system domain, which is found under the VMware Tanzu Application Service for VMs (TAS for VMs) in Ops Manager (TAS for VMs->Settings->Domains). For example, set the cluster name as `CLUSTERNAME.sys.redis.com` if your system domain is `sys.redis.com`. The cluster name specified, represents part of the connection string for Redis apps when connecting to Redis Enterprise databases using DNS-based connections.
   * **Admin Email**: Provide an email for the account that will have full administrative privileges to the new Redis Enterprise cluster.
   * **Admin account password**: Provide the password for the administrative account.
   * Optionally, for production clusters, you can also provide a static IP address of a set of static IP addresses (comma separated) to use for cluster nodes. You can also enabled Multiple Availability Zone (Rack) awareness.
   * **Slave HA**: Leave the default Enabled with 1800 second grace period (this is the default for TAS) or configure according to [High Availability for Slave Shards documentation](https://docs.redis.com/latest/rs/administering/database-operations/slave-ha/).
   * Click **Save**.

      ![alt-text=""](./images/pcf_rp_config_full_screen2.png)

4. Navigate to the **Routing Configuration** section on the left navigation bar.
   * If you would like to enable TCP Routing, configure the fields in this section.
   * Otherwise, select **Disable**.
   * Click **Save**.

      ![alt-text=""](./images/pcf_rp_config_routing.png)

5. Navigate to the **Cluster Certificates** section on the left navigation bar.

   * **API Certificates**: You *must* paste in or generate the API certificates and private key. If generating using Ops Manager, you must specify the cluster FQDN in the pop-up dialog.
   * **CM Certificates**: You must paste in or generate the API certificates and private key in deployments utilizing the CM Web interface. If generating using Ops Manager, you must specify the cluster FQDN in the pop-up dialog.
   * **Metrics Endpoint Certificates**: You must paste in or generate the API certificates and private key in deployments utilizing the Metrics Endpoint. If generating using Ops Manager, you must specify the cluster FQDN in the pop-up dialog.

   See the following example for generating a self-signed certificate. To save your changes, click **Save**.

      ![alt-text=""](./images/pcf_rp_config_cert1.png)

      ![alt-text=""](./images/pcf_rp_config_cert2.png)

      ![alt-text=""](./images/pcf_rp_config_cert3.png)

      ![alt-text=""](./images/pcf_rp_config_cert4.png)

1. Optionally, Navigate to the **Service Plans** section on the left navigation bar. You can optionally add, remove or edit plans or choose to keep pre-configured plans. Save your changes by clicking **Save**.

   ![alt-text=""](./images/pcf_service_plans.png)

2. Optionally, Navigate to the **Loggregator** section on the left navigation bar. You can check the box to *enable exposing cluster metric* if you would like to enable Loggregator functionality. You can also set the **Metrics scrape interval** in seconds. The default is 15 seconds.
   To save your changes, click **Save**.

   ![alt-text=""](./images/pcf_rc_loggregator.png)

3. Navigate to the **Resource Config** section on the left navigation bar. Ensure there are resources assigned to the required resources for Redis Enterprise. If you chose to enable metric export to **Loggregator**  in the previous step, you must ensure that exactly one loggregator-agent instance is configured.

   ![alt-text=""](./images/pcf_resource_config.png)<br /><br />

    <p class="note"><strong>Note:</strong> Redis Enterprise for VMware Tanzu enforces minimum hardware specification requirements for Redis Enterprise. For more information, see <a href="https://docs.redis.com/latest/rs/administering/designing-production/hardware-requirements/"> the minimum hardware specifications</a> in the Redis Enterprise documentation.</p>

4.  Click **Save**.

5.  Return to the Ops Manager Installation Dashboard and click **Apply Changes** to deploy Redis Enterprise for VMware Tanzu tile.

   ![post install dashboard](/images/post-install-dashboard.png)

6.  Optionally, select the tile, and then click the **Status** tab to view the state of the cluster nodes under the jobs named **redis-enterprise-node**, **redislabs-service-broker** and **redis-registrar**.


For more information about Redis Enterprise, see the [Redis Enterprise documentation]({{<relref "/rs/">}}).