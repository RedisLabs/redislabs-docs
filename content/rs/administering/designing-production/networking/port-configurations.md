---
Title: Network port configurations
description: 
weight: $weight
alwaysopen: false
---
Servers used as Redis Enterprise Software (RS) nodes should ideally have
all the below ports open between them for internal cluster communication
purposes.

In addition, ensure that the ICMP protocol is enabled for communications
between the nodes.

By default, the cluster assigns ports in the range of 10,000 - 19,999
to database endpoints. If you assign a specific port for a database when
creating it, even outside of this range, the cluster will only verify
that the assigned port is not already in use. You will have to manually
update your firewall with the port for that new database endpoint.

## List of ports and port ranges used by Redis Enterprise Software

| Port | Description | Protocol |
|------------|-----------------|-----------------|
| * | Used for connectivity checking between nodes | ICMP |
| 3333, 3334, 3335, 3336, 3337, 3338, 3339, 36379, 36380 | Internal cluster usage | TCP |
| 53 | Used for accessing DNS/mDNS functionality in the cluster | TCP, UDP |
| 5353 | Used for accessing DNS/mDNS functionality in the cluster | UDP |
| 8001 | Used by your application to access the RS [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) | TCP |
| 8443 | Used for secure (https) access to the management web UI | TCP |
| 8444, 9080 | Used for nginx \<-\>cnm\_http/cm communications on the same host only. Ports are bound to loopback adapter. | TCP |
| 8080, 9443 | Used to expose the REST API for cluster management | TCP |
| 10000-19999 | Used for exposing databases externally | TCP |
| 20000-29999 | Used for internal communications with database shards | TCP |

## Changing the Management Web UI Port

Note: This only applies to RS 5.0

You may change the port used for the RS Web UI. To do that, run the
following command on any node in the cluster as this cluster-wide
setting:

``` src
$ rladmin cluster config cm_port <new-port>
```

Before making this change, be sure to check the new port is not already
in use by some other process before running this command.

Critical: If you make this change, any time you add a new node to the
cluster, you must specify the non-default port number in the management
UI URL to join the new node to the cluster. For example,
https://newnode.mycluster.example.com:**\<nonstandard-port-number\>**/
