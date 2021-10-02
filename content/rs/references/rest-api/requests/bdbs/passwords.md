---
Title: Database passwords requests
linkTitle: passwords
description: Documents the Redis Enterprise Software REST API bdbs/passwords requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/passwords
         /rs/references/rest-api/bdbs/passwords.md
         /rs/references/restapi/bdbs/passwords
         /rs/references/restapi/bdbs/passwords.md
         /rs/references/rest_api/bdbs/passwords
         /rs/references/rest_api/bdbs/passwords.md
---

| Method | Path | Description |
|--------|------|-------------|
| [PUT](#put-bdbs-password) | `/v1/bdbs/{uid}/passwords` | Update database password |
| [POST](#post-bdbs-password) | `/v1/bdbs/{uid}/passwords` | Add database password |
| [DELETE](#delete-bdbs-password) | `/v1/bdbs/{uid}/passwords` | Delete database password |

## Update database password {#put-bdbs-password}

	PUT /v1/bdbs/{int: uid}/passwords

Set a single password for the bdb's default user (i.e., for `AUTH`&nbsp;`<password>` authentications).

#### Required permissions

| Permission name |
|-----------------|
| update_bdb |

### Request {#put-request} 

#### Example HTTP request

	PUT /bdbs/1/passwords 

#### Example JSON body

```json
{
    "password": "new password"
}
```

The above request resets the password of the bdb to ‘new password’.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database to update the password. |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| password | string | New password |

### Response {#put-response} 

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The password was changed. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | A nonexistent database. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Invalid configuration parameters provided. |

## Add database password {#post-bdbs-password}

	POST /v1/bdbs/{int: uid}/passwords

Add a password to the bdb's default user (i.e., for `AUTH`&nbsp;`<password>` authentications).

#### Required permissions

| Permission name |
|-----------------|
| update_bdb |

### Request {#post-request} 

#### Example HTTP request

	POST /bdbs/1/passwords 

#### Example JSON body

```json
{
    "password": "password to add"
}
```

The above request adds a password to the bdb.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database to add password. |

#### Request body

| Field | Type | Description |
|-------|------|-------------|
| password | string | Password to add |

### Response {#post-response} 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The password was added. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | A nonexistent database. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Invalid configuration parameters provided. |

## Delete database password {#delete-bdbs-password}

	DELETE /v1/bdbs/{int: uid}/passwords

Delete a password from the bdb's default user (i.e., for `AUTH`&nbsp;`<password>` authentications).

#### Required permissions

| Permission name |
|-----------------|
| update_bdb |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /bdbs/1/passwords 

#### Example JSON body

```json
{
    "password": "password to delete"
}
```

The above request deletes a password from the bdb.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database to delete password. |

#### Request body

| Field | Type | Description |
|-------|------|-------------|
| password | string | Password to delete |

### Response {#delete-response} 

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The password was deleted. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | A nonexistent database. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Invalid configuration parameters provided. |
