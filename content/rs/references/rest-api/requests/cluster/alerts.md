---
Title: Cluster alerts requests
linkTitle: alerts
description: Cluster alert requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/cluster/alerts
         /rs/references/rest-api/cluster/alerts.md
         /rs/references/restapi/cluster/alerts
         /rs/references/restapi/cluster/alerts.md
         /rs/references/rest_api/cluster/alerts
         /rs/references/rest_api/cluster/alerts.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-alerts) | `/v1/cluster/alerts` | Get all cluster alerts |
| [GET](#get-alert) | `/v1/cluster/alerts/{alert}` | Get a specific cluster alert |

## Get all cluster alerts {#get-all-alerts}

	GET /v1/cluster/alerts

Get all alert states for the cluster object.

#### Required permissions

| Permission name |
|-----------------|
| [view_cluster_alerts]({{<relref "/rs/references/rest-api/permissions#view_cluster_alerts">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /cluster/alerts 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| ignore_settings | boolean | Retrieve updated alert state regardless of the cluster’s alert_settings. When not present, a disabled alert will always be retrieved as disabled with a false state. (optional) |

### Response {#get-all-response} 

Returns a hash of [alert objects]({{<relref "/rs/references/rest-api/objects/alert">}}) and their states.

#### Example JSON body

```json
{
    "cluster_too_few_nodes_for_replication": {
        "change_time": "2014-12-22T11:48:00Z",
        "change_value": {
            "state": false
        },
       "enabled": true,
       "state": "off",
       "severity": "WARNING",
    },
    "..."
}
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get cluster alert {#get-alert}

	GET /v1/cluster/alerts/{alert}

Get a cluster alert state.

#### Required permissions

| Permission name |
|-----------------|
| [view_cluster_alerts]({{<relref "/rs/references/rest-api/permissions#view_cluster_alerts">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /cluster/alerts/cluster_too_few_nodes_for_replication 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| ignore_settings | boolean | Retrieve updated alert state regardless of the cluster’s alert_settings. When not present, a disabled alert will always be retrieved as disabled with a false state. (optional) |

### Response {#get-response} 

Returns an [alert object]({{<relref "/rs/references/rest-api/objects/alert">}}).

#### Example JSON body

```json
{
    "change_time": "2014-12-22T11:48:00Z",
    "change_value": {
        "state": false
    },
   "enabled": true,
   "state": "off",
   "severity": "WARNING",
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Specified alert does not exist |
