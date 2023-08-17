---
Title: Change socket file locations
LinkTitle: Socket file location
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/change-location-socket-files/
---
There are two default locations for the socket files in Redis Enterprise Software (RS):

- `/tmp` - In clean installations of RS version lower than 5.2.2
- `/var/opt/redislabs/run` - In clean installations of RS version 5.2.2 and higher

We made this change because some customers have maintenance procedures that delete the
`/tmp` directory.

When you upgrade from a RS version lower than 5.2.2 to 5.2.2 and higher, the socket files
are not moved to the new location by default. During [installation]({{< relref
"/rs/installing-upgrading/_index.md" >}}) you can specify a custom location
for the socket files, but after installation you must use this procedure to move the socket files.

To change the location of the socket files:

1. On each node in the cluster, run:

    ```sh
    sudo rlutil create_socket_path socket_path=/var/opt/redislabs/run
    ```

1. Identify the master node:
    1. On any node in the cluster, run: `rladmin status nodes`
    1. Find the node that has the **master** role.
1. On the master node, run:

    ```sh
    sudo rlutil set_socket_path socket_path=/var/opt/redislabs/run
    ```

    Now the master node points to the new socket file location.
    To update the location for all other nodes, you must restart RS on each node.

1. To restart RS, on each node in the cluster one at a time run:

    ```sh
    sudo service rlec_supervisor restart
    ```

    Now all nodes point to the new socket file location.
    To update the location for the databases in the cluster, you must restart each database.

    {{< warning >}}
Database restart can cause interruptions in data traffic.
    {{< /warning >}}

1. To restart the databases, for each database in the cluster run:

    ```sh
    rladmin restart db <db name>
    ```
