---
title: Internode encryption
linkTitle: Internode encryption
description: Describes internode which improves the security of data in transit. 
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: /rs/security/internode-encryption/
         /rs/security/internode-encryption.md
---
As of v6.2.4, Redis Enterprise Software supports _internode encryption_, which encrypts internal communication between nodes. This improves the security of data as it travels within a cluster.

By default, internode encryption is enabled for the control plane, which manages communications within the cluster.

Internode encryption is also supported for the data plane, which encrypts communication used to replicate shards between nodes and proxy communication with shards located on different nodes.

Internode encryption is disabled by default for individual databases in order to optimize for performance.  Encryption adds latency and overhead; the impact is measurable and varies according to the database. You can enable internode encryption for a database by changing its configuration settings.  This lets you choose when to favor performance and when to encrypt data.

## Prerequisites

Internode encryption requires certain prerequisites.  

You need to:

- Upgrade all nodes in the cluster to v6.2.4 or later.

- Open port 3342 for the TLS channel used for encrypted communication.


## Enable internode encryption for databases

To enable internode encryption for a database, you need to enable the appropriate setting for each database you wish to encrypt.  There are several ways to do this:

- Use the admin console to enable the **Internode encryption** setting from the database configuration screen:

    {{<image filename="images/rs/database-configuration-internode-encryption-edit.png" alt="The Internode encryption setting can be found on the Configuration tab of the Database settings." >}}{{< /image >}}

-  Use the `rladmin` command-line utility to set the [data_internode_encryption]({{< relref "/rs/references/rladmin.md#tune" >}}) setting for the database:

    ``` text
    rladmin tune db <database_id> true
    ``` 

- Use the Redis Enterprise Software REST API to set the `data_internode_encryption` setting for the database.

    ``` rest
    put /v1/bdbs/${database_id}
    { “data_internode_encryption” : true }
    ```

When you change the internode encryption setting for a database, all active remote client connections are disconnected.  This affects every connection outside the node.

## Certificate authority and rotation

Starting with v6.2.4, internode communication is managed, in part, by two certificates, one for the control plane and one for the data plane.  These certificates are signed by a private certificate authority (CA).  The CA is not exposed outside of the cluster, so it cannot be accessed by external processes or services.  In addition, each cluster generates a unique CA that is not used anywhere else.

The private CA is generated when a cluster is created or upgraded to 6.2.4.  

When nodes join the cluster, the cluster CA is used to generate certificates for the new node, one for each plane.  Certificates signed by the private CA are not shared between clusters and they're not exposed outside the cluster.

All certificates signed by the internal CA are automatically rotated. Every thirty (30) days, an internal process checks certificate expiration and generates new certificates when the existing ones are about to expire.  Alerts also monitor certificate expiration and are triggered when problems prevent certificates from being rotated.

You can use the Redis Enterprise Software REST API to rotate certificates manually:

``` rest
put /v1/cluster/certificates/rotate
```
