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

**Database shard parallel upgrade** determines the number of shards upgraded in parallel during database upgrades.

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

If **RESP3 support** is enabled, databases upgrading to v7.2 will support the RESP3 protocol in addition to RESP2.

- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster resp3_default { enabled | disabled }
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "resp3_default": <boolean> }
    ```
