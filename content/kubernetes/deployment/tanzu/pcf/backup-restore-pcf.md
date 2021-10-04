---
Title: Backup and Restore for Redis Enterprise Software on Pivotal Platform
description: 
weight: 90
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /rs/getting-started/pcf/,
    /platforms/pcf/backup-restore-pcf/,
    /platforms/pcf/backup-restore-pcf.md,
    /kubernetes/deployment/tanzu/pcf/backup-restore-pcf.md,
    /kubernetes/deployment/tanzu/pcf/backup-restore-pcf/


]
---
This topic describes how to backup and restore Redis Enterprise for Pivotal Platform (formerly Pivotal Cloud Foundry - PCF).

You must use the BOSH Backup and Restore (BBR) command-line tool to backup and restore your Pivotal Platform deployment. These backup and restore instructions apply specifically to your Redis Enterprise for Pivotal Platform deployment.

## Installing the BBR command-line tool

To install the BBR command-line tool:

1. Find the latest version of the BBR tool at:

    https://github.com/cloudfoundry-incubator/bosh-backup-and-restore/releases

1. Right-click on the latest tar archive of the tool and copy the link address.
1. To download the BBR tool, in the Ops Manager run:

    ```sh
    wget <archive_link_address> -O bbr.tar && tar -xvf bbr.tar
    ```

The bbr tool is extracted to `/releases/bbr`.

## Backup Redis Enterprise for Pivotal Platform

Pivotal recommends that you run a daily backup.

Before you configure a backup process you must have:

- BBR user credentials - Find the values for `bbr_user` and `bbr_user_pass` in the Ops Manager file:

    ```sh
    https://<host>/api/v0/deployed/director/credentials/uaa_bbr_client_credentials
    ```

- Deployment name - On the Ops Manager, find the deployment name that begins
with `redis-enterprise-` in the output of the command:

    ```sh
    bosh -e cf deployments
    ```

To backup your Redis Enterprise for Pivotal Platform deployment:

1. Run the backup command:

    ```sh
    BOSH_CLIENT_SECRET=<bbr_user_pass> <path_to_bbr> releases/bbr deployment --debug --target <Bosh_OpsManager_IPaddress> --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username <bbr_user> --deployment <deployment_name> backup
    ```

    For example:

    `root@ip-10-0-0-241:~# BOSH_CLIENT_SECRET=Nu5iIIXcXN-RIKVBk6JNoCOJVLN1kB6N releases/bbr deployment --debug --target 10.0.16.5 --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username bbr_client --deployment redis-enterprise-b25242b578838c375ba1 backup`

    You can remove the --debug flag to reduce the command output.

    The backup is saved in the directory named with `<deployment_name>_<date>`,
    for example: `redis-enterprise-b25242b578838c375ba1_20180312T135418Z`

1. Copy this backup archive from the Ops Manager machine to a dedicated storage location.

## Restore Redis Enterprise for Pivotal Platform

To restore a Redis Enterprise for Pivotal Platform deployment:

1. On the new Pivotal Platform Foundation, install a redis-enterprise tile with the same configuration of the original tile.

    {{< note >}}
A different cluster name or number of machines than the original tile causes errors in the restore.
    {{< /note >}}

1. In the cluster configuration tab, check the **Recovery Mode** checkbox and click **Apply change**.
1. Copy the backup archive to the Ops Manager.
1. Run the restore command to recover the cluster:

    {{< note >}}
This command does not recover databases.
    {{< /note >}}

    ```sh
    BOSH_CLIENT_SECRET=<bbr_user_pass> <path_to_bbr> deployment --debug --target <Bosh_OpsManager_IPaddress> --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username <bbr_user> --deployment <deployment_name> restore --artifact-path=<archive_path>
    ```

    For example:

    `BOSH_CLIENT_SECRET=sSvt2-_ykNHOX_0BW1_LImYlJdVEMDew bbr deployment --debug --target 10.0.16.5 --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username bbr_client --deployment redis-enterprise-4614f7015e079299ba4c restore --artifact-path=redis-enterprise-0b094c96bab6f58bb133_20180326T125355Z`

1. Connect to one of the cluster machines with SSH.
1. To see that all of the nodes are connected, run: `rladmin status extra all`
1. On each node, set the [cluster recovery](http://docs.redislabs.com/latest/rs/administering/troubleshooting/cluster-recovery/) source path to the cluster backup file:

    ```sh
    rladmin node <node_id> recovery_path set <import_path>
    ```

    For example:

    `rladmin node 1 recovery_path set /var/vcap/store/redis/redis/`

    `rladmin node 2 recovery_path set /var/vcap/store/redis/redis/`

    `rladmin node 3 recovery_path set /var/vcap/store/redis/redis/`

1. To verify that database recovery is ready, run:

    ```sh
    rladmin recover list
    ```

    Make sure there are no errors in the command output.

1. To start database recovery, run:

    ```sh
    rladmin recover all
    ```

1. In the Ops Manager, uncheck the **Recovery Mode** checkbox and click **Apply changes**.
