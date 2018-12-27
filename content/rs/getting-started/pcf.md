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
    Software
    ![pcf_view_ops_manger](/images/rs/pcf_view_ops_manger.png?width=800&height=205)

### Step 2: Configure Redis Enterprise Software

1. Click the newly imported tile.

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
        the previously selected PCF network.

        ![Redis Enterprise for PCF tile configuration](/images/rs/rs_tile_config.png?width=800&height=604)
1. **Service Plans** You could add a new plan you want to offer it in
    Apps Manager, but for the moment, click the **Save** button.
1. **Syslog** Check **Disabled** for now as we do not want to utilize
    this functionality for this quick start.

    ![Redis Enterprise for PCF syslog configuration](/images/rs/syslog_disable.png?width=800&height=557)
1. **Stemcell** Upload the proper stemcell requested on the page.

**Note**: It is important to ensure the capacity used for RP cluster
nodes meet the minimum HW specification requirements for Redis
Enterprise Software. See the [minimum HW
specifications]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

### Step 3: Deploy the Redis Enterprise Software Cluster

1. Once the tile configuration is done, you can save the changes and
    click the **Apply changes** to deploy the cluster.

    ![post-install-dashboard](/images/rs/post-install-dashboard.png?width=800&height=227)
1. You can switch into the tile and to the **Status** tab to view the
    state of the cluster nodes under the jobs named
    **redis-pack-node** and **redis-pack-service-broker**.

### Step 4: Apps Manager Service Deployment

With the Ops Manager side complete, we turn our attention to deploying
a service in PCF Apps Manager.

1. Click on **Add A Service**.

    ![apps_manager_add_service_button](/images/rs/apps_manager_add_service_button.png?width=1000&height=278)

1. Select **Redis Enterprise** from the
    choices of Services.

    ![apps_manager_add_service-1](/images/rs/apps_manager_add_service-1.png?width=800&height=635)
    
1. Select a plan from the list for the proper sized cluster for Redis
    Enterprise and then click the **Select Plan** button.
1. Type in the name of the service as **Instance Name**. Click the
    **Create** button.

You now have a Redis database on Redis Enterprise Software!

## Backup and Restore

You must use the BOSH Backup and Restore (BBR) command-line tool 
to backup and restore your PCF deployment. These backup and restore instructions 
apply specifically to your Redis Enterprise for PCF deployment. For more about 
deployment backup and restore, see the [PCF documentation](https://docs.pivotal.io/pivotalcf/latest/customizing/backup-restore/index.html).

### Installing the BBR Command-Line Tool

To install the BBR command-line tool:

1. Find the latest version of the BBR tool at:

    https://github.com/cloudfoundry-incubator/bosh-backup-and-restore/releases

1. Right-click on the latest tar archive of the tool and copy the link address.
1. To download the BBR tool, in the Ops Manager run:

    ```src
    wget <archive_link_address> -O bbr.tar && tar -xvf bbr.tar
    ```

The bbr tool is extracted to `/releases/bbr`.

### Backup

Pivotal recommends that you run a daily backup.

Before you configure a backup process you must have:

- BBR user credentials - Find the values for `bbr_user` and `bbr_user_pass` in the Ops Manager file: 
https://<host>/api/v0/deployed/director/credentials/uaa_bbr_client_credentials
- Deployment name - On the Ops Manager, find the deployment name that begins 
    with `redis-enterprise-` in the output of the command:

    ```src
    bosh -e cf deployments
    ```

To backup your Redis Enterprise for PCF deployment:

1. Run the backup command: 
   
    ```src
    BOSH_CLIENT_SECRET=<bbr_user_pass> <path_to_bbr> releases/bbr deployment --debug --target <Bosh_OpsManager_IPaddress> --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username <bbr_user> --deployment <deployment_name> backup
    ```

    For example:

    `root@ip-10-0-0-241:~# BOSH_CLIENT_SECRET=Nu5iIIXcXN-RIKVBk6JNoCOJVLN1kB6N releases/bbr deployment --debug --target 10.0.16.5 --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username bbr_client --deployment redis-enterprise-b25242b578838c375ba1 backup
    `

    You can remove the --debug flag to reduce the command output.

    The backup is saved in the directory named with `<deployment_name>_<date>`, for example: `redis-enterprise-b25242b578838c375ba1_20180312T135418Z`

1. Copy this backup archive from the Ops Manager machine to a dedicated storage location.

### Restore

To restore a Redis Enterprise for PCF deployment:

1. On the new PCF Foundation, install a redis-enterprise tile with the same configuration of the original tile.
   
    Caution: A different cluster name or number of machines than the original tile causes errors in the restore.

1. In the cluster configuration tab, check the **Recovery Mode** checkbox and click **Apply change**.
1. Copy the backup archive to the Ops Manager.
1. Run the restore command to recover the cluster:

    Note: This command does not recover databases.

    ```src
    BOSH_CLIENT_SECRET=<bbr_user_pass> <path_to_bbr> deployment --debug --target <Bosh_OpsManager_IPaddress> --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username <bbr_user> --deployment <deployment_name> restore --artifact-path=<archive_path>
    ```
    
    For example:
    
    `BOSH_CLIENT_SECRET=sSvt2-_ykNHOX_0BW1_LImYlJdVEMDew bbr deployment --debug --target 10.0.16.5 --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username bbr_client --deployment redis-enterprise-4614f7015e079299ba4c restore --artifact-path=redis-enterprise-0b094c96bab6f58bb133_20180326T125355Z`

1. Connect to one of the cluster machines with SSH.
1. To see that all of the nodes are connected, run: `rladmin status extra all`
1. On each node, set the [cluster recovery]({{< relref "/rs/administering/troubleshooting/cluster-recovery.md" >}}) source path to the cluster backup file:
    
    ```src
    rladmin node <node_id> recovery_path set <import_path>
    ```
    
    For example:
    
    `rladmin node 1 recovery_path set /var/vcap/store/redis/redis/`

    `rladmin node 2 recovery_path set /var/vcap/store/redis/redis/`

    `rladmin node 3 recovery_path set /var/vcap/store/redis/redis/`

1. To verify that database recovery is ready, run: `rladmin recover list`
    
    Make sure there are no errors in the command output.

1. To start database recovery, run:

    ```src
    rladmin recover all
    ```

1. In the Ops Manager, uncheck the **Recovery Mode** checkbox and click **Apply changes**.