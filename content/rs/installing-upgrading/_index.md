---
Title: Install and Setup
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

Depending on your needs, you may also want to [customize the installation](#installation-questions-and-options).

Here, you'll learn how to perform each step.

## Plan your deployment

Before installing Redis Enterprise Software, you need to:

- Set up [your hardware]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

- Choose your [deployment platform]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}}).

    Redis Enterprise Software supports a variety of platforms, including:

    - Multiple Linux distributions (Ubuntu, RedHat Enterprise Linux (RHEL)/IBM CentOS, Oracle Linux)
    - [Amazon AWS AMI]({{< relref "configuring-aws-instances.md" >}})
    - [Docker container]({{< relref "/rs/getting-started/getting-started-docker.md" >}}) (for development and testing only)
    - [Pivotal Cloud Foundry]({{< relref "/platforms/pcf/using-pcf.md" >}})
    - [Kubernetes]({{< relref "/platforms/kubernetes/_index.md" >}})

    For complete details, see [Supported platforms]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}})

- Open appropriate [network ports]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) in the firewall to allow connections to the nodes.

- Configure [cluster DNS]({{< relref "/rs/installing-upgrading/configuring/cluster-dns.md" >}}) so that cluster nodes can reach each other by DNS names.

## Download the installation package

To download the installation package for any of the supported platforms:

1. Go to the [Redis Labs download page](https://app.redislabs.com/#/sign-up/software?direct=true).
1. Sign in with your Redis Labs credentials or create a new account.
1. In the Downloads section for Redis Enterprise Software, select the installation package for your platform then select **Go**.

{{< note >}}
Before you install the Linux package or AWS AMI on an AWS EC2 instance,
review the [configuration requirements for AWS EC2 instances]({{< relref "configuring-aws-instances.md" >}}).
{{< /note >}}

## Prepare to install on Linux

Before installing, review these notes:

- Review the [security considerations]({{< relref "/rs/security/" >}}) for your deployment.

- If you want to use Redis on Flash (RoF) for your databases, review the prerequisites, storage requirements, and [other considerations]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) for RoF databases and prepare and format the flash memory.

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
- Make sure that you have root-level access to each node, either directly or with `sudo`
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

- Make sure that the operating system isn't using ports [range Redis assigns to databases]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}).

    We recommend updating `/etc/sysctl.conf` to include:  
    ``` sh
    net.ipv4.ip_local_port_range = 30000 65535
    ```

## Install on Linux

After you download the .tar file installation package, install the package on one of the nodes in the cluster.

To install from the CLI:

1. Copy the installation package to the node.

    Use the {{< download "GPG key file" "GPG-KEY-redislabs-packages.gpg" >}} to confirm authenticity of Ubuntu/Debian or RHEL RPM packages:

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
- The Redit Enterprise Software files are installed in the default [file locations]({{< relref "/rs/installing-upgrading/file-locations.md" >}}). 
- By default, Redis Software runs on the OS as the `redislabs` user and `redislabs` group. If needed, you can [specify a different user and group](#custom-installation-user-and-group) during the installation.
- You must either be logged in as the root user or use sudo to run the install process.
    {{< /note >}}

1. Answer the [installation questions](#installation-questions) when shown to complete the installation process,
    including the `rlcheck` installation verification.

    {{< note >}}
To install without answering the installation questions, either:

- Run `./install.sh -y` to answer yes to all of the questions.
- Use an [answer file](#installation-answer-file) to answer the installation questions.
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

1. [Create]({{< relref "/rs/administering/new-cluster-setup.md" >}})
    or [join]({{< relref "/rs/administering/adding-node.md" >}}) an existing Redis Enterprise Software cluster.
1. [Create a database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

    For geo-distributed Active-Active replication, create an [Active-Active]({{< relref "/rs/administering/creating-databases/create-active-active.md" >}}) database.

## Installation questions and options

The installation defaults serve most requirements; however, there are times when customizations are needed.

This section describes:

- The questions asked [during installation](#installation-questions)
- [How to customize installation directories](#custom-installation-directories) 
- [Set user and group ownership](#customize-system-user-and-group)
- How to perform a [silent install](#silent-install).

### Installation questions

Several questions appear during installation:

- **Linux swap file** - `Swap is enabled. Do you want to proceed? [Y/N]?`

    We recommend that you [disable Linux swap]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}}) in the operating system configuration
    to give Redis Software control of the memory allocation.

- **Automatic OS tuning** - `Do you want to automatically tune the system for best performance [Y/N]?`

    To allow the installation process to optimize the OS for Redis Software, answer `Y`.
    The installation process prompts you for additional information.

    The `/opt/redislabs/sbin/systune.sh` file contains details about the tuning process.

- **Network time** - `Do you want to set up NTP time synchronization now [Y/N]?`

    Redis Software requires that all cluster nodes have synchronized time.
    You can either let the installation process configure NTP
    or you can [configure NTP manually]({{< relref "/rs/administering/designing-production/synchronizing-clocks.md" >}}).

- **Firewall ports** - `Would you like to open RedisLabs cluster ports on the default firewall zone [Y/N]?`

    Redis Enterprise Software requires that all nodes have [specific network ports]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) open.
    You can either:

    - Answer `Y` to let the installation process open these ports.
    - Answer `N` and configure the firewall manually for [RHEL/CentOS firewall]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}).
    - Answer `N` and configure the firewall on the node manually for your OS.

- **Installation verification (rlcheck)** - `Would you like to run rlcheck to verify proper configuration? [Y/N]?`

    We recommend running the `rlcheck` installation verification to make sure that the installation completed successfully.
    If you want to run this verification at a later time, you can run: `/opt/redislabs/bin/rlcheck`
 
### Customize installation directories

During the installation, you can customize the installation directories.

The files are installed in the `redislabs` directory in the path that you specify.

{{< note >}}
- Custom installation directories are supported on RedHat Enterprise Linux version 7.
- When you install with custom directories, the installation does not run as an RPM file.
- If a `redislabs` directory already exists in the path that you specify, the installation fails.
- All nodes in a cluster must be installed with the same file locations.
{{< /note >}}

{{< note >}}
- Custom installation directories are not supported for databases using Redis on Flash.
{{< /note >}}

You can specify any or all of these file locations:

| Files               | Installer flag | Example parameter | Example file location |
| ------------------- | -------------- | ----------------- | --------------------- |
| Binaries files      | --install-dir  | /opt              | /opt/redislabs        |
| Configuration files | --config-dir   | /etc/opt          | /etc/opt/redislabs    |
| Data and log files  | --var-dir      | /var/opt          | /var/opt/redislabs    |

These files are not in the custom directories:

- OS files
    - /etc/cron.d/redislabs
    - /etc/firewalld/services
    - /etc/firewalld/services/redislabs-clients.xml
    - /etc/firewalld/services/redislabs.xml
    - /etc/ld.so.conf.d/redislabs_ldconfig.conf.tmpl
    - /etc/logrotate.d/redislabs
    - /etc/profile.d/redislabs_env.sh
    - /usr/lib/systemd/system/rlec_supervisor.service.tmpl
    - /usr/share/selinux/mls/redislabs.pp
    - /usr/share/selinux/targeted/redislabs.pp

- Installation reference files
    - /etc/opt/redislabs/redislabs_custom_install_version
    - /etc/opt/redislabs/redislabs_env_config.sh

To install to specific directories, run:

```sh
sudo ./install.sh --install-dir <path> --config-dir <path> --var-dir <path>
```
 
### Customize system user and group

By default, Redis Enterprise Software is installed with the user:group `redislabs:redislabs`.

During the installation, you can specify the user and group that own all Redis Enterprise Software processes.

If you specify the user only, then installation is run with the primary group that the user belongs to.

{{< note >}}
- Custom installation user is supported on RedHat Enterprise Linux version 7.
- When you install with custom directories, the installation does not run as an RPM file.
- You must create the user and group befor attempting to install Redis Software.
- You can specify an LDAP user as the installation user.
{{< /note >}}

Use command-line options for the install script to customize the user or group:

```sh
sudo ./install.sh --os-user <user> --os-group <group>
```

### Silent install

To install without answering the installation questions, do one of the following:

- Run `./install.sh -y` to answer yes to all of the questions.
- Prepare an answer file and use it to do a silent installation.

To install with an answer file:

1. Prepare the answer file with the answers to the [installation questions](#installation-questions).

    The answer file can contain any of the parameters for the installation questions and indicate the answer for the question with `yes` or `no`.

    For example:

    ```sh
    ignore_swap=no
    systune=yes
    ntp=no
    firewall=no
    rlcheck=yes
    ```

    If you use `systune=yes`, the installation answers `yes` to all of the system tuning questions.

1. Run the install script with `-c` and the path to the answer file.

    For example:

    ```sh
    ./install.sh -c /home/user/answers
    ```

## Additional configuration

Specialized configuration info is also available:

- [Configure CentOS/RHEL Firewall]({{< relref "rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [mDNS client prerequisites]({{< relref "rs/installing-upgrading/configuring/mdns.md" >}})
- [Configure cluster DNS]({{< relref "rs/installing-upgrading/configuring/cluster-dns.md" >}})
- [Configure Linux swap space]({{< relref "rs/installing-upgrading/configuring/linux-swap.md" >}})
- [Cluster load balancer setup]({{< relref "rs/installing-upgrading/configuring/cluster-lba-setup.md" >}})

## Next steps

Now that your cluster is set up with nodes, you can:

- [Add users]({{< relref "/rs/administering/access-control/_index.md" >}}) to the cluster with specific permissions.
- [Create databases]({{< relref "/rs/administering/creating-databases/_index.md" >}}) to use with your applications.
