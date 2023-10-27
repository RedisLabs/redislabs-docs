---
title: Configure database settings
linktitle: Configure
description: Configure settings specific to each database.
weight: 20
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: [
   /rs/databases/configure/_index.md,
   /rs/databases/configure/_index/,
   /rs/databases/configure/edit-delete-db/,
   /rs/databases/configure/edit-delete-db.md,
   /rs/administering/database-operations/updating-configurations/,
   /rs/administering/database-operations/updating-configurations.md,
]
---

You can manage your Redis Enterprise Software databases with several different tools:

- [Admin console](#edit-database-settings) (the web-based user interface)

- Command-line tools:

    - [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) for standalone database configuration

    - [`crdb-cli`]({{<relref "/rs/references/cli-utilities/crdb-cli">}}) for Active-Active database configuration

    - [`redis-cli`](https://redis.io/docs/manual/cli/) for open source Redis configuration

- [REST API]({{<relref "/rs/references/rest-api/_index.md">}})

## Edit database settings

You can change the configuration of a Redis Enterprise Software database at any time.<!--more-->

To edit the configuration of a database using the admin console:

1. On the **Databases** screen, select the database you want to edit.

1. From the **Configuration** tab, select **Edit**.

1. Change any [configurable database settings](#config-settings).

    {{< note >}}
For [Active-Active database instances]({{<relref "/rs/databases/active-active">}}), most database settings only apply to the instance that you are editing. To manage Active-Active databases, use the legacy UI.
    {{< /note >}}

1. Select **Save**.

## Configuration settings {#config-settings}

- **Name** - The database name requirements are:

    - Maximum of 63 characters

    - Only letters, numbers, or hyphens (-) are valid characters

    - Must start and end with a letter or digit

    - Case-sensitive

- **Endpoint port number** - You can define the port number that clients use to connect to the database. Otherwise, a port is randomly selected.

    {{< note >}}
You cannot change the [port number]({{< relref "/rs/networking/port-configurations.md" >}})
after the database is created.
    {{< /note >}}

- **Memory limit** - [Database memory limits]({{< relref "/rs/databases/memory-performance/memory-limit.md" >}}) include all database replicas and shards, including replica shards in database replication and database shards in database clustering.

    If the total size of the database in the cluster reaches the memory limit, the data eviction policy for the database is enforced.

    {{< note >}}
If you create a database with Auto Tiering enabled, you also need to set the RAM-to-Flash ratio
for this database. Minimum RAM is 10%. Maximum RAM is 50%.
    {{< /note >}}

- [**Modules**]({{< relref "/rs/developing/modules/_index.md" >}}) - When you create a new in-memory database, you can enable multiple Redis modules in the database. For RoF databases, you can add modules that support RoF.
        
    {{< note >}}
To use modules, add them when you create a new database.
You can't add a module to an existing database.
    {{< /note >}} 
        
    To add a module to the database:

    1. In the **Modules** section, select one or more modules.
    
    1. To customize module configuration, select **Modules parameters** and enter the optional custom configuration.
    
    1. Select **Done**.

### High availability & durability

- [**Replication**]({{< relref "/rs/databases/durability-ha/replication.md" >}}) - We recommend you use intra-cluster replication to create replica shards for each database for high availability.

    If the cluster is configured to support [rack-zone awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}), you can also enable rack-zone awareness for the database.

- [**Replica high availability**]({{<relref "/rs/databases/configure/replica-ha">}}) - Automatically migrates replica shards to an available node if a replica node fails or is promoted to primary.

- [**Persistence**]({{< relref "/rs/databases/configure/database-persistence.md" >}}) - To protect against loss of data stored in RAM, you can enable data persistence and store a copy of the data on disk with snapshots or an Append Only File.

- [**Data eviction policy**]({{< relref "/rs/databases/memory-performance/eviction-policy.md" >}}) - By default, when the total size of the database reaches its memory limit the database evicts keys according to the least recently used keys out of all keys with an "expire" field set in order to make room for new keys. You can select a different data eviction policy.

### Clustering

- **Database clustering** - You can either:
    - Enable [database clustering]({{< relref "/rs/databases/durability-ha/clustering.md" >}}) and select the number of database shards.

        When database clustering is enabled, databases are subject to limitations on [Multi-key commands]({{< relref "/rs/databases/durability-ha/clustering.md" >}}).
        
        You can increase the number of shards in the database at any time.

        You can accept the [standard hashing policy]({{< relref "/rs/databases/durability-ha/clustering#standard-hashing-policy" >}}), which is compatible with open source Redis, or define a [custom hashing policy]({{< relref "/rs/databases/durability-ha/clustering#custom-hashing-policy" >}}) to define where keys are located in the clustered database.

    - Clear the **Database clustering** option to use only one shard so that you can use [Multi-key commands]({{< relref "/rs/databases/durability-ha/clustering.md" >}}) without the limitations.

- Sharding

- [**OSS Cluster API**]({{< relref "/rs/databases/configure/oss-cluster-api.md" >}}) - {{< embed-md "oss-cluster-api-intro.md"  >}}

    If you enable the OSS Cluster API, the shards placement policy and database proxy policy automatically change to _Sparse_ and _All primary shards_.

- [**Shards placement policy**]({{<relref "/rs/databases/memory-performance/shard-placement-policy">}}) - Determines how to distribute database shards across nodes in the cluster.

    - _Dense_ places shards on the smallest number of nodes.
    
    - _Sparse_ spreads shards across many nodes.

- [**Database proxy policy**]({{<relref "/rs/databases/configure/proxy-policy">}}) - Determines the number and location of active proxies, which manage incoming database operation requests.

### Replica Of

With [**Replica Of**]({{< relref "/rs/databases/import-export/replica-of/create.md" >}}), you can make the database a repository for keys from other databases.

### Scheduled backup

You can configure [periodic backups]({{<relref "/rs/databases/import-export/schedule-backups">}}) of the database, including the interval and backup location parameters.

### Alerts

Select [alerts]({{< relref "/rs/clusters/monitoring#database-alerts" >}}) to show in the database status and configure their thresholds.

You can also choose to [send alerts by email]({{<relref "/rs/clusters/monitoring#send-alerts-by-email">}}) to relevant users.

### TLS

You can require [**TLS**]({{<relref "/rs/security/tls/">}}) encryption and authentication for all communications, TLS encryption and authentication for Replica Of communication only, and TLS authentication for clients.

### Database access

- **Unauthenticated access** - You can access the database as the default user without providing credentials.

- **Password-only authentication** - When you configure a password for your database's default user, all connections to the database must authenticate with the [AUTH command](https://redis.io/commands/auth).

    If you also configure an access control list, connections can specify other users for authentication, and requests are allowed according to the Redis ACLs specified for that user.

    Creating a database without ACLs enables a *default* user with full access to the database. You can secure default user access by requiring a password.

- **Access Control List** - You can specify the [user roles]({{<relref "/rs/security/access-control/rbac/create-roles">}}) that have access to the database and the [Redis ACLs]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) that apply to those connections.

    To define an access control list for a database:

    1. In **Security > Access Control > Access Control List**, select **+ Add ACL**.

    1. Select a [role]({{<relref "/rs/security/access-control/rbac/create-roles">}}) to grant database access.

    1. Associate a [Redis ACL]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) with the role and database.

    1. Select the check mark to add the ACL.

### Internode encryption

Enable **Internode encryption** to encrypt data in transit between nodes for this database. See [Internode encryption]({{<relref "/rs/security/encryption/internode-encryption">}}) for more information.

