---
Title: Backing Up and Restoring for Redis Enterprise for VMware Tanzu
description:
weight: 14
alwaysopen: false
hidden: true
aliases: 
---

You must use the BOSH Backup and Restore (BBR) command-line tool to backup and restore your VMware Tanzu deployment.
These backup and restore instructions apply specifically to your Redis Enterprise for VMware Tanzu deployment.

## Installing the BBR Command-Line Tool

To install the BBR command-line tool:

1. Find the latest version of the BBR tool at the [Bosh Backup and Restore GitHub Repo](https://github.com/cloudfoundry-incubator/bosh-backup-and-restore/releases).

2. Right-click on the latest TAR archive of the tool and copy the link address.
3. To download the BBR tool, in the Ops Manager run:

    ```
    wget <archive_link_address> -O bbr.tar && tar -xvf bbr.tar
    ```

The BBR tool is extracted to `/releases/bbr`.

## Back Up Redis Enterprise for VMware Tanzu

VMware recommends that you run a daily backup.

Before you configure a backup process you must have:

* BBR user credentials: Find the values for `bbr_user` and `bbr_user_pass` in the Ops Manager file: `https://<host>/api/v0/deployed/director/credentials/uaa_bbr_client_credentials`

* Deployment name: On the Ops Manager, find the deployment name that begins
  with `redis-enterprise-` in the output of the command:

  ```
  bosh -e cf deployments
  ```

To backup your Redis Enterprise for VMware Tanzu deployment:

1. Run the backup command:

  ```src
  BOSH_CLIENT_SECRET=<bbr_user_pass> <path_to_bbr> releases/bbr deployment --debug --target <Bosh_OpsManager_IPaddress> --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username <bbr_user> --deployment <deployment_name> backup
  ```

  For example:

  ```
  root@ip-10-0-0-241:~# BOSH_CLIENT_SECRET=Nu5iIIXcXN-RIKVBk6JNoCOJVLN1kB6N releases/bbr deployment --debug --target 10.0.16.5 --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username bbr_client --deployment redis-enterprise-b25242b578838c375ba1 backup
  ```

  You can remove the `--debug` flag to reduce the command output.

  The backup is saved in the directory named with `<deployment_name>_<date>`, for example: `redis-enterprise-b25242b578838c375ba1_20180312T135418Z`

2. Copy this backup archive from the Ops Manager machine to a dedicated storage location.

## Restore Redis Enterprise for VMware Tanzu

To restore a Redis Enterprise for VMware Tanzu deployment:

1. On the new VMware Tanzu Foundation, install a redis-enterprise tile with the same configuration of the original tile.

    {{<note>}}A different cluster name or number of machines than the original tile causes errors in the restore.{{</note>}}

2. In the cluster configuration tab, check the **Recovery Mode** checkbox and click **Apply changes**.

3. Copy the backup archive to Ops Manager.

4. Run the restore command to recover the cluster:

  {{<note>}}This command does not recover databases.{{</note>}}

  ```src
  BOSH_CLIENT_SECRET=<bbr_user_pass> <path_to_bbr> deployment --debug --target <Bosh_OpsManager_IPaddress> --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username <bbr_user> --deployment <deployment_name> restore --artifact-path=<archive_path>
  ```

  For example:

  ```
  BOSH_CLIENT_SECRET=sSvt2-_ykNHOX_0BW1_LImYlJdVEMDew bbr deployment --debug --target 10.0.16.5 --ca-cert=/var/tempest/workspaces/default/root_ca_certificate --username bbr_client --deployment redis-enterprise-4614f7015e079299ba4c restore --artifact-path=redis-enterprise-0b094c96bab6f58bb133_20180326T125355Z
  ```

5. Connect to one of the cluster machines with SSH.

6. To see that all of the nodes are connected, run: `rladmin status extra all`

7. On each node, set the [cluster recovery]{{<relref "/rs/clusters/cluster-recovery">}}
   source path to the cluster backup file:

  ```
  rladmin node <node_id> recovery_path set <import_path>
  ```

  For example:

  ```
  rladmin node 1 recovery_path set /var/vcap/store/redis/redis/
  ```

  ```
  rladmin node 2 recovery_path set /var/vcap/store/redis/redis/
  ```

  ```
  rladmin node 3 recovery_path set /var/vcap/store/redis/redis/
  ```

8. To verify that database recovery is ready, run: `rladmin recover list`
    
    Make sure there are no errors in the command output.

9. To start database recovery, run:

    ```
    rladmin recover all
    ```

10. In Ops Manager, disable the **Recovery Mode** checkbox and click **Apply changes**.