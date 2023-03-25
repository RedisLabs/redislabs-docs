---
Title: Prepare to install Redis Enterprise Software
linkTitle: Prepare to install
description: Prepare to install Redis Enterprise Software.
weight: 22
alwaysopen: false
categories: ["RS"]
aliases: 
---


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

- If you want to use Redis on Flash (RoF) for your databases, review the prerequisites, storage requirements, and [other considerations]({{< relref "/rs/databases/redis-on-flash/" >}}) for RoF databases and prepare and format the flash memory.

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

{{< allchildren style="h2" description="true" />}}
