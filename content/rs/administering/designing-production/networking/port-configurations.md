---
Title: Network Port Configurations
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To make sure that Redis Enterprise Software (RS) servers can pass necessary communications between them,
we recommend that all RS servers have all of the ports listed here open
between them.

By default, the cluster assigns ports in the range of 10,000 - 19,999
to database endpoints. If you assign a specific port for a database when
you create it, even outside of this range, the cluster only verifies
that the assigned port is not already in use. You must manually
update your firewall with the port for that new database endpoint.

## Ports and port ranges used by RS

There are 3 types of ports that are open for use by RS:

- Internal - The traffic is between or within the cluster nodes
- External - The traffic is from client applications or external monitoring resources
- Active-Active - The traffic is from clusters that host Active-Active databases

### Network traffic between the cluster and other systems

You need to open these ports in your firewall to allow traffic to pass from the cluster to other systems:

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| TCP | 8001 | Internal, External | Traffic from application to RS [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) |
| TCP | 8070, 8071 | Internal, External | For metrics exported and managed by the web proxy |
| TCP | 8443 | Internal, External | Secure (HTTPS) access to the management web UI |
| TCP | 9081 | Internal, Active-Active | For Active-Active management |
| TCP | 9443 (Recommended), [8080](#turning-off-http-support) | Internal, External, Active-Active | REST API traffic, including cluster management and node bootstrap |
| TCP | 10000-19999 | Internal, External, Active-Active | Database traffic |
| UDP | 53, 5353 | Internal, External | DNS/mDNS traffic |

### Network ports used between the cluster nodes

These ports are used by Redis Software between cluster nodes:

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| ICMP | * | Internal | For connectivity checking between nodes |
| TCP | 1968 | Internal | Proxy traffic |
| TCP | 3333-3341, 3343-3344, 36379, 36380 | Internal | Internode communication |
| TCP | 20000-29999 | Internal | Database shard traffic |

### Network ports used within the cluster nodes

These ports are used by Redis Software within each cluster node:

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| TCP | 8002, 8004, 8006 | Internal | System health monitoring |
| TCP | 8444, 9080 | Internal | For web proxy <-> cnm_http/cm traffic |

## Changing the management web UI port

If for any reason you want to use a custom port for the RS Web UI
instead of the default port (8443), you can change the port. Before you
change the RS Web UI port, make sure that the new port is not in
use by another process.

{{< note >}}
After you change the RS Web UI port, when you add a new node to the
cluster you must connect to the web UI with the custom port number:

`https://newnode.mycluster.example.com:`**`<nonstandard-port-number>`**
{{% /note %}}

To change the default port for the RS Web UI, on any node in the cluster run:

```sh
rladmin cluster config cm_port <new-port>
```

## Disabling HTTP support for API endpoints

To harden deployments, you can disable the HTTP support for API endpoints that is supported by default.
Before you disable HTTP support, make sure that you migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint
to prevent broken connections.
After you disable HTTP support, traffic sent to the unencrypted API endpoint is blocked.

To disable HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```
