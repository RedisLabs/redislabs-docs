---
Title: Change database upgrade configuration
linkTitle: Upgrade configuration
description: Configure cluster-wide policies that affect default database upgrades.
weight: 15
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Database upgrade configuration includes cluster-wide policies that affect default database upgrades.

## Edit upgrade configuration

To edit database upgrade configuration using the Cluster Manager UI:

1. On the **Databases** screen, select <img src="/images/rs/buttons/button-toggle-actions-vertical.png#no-click" alt="Toggle actions button" width="22px"> to open a list of additional actions.

1. Select **Upgrade configuration**.

1. Change database [upgrade configuration settings](#upgrade-config-settings).

1. Select **Save**.

## Upgrade configuration settings {#upgrade-config-settings}

### Database shard parallel upgrade

To change the number of shards upgraded in parallel during database upgrades, use one of the following methods:

- Cluster Manager UI – Edit **Database shard parallel upgrade** in [**Upgrade configuration**](#edit-upgrade-configuration)

- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster parallel_shards_upgrade { all | <integer> }
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "parallel_shards_upgrade": <integer> }
    ```

### RESP3 support

The cluster-wide option `resp3_default` determines the default value of the `resp3` option, which enables or deactivates RESP3 for a database, upon upgrading a database to version 7.2 or later. `resp3_default` is set to `enabled` by default.

To change `resp3_default` to `disabled`, use one of the following methods:

- Cluster Manager UI – Edit **RESP3 support** in [**Upgrade configuration**](#edit-upgrade-configuration)

- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster resp3_default { enabled | disabled }
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "resp3_default": <boolean> }
    ```
