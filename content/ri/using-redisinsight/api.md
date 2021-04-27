---
Title: Adding Databases Programmatically
date: 2020-02-02 00:00:00 +0000
weight: 15
categories: ["RI"]
path: api/
nextStep:
    Title: Memory Analysis
    href: /docs/features/memory-analysis/
---

If you have a lot of Redis databases or you are using RedisInsight as part of some automated workflow,
you might want to add databases programmatically.

Now this is possible using our experimental REST API. Below is the documentation for the endpoints 
required to add databases.

Note that this API should not be considered stable at this point and might change or break entirely in
future releases. Do not rely on this API for production.

## Add Redis database

Used to add Redis databases to RedisInsight.

**URL** : `/api/instance/`

**Method** : `POST`

**Body Type**: JSON

**Auth required** : NO

### Parameters

These are the required parameters for any type of database.

| Parameter     | Type   | Description         |
|---------------|--------|---------------------|
| name          | string | A nick name for the Redis database. Any string is valid |
| connectionType| string | One of `"STANDALONE"`, `"CLUSTER"` or `"SENTINEL"`. For any Redis Enterprise database (even with database clustering enabled), use `"STANDALONE"` |

The remaining parameters depend on the connection type.

##### Standalone database parameters

Standalone databases are added using `connectionType: "STANDALONE"`.

The following additional parameters are required for standalone databases.

| Parameter  | Type   | Description                                                           |
|------------|--------|-----------------------------------------------------------------------|
| host       | string | The hostname or IP address of your Redis database                     |
| port       | number | The port your Redis datanase is listening on. It should be an integer |
| password   | string | (optional) The password for your Redis database.                      |
| tls        | object | (optional) [TLS parameters for the database](#tls-parameters)         |


**Example**

```json
{
    "name": "QA Redis DB",
    "connectionType": "STANDALONE",
    "host": "redis.acme.com",
    "port": 6379
}
```

##### Redis cluster database parameters

Redis Cluster databases are added using `connectionType: "CLUSTER"`.

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
    "connectionType": "CLUSTER",
    "seedNodes": [
        {
            "host": "redis-cluster-node-1.acme.com",
            "port": 6379
        }
    ]
}
```

##### Sentinel-monitored database parameters

Sentinel-monitored databases are added using `connectionType: "SENTINEL"`.

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
    "connectionType": "SENTINEL",
    "sentinelHost": "redis-sentinel.acme.com",
    "sentinelPort": 26379,
    "sentinelPassword": "sentinel-pass",
    "sentinelMaster": {
        "serviceName": "mymaster",
        "authPass": "opensesame",
    }
}
```

#### TLS parameters

TLS parameters can be used to specify how RedisInsight should connect to the Redis database over TLS.

The following parameters can be used:

| Parameter                | Type    | Description                                                   |
|--------------------------|---------|---------------------------------------------------------------|
| useTls                   | boolean | Whether to use TLS to connect to the database or not          |
| clientAuth               | boolean | Whether TLS client authentication is required by the database |
| clientCertificateKeyPair | object  | (optional) [The details of the client certificate and private key used to connect to the Redis database](#tls-client-certificate-and-key). If client authentication is not required, this has to be provided |

##### TLS client certificate and key

The client certificate and key details can be provided in two forms:

1. If the certificate and key has already been used for a database before, or [has been added separately](#add-tls-certificate-and-key-pair), the ID of that certificate can be provided directly.

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

1. Using an existing client certificate/key pair for a new database.
    ```json
    {
        "name": "Prod Redis Enterprise DB",
        "connectionType": "STANDALONE",
        "host": "redis-ent.acme.com",
        "port": 6379,
        "tls": {
            "useTls": true,
            "clientAuth": true,
            "clientCertificateKeyPair": {
                "id": 6
            }
        }
    }
    ```

1. Creating a new client certificate/key pair while adding the database.
    ```json
    {
        "name": "Prod Redis Enterprise DB",
        "connectionType": "STANDALONE",
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

### Success response

**Code** : `201 Created`

## Add TLS certificate and key pair

Used to add a new TLS certificate and private key pair to use to connect to a Redis database.

**URL** : `/api/tls-client-cert/`

**Method** : `POST`

**Body Type**: JSON

**Auth required** : NO

### Parameters

| Parameter  | Type   | Description                                                           |
|------------|--------|-----------------------------------------------------------------------|
| name       | string | The name of the new cert/key pair                                     |
| cert       | string | The certificate string                                                |
| key        | string | The private key string                                                |

### Success response

The name and ID is returned in the response body. The ID can be used to reference this certificate/key pair
when adding databases.

**Code** : `201 Created`

**Body** :

```json
{
    "certificate": {
        "id": 1,
        "name": "VeriCert ACME Certificate"
    }
}
```

## Get added TLS certificate and key pairs

Used to retrieve a list of [previously added](#add-tls-certificate-and-key-pair) TLS certificate and private key pair to use to connect to a Redis database.

**URL** : `/api/tls-client-cert/`

**Method** : `GET`

**Auth required** : NO

### Success response

A list of objects, each containing the client certificate's name and ID, is returned in the response body. 
The ID can be used to reference this certificate/key pair when adding databases.

**Code** : `200 OK`

**Body** :
```json
{
    "certificates": [
        {
            "id": 6,
            "name": "VeriCert ACME Certificate"
        }
    ]
}
```

