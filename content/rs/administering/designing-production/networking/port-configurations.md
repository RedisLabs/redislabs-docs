---
Title: Network port configurations
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To make sure that RS servers can pass necessary communications between them,
we recommend that all RS servers have all of the ports listed here open
between them.

By default, the cluster assigns ports in the range of 10,000 - 19,999
to database endpoints. If you assign a specific port for a database when
you create it, even outside of this range, the cluster only verifies
that the assigned port is not already in use. You must manually
update your firewall with the port for that new database endpoint.

## Ports and port ranges used by Redis Enterprise Software

| Protocol | Port | Description |
|------------|-----------------|-----------------|
| ICMP | * | For connectivity checking between nodes |
| TCP | 1968 | Internal proxy usage. Ports are bound to loopback adapter. |
| TCP | 3333, 3334, 3335, 3336, 3337, 3338, 3339, 36379, 36380 | Internal cluster usage |
| TCP | 8001 | For application to access the RS [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) |
| TCP | 8443 | For secure (https) access to the management web UI |
| TCP | 8444, 9080 | For nginx <->cnm_http/cm communications on the same host only. Ports are bound to loopback adapter. |
| TCP | 9081 | For CRDB management |
| TCP | 8070, 8071 | For metrics exported and managed by nginx |
| TCP | 8080, 9443 | Used to expose the REST API, including cluster management and node bootstrap |
| TCP | 10000-19999 | For exposing databases externally |
| TCP | 20000-29999 | For internal communications with database shards |
| UDP | 53, 5353 | For accessing DNS/mDNS functionality in the cluster |

## Changing the Management Web UI Port

If for any reason you want to use a custom port for the RS Web UI
instead of the default port (8443), you can change the port. Before you
change the RS Web UI port, make sure that the new port is not in
use by another process.

{{% note %}}
After you change the RS Web UI port, when you add a new node to the
cluster you must specify the custom port, in the format:

`https://newnode.mycluster.example.com:`**`<nonstandard-port-number>`**
{{% /note%}}

To change the default port for the RS Web UI, on any node in the cluster run:

```src
$ rladmin cluster config cm_port <new-port>
```
