---
Title: Roles requests
linkTitle: roles
description: Documents the Redis Enterprise Software REST API roles requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/roles
         /rs/references/rest-api/roles.md
         /rs/references/restapi/roles
         /rs/references/restapi/roles.md
         /rs/references/rest_api/roles
         /rs/references/rest_api/roles.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-roles) | `/v1/roles` | Get all roles |
| [GET](#get-role) | `/v1/roles/{uid}` | Get a single role |
| [PUT](#put-role) | `/v1/roles/{uid}` | Update an existing role |
| [POST](#post-role) | `/v1/roles` | Create a new role |
| [DELETE](#delete-role) | `/v1/roles/{uid}` | Delete a role |

## Get all roles {#get-all-roles}

	GET /v1/roles

Get all role objects.

#### Required permissions

| Permission name |
|:-----------------:|
| view_all_roles_info |

### Request {#get-all-request} 

#### Example HTTP request

	GET /roles 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-all-response} 

#### Example JSON body

```json
[
    {
        "uid": 1,
        "name": "Admin",
        "management": "admin"
    },
    {
        "uid": 2,
        "name": "Cluster Member",
        "management": "cluster_member"
    },
    {
        "uid": 3,
        "name": "Cluster Viewer",
        "management": "cluster_viewer"
    },
    {
        "uid": 4,
        "name": "DB Member",
        "management": "db_member"
    },
    {
        "uid": 5,
        "name": "DB Viewer",
        "management": "db_viewer"
    },
    {
        "uid": 6,
        "name": "None",
        "management": "none"
    },
    {
        "uid": 17,
        "name": "DBA",
        "management": "admin"
    }
]
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support roles yet. |

## Get role

	GET /v1/roles/{int: uid}

Get a single role object.

#### Required permissions

| Permission name |
|-----------------|
| view_role_info |

### Request {#get-request} 

#### Example HTTP request

	GET /roles/1 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The RLEC role unique ID. |

### Response {#get-response} 

#### Example JSON body

```json
{
     "uid": 17,
     "name": "DBA",
     "management": "admin"
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [403 Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | Operation is forbidden. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Role does not exist. |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support roles yet. |

## Update role {#put-role}

	PUT /v1/roles/{int: uid}

Update an existing role object.

#### Required permissions

| Permission name |
|-----------------|
| update_role |

### Request {#put-request} 

#### Example HTTP request

	PUT /roles/17 

#### Example JSON body

```json
{
     "management": "cluster_member"
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
| management | string | Management role |

### Response {#put-response} 

#### Example JSON body

```json
{
     "uid": 17,
     "name": "DBA",
     "management": "cluster_member"
}
```

### Error codes {#put-error-codes} 

Possible `error_code` values:

| Code | Description |
|------|-------------|
| unsupported_resource | The cluster is not yet able to handle this resource type. This could happen in a partially upgraded cluster, where some of the nodes are still on a previous version.| 
| name_already_exists | An object of the same type and name exists.| 
| change_last_admin_role_not_allowed | At least one user with admin role should exist.| 

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, role is created. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to change a non-existant role. |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support roles yet. |

## Create role {#post-role}

	POST /v1/roles

Create a new role.

#### Required permissions

| Permission name |
|-----------------|
| create_role |

### Request {#post-request} 

#### Example HTTP request

	POST /roles 

#### Example JSON body

```json
{
     "name": "DBA",
     "management": "admin"
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
| name | string | Role name |
| management | string | Management role |

### Response {#post-response} 

#### Example JSON body

```json
{
     "uid": 17,
     "name": "DBA",
     "management": "admin"
}
```

### Error codes {#post-error-codes} 

Possible `error_code`values:

| Code | Description |
|------|-------------|
| unsupported_resource | The cluster is not yet able to handle this resource type. This could happen in a partially upgraded cluster, where some of the nodes are still on a previous version. | 
| name_already_exists | An object of the same type and name exists | 
| missing_field | A needed field is missing | 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, role is created. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support roles yet. |

## Delete role {#delete-role}

	DELETE /v1/roles/{int: uid}

Delete a role object.

#### Required permissions

| Permission name |
|-----------------|
| delete_role |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /roles/1 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The role unique ID. |

### Response {#delete-response} 


### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, the role is deleted. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Role does not exist. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The request is not acceptable. |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support roles yet. |
