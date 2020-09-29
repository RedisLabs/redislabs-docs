---
Title: Distributed Synchronization for Replicated Databases
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Replicated databases, including those that use [Active-Passive]({{< relref "/rs/administering/designing-production/active-passive.md" >}}) and [Active-Active]({{< relref "/rs/administering/designing-production/active-active.md" >}}) replication,
use proxy endpoints to synchronize database changes with the databases on the other participating clusters.
To improve the throughput and lower the latency for synchronization traffic,
you can configure a replicated database to use distributed synchronization where any available proxy endpoint can manage synchronization traffic.

Every database by default has one proxy endpoint that manages client and synchronization communication with the database shards,
and that proxy endpoint is used for database synchronization.
This is called centralized synchronization.

To prepare a database to use distributed synchronization you must first make sure that the database [proxy policy]({{< relref "/rs/administering/designing-production/networking/multiple-active-proxy.md" >}})
is defined so that either each node has a proxy endpoint or each master shard has a proxy endpoint.
After you have multiple proxies for the database,
you can configure the database synchronization to use distributed synchronization.

To configure distributed synchronization:

1. To check the proxy policy for the database, run: `rladmin status`

    The output of the status command shows the list of endpoints on the cluster and the proxy policy for the endpoint.

    ```sh
    ENDPOINTS:
    DB:ID       NAME      ID                        NODE          ROLE                                SSL
    db:1        db        endpoint:1:1              node:1        all-master-shards                   No
    ```

    If the proxy policy (also known as a role) is `single`, configure the policy to `all-nodes` or `all-master-shards` according to your needs with the command:

    ```sh
    rladmin bind db <db_name> endpoint <endpoint id> policy <all-master-shards|all-nodes>
    ```

1. To configure the database to use distributed synchronization, run:

    ```sh
    tune db <db_name> syncer_mode distributed
    ```

    To change back to centralized synchronization, run:

    ```sh
    tune db <db_name> syncer_mode centralized
    ```
