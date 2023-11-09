---
Title: Configure database defaults
linkTitle: Database defaults
description: Cluster-wide policies that determine default settings when creating new databases.
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Database defaults are cluster-wide policies that determine default settings when creating new databases.

## Edit database defaults

To edit default database configuration using the Cluster Manager UI:

1. On the **Databases** screen, select <img src="/images/rs/buttons/button-toggle-actions-vertical.png#no-click" alt="Toggle actions button" width="22px"> to open a list of additional actions.

1. Select **Database defaults**.

1. Configure [database defaults](#db-defaults).

1. Select **Save**.

## Database defaults {#db-defaults}

### Replica high availability

If [replica high availability]({{<relref "/rs/databases/configure/replica-ha">}}) is enabled, the cluster automatically migrates replica shards to an available node if a replica node fails or is promoted after a primary (master) node fails.

To enable or turn off replica high availability by default, use one of the following methods:

- Cluster Manager UI – Edit **Replica High Availability** in [**Database defaults**](#edit-database-defaults)

- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster slave_ha { enabled | disabled }
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "slave_ha": <boolean> }
    ```

### Database version

When you upgrade an existing database or create a new one, it uses the default Redis version (**Database version**) unless you specify the database version explicitly with `redis_version` in the [REST API]({{<relref "/rs/references/rest-api/requests/bdbs">}}) or [`rladmin upgrade db`]({{<relref "/rs/references/cli-utilities/rladmin/upgrade#upgrade-db">}}).

To configure the Redis database version, use one of the following methods:

- Cluster Manager UI – Edit **Database version** in [**Database defaults**](#edit-database-defaults)


- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster default_redis_version <x.y>
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "default_provisioned_redis_version": "x.y" }
    ```

### S3 URL

The S3 URL is the default S3 host for [importing and exporting data]({{<relref "/rs/databases/import-export">}}).

To configure the default S3 URL, use one of the following methods:

- Cluster Manager UI – Edit **S3 URL** in [**Database defaults**](#edit-database-defaults)

- [rladmin cluster config]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}}): 
    
    ```sh
    rladmin cluster config s3_url <URL>
    ```

- [Update cluster settings]({{<relref "/rs/references/rest-api/requests/cluster#put-cluster">}}) REST API request:

    ```sh
    PUT /v1/cluster
    { "s3_url": "<URL>" }
    ```

### Internode encryption

Enable [internode encryption]({{<relref "/rs/security/encryption/internode-encryption">}}) to encrypt data in transit between nodes for new databases by default.

To enable or turn off internode encryption by default, use one of the following methods:

- Cluster Manager UI – Edit **Internode Encryption** in [**Database defaults**](#edit-database-defaults)

- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster data_internode_encryption { enabled | disabled }
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "data_internode_encryption": <boolean> }
    ```
