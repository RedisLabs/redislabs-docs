---
Title: Adding Databases via GET URL
date: 2021-01-11 00:00:00 +0000
weight: 16
categories: ["RI"]
path: api/
nextStep:
    Title: Memory Analysis
    href: /docs/features/memory-analysis/
---

If you want to automate adding a Redis database without filling the [database form]({{< relref "/ri/using-redisinsight/add-instance.md" >}}), you might want to add database via GET URL.

Below is the documentation for the URL required to add databases.

## Add Redis database

Used to add Redis databases to RedisInsight.

**URL** : `/api/add/`

**Method** : `GET`


### Query Parameters

These are the required query parameters for any type of database.

| Parameter      | Type    | Required/Optional | Description                                                                  |
|----------------|---------|-------------------|------------------------------------------------------------------------------|
| `host`         | string  | required          | Hostname of your Redis database.                                             |
| `port`         | number  | required          | Port of your Redis database.                                                 |
| `name`         | string  | optional          | A nick name for the Redis database. Any string is valid                      |
| `username`     | string  | optional          | Username of your Redis database.                                             |
| `passsword`    | string  | optional          | Password of your Redis database.                                             |
| `tls`          | boolean | optional          | `"true"` if your Redis database has TLS enabled.                             |
| `verifyServer` | boolean | optional          | `"true"` if the server certificate of you Redis database has to be verified. |
|                |         |                   |                                                                              |

{{< note >}}
If you want to add the TLS certificates for your Redis database, you have to manually fill [database form]({{< relref "/ri/using-redisinsight/add-instance.md" >}}).
{{< /note >}}


#### Examples

##### Standalone database

![Standalone database](/images/ri/api-get-standalone.png)

##### Cluster database

![Cluster database](/images/ri/api-get-cluster.png)

##### Sentinel database

![Sentinel database](/images/ri/api-get-sentinel.png)

##### Standalone database with ACL

![Standalone database with ACL](/images/ri/api-get-standalone-acl.png)

##### Standalone database with TLS

![Standalone database with TLS](/images/ri/api-get-standalone-tls.png)
