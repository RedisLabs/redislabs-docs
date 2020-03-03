---
Title: RedisInsight REST API
date: 2020-02-02 00:00:00 +0000
weight: 1000
categories: ["RI"]
path: api/
nextStep:
    Title: Memory Analysis
    href: /docs/features/memory-analysis/
---

## Add Database API

Used to collect a Token for a registered User.

**URL** : `/api/instance/`

**Method** : `POST`

**Body Type**: JSON

**Auth required** : NO

### Parameters

These are the required parameters for any type of database.

| Parameter     | Type   | Description         |
|---------------|--------|---------------------|
| name          | string | A nick name for the Redis database. Any string is valid |
| dbType        | string | One of `"OSS_NON_CLUSTER"`, `"OSS_CLUSTER"` or `"OSS_SENTINEL"`. For any Redis Enterprise database, use `OSS_NON_CLUSTER` |

The remaining parameters depend on the database type.

##### Standalone Database Parameters

Standalone databases are added using `dbType: "OSS_NON_CLUSTER"`.

The following additional parameters are required for standalone databases.

| Parameter  | Type   | Description                                                           |
|------------|--------|-----------------------------------------------------------------------|
| host       | string | The hostname or IP address of your Redis database                     |
| port       | number | The port your Redis datanase is listening on. It should be an integer |
| password   | string | (optional) The password for your Redis datanase.                                     |
| tls        | object | (optional) [TLS parameters for the database](#tls-parameters)         |


**Example**

```json
{
    "name": "QA Redis DB",
    "dbType": "OSS_NON_CLUSTER",
    "host": "redis.acme.com",
    "port": 6379
}
```

##### Redis Cluster Database Parameters

Redis Cluster databases are added using `dbType: "OSS_CLUSTER"`.

The following additional parameters are required for Redis Cluster databases.

| Parameter  | Type   | Description                                                        |
|------------|--------|--------------------------------------------------------------------|
| seedNodes  | array  | An array of objects describing the nodes of the cluster. At least one node should be specified. The objects must contain properties `host` (string) and `port` (integer) |
| password   | string | (optional) The password for your Redis datanase.                                  |
| tls        | object | (optional) [TLS parameters for the database](#tls-parameters)      |


**Example**

```json
{
    "name": "QA Redis Cluster DB",
    "dbType": "OSS_CLUSTER",
    "seedNodes": [
        {
            "host": "redis-cluster-node-1.acme.com",
            "port": 6379
        }
    ]
}
```

##### Sentinel-Monitored Database Parameters

Sentinel-monitored databases are added using `dbType: "OSS_SENTINEL"`.

The following additional parameters are required for standalone databases.

| Parameter                     | Type   | Description                                                          |
|-------------------------------|--------|----------------------------------------------------------------------|
| sentinelHost                  | string | The hostname or IP address of one of the sentinel instances          |
| sentinelPort                  | number | The hostname or IP address of one of the sentinel instances          |
| sentinelPassword              | string | (optional) The password for the sentinel instances                   |
| sentinelMaster                | object | Information about the monitored database that is to be added.         |
| sentinelMaster.serviceName    | string | The name of the database to be added. This is the same name used in the `sentinel monitor` directive.
| sentinelMaster.authPass       | string | (optional) The password, if any, for the monitored database. This can be different from the password of the sentinel instance itself. This is the same password as provided in the `sentinel auth-pass` directive.        |
| tls        | object | (optional) [TLS parameters for the database](#tls-parameters)      |


**Example**

```json
{
    "name": "QA Redis Sentinel DB",
    "dbType": "OSS_SENTINEL",
    "sentinelHost": "redis-sentinel.acme.com",
    "sentinelPort": 26379,
    "sentinelPassword": "sentinel-pass",
    "sentinelMaster": {
        "serviceName": "mymaster",
        "authPass": "opensesame",
    }
}
```

#### TLS Parameters

TLS parameters can be used to specify how RedisInsight should connect to the Redis database over TLS.

The following parameters can be used:

| Parameter                | Type    | Description                                                   |
|--------------------------|---------|---------------------------------------------------------------|
| useTls                   | boolean | Whether to use TLS to connect to the database or not          |
| clientAuth               | boolean | Whether TLS client authentication is required by the database |
| clientCertificateKeyPair | object  | (optional) [The details of the client certificate and private key used to connect to the Redis database](#tls-client-certificate-and-key). If client authentication is not required, this has to be provided |

##### TLS Client Certificate and Key

The client certificate and key details can be provided in two forms:

1. If the certificate and key has already been used for a database before, the ID of that certificate can be provided directly.

    | Parameter                | Type    | Description                                                   |
    |--------------------------|---------|---------------------------------------------------------------|
    | id                       | number  | The ID of the client certificate/key pair                     |

1. Alternatively, to create a new client certificate/key pair for the database, a name must be provided along with the certificate and key strings.

    | Parameter                | Type    | Description                                                      |
    |--------------------------|---------|------------------------------------------------------------------|
    | new                      | object  | The details of the new client certificate/key pair to be created |
    | new.name                 | string  | The name of the new client cert/key pair                         |
    | new.cert                 | string  | The client certificate string                                    |
    | new.key                  | string  | The client private key string                                    |


**Example**

```json
{
    "name": "Prod Redis Enterprise DB",
    "dbType": "OSS_NON_CLUSTER",
    "host": "redis-ent.acme.com",
    "port": 6379,
    "tls": {
        "useTls": true,
        "clientAuth": true,
        "clientCertificateKeyPair": {
            "new": {
                "name": "Prod client certificate",
                "cert": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
                "key": "-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----"
            }
        }
    }
}
```


### Success Response

**Code** : `201 Created`
