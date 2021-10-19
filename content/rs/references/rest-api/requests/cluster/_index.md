---
Title: Cluster requests
linkTitle: cluster
description: Documents the Redis Enterprise Software REST API cluster requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/cluster
         /rs/references/rest-api/cluster.md
         /rs/references/restapi/cluster
         /rs/references/restapi/cluster.md
         /rs/references/rest_api/cluster
         /rs/references/rest_api/cluster.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-cluster) | `/v1/cluster` | Get cluster info |
| [PUT](#put-cluster) | `/v1/cluster` | Update cluster settings |

## Get cluster info {#get-cluster}

	GET /v1/cluster

Get cluster info.

#### Required permissions

| Permission name |
|-----------------|
| [view_cluster_info]({{<relref "/rs/references/rest-api/permissions#view_cluster_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /cluster 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-response} 

#### Example JSON body

```json
{
   "name": "my-rlec-cluster",
   "alert_settings": { "..." },
   "created_time": "2015-04-29T09:09:25Z",
   "email_alerts": false,
   "email_from": "",
   "rack_aware": false,
   "smtp_host": "",
   "smtp_password": "",
   "smtp_port": 25,
   "smtp_tls_mode": "none",
   "smtp_username": ""
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Update cluster settings {#put-cluster}

	PUT /v1/cluster

Update cluster settings.

If called with the `dry_run` URL query string, the function will
validate the cluster object, but will not apply the requested
changes.

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#put-request} 

#### Example HTTP request

	PUT /cluster 

#### Example JSON body

```json
{
    "email_alerts": true,
    "alert_settings": {
        "node_failed": true,
        "node_memory": {
            "enabled": true,
            "threshold": "80"
        }
    }
}
```

The above request will enable email alerts and alert reporting for node failures and node removals.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| dry_run | string | Validate but don't apply the new cluster settings |

#### Request body

| Field | Type | Description |
|-------|------|-------------|
| name | string | Cluster’s fully qualified domain name |
| email_alerts | boolean | Enable/disable node and cluster email alerts. (default: true) |
| alert_settings | alert_settings object | Cluster and node alert settings |

### Response {#put-response} 

#### Example JSON body

```json
{
    "name": "mycluster.mydomain.com",
    "email_alerts": true,
    "alert_settings": {
        "node_failed": true,
        "node_memory": {
            "enabled": true,
            "threshold": "80"
        }
    },
    "// additional fields..."
}
```

### Error codes {#put-error-codes} 

When errors are reported, the server may return a JSON object with `error_code` and `message` field that provide additional information. The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| bad_nginx_conf | • Designated port is already bound.<br></br>• nginx configuration is illegal. | 
| bad_debuginfo_path | • Debuginfo path doesn't exist.<br></br>• Debuginfo path is inaccessible. | 
| config_edit_conflict | Cluster config was edited by another source simultaneously. | 

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad content provided. |

