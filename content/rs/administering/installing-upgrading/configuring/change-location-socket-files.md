---
Title: Change Location of Socket Files
description: 
weight: $weight
alwaysopen: false
---
You can change the location of the socket files anytime, but to limit
downtime, it is best to perform this change when you are
[installing](/rs/administering/installing-upgrading/downloading-installing/)
or
[upgrading](/rs/administering/installing-upgrading/upgrading/)
Redis Enterprise Software to version 4.5.0.-51 or higher. If this change
needs to be performed immediately on an existing cluster, see the
instructions below.

## Changing the Location on an Existing Redis Enterprise Software (RS) Installation

You must be running RS version 4.5.0-51 or higher, and with the sock
files location is still under the default location of /tmp. (This is
where they go when install.sh is executed without -s flag.)

1.  Execute this command **on all nodes**:

    ``` {style="border: 2px solid #ddd; font-family: courier; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ sudo rlutil create_socket_path socket_path=/var/run/redislabs
    ```

2.  Execute this command **on the master node**:

    ``` {style="border: 2px solid #ddd; font-family: courier; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ sudo rlutil set_socket_path socket_path=/var/run/redislabs
    ```

3.  Execute this command **on all nodes in a serial manner**:

    ``` {style="border: 2px solid #ddd; font-family: courier; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ sudo service rlec_supervisor restart
    ```

4.  There are two ways to do the next step depending on your uptime
    requirements.
    1.  Restart each database in the cluster, but you will incur
        downtime. This is by far the easiest option to execute.

        ``` {style="border: 2px solid #ddd; font-family: courier; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
        $ rladmin restart db <db name>
        ```

    2.  Execute the following three commands **for each** master/slave
        shards during a maintenance window. All three of these commands
        **must** be executed **on the node hosting the shard being
        operated on**:

        ``` {style="border: 2px solid #ddd; font-family: courier; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
        $ redis_ctl stop <slave shard id>
        $ rladmin failover shard <master shard id>
        $ redis_ctl stop <new slave shard id>
        ```

        Example:

        ``` {style="border: 2px solid #ddd; font-family: courier; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
        $ redis_ctl stop 6 # command run on node 1, since shard 6 is running on node 1
        $ rladmin failover shard 5
        $ redis_ctl stop 5 # command run on node 3, since shard 5 is running on node 3
        ```

        This must be performed **for each database** in the cluster and
        **each shard** in each database.
