---
Title: Configure AWS EC2 instances for Redis Enterprise Software
linkTitle: AWS EC2 configuration
description:
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/installing-upgrading/configuring-aws-instances/,
    /rs/installing-upgrading/configuring/configuring-aws-instances/,
]
---
There are some special considerations that are important when installing
and running Redis Enterprise Software on Amazon Web Services (AWS), whether Amazon Electric Cloud Compute (EC2) AWS Outposts.  

These include:

- [Storage considerations](#storage)
- [Instance types](#instance-types)
- [Security group configuration](#security)

## Storage considerations {#storage}

AWS EC2 instances are ephemeral, but your persistent database storage should
not be. If you require a persistent storage location for your database,
the storage must be located outside of the instance. Therefore, when you
set up an instance make sure that it has a properly sized EBS backed volume
connected. Later, when setting up RS on the instance, make sure that [the
persistence storage]({{< relref "/rs/installing-upgrading/persistent-ephemeral-storage.md" >}}) is configured to use this volume.

{{< note >}}
After [installing the RS package]({{< relref "/rs/installing-upgrading/_index.md" >}}) on the instance
and **before** running through [the setup process]({{< relref "/rs/clusters/new-cluster-setup.md" >}}),
you must give the group 'redislabs' permissions to the EBS volume by
running the following command from the OS command-line interface (CLI):
`chown redislabs:redislabs /< ebs folder name>`
{{< /note >}}

Another feature that may be of importance to you is the use of
Provisioned IOPS for EBS backed volumes. Provisioned IOPS guarantee a
certain level of disk performance. There are two features in RS where
this feature could be critical to use:

1. When using [Redis on
    Flash]({{< relref "/rs/databases/redis-flash.md" >}})
1. When using AOF on every write and there is a high write load. In
    this case, the provisioned IOPS should be on the nodes used as
    replicas in the cluster.

## Instance types {#instance-types}

Choose an instance type that has (at minimum) enough free memory and
disk space to meet RS's [hardware
requirements]({{< relref "//rs/installing-upgrading/hardware-requirements.md" >}}).

In addition, some instance types are optimized for EBS backed volumes
and some are not. If you are using persistent storage, you should use an
instance type that is, especially if disk drain rate matters to your database
implementation.

## Security group configuration {#security}

When configuring the Security Group:

- Define a custom TCP rule for port 8443 to allow web browser access
    to the RS management UI from the IP address/ range you use to
    access the UI.
- If you are using the DNS resolving option with RS, define a DNS UDP
    rule for port 53 to allow access to the databases' endpoints by
    using the [DNS resolving mechanism]({{< relref "/rs/networking/cluster-dns/_index.md" >}}).
- To create a cluster that has multiple nodes all running as instances on AWS,
    you need to define a security group that has an All TCP rule for all ports, 0 - 65535,
    and add it to all instances that are part of the cluster.
    This makes sure that all nodes are able to communicate with each other.
    To limit the number of open ports, you can open just the [ports used by RS]({{< relref "/rs/networking/port-configurations.md" >}}).

After successfully launching the instances:

1. Install Redis Enterprise Software from the [Linux package or AWS AMI]({{< relref "/rs/installing-upgrading/_index.md" >}}).
2. [Set up the cluster]({{< relref "/rs/clusters/new-cluster-setup.md" >}}).
