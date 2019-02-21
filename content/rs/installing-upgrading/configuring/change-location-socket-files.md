---
Title: Change Location of Socket Files
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/change-location-socket-files/
---
There are two default locations for the socket files:

- `/tmp` - In clean installations of RS version lower than 5.2.2
- `/var/opt/redislabs/run` - In clean installations of RS version 5.2.2 and higher

We made this change because some customers have maintenance procedures that delete the
`/tmp` directory.

When you upgrade from a RS version lower than 5.2.2 to 5.2.2 and higher, the socket files
are not moved to the new location by default. During [installation]({{< relref 
"/rs/installing-upgrading/downloading-installing.md" >}}) you can specify a custom location
for the socket files, but after installation you must use this procedure to move the socket files.

To change the location of the socket files:

1. On each node in the cluster, run:

    ```src
    $ sudo rlutil create_socket_path socket_path=/var/opt/redislabs/run
    ```

1. Identify the master node:
    1. On any node in the cluster, run: `rladmin status nodes`
    1. Find the node that has the **master** role.
1. On the master node, run:

    ```src
    $ sudo rlutil set_socket_path socket_path=/var/opt/redislabs/run
    ```

1. On each node in the cluster one at a time, run:

    ```src
    $ sudo service rlec_supervisor restart
    ```

1. To restart all of the shards in the cluster, either:
    - Restart each database in the cluster:
    
        {{% warning %}}
        Database restart can cause interruptions in data traffic.
        {{% /warning %}}
        ```src
        $ rladmin restart db <db name>
        ```

    - For each master/slave shard for each database in the cluster:

        {{% warning %}}
        We recommend that you run these commands during a maintenance window
        to reduce the risk of downtime.
        {{% /warning %}}

        1. On the node that hosts the slave shard, run: `redis_ctl stop <slave shard id>`
        1. On the node that hosts the slave shard, run: `rladmin failover shard <master shard id>`
        1. On the node that hosts the master shard that failed over, run: `redis_ctl stop <failed-over master shard id>`

        For example, if the slave shard 6 is on node 1 and the master shard 5 is on node 3:

        1. On node 1, run: `redis_ctl stop 6`
        1. On node 1, run: `rladmin failover shard 5`
        1. On node 3, run: `redis_ctl stop 5`
