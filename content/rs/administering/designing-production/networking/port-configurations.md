---
Title: Network Port Configurations
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
All Redis Enterprise Software deployments span multiple physical/virtual nodes. You'll need to keep several ports open between these nodes. This document describes the various port ranges and their uses.

{{< note >}}
Whenever you create a new database, you must verify that the ports assigned to the new database's endpoints are open. The cluster will not perform this verification for you. 
{{< /note >}}

## Ports and port ranges used by Redis Enterprise Software

Redis Enterprise Software's port usage falls into three general categories:

- Internal: For traffic between or within cluster nodes
- External: For traffic from client applications or external monitoring resources
- Active-Active: For traffic to and from clusters hosting Active-Active databases

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| TCP | 8001 | Internal, External | Traffic from application to Redis Enterprise Software [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) |
| TCP | 8070, 8071 | Internal, External | Metrics exported and managed by the web proxy |
| TCP | 8443 | Internal, External | Secure (HTTPS) access to the management web UI |
| TCP | 9081 | Internal, Active-Active | Active-Active management |
| TCP | 9443 (Recommended), [8080](#turning-off-http-support) | Internal, External, Active-Active | REST API traffic, including cluster management and node bootstrap |
| TCP | 10000-19999 | Internal, External, Active-Active | Database traffic |
| UDP | 53, 5353 | Internal, External | DNS/mDNS traffic |
| ICMP | * | Internal | Connectivity checking between nodes |
| TCP | 1968 | Internal | Proxy traffic |
| TCP | 3333-3341, 3343-3344, 36379, 36380 | Internal | Internode communication |
| TCP | 20000-29999 | Internal | Database shard traffic |
| TCP | 8002, 8004, 8006 | Internal | System health monitoring |
| TCP | 8444, 9080 | Internal | Traffic between web proxy and cnm_http/cm |

## Change the admin console port

The Redis Enterprise Software admin console uses port 8443, by default. You can change this to a custom port as long as the new port is not in use by another process.

To change this port, run:

```sh
rladmin cluster config cm_port <new-port>
```

After changing the Redis Enterprise Software web UI port, you must connect any new node added to the cluster to the UI with the custom port number:
`https://newnode.mycluster.example.com:`**`<nonstandard-port-number>`**

## Disable HTTP support for API endpoints

To harden deployments, you can disable the HTTP support for API endpoints that is supported by default.
Before you disable HTTP support, make sure you migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint to prevent broken connections.

To disable HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```

After you disable HTTP support, traffic sent to the unencrypted API endpoint is blocked.
