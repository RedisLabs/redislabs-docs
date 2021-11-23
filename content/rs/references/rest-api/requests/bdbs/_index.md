---
Title: Database requests
linkTitle: bdbs
description: Database requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs
         /rs/references/rest-api/bdbs.md
         /rs/references/restapi/bdbs
         /rs/references/restapi/bdbs.md
         /rs/references/rest_api/bdbs
         /rs/references/rest_api/bdbs.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-bdbs) | `/v1/bdbs` | Get all databases |
| [GET](#get-bdbs) | `/v1/bdbs/{uid}` | Get a single database |
| [PUT](#put-bdbs) | `/v1/bdbs/{uid}` | Update database configuration |
| [PUT](#put-bdbs-action) | `/v1/bdbs/{uid}/{action}` | Update database configuration and perform additional action |
| [POST](#post-bdbs-v1) | `/v1/bdbs` | Create a new database |
| [POST](#post-bdbs-v2) | `/v2/bdbs` | Create a new database |
| [DELETE](#delete-bdbs) | `/v1/bdbs/{uid}` | Delete a database |

## Get all databases {#get-all-bdbs}

	GET /v1/bdbs

Get all databases in the cluster.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_bdbs_info]({{<relref "/rs/references/rest-api/permissions#view_all_bdbs_info">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /bdbs?fields=uid,name 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| fields | string | Comma-separated list of field names to return (by default all fields are returned). (optional) |

### Response {#get-all-response} 

The response body contains a JSON array with all databases, represented as [BDB objects]({{<relref "/rs/references/rest-api/objects/bdb">}}).

#### Example JSON body

```json
[
    {
        "uid": 1,
        "name": "name of database #1",
        "// additional fields..."
    },
    {
        "uid": 2,
        "name": "name of database #2",
        "// additional fields..."
    }
]
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get a database {#get-bdbs}

	GET /v1/bdbs/{int: uid}

Get a single database.

#### Required permissions

| Permission name |
|-----------------|
| [view_bdb_info]({{<relref "/rs/references/rest-api/permissions#view_bdb_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /bdbs/1 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database requested. |


#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| fields | string | Comma-separated list of field names to return (by default all fields are returned). (optional) |

### Response {#get-response} 

Returns a [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}).

#### Example JSON body

```json
{
    "uid": 1,
    "name": "name of database #1",
    "// additional fields..."
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Database UID does not exist |

## Update database configuration {#put-bdbs}

	PUT /v1/bdbs/{int: uid}

Update the configuration of an active database.

This is the basic version of the update request which contains no
additional action.

To track this request's progress, poll the [`/actions/<action_uid>` endpoint]({{<relref "/rs/references/rest-api/requests/bdbs/actions">}}) with the action_uid returned in the response body.

#### Required permissions

| Permission name |
|-----------------|
| [update_bdb]({{<relref "/rs/references/rest-api/permissions#update_bdb">}}) |

### Request {#put-request} 

#### Example HTTP request

	PUT /bdb/1 

#### Example JSON body

```json
{
    "replication": true,
    "data_persistence": "aof"
}
```

The above request attempts to modify a database configuration to enable in-memory data replication and append-only file data persistence.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database for which update is requested. |

#### Request body

Include a [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) with updated fields in the request body.

### Response {#put-response} 

Returns the updated [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}).

#### Example JSON body

```json
{
    "uid": 1,
    "replication": true,
    "data_persistence": "aof",
    "// additional fields..."
}
```

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. The database state will be 'active-change-pending' until the request has been fully processed. |
| [404&nbsp;Not&nbsp;Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to change a nonexistent database. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The requested configuration is invalid. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Attempting to change a database while it is busy with another configuration change. In this context, this is a temporary condition, and the request should be reattempted later. |

## Update database and perform action {#put-bdbs-action}

	PUT /v1/bdbs/{int: uid}/{action}

Update the configuration of an active database and perform an additional action.

If called with the `dry_run` URL query string, the function will validate the [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) against the existing database, but will not invoke the state machine that will update it.

#### Required permissions

| Permission name |
|-----------------|
| [update_bdb_with_action]({{<relref "/rs/references/rest-api/permissions#update_bdb_with_action">}}) |

### Request {#put-request-action} 

#### Example HTTP request

	PUT /bdbs/1 

#### Example JSON body

```json
{
    "replication": true,
    "data_persistence": "aof"
}
```

The above request attempts to modify a database configuration to enable in-memory data replication and append-only file data persistence.

{{<note>}} 
To change the shard hashing policy, you must flush all keys from the database.
{{</note>}}

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database to update. |
| action | string | Additional action to perform. Currently supported actions are: `flush`, `reset_admin_pass`. |
| dry_run | string | Validate the new [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) but don't apply the update. |

#### Request body

Include a [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) with updated fields in the request body.

### Response {#put-response-action} 

Returns a status code. If an error occurs, the response body may include an error code and message with more details.

### Error codes {#put-error-codes-action} 

When errors are reported, the server may return a JSON object with    `error_code` and `message` field that provide additional information.    The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| rack_awareness_violation | • Non rack-aware cluster.<br></br>• Not enough nodes in unique racks. |
| invalid_certificate | SSL client certificate is missing or malformed.|
| certificate_expired | SSL client certificate has expired. |
| duplicated_certs | An SSL client certificate appears more than once. |
| insufficient_resources | Shards count exceeds shards limit per bdb. |
| not_supported_action_on_crdt | `reset_admin_pass` action is not allowed on CRDT enabled BDB. |
| name_violation | CRDT database name cannot be changed. |
| bad_shards_blueprint | The sharding blueprint is broken or doesn’t fit the BDB. |
| replication_violation | CRDT database must use replication. |
| eviction_policy_violation | LFU eviction policy is not supported on bdb version<4 |
| replication_node_violation | Not enough nodes for replication. |
| replication_size_violation | Database limit too small for replication. |
| invalid_oss_cluster_configuration | BDB configuration does not meet the requirements for OSS cluster mode |
| missing_backup_interval | BDB backup is enabled but backup interval is missing. |
| crdt_sharding_violation | CRDB created without sharding cannot be changed to use sharding
| invalid_proxy_policy | Invalid proxy_policy value. |
| invalid_bdb_tags | Tag objects with the same key parameter were passed. |
| unsupported_module_capabilities | Not all modules configured for the database support the capabilities needed for the database configuration. |
| redis_acl_unsupported | Redis ACL is not supported for this database. |

### Status codes {#put-status-codes-action} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. The database state will be 'active-change-pending' until the request has been fully processed. |
| [403&nbsp;Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | redislabs license expired. |
| [404&nbsp;Not&nbsp;Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to change a nonexistent database. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The requested configuration is invalid. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Attempting to change a database while it is busy with another configuration change. In this context, this is a temporary condition, and the request should be reattempted later. |

## Create database v1 {#post-bdbs-v1}

	POST /v1/bdbs

Create a new database in the cluster.

The request must contain a single JSON [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) with the configuration parameters for the new database.

If passed with the `dry_run` URL query string, the function will validate the [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}), but will not invoke the state machine that will create it.

To track this request's progress, poll the [`/actions/<action_uid>` endpoint]({{<relref "/rs/references/rest-api/requests/bdbs/actions">}}) with the `action_uid` returned in the response body.

The cluster will use default configuration for any missing database field. The cluster creates a database UID if it is missing.

#### Required permissions

| Permission name |
|-----------------|
| [create_bdb]({{<relref "/rs/references/rest-api/permissions#create_bdb">}}) |

### Request {#post-request-v1} 

#### Example HTTP request

	POST /bdbs 

#### Example JSON body

```json
{
    "name": "test database",
    "type": "redis",
    "memory_size": 1073741824
}
```

The above request is an attempt to create a Redis database with a user-specified name and a memory limit of 1GB.

The `uid` of the database is auto-assigned by the cluster because it was not explicitly listed in this request. If you specify the database ID (`uid`), then you must specify the database ID for every subsequent database and make sure that the database ID does not conflict with an existing database. If you do not specify the database ID, then the it is automatically assigned in sequential order.

Defaults are used for all other configuration parameters.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| dry_run | string | Validate the new [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) but don't create the database. |

#### Request body

Include a [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) in the request body.

### Response {#post-response-v1} 

The response includes the newly created [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}).

#### Example JSON body

```json
{
    "uid": 1,
    "name": "test database",
    "type": "redis",
    "memory_size": 1073741824,
    "// additional fields..."
}
```

### Error codes {#post-error-codes-v1} 

When errors are reported, the server may return a JSON object with `error_code` and `message` field that provide additional information. The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| uid_exists | The specified database UID is already in use. |
| missing_db_name | DB name is a required property. |
| missing_memory_size | Memory Size is a required property. |
| missing_module | Modules missing from the cluster. |
| port_unavailable | The specified database port is reserved or already in use. |
| invalid_sharding | Invalid sharding configuration was specified. |
| bad_shards_blueprint | The sharding blueprint is broken. |
| not_rack_aware | Cluster is not rack-aware and a rack-aware database was requested. |
| invalid_version | An invalid database version was requested. |
| busy | The request failed because another request is being processed at the same time on the same database. |
| invalid_data_persistence | Invalid data persistence configuration. |
| invalid_proxy_policy | Invalid proxy_policy value. |
| invalid_sasl_credentials | SASL credentials are missing or invalid. |
| invalid_replication | Not enough nodes to perform replication. |
| insufficient_resources | Not enough resources in cluster to host the database. |
| rack_awareness_violation | • Rack awareness violation.<br><br>• Not enough nodes in unique racks. |
| invalid_certificate | SSL client certificate is missing or malformed. |
| certificate_expired | SSL client certificate has expired. |
| duplicated_certs | An SSL client certificate appears more than once. |
| replication_violation | CRDT database must use replication. |
| eviction_policy_violation | LFU eviction policy is not supported on bdb version<4 |
| invalid_oss_cluster_configuration | BDB configuration does not meet the requirements for OSS cluster mode |
| memcached_cannot_use_modules | Cannot create a memcached database with modules. |
| missing_backup_interval | BDB backup is enabled but backup interval is missing. |
| wrong_cluster_state_id | The given CLUSTER-STATE-ID does not match the current one
| invalid_bdb_tags | Tag objects with the same key parameter were passed. |
| unsupported_module_capabilities | Not all modules configured for the database support the capabilities needed for the database configuration. |
| redis_acl_unsupported | Redis ACL is not supported for this database. |

### Status codes {#post-status-codes-v1} 

| Code | Description |
|------|-------------|
| [403 Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | redislabs license expired. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Database with the same UID already exists. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Invalid configuration parameters provided. |
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, database is being created. |

## Create database v2 {#post-bdbs-v2}

	POST /v2/bdbs

Create a new database in the cluster. See [`POST /v1/bdbs`]({{<relref "/rs/references/rest-api/requests/bdbs#post-bdbs-v1">}}) for more information.

The database's configuration should be under the "bdb" field.

If you include a recovery_plan within the request body, the database will be loaded from the persistence files according to the recovery plan. The recovery plan must match the number of shards requested for the database. 

The persistence files must exist in the locations specified by the recovery plan. The persistence files must belong to a database with the same shard settings as the one being created (slot range distribution and shard_key_regex); otherwise, the operation will fail or yield unpredictable results.

If you create a database with a shards_blueprint and a recovery plan, the shard placement may not fully follow the shards_blueprint.

### Request {#post-request-v2} 

#### Example HTTP request

	POST /v2/bdbs 

#### Example JSON body

```json
{
    "bdb": {
        "name": "test-database",
        "type": "redis",
        "memory_size": 1073741824,
        "shards_count": 1
    },
    "recovery_plan": {
        "data_files": [
            {
                "shard_slots": "0-16383",
                "node_uid": "1",
                "filename": "redis-4.rdb"
            }
        ]
    }
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### Request body

Include a JSON object that contains a [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}) and an optional `recovery_plan` object in the request body.

### Response {#post-response-v2} 

The response includes the newly created [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}).

#### Example JSON body

```json
{
    "uid": 1,
    "name": "test database",
    "type": "redis",
    "memory_size": 1073741824,
    "shards_count": 1,
    "// additional fields..."
}
```

## Delete database {#delete-bdbs}

	DELETE /v1/bdbs/{int: uid}

Delete an active database.

#### Required permissions

| Permission name |
|-----------------|
| [delete_bdb]({{<relref "/rs/references/rest-api/permissions#delete_bdb">}}) |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /bdbs/1 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database to delete. |

### Response {#delete-response} 

Returns a status code that indicates the database deletion success or failure.

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. The database state will be 'delete-pending' until the request has been fully processed. |
| [403 Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | Attempting to delete an internal database. |
| [404&nbsp;Not&nbsp;Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to delete a nonexistent database. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Either the database is not in 'active' state and cannot be deleted, or it is busy with another configuration change. In the second case, this is a temporary condition, and the request should be re-attempted later. |
