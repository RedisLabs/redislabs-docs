---
Title: Installing Redis Enterprise Software on Linux
description:
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/
        /rs/installing-upgrading/downloading-installing/
---
To install Redis Enterprise Software (RS), you must first choose the [supported platform]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}}) that you want to deploy on.
In addition to Linux operating systems (Ubuntu, RHEL/CentOS, Oracle Linux), you can also deploy RS on these platforms:

- Amazon AWS AMI
- [Docker container]({{< relref "/rs/getting-started/docker/getting-started-docker.md" >}}) (for development and testing only)
- [Pivotal Cloud Foundry]({{ relref "/platforms/pcf/using-pcf.md" }})
- [Kubernetes]({{< relref "/platforms/kubernetes/_index.md.md" >}})

To access the installation package for any of these platforms:

1. Go to the [Redis Labs download page](https://app.redislabs.com/#/sign-up/software?direct=true).
1. Log in with your Redis Labs credentials or sign up for a new account.
1. In the Downloads section for Redis Enterprise Software, select the installation package for your platform and click **Download**.

{{% note %}}
Before you install the Linux package or AWS AMI on an AWS instance,
review the [configuration requirements for AWS instances]
({{< relref "/rs/installing-upgrading/configuring-aws-instances.md" >}}).
{{% /note %}}

In this article we walk you through the process for installing the RS installation package for Linux.

## Prerequisites

- If you want to use Redis on Flash (RoF) for your databases, review the [prerequisites, storage requirements, and other considerations]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) for RoF databases and prepare and format the flash memory.
    {{% expand "To prepare and format the flash memory:" %}}
Run:

```src
sudo /opt/redislabs/sbin/prepare_flash.sh
```

This command finds all the unformatted disks and mounts them as RAID partitions in `/var/opt/redislabs/flash`.

To verify the disk configuration, run:

```src
sudo lsblk
```
    {{% /expand %}}

- [Disable Linux swap]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}}) on all cluster nodes.
- Make sure that you have root level access to each node, either directly or with sudo.
- When port 53 is in use, the installation fails. This is known to happen in
    default Ubuntu 18.04 installations in which systemd-resolved (DNS server) is running.
    To workaround this issue, change the system configuration to make this port available
    before running RS installation.

    {{% expand "Example steps to resolve the port 53 conflict:" %}}
1. Run: `sudo vi /etc/systemd/resolved.conf`
2. Add `DNSStubListener=no` as the last line in the file and save the file.
3. Run: `sudo mv /etc/resolv.conf /etc/resolv.conf.orig`
4. Run: `sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf`
5. Run: `sudo service systemd-resolved restart`
    {{% /expand %}}

## Installing RS on Linux

After you download the .tar file installation package, install the
package on one of the nodes in the cluster.

To install RS on Linux from the CLI:

1. Copy the installation package to the node.
1. On the node, change to the directory where the installation package is and extract the installation files:

    ```src
    tar vxf <tarfile name>
    ```

1. To install RS, run:

    ```src
    sudo ./install.sh
    ```

    {{% note %}}
You must either be logged in as the root user or use sudo to run the install process.
    {{% /note %}}

1. Follow the [installation prompts](#installation-questions) to complete the installation process,
    including the rlcheck installation verification.

    {{% note %}}
To install RS without answering the installation questions, either:

- Run `./install.sh -y` to answer yes to all of the questions.
- Use an [answer file](#installation-answer-file) to answer the installation questions.
    {{% /note %}}

    After RS is successfully installed, the IP address of the RS web UI is shown:

    ```src
    Summary:
    -------
    ALL TESTS PASSED.
    2017-04-24 10:54:15 [!] Please logout and login again to make
    sure all environment changes are applied.
    2017-04-24 10:54:15 [!] Point your browser at the following
    URL to continue:
    2017-04-24 10:54:15 [!] https://<your_ip_here>:8443
    ```

RS is now installed on the node.
Repeat this process for each node in the cluster and then:

1. [Create]({{< relref "/rs/administering/cluster-operations/new-cluster-setup.md" >}})
or [join]({{< relref "/rs/administering/cluster-operations/adding-node.md" >}}) an RS cluster.
1. [Create a database]({{< relref "/rs/administering/database-operations/creating-database.md" >}}).

    For geo-distributed Active-Active replication, create an [Active-Active]({{< relref "/rs/administering/database-operations/create-crdb.md" >}}) database.

### Installation questions

During the installation process, you must answer a few questions to configure the node for your environment.
These installation questions are:

- **Linux swap file** - `Swap is enabled. Do you want to proceed? [Y/N]?`

    We recommend that you [disable Linux swap]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}}) in the operating system configuration
    to give RS control of the memory allocation.

- **Automatic OS tuning** - `Do you want to automatically tune the system for best performance [Y/N]?`

    To let the RS installation optimize the OS for Redis Enterprise, answer `Y`.
    The installation process prompts you for additional information.

    The `/opt/redislabs/sbin/systune.sh` file contains details about the tuning process.

- **Network time** - `Do you want to set up NTP time synchronization now [Y/N]?`

    Redis Enterprise requires that all nodes of the cluster have synchronized time.
    You can either let the installation process configure NTP
    or you can [configure NTP manually]({{< relref "/rs/administering/designing-production/synchronizing-clocks.md" >}}).

- **Firewall ports** - `Would you like to open RedisLabs cluster ports on the default firewall zone [Y/N]?`

    RS requires the node to have [specific network ports]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) open.
    You can either:

    - Answer `Y` to let the installation process open these ports.
    - Answer `N` and configure the firewall manually for [RHEL/CentOS firewall]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}).
    - Answer `N` and configure the firewall on the node manually for your OS.

- **Installation verification (rlcheck)** - `Would you like to run rlcheck to verify proper configuration? [Y/N]?`

    We recommend that you run the rlckeck installation verification to make sure that the installation completed succesfully.
    If you want to run this verification at a later time, you can run: `/opt/redislabs/bin/rlcheck`

### Installation answer file

To avoid answering the installation questions during the installation process,
you can prepare an answer file and use it to do a silent installation.

To install RS with an answer file:

1. Prepare the answer file with the answers to the questions.

    For example:

    ```sh
    ignore_swap=no
    systune=yes
    ntp=no
    firewall=no
    rlcheck=yes
    ```

    {{% note %}}
If you use `systune=yes`, the installation answers yes to all of the system tuning questions.
    {{% /note %}}

1. Run the install script with `-c` and the path to the answer file.

    For example:

    ```sh
    ./install.sh -c /home/answerfile
    ```
