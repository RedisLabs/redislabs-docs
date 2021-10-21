---
Title: CRDB cluster info object
linkTitle: cluster_info
description: An object that represents Active-Active cluster info
weight: $weight
alwaysopen: false
categories: ["RS"]
---

Configuration details of a cluster that is part of an Active-Active database.

| Name | Type/Value | Description |
|------|------------|-------------|
| credentials | {{<code>}}
{
  "username": string,
  "password": string
} {{</code>}} | Cluster access credentials (required) |
| name | string | Cluster fully qualified name, used to unique identify the cluster. Typically this is the same as the hostname used in the URL, although in some configruations the URL may point to a different name/address. (required) |
| replication_endpoint | string | Address to use for peer replication. If not specified, it is assumed that standard cluster naming conventions apply. |
| replication_tls_sni | string | Cluster SNI for TLS connections |
| url | string | Cluster access URL (required) |
