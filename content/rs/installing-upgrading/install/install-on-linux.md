---
Title: Install Redis Enterprise Software on Linux
linkTitle: Install on Linux
description: Install Redis Enterprise Software on Linux.
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: 
---

After you [download a Redis Enterprise Software installation package]({{<relref "/rs/installing-upgrading/prepare-install/download-prepare-install#download-the-installation-package">}}), install it on one of the nodes in the cluster.

For installation on machines without an internet connection, see [Offline installation]({{<relref "/rs/installing-upgrading/install/offline-installation">}}).

## Install on Linux

To install Redis Enterprise Software using the command line:

1. Copy the installation package to the node.

    _(Optional)_ Use the {{< download "GPG key file" "GPG-KEY-redislabs-packages.gpg" >}} to confirm authenticity of Ubuntu/Debian or RHEL RPM packages:

    - For Ubuntu:
        1. Import the key:  
        ```sh
        gpg --import <path to GPG key>
        ```  
        2. Verify the package signature: 
        ```sh 
        dpkg-sig --verify <path to installation package>
        ```

    - For RHEL:
        1. Import the key:  
        ```sh
        rpm --import <path to GPG key>
        ```
        2. Verify the package signature:  
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
- The Redis Enterprise Software files are installed in the default [file locations]({{< relref "/rs/installing-upgrading/plan-deployment/file-locations.md" >}}). 
- By default, Redis Enterprise Software runs on the OS as the `redislabs` user and `redislabs` group. If needed, you can [specify a different user and group]({{<relref "rs/installing-upgrading/prepare-install/customize-user-and-group.md">}}) during the installation.
- You must either be signed in as the root user or use `sudo` to run the install process.
    {{< /note >}}

1. Answer the [installation questions]({{<relref "rs/installing-upgrading/prepare-install/manage-installation-questions.md">}}) when shown to complete the installation process.

    {{< note >}}
To install without answering the installation questions, either:

- Run `./install.sh -y` to answer yes to all of the questions.
- Use an [answer file]({{<relref "rs/installing-upgrading/prepare-install/manage-installation-questions.md">}}) to answer installation questions automatically.
    {{< /note >}}

1. When the installation completes successfully, the IP address of the admin console is displayed:

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

1. Repeat this process for each node in the cluster.

## More info and options

More info is available to help with customization and related questions:

- [AWS EC2 configuration]({{<relref "rs/installing-upgrading/plan-deployment/configuring-aws-instances.md">}})
- [CentOS/RHEL Firewall configuration]({{< relref "rs/installing-upgrading/configuring/centos-rhel-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [Cluster DNS configuration]({{< relref "rs/networking/cluster-dns.md" >}})
- [Cluster load balancer setup]({{< relref "rs/networking/cluster-lba-setup.md" >}})
- [File locations]({{<relref "rs/installing-upgrading/plan-deployment/file-locations.md">}})
- [Supported platforms]({{<relref "rs/installing-upgrading/plan-deployment/supported-platforms.md">}})
- [Linux swap space configuration]({{< relref "rs/installing-upgrading/configuring/linux-swap.md" >}})
- [Manage installation questions]({{<relref "rs/installing-upgrading/prepare-install/manage-installation-questions.md">}})
- [mDNS client prerequisites]({{< relref "rs/networking/mdns.md" >}})
- [Offline installation]({{<relref "rs/installing-upgrading/install/offline-installation.md">}})
- [User and group ownership]({{<relref "rs/installing-upgrading/prepare-install/customize-user-and-group.md">}})

## Next steps

1. [Create]({{< relref "/rs/clusters/new-cluster-setup.md" >}})
    or [join]({{< relref "/rs/clusters/add-node.md" >}}) an existing Redis Enterprise Software cluster.

1. [Create a database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

    For geo-distributed Active-Active replication, create an [Active-Active]({{< relref "/rs/databases/active-active/create.md" >}}) database.

1. [Add users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to the cluster with specific permissions.  To begin, start with [Access control]({{<relref "/rs/security/access-control">}}).
