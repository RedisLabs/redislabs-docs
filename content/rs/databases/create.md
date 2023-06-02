---
title: Create a Redis Enterprise Software database
linkTitle: Create a database
description: Create a database with Redis Enterprise Software.
weight: 10
alwaysopen: false
categories: ["RS"]
db_type: database
aliases: [
    /rs/administering/creating-databases/_index.md,
    /rs/administering/database-operations/creating-database/,
    /rs/databases/create-database.md,
    /rs/databases/create-database/,
    /rs/administering/creating-databases/,
    /rs/databases/create.md,
    /rs/databases/create/,
]
---
Redis Enterprise Software lets you create databases and distribute them across a cluster of nodes.

To create a new database:

1. In your web browser, open the admin console of the cluster that you want to connect to in order to create the database.

    The default URL is: `https://<hostname>:8443`

1. Use one of the following methods to create a new database:

    - [Quick database](#quick-database)

    - [Create database](#create-database) with additional configuration

1. If you did not specify a port number for the database, you can find the port number in the **Endpoint** field in the **Databases > Configuration > General** section.

1. [Test client connectivity]({{<relref "/rs/databases/connect/test-client-connectivity">}}).

{{< note >}}
For databases with Active-Active replication for geo-distributed locations,
see [Create an Active-Active database]({{< relref "/rs/databases/active-active/create.md" >}}).
{{< /note >}}

## Quick database

To quickly create a database and skip additional configuration options during initial creation:

1. On the **Databases** screen, select **Quick database**.

1. Configure basic database settings:

    - Database name

    - Port (optional; set by the cluster if not set manually)

    - Memory limit (GB)

    - Modules and modules parameters (optional)

1. Optionally select **Full options** to configure additional settings.

1. Select **Create**.

## Create database

To create a new database and configure additional settings:

1. On the **Databases** screen, select **Create database**.

1. Enter a **Database name**.

    - Maximum of 63 characters

    - Only letters, numbers, or hyphens (-) are valid characters

    - Must start and end with a letter or digit

    - Not case-sensitive

1. To configure additional database settings, expand each relevant section to make changes.

    See [Configuration settings](#config-settings) for more information about each setting.

1. Select **Create**.

## Configuration settings {#config-settings}

- **Name** - The database name requirements are:

    - Maximum of 63 characters

    - Only letters, numbers, or hyphens (-) are valid characters

    - Must start and end with a letter or digit

    - Not case-sensitive

- **Endpoint port number** - You can define the port number that clients use to connect to the database,
        or a port is randomly selected.

    {{< note >}}
You cannot change the [port number]({{< relref "/rs/networking/port-configurations.md" >}})
after the database is created.
    {{< /note >}}

- **Memory limit** - The [database memory limits]({{< relref "/rs/databases/memory-performance/memory-limit.md" >}}) includes all database replicas and shards, including replica shards in database replication and database shards in database clustering.

    If the total size of the database in the cluster reaches the memory limit, then the data eviction policy for the database is enforced.

    {{< note >}}
If you create a Redis on Flash
or a Memcached Flash database, you also have to set the RAM-to-Flash ratio
for this database. Minimum RAM portion is 10%, and maximum RAM portion is 50%.
    {{< /note >}}

- [**Redis Modules**]({{< relref "/rs/developing/modules/_index.md" >}}) - When you create a new in-memory database, you can enable multiple Redis modules to the database. For RoF databases, you can add modules that support RoF.
        
    {{< note >}}
To use modules, add them when you create a new database.
You can't add a module to an existing database.
    {{< /note >}} 
        
    To add a module to the database:

    1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").

    1. Select the module that you want to add.
    
    1. If you want the module to use a custom configuration,
        click **Add configuration** and enter the optional custom configuration.
    
    1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

### High availability & durability

- [**Replication**]({{< relref "/rs/databases/durability-ha/replication.md" >}}) - We recommend that you use intra-cluster replication to create replica shards for each database for high-availablity of your data.

    If the cluster is configured to support [rack-zone awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}), you can also enable rack-zone awareness for the database.

- [**Data persistence**]({{< relref "/rs/databases/configure/database-persistence.md" >}}) - To protect against loss of data stored in RAM, you can enable data persistence and select to store a copy of the data on disk with snapshots or Append Only File.

- [**Data eviction policy**]({{< relref "/rs/databases/memory-performance/eviction-policy.md" >}}) - By default, when the total size of the database reaches its memory limit the database evicts keys according to the least recently used keys out of all keys with an "expire" field set in order to make room for new keys. You can select a different data eviction policy.

### Clustering

- **Database clustering** - You can either:
    - Enable [database clustering]({{< relref "/rs/databases/durability-ha/clustering.md" >}}) and select the number of shards that you want to have in the database.

        When database clustering is enabled, databases are subject to limitations on [Multi-key commands]({{< relref "/rs/databases/durability-ha/clustering.md" >}}).
        
        You can increase the number of shards in the database at any time.

        You can accept the [standard hashing policy]({{< relref "/rs/databases/durability-ha/clustering#standard-hashing-policy" >}}) or define a [custom hashing policy]({{< relref "/rs/databases/durability-ha/clustering#custom-hashing-policy" >}}) to define where keys are located in the clustered database.

    - Clear the **Database clustering** option to use only one shard so that you can use [Multi-key commands]({{< relref "/rs/databases/durability-ha/clustering.md" >}}) without the limitations.

- Sharding

- [**OSS Cluster API**]({{< relref "/rs/databases/configure/oss-cluster-api.md" >}}) - {{< embed-md "oss-cluster-api-intro.md"  >}}

- Shards placement policy

- Database proxy policy

### Replica Of

- [**Replica Of**]({{< relref "/rs/databases/import-export/replica-of/create.md" >}}) - You can make this database a repository for keys from other databases.

### Schedule backup

- [**Periodic backup**]({{< relref "/rs/databases/import-export/schedule-backups.md" >}}) - You can configure periodic backups of the database, including the interval and backup location parameters.

### Alerts

- [**Alerts**]({{< relref "/rs/clusters/monitoring#database-alerts" >}}) - You can select alerts to show in the database status and configure their thresholds.

    You can also select to send the alerts by email to [relevant users]({{< relref "/rs/administering/designing-production/access-control/_index.md" >}}).

### TLS

- [**TLS**]({{<relref "/rs/security/tls/">}}) - You can require TLS encryption and authentication for all communications, TLS encryption and authentication for Replica Of communication only, and TLS authentication for clients.

### Database access

- **Default database access** - When you configure a password for your database, all connections to the database must authenticate with the [AUTH command](https://redis.io/commands/auth).

    If you also configure an access control list, connections can specify other users for authentication, and requests are allowed according to the Redis ACLs specified for that user.

    Note that creating a database without further ACLs (see below) contains a *default* user with full access to the database which in turn requires the definition a password for security reasons.

    {{< note >}}
If you are creating a Memcached database, enter a username and password for SASL Authentication.
    {{< /note >}}

- **Access Control List** - You can specify the [user roles]({{<relref "/rs/security/access-control/rbac/create-roles">}}) that have access to the database and the [Redis ACLs]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) that apply to those connections.

    To define an access control list:

    1. In the Access control list section of the database configuration, click ![Add](/images/rs/icon_add.png#no-click "Add").

    1. Select the [role]({{<relref "/rs/security/access-control/rbac/create-roles">}}) that you want to have access to the database.

    1. Select the [ACL]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) that you want the role to have in the database.

    1. Click **Save** to save the ACL.

    1. Click **Update** to save the changes to the database.

### Internode encryption

Enable **Internode encryption** to encrypt data in transit between nodes for this database. See [Internode encryption]({{<relref "/rs/security/internode-encryption">}}) for more information.