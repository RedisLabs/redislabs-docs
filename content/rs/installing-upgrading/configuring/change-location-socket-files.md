---
Title: Change Location of Socket Files
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/change-location-socket-files/
---
You can change the location of the socket files anytime, but to limit
downtime, it is best to perform this change when you are
[installing]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}})
or
[upgrading]({{< relref "/rs/installing-upgrading/upgrading.md" >}})
Redis Enterprise Software to version 4.5.0.-51 or higher. If this change
needs to be performed immediately on an existing cluster, see the
instructions below.

## Changing the Location on an Existing Redis Enterprise Software (RS) Installation

You must be running RS version 4.5.0-51 or higher, and with the sock
files location is still under the default location of /tmp. (This is
where they go when install.sh is executed without -s flag.)

1. Execute this command **on all nodes**:

    ```src
    $ sudo rlutil create_socket_path socket_path=/var/run/redislabs
    ```

1. Execute this command **on the master node**:

    ```src
    $ sudo rlutil set_socket_path socket_path=/var/run/redislabs
    ```

1. Execute this command **on all nodes in a serial manner**:

    ```src
    $ sudo service rlec_supervisor restart
    ```

1. There are two ways to do the next step depending on your uptime
    requirements.
    1. Restart each database in the cluster, but you will incur
        downtime. This is by far the easiest option to execute.

        ```src
        $ rladmin restart db <db name>
        ```

    1. Execute the following three commands **for each** master/slave
        shards during a maintenance window. All three of these commands
        **must** be executed **on the node hosting the shard being
        operated on**:

        ```src
        $ redis_ctl stop <slave shard id>
        $ rladmin failover shard <master shard id>
        $ redis_ctl stop <new slave shard id>
        ```

        Example:

        ```src
        $ redis_ctl stop 6 # command run on node 1, since shard 6 is running on node 1
        $ rladmin failover shard 5
        $ redis_ctl stop 5 # command run on node 3, since shard 5 is running on node 3
        ```

        This must be performed **for each database** in the cluster and
        **each shard** in each database.
