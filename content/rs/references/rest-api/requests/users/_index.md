---
Title: Users requests
linkTitle: users
description: Documents the Redis Enterprise Software REST API users requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/users
         /rs/references/rest-api/users.md
         /rs/references/restapi/users
         /rs/references/restapi/users.md
         /rs/references/rest_api/users
         /rs/references/rest_api/users.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-users) | `/v1/users` | Get all users |
| [GET](#get-user) | `/v1/users/{uid}` | Get a single user |
| [PUT](#put-user) | `/v1/users/{uid}` | Update a user's configuration |
| [POST](#post-user) | `/v1/users` | Create a new user |
| [DELETE](#delete-user) | `/v1/users/{uid}` | Delete a user |

## Get all users {#get-all-users}

	GET /v1/users

Get all RLEC users.

#### Required permissions

| Permission name |
|-----------------|
| view_all_users_info |

### Request {#get-all-request} 

#### Example HTTP request

	GET /users 


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
        "password_issue_date": "2017-03-02T09:43:34Z",
        "email": "user@redislabs.com",
        "name": "John Doe",
        "email_alerts": true,
        "bdbs_email_alerts": ["1","2"],
        "role": "admin",
        "auth_method": "regular"
    },
    {
        "uid": 2,
        "password_issue_date": "2017-03-02T09:43:34Z",
        "email": "user2@redislabs.com",
        "name": "Jane Poe",
        "email_alerts": true,
        "role": "db_viewer",
        "auth_method": "external"
    }
]
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get user {#get-user}

	GET /v1/users/{int: uid}

Get a single RLEC user.

#### Required permissions

| Permission name |
|-----------------|
| view_user_info |

### Request {#get-request} 

#### Example HTTP request

	GET /users/1 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The RLEC user unique ID. |

### Response {#get-response} 

#### Example JSON body

```json
{
    "uid": 1,
    "password_issue_date": "2017-03-07T15:11:08Z",
    "role": "db_viewer",
    "email_alerts": true,
    "bdbs_email_alerts": ["1","2"],
    "email": "user@redislabs.com",
    "name": "John Doe",
    "auth_method": "regular"
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [403 Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | Operation is forbidden. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | User does not exist. |

## Update user {#put-user}

	PUT /v1/users/{int: uid}

Update an RLEC user configuration.

#### Required permissions

| Permission name |
|-----------------|
| update_user (Although any user can change their own name, password, or alerts) |

### Request {#put-request} 

#### Example HTTP request

	PUT /users/1 

#### Example JSON body

```json
{
     "name": "Jane Poe",
     "email_alerts": false
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The RLEC user unique ID. |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| name | string | User's name |
| email_alerts | boolean | Enable/disable email alerts |

### Response {#put-response} 

The response includes the updated user object.

#### Example JSON body

```json
{
     "uid": 1,
     "password_issue_date": "2017-03-07T15:11:08Z",
     "email": "user@redislabs.com",
     "name": "Jane Poe",
     "email_alerts": false,
     "role": "db_viewer",
     "auth_method": "regular"
}
```


Note that with RBAC-enabled clusters the role is replaced with
role_uids.


### Error codes {#put-error-codes} 

When errors are reported, the server may return a JSON object with    `error_code` and `message` field that provide additional information.    The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| password_not_complex | The given password is not complex enough (Only works when the password_complexity feature is enabled).| 
| new_password_same_as_current | The given new password is identical to the old password.| 
| email_already_exists | The given email is already taken.| 
| change_last_admin_role_not_allowed | At least one user with admin role should exist.| 

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, the user is updated. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to change a non-existing user. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The requested configuration is invalid. |

## Create user {#post-user}

	POST /v1/users

Create a new RLEC user.

The request must contain a single JSON user object, with an email
and a password:

#### Required permissions

| Permission name |
|-----------------|
| create_new_user |

### Request {#post-request} 

#### Example HTTP request

	POST /users 

#### Example JSON body

```json
{
     "email": "user@redislabs.com",
     "password": "my-password",
     "name": "John Doe",
     "email_alerts": true,
     "bdbs_email_alerts": ["1","2"],
     "role": "db_viewer",
     "auth_method": "regular"
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
| email | string | Email address (required) |
| password | string | Password (required) |
| name | string | User's name |
| email_alerts | boolean | Enable/disable email alerts |
| bdbs_email_alerts | array | List of database uids or ['all'] for all databases |
| role | string | Role |
| auth_method | string | Authorization method |

Note that with RBAC-enabled clusters, the role is replaced with role_uids.

`email_alerts` can be configured either as: 

- `true` - user will receive alerts for all databases configured in `bdbs_email_alerts` or for all the databases if `bdbs_email_alerts` is not configured. `bdbs_email_alerts` can be a list of database uids or `[‘all’]` meaning all databases. 

- `false` - user will not receive alerts for any databases

### Response {#post-response} 

The response includes the newly created user object.

#### Example JSON body

```json
{
     "uid": 1,
     "password_issue_date": "2017-03-07T15:11:08Z",
     "email": "user@redislabs.com",
     "name": "Jane Poe",
     "email_alerts": true,
     "bdbs_email_alerts": ["1","2"],
     "role": "db_viewer",
     "auth_method": "regular"
}
```



### Error codes {#post-error-codes} 

When errors are reported, the server may return a JSON object with    `error_code` and `message` field that provide additional information.    The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| password_not_complex | The given password is not complex enough (Only works when the password_complexity feature is enabled).| 
| email_already_exists | The given email is already taken.| 
| name_already_exists | The given name is already taken.| 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, user is created. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [409 C onflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | User with the same email already exists. |

## Delete user {#delete-user}

	DELETE /v1/users/{int: uid}

Delete an RLEC user.

#### Required permissions

| Permission name |
|-----------------|
| delete_user |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /users/1 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The RLEC user unique ID. |

### Response {#delete-response} 


### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, the user is deleted. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The request is not acceptable. |
