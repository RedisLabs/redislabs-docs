---
Title: Network Port Configurations
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
| TCP | 1968 | Proxy traffic (Internal use) |
| TCP | 3333, 3334, 3335, 3336, 3337, 3338, 3339, 36379, 36380 | Cluster traffic (Internal use) |
| TCP | 8001 | Traffic from application to RS [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) |
| TCP | 8443 | Secure (HTTPS) access to the management web UI |
| TCP | 8444, 9080 | For nginx <-> cnm_http/cm traffic (Internal use) |
| TCP | 9081 | For CRDB management (Internal use) |
| TCP | 8070, 8071 | For metrics exported and managed by nginx |
| TCP | 9443 (Recommended), [8080](#turning-off-http-support) | REST API traffic, including cluster management and node bootstrap |
| TCP | 10000-19999 | Database traffic |
| TCP | 20000-29999 | Database shards traffic (Internal use) |
| UDP | 53, 5353 | DNS/mDNS traffic (Internal use) |

## Changing the Management Web UI Port

If for any reason you want to use a custom port for the RS Web UI
instead of the default port (8443), you can change the port. Before you
change the RS Web UI port, make sure that the new port is not in
use by another process.

{{% note %}}
After you change the RS Web UI port, when you add a new node to the
cluster you must connect to the web UI with the custom port number:

`https://newnode.mycluster.example.com:`**`<nonstandard-port-number>`**
{{% /note%}}

To change the default port for the RS Web UI, on any node in the cluster run:

```src
rladmin cluster config cm_port <new-port>
```

## Disabling HTTP support for API Endpoints

To harden deployments, you can disable the HTTP support for API endpoints that is supported by default.
Before you disable HTTP support, make sure that you migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint
to prevent broken connections.
After you disable HTTP support, traffic sent to the unencrypted API endpoint is blocked.

To disable HTTP support for API endpoints, run:

```src
rladmin cluster config http_support disabled
```
