---
Title: Installing the setup package
description: 
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/downloading-installing/
---
The first thing you need to decide is how you will deploy Redis
Enterprise Software. If on-premise or in the cloud and you want to
install it yourself, you will need to download the package. If on docker
or through an AMI, there are other instructions than this page for that.
Regardless, navigate to the [Redis Labs download
page](https://app.redislabs.com/#/sign-up/software?direct=true) and
select one of the following options:

- **Installation package** - Click the **Download** button for the OS
    you would like to use in order to download the .tar file
    installation package.
- **AMI** - Click the **AWS AMI** button for the option you would
    like to use in order to launch an instance on Amazon Web Services
    (AWS).
- **Docker** - Go
    [here]({{< relref "/rs/getting-started/docker/_index.md" >}})
    for the install guide and skip this page.

Note: If you are using the AMI option or installing the .tar file
package on an AWS instance, review the guidelines in [Configuration of
AWS
instances]({{< relref "/rs/installing-upgrading/configuring-aws-instances.md" >}}).

## Prerequisites

1. If you intend to use [Redis on
    Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) for your
    databases, be familiar with the specifics of that feature and its
    set of prerequisites, storage, and considerations.
1. [Disable Linux
    swap]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}})
    on all nodes to be part of the cluster.
1. Ensure you have root level access to each node, either directly or
    via sudo.
1. When port 53 is in use, the installation fails. This is known to happen in
    default Ubuntu 18.04 installations in which systemd-resolved (DNS server) is running.
    To workaround this issue, change the system configuration to make this port available
    before running RS installation.

    {{% expand "Example steps to resolve the port 53 conflict:" %}}
 1. Run: `sudo gedit /etc/systemd/resolved.conf`
 1. Add `DNSStubListener=no` as the last line in the file and save the file.
 1. Run: `sudo mv /etc/resolv.conf /etc/resolv.conf.orig`
 1. Run: `sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf`
 1. Run: `sudo service systemd-resolved restart`
    {{% /expand %}}

## Installation Procedure

If you downloaded the .tar file installation package, install the
package on a machine that will serve as one of the nodes in the cluster
by performing the following steps:

1. In the operating system command-line-interface (CLI), also referred
    to as Terminal, run the cd command to change the location to the
    directory where you saved the .tar file.
1. Extract the package by running the following command in the CLI:

    ```src
    $ tar vxf <tarfile name>
    ```

1. To initiate the installation in the CLI, run the following command:

    ```src
    $ sudo ./install.sh -s /var/run/redislabs
    ```

    Note: You must either be the root user or have access to sudo to the
    root user to run the install process.

    The -s switch is to tell install.sh to locate the Linux socket files
    in /var/run/redislabs instead of the default, which is /tmp.

1. During the installation process, enter the requested input each time
    you are prompted to do so.
1. After installation has completed successfully
    1. The install finishes up with rlcheck make testing the
        installation out and confirming the installation passed.

        ```
        2017-04-24 10:54:12 [!] Installation is complete!
        2017-04-24 10:54:12 [?] Would you like to run rlcheck to
        verify proper configuration? [Y/N]? Y
        2017-04-24 10:54:15 [$] executing:
        '/opt/redislabs/bin/rlcheck
        --suppress-tests=verify_bootstrap_status,verify_processes'
        saving to file: /var/opt/redislabs/log/rlcheck.log
        ##### Welcome to RedisLabs Enterprise Cluster settings
        verification utility ####
        Skipping test: verify_bootstrap_status
        Skipping test: verify_processes
        Running test: verify_dmcproxy
        Verifying dmcproxy process...
        PASS
        Running test: verify_port_range
        Verifying local port range...
        PASS
        Summary:
        -------
        ALL TESTS PASSED.
        2017-04-24 10:54:15 [!] Please logout and login again to make
        sure all environment changes are applied.
        2017-04-24 10:54:15 [!] Point your browser at the following
        URL to continue:
        2017-04-24 10:54:15 [!] https://<your_ip_here>:8443
        ```

        Make sure to save this URL for when you go to configure the
        cluster.

    1. If you intend to create [Redis on
        Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) enabled
        databases, you must prepare and format the flash memory. You
        should run:

        ```src
        $ sudo /opt/redislabs/sbin/prepare_flash.sh
        ```

        This command finds all the unformatted disks, RAIDs and mounts
        them under /var/opt/redislabs/flash
        You can verify the configuration by running:

        ```src
        $ sudo lsblk
        ```

1. Open a web browser and go to the Web UI to complete the cluster
    setup.

## Silent Installations

If you would like to automate the installation script, use either of the
following methods to perform a "silent" installation that speeds the
process:

1. Run the install script with "-y" as a parameter (i.e. ./install.sh
    -y), which will silently use "Y" as a default response to all
    questions.
    WARNING: By using the -y parameter you will fail to see any alerts
    from the installer to the possible presence of DBs in Sync state.
    These alerts when in normal mode allow you to stop the upgrade if
    they find a DB in that state. Check that your DBs are not in this
    state before possibly using this flag. Otherwise, do not use this
    feature.
1. Run the install script with "-c" and an answers file path as
    parameters (i.e. ./install.sh --c \<answers and="" file="" name=""
    path=""\>), thereby allowing the installation to use the answers
    provided in your answers file. Here is sample content for the
    answers file:
    systune=yes
    ntp=no
    firewall=no
    rlcheck=yes

Not all questions in install.sh can be automated with the answers file.
The reason being is we want an admin to see what was detected and
consciously agree to do or not to do something. An example is when
install.sh detects that a shard of a DB is syncing right now. If that
situation is detected, the admin needs to knowingly assume the risk of
proceeding and not waiting.

Note: While `sudo ./install.sh -y` or using an answers file does not
perform the steps necessary for Redis on Flash or creating a
cluster. That part of each node's install still has to be done and
potentially automated separately.

## Installation questions

During the interactive installation process, there questions asked to
understand how much you want the process to try and configure the OS
environment for optimal usage by Redis Enterprise. Each question and
what they will do is below.

### Linux Swap

```src
Swap is enabled. Do you want to proceed? [Y/N]?
```

Due to how Redis Enterprise manages memory on a node, Linux swap should
be disabled in the operating system configuration. For more information
on why and how to do this, please see [Swap in
Linux]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}}).

### Shard is syncing

Under some circumstances, a database shard may be syncing at the time
you run the install script.

```src
shard:X of db:Y is now syncing. Do you want to continue the upgrade
```

This answer cannot be automatically answered 'Y' due to the sensitive
nature of the operation it is warning about. An admin must either assume
the risk or abort the install/upgrade.

### Automatically Tuning the System

```src
Do you want to automatically tune the system for best performance [Y/N]?
```

The install process can run a script that will do environment changes on
your behalf. If you answer yes to this question, the install will ask
more in-depth questions to best optimize the OS environment for running
Redis Enterprise.

If you answer no, you will manually have to tune the OS for running
Redis Enterprise.

It is recommended to answer 'Y' to this question and the remaining
questions as they will streamline the configuration of the environment.

If you would like to see specifically what is being done, please see
/opt/redislabs/sbin/systune.sh on the node.

### Network Time Configuration

```src
Do you want to set up NTP time synchronization now [Y/N]?
```

Redis Enterprise requires that all nodes of the cluster have
synchronized time. If you do not permit the script to configure this,
then you must do this manually. For more information see [Syncing Node
Clocks]({{< relref "/rs/administering/designing-production/synchronizing-clocks.md" >}}).

### Firewall Ports

```src
Would you like to open RedisLabs cluster ports on the default firewall zone [Y/N]?
```

If a firewall is operating on the node the install process is running,
the script can configure the firewall to open the correct [ports Redis
Enterprise
requires]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}})
to operate. If not, you will have to open the necessary ports on your
own. If you need, there is specific information on [RHEL/CentOS firewall
configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}).

### Final Check

```src
Would you like to run rlcheck to verify proper configuration? [Y/N]?
```

This runs a final check to make sure everything has been done correctly.
It is advisable to answer 'Y' on this. If
you would like to see the contents of this script, it is installed
to /opt/redislabs/bin/rlcheck on every Redis Enterprise
node.
