---
Title: Cluster LDAP requests
linkTitle: ldap
description: Documents the Redis Enterprise Software REST API cluster/ldap requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/cluster/ldap
         /rs/references/rest-api/cluster/ldap.md
         /rs/references/restapi/cluster/ldap
         /rs/references/restapi/cluster/ldap.md
         /rs/references/rest_api/cluster/ldap
         /rs/references/rest_api/cluster/ldap.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-cluster-ldap) | `/v1/cluster/ldap` | Get LDAP configuration |
| [PUT](#put-cluster-ldap) | `/v1/cluster/ldap` | Set/update LDAP configuration |
| [DELETE](#delete-cluster-ldap) | `/v1/cluster/ldap` | Delete LDAP configuration |

## Get LDAP configuration {#get-cluster-ldap}

	GET /v1/cluster/ldap

Get the LDAP configuration, as JSON.

#### Required permissions

| Permission name |
|-----------------|
| view_ldap_config |

### Request {#get-request} 

#### Example HTTP request

	GET /cluster/ldap 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-response} 

#### Example JSON body

```json
{
   "bind_dn": "rl_admin",
   "bind_pass": "***",
   "ca_cert": "",
   "control_plane": false,
   "data_plane": false,
   "dn_group_attr": "MemberOf",
   "dn_group_query": {},
   "starttls": "disabled",
   "uris": ["ldap://ldap.example.org:636"],
   "user_dn_query": {},
   "user_dn_template": "cn=%u, ou=users,dc=example,dc=org"
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success |

## Set or update LDAP configuration {#put-cluster-ldap}

	PUT /v1/cluster/ldap

Set or update the cluster LDAP configuration.

#### Required permissions

| Permission name |
|-----------------|
| config_ldap |

### Request {#put-request} 

#### Example HTTP request

	POST /cluster/ldap 

#### Example JSON body

```json
{
    "uris": [
       "ldap://ldap.redislabs.com:389"
    ],
    "bind_dn": "rl_admin",
    "bind_pass": "secret",
    "user_dn_template": "cn=%u,dc=example,dc=org",
    "dn_group_attr": "MemberOf"
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| uris | list of strings | URIs of LDAP servers containing only the schema, the host, and the port |
| bind_dn | string | A domain name to use when binding with the LDAP server to run queries |
| bind_pass | string | A password to use when binding with the LDAP server to run queries |
| user_dn_template | string | A string template that maps between the username provided to the cluster for authentication, and the LDAP DN. |
| dn_group_attr | string | The name of an attribute of the LDAP user entity that contains a list of the groups that user belongs to. |

### Response {#put-response} 

### Error codes {#put-error-codes} 

Possible `error_code` values:

| Code | Description |
|------|-------------|
| illegal_fields_combination | An unacceptable combination of fields was specified for the configuration object (e.g.: two mutually-exclusive fields), or a required field is missing.| 

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, LDAP config has been set. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |

## Delete LDAP configuration {#delete-cluster-ldap}

	DELETE /v1/cluster/ldap

Clear the LDAP configuration.

#### Required permissions

| Permission name |
|-----------------|
| config_ldap |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /cluster/ldap 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#delete-response} 

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success |
