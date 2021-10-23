---
Title: Redis access control list (ACL) requests
linkTitle: redis_acls
description: Redis access control list (ACL) requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/redis_acls
         /rs/references/rest-api/redis_acls.md
         /rs/references/restapi/redis_acls
         /rs/references/restapi/redis_acls.md
         /rs/references/rest_api/redis_acls
         /rs/references/rest_api/redis_acls.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-redis_acls) | `/v1/redis_acls` | Get all Redis ACLs |
| [GET](#get-redis_acl) | `/v1/redis_acls/{uid}` | Get a single Redis ACL |
| [PUT](#put-redis_acl) | `/v1/redis_acls/{uid}` | Update a Redis ACL |
| [POST](#post-redis_acl) | `/v1/redis_acls` | Create a new Redis ACL |
| [DELETE](#delete-redis_acl) | `/v1/redis_acls/{uid}` | Delete a Redis ACL |

## Get all Redis ACLs {#get-all-redis_acls}

	GET /v1/redis_acls

Get all Redis ACL objects.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_redis_acls_info]({{<relref "/rs/references/rest-api/permissions#view_all_redis_acls_info">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /redis_acls 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-all-response} 

Returns a JSON array of [Redis ACL objects]({{<relref "/rs/references/rest-api/objects/redis_acl">}}).

#### Example JSON body

```json
[
    {
     "uid": 1,
     "name": "Full Access",
     "acl": "+@all ~*"
    },
    {
     "uid": 2,
     "name": "Read Only",
     "acl": "+@read ~*"
    },
    {
     "uid": 3,
     "name": "Not Dangerous",
     "acl": "+@all -@dangerous ~*"
    },
    {
     "uid": 17,
     "name": "Geo",
     "acl": "~* +@geo"
    }
]
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support redis_acl yet. |

## Get Redis ACL {#get-redis_acl}

	GET /v1/redis_acls/{int: uid}

Get a single Redis ACL object.

#### Required permissions

| Permission name |
|-----------------|
| [view_redis_acl_info]({{<relref "/rs/references/rest-api/permissions#view_redis_acl_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /redis_acls/1 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The object's unique ID. |

### Response {#get-response} 

Returns a [Redis ACL object]({{<relref "/rs/references/rest-api/objects/redis_acl">}}).

#### Example JSON body

```json
{
     "uid": 17,
     "name": "Geo",
     "acl": "~* +@geo"
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [403 Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | Operation is forbidden. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | redis_acl does not exist. |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support redis_acl yet. |

## Update Redis ACL {#put-redis_acl}

	PUT /v1/redis_acls/{int: uid}

Update an existing Redis ACL object.

#### Required permissions

| Permission name |
|-----------------|
| [update_redis_acl]({{<relref "/rs/references/rest-api/permissions#update_redis_acl">}}) |

### Request {#put-request} 

#### Example HTTP request

	PUT /redis_acls/17 

#### Example JSON body

```json
{
     "acl": "~* +@geo -@dangerous"
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Request body

Include a [Redis ACL object]({{<relref "/rs/references/rest-api/objects/redis_acl">}}) with updated fields in the request body.

### Response {#put-response} 

Returns the updated [Redis ACL object]({{<relref "/rs/references/rest-api/objects/redis_acl">}}).

#### Example JSON body

```json
{
     "uid": 17,
     "name": "Geo",
     "acl": "~* +@geo -@dangerous"
}
```

### Error codes {#put-error-codes} 

Possible `error_code` values:

| Code | Description |
|------|-------------|
| unsupported_resource | The cluster is not yet able to handle this resource type. This could happen in a partially upgraded cluster, where some of the nodes are still on a previous version.| 
| name_already_exists | An object of the same type and name exists| 
| invalid_param | A parameter has an illegal value| 

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, redis_acl was updated. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to change a non-existent redis_acl. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Cannot change a read-only object |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support redis_acl yet. |

## Create Redis ACL {#post-redis_acl}

	POST /v1/redis_acls

Create a new Redis ACL object.

#### Required permissions

| Permission name |
|-----------------|
| [create_redis_acl]({{<relref "/rs/references/rest-api/permissions#create_redis_acl">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /redis_acls 

#### Example JSON body

```json
{
     "name": "Geo",
     "acl": "~* +@geo"
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Request body

Include a [Redis ACL object]({{<relref "/rs/references/rest-api/objects/redis_acl">}}) in the request body.

### Response {#post-response} 

Returns the newly created [Redis ACL object]({{<relref "/rs/references/rest-api/objects/redis_acl">}}).

#### Example JSON body

```json
{
     "uid": 17,
     "name": "Geo",
     "acl": "~* +@geo"
}
```

### Error codes {#post-error-codes} 

Possible `error_code` values:

| Code | Description |
|------|-------------|
| unsupported_resource | The cluster is not yet able to handle this resource type. This could happen in a partially upgraded cluster, where some of the nodes are still on a previous version. | 
| name_already_exists | An object of the same type and name exists | 
| missing_field | A needed field is missing | 
| invalid_param | A parameter has an illegal value | 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, redis_acl is created. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support redis_acl yet. |

## Delete Redis ACL {#delete-redis_acl}

	DELETE /v1/redis_acls/{int: uid}

Delete a Redis ACL object.

#### Required permissions

| Permission name |
|-----------------|
| [delete_redis_acl]({{<relref "/rs/references/rest-api/permissions#delete_redis_acl">}}) |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /redis_acls/1 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The redis_acl unique ID. |

### Response {#delete-response} 

Returns a status code that indicates the Redis ACL deletion success or failure.

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, the redis_acl is deleted. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The request is not acceptable. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Cannot delete a read-only object |
| [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) | Cluster doesn't support redis_acl yet. |
