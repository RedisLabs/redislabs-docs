---
Title: Install and setup
linkTitle: Install and setup
description:
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/
        /rs/installing-upgrading/downloading-installing/
---
This guide shows how to install Redis Enterprise Software, which includes several steps:

1. [Plan your deployment](#plan-your-deployment)
1. Download the [installation package](#download-the-installation-package)
1. [Prepare to install](#prepare-to-install-on-linux)
1. [Perform the install](#install-on-linux)

Depending on your needs, you may also want to [customize the installation](#more-info-and-options).

Here, you'll learn how to perform each step.

## Plan your deployment

Before installing Redis Enterprise Software, you need to:

- Set up [your hardware]({{< relref "/rs/installing-upgrading/hardware-requirements.md" >}}).

- Choose your [deployment platform]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}}).

    Redis Enterprise Software supports a variety of platforms, including:

    - Multiple Linux distributions (Ubuntu, RedHat Enterprise Linux (RHEL)/IBM CentOS, Oracle Linux)
    - [Amazon AWS AMI]({{< relref "configuring-aws-instances.md" >}})
    - [Docker container]({{< relref "/rs/installing-upgrading/get-started-docker.md" >}}) (for development and testing only)
    - [Kubernetes]({{< relref "/kubernetes/_index.md" >}})

    For complete details, see [Supported platforms]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}})

- Open appropriate [network ports]({{< relref "/rs/networking/port-configurations.md" >}}) in the firewall to allow connections to the nodes.

- Configure [cluster DNS]({{< relref "/rs/networking/cluster-dns.md" >}}) so that cluster nodes can reach each other by DNS names.
- By default, the install process requires an Internet connection to install dependencies and to synchronize the operating system clock.  To learn more, see [Offline installation]({{<relref "/rs/installing-upgrading/offline-installation">}}).

## Download the installation package

To download the installation package for any of the supported platforms:

1. Go to the [Redis download page](https://app.redislabs.com/#/rlec-downloads).
1. Sign in with your Redis credentials or create a new account.
1. In the Downloads section for Redis Enterprise Software, select the installation package for your platform then select **Go**.

{{< note >}}
Before you install the Linux package or AWS AMI on an AWS EC2 instance,
review the [configuration requirements for AWS EC2 instances]({{< relref "configuring-aws-instances.md" >}}).
{{< /note >}}

## Prepare to install on Linux

Before installing, review these notes:

- Review the [security considerations]({{< relref "/rs/security/" >}}) for your deployment.

- If you want to use Redis on Flash (RoF) for your databases, review the prerequisites, storage requirements, and [other considerations]({{< relref "/rs/databases/redis-on-flash/.md" >}}) for RoF databases and prepare and format the flash memory.

    Use the `prepare_flash` script to prepare and format flash memory:

    ```sh
    sudo /opt/redislabs/sbin/prepare_flash.sh
    ```

    This script finds unformatted disks and mounts them as RAID partitions in `/var/opt/redislabs/flash`.

    To verify the disk configuration, run:

    ```sh
    sudo lsblk
    ```

- [Disable Linux swap]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}}) on all cluster nodes.

- Make sure that you have root-level access to each node, either directly or with `sudo`.  

- If you require the `redislabs` UID (user ID) and GID (group ID) numbers to be the same on all the nodes, create the `redislabs` user and group with the required numbers on each node.

- When port 53 is in use, the installation fails. This is known to happen in
    default Ubuntu 18.04 installations in which `systemd-resolved` (DNS server) is running.

    To work around this issue, change the system configuration to make this port available
    before installation.  Here's one way to do so:

    1. Run: `sudo vi /etc/systemd/resolved.conf`
    1. Add `DNSStubListener=no` as the last line in the file and save the file.
    1. Run: `sudo mv /etc/resolv.conf /etc/resolv.conf.orig`
    1. Run: `sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf`
    1. Run: `sudo service systemd-resolved restart`

- Make sure that the ports [Redis assigns to databases]({{< relref "/rs/networking/port-configurations.md" >}}) are available; that is, they're not being used by the operating system or other processes.

    To avoid port collision, we recommend updating `/etc/sysctl.conf` to include:  
    ``` sh
    net.ipv4.ip_local_port_range = 30000 65535
    ```

## Install on Linux

After you download the .tar file installation package, install the package on one of the nodes in the cluster.

To install from the CLI:

1. Copy the installation package to the node.

    _(Optional)_ Use the {{< download "GPG key file" "GPG-KEY-redislabs-packages.gpg" >}} to confirm authenticity of Ubuntu/Debian or RHEL RPM packages:

    - For Ubuntu:
        1. Import the key with:  
        ```sh
        gpg --import <path to GPG key>
        ```  
        2. Verify the package signature with: 
        ```sh 
        dpkg-sig --verify <path to installation package>
        ```

    - For RHEL:
        1. Import the key with:  
        ```sh
        rpm --import <path to GPG key>
        ```
        2. Verify the package signature with:  
         ```sh
         rpm --checksig <path to installation package>
         ```

1. On the node, change to the directory where the installation package is and extract the installation files:

    ```sh
    tar vxf <tarfile name>
    ```

1. To install, run:

    ```sh
    sudo ./install.sh
    ```
    {{< note >}}
- The Redis Enterprise Software files are installed in the default [file locations]({{< relref "/rs/installing-upgrading/file-locations.md" >}}). 
- By default, Redis Enterprise Software runs on the OS as the `redislabs` user and `redislabs` group. If needed, you can [specify a different user and group]({{<relref "rs/installing-upgrading/customize-user-and-group.md">}}) during the installation.
- You must either be logged in as the root user or use sudo to run the install process.
    {{< /note >}}

1. Answer the [installation questions]({{<relref "rs/installing-upgrading/manage-installation-questions.md">}}) when shown to complete the installation process,
    including the `rlcheck` installation verification.

    {{< note >}}
To install without answering the installation questions, either:

- Run `./install.sh -y` to answer yes to all of the questions.
- Use an [answer file]({{<relref "rs/installing-upgrading/manage-installation-questions.md">}}) to answer installation questions automatically.
    {{< /note >}}

    When the installation completes successfully, the IP address of the admin console is displayed:

    ```sh
    Summary:
    -------
    ALL TESTS PASSED.
    2017-04-24 10:54:15 [!] Please logout and login again to make
    sure all environment changes are applied.
    2017-04-24 10:54:15 [!] Point your browser at the following
    URL to continue:
    2017-04-24 10:54:15 [!] https://<your_ip_here>:8443
    ```

    Redis Enterprise Software is now installed on the node.

    Repeat this process for each node in the cluster.

1. [Create]({{< relref "/rs/clusters/new-cluster-setup.md" >}})
    or [join]({{< relref "/rs/clusters/add-node.md" >}}) an existing Redis Enterprise Software cluster.
1. [Create a database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

    For geo-distributed Active-Active replication, create an [Active-Active]({{< relref "/rs/databases/active-active/create.md" >}}) database.

## Permissions and access

- Redis Enterprise Software installation creates the `redislabs:redislabs` user and group. 

    Assigning other users to the `redislabs` group is optional. Users belonging to the `redislabs` group have permission to read and execute (e.g. use the `rladmin` status command) but are not allowed to write (or delete) files or directories.

- Redis Enterprise Software is certified to run with permissions set to `750`, an industry standard.

    We recommend against reducing permissions to `700`; this configuration has not been tested and is not supported.

## Install command line-options

Run `./install.sh --help` to view command-line options supported by the install script.

At this time, the following options are supported:

| Option | Description |
|--------|-------------|
| `-y` | Automatically answers `yes` to all install prompts, accepting all default values<br/>See [Manage install questions]({{<relref "/rs/installing-upgrading/manage-installation-questions">}})|
| <nobr>`-c <answer file>`</nobr> | Specify answer file used to respond to install prompts<br/>See [Manage install questions]({{<relref "/rs/installing-upgrading/manage-installation-questions">}})|
| <nobr>`-s <socket dir>`</s> | Specify directory for redislabs unix sockets  _(new installs only)_|
| <nobr>`--install-dir <dir>`</nobr> | Specifies installation directory _(new installs only)_ <br/> See [Customize install locations]({{<relref "/rs/installing-upgrading/customize-install-directories">}})|  
| <nobr>`--config-dir <dir>` | Configuration file directory *(new installs only)* <br/>See [Customize install locations]({{<relref "/rs/installing-upgrading/customize-install-directories">}})|
| <nobr>`--var-dir <dir>`</nobr> | Var dir used for installation *(new installs only)* <br/>See [Customize install locations]({{<relref "/rs/installing-upgrading/customize-install-directories">}})|
| <nobr>`--os-user <user>`| Operating system user account associated with install; default: `redislabs`<br/>See [Customize user and group]({{<relref "/rs/installing-upgrading/customize-user-and-group">}}) *(new installs only)*|
|<nobr>`--os-group <group>` | Operating system group associated with install; default: `redislabs`<br/>See [Customize user and group]({{<relref "/rs/installing-upgrading/customize-user-and-group">}}) *(new installs only)* |

The next section provides additional configuration details.

## More info and options

If you've already installed Redis Enterprise Software, you can also:

- [Upgrade an existing deployment]({{<relref "rs/installing-upgrading/upgrading.md">}})

- [Uninstall an existing deployment]({{<relref "rs/installing-upgrading/uninstalling.md">}})

More info is available to help with customization and related questions:

- [AWS EC2 configuration]({{<relref "rs/installing-upgrading/configuring/configuring-aws-instances.md">}})
- [CentOS/RHEL Firewall configuration]({{< relref "rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [Cluster DNS configuration]({{< relref "rs/networking/cluster-dns.md" >}})
- [Cluster load balancer setup]({{< relref "rs/networking/cluster-lba-setup.md" >}})
- [File locations]({{<relref "rs/installing-upgrading/file-locations.md">}})
- [Supported platforms]({{<relref "rs/installing-upgrading/supported-platforms.md">}})
- [Linux swap space configuration]({{< relref "rs/installing-upgrading/configuring/linux-swap.md" >}})
- [Manage installation questions]({{<relref "rs/installing-upgrading/manage-installation-questions.md">}})
- [mDNS client prerequisites]({{< relref "rs/networking/mdns.md" >}})
- [Offline installation]({{<relref "rs/installing-upgrading/offline-installation.md">}})
- [User and group ownership]({{<relref "rs/installing-upgrading/customize-user-and-group.md">}})

## Next steps

Now that your cluster is set up with nodes, you can:

- [Add users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to the cluster with specific permissions.  To begin, start with [Access control]({{<relref "/rs/security/access-control">}}).
- [Create databases]({{< relref "/rs/administering/creating-databases/_index.md" >}}) to use with your applications.

