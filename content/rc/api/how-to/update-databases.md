---
Title: Update Databases
description: How to construct requests that update an existing database.
weight: 75
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/update-databases/
---

The API operation that updates an existing database is: `PUT /subscriptions/{subscription-id}/databases/{database-id}`

This API operation follows the same [provisioning lifecycle]({{< relref "/rc/api/concepts/provisioning-lifecycle.md" >}}) principles demonstrated in the article "[create and manage databases]({{< relref "/rc/api/how-to/create-and-manage-databases.md" >}})".


## Database update request JSON body

The primary component of a database update request is the JSON request body that contains the details of the requested database changes.

The complete set of JSON elements accepted by the database update API operation can be viewed in the [Swagger UI](https://api.redislabs.com/v1/swagger-ui.html) (use the "Model" display as described in the article [Using the API - Inputs for operations in Swagger ]({{< relref "/rc/api/how-to/using-curl.md/#inputs-for-operations-in-swagger" >}}) )

Following are several examples of database updates JSON requests. 

### Add / remove ReplicaOf

Setting one or more source Redis databases will cause the updated database to be a replica of the specified Redis databases.

#### Add a source database

The following update database JSON request specifies two source databases for the updated database:

```json
{
  "replicaOf": [
    "redis://redis-19385.c9854.us-east-1-mz.ec2.cloud.rlrcp.com:19385"
    , "redis://redis-19072.internal.c9854.us-east-1-mz.ec2.cloud.rlrcp.com:19072"
  ]
}
```

* The `replicaOf` array contains one or more URIs with the format: `redis://user:password@host:port`
* If the URI provided is a Redis Labs Cloud instance, only host and port should be provided (exmaple: `["redis://endpoint1:6379', "redis://endpoint2:6380"]`)

{{< warning >}}
If a source database is already defined for a specific database, and the goal is to add an additional source database, both source databases URIs (existing source and new additional source) must be included in the database updates JSON request. 
{{< /warning >}}


#### Remove a source database

You can remove a source database from the `replicaOf` list by simply issuing an update database JSON request that does not include the specific source database URI.

##### Example:

* Given a database that has two defined source databases:

```json
{
  "replicaOf": [
    "redis://redis-19385.c9854.us-east-1-mz.ec2.cloud.rlrcp.com:19385"
    , "redis://redis-19072.internal.c9854.us-east-1-mz.ec2.cloud.rlrcp.com:19072"
  ]
}
```

* The folllowing update database JSON request will remove one of the two source databases:

```json
{
  "replicaOf": [
    "redis://redis-19385.c9854.us-east-1-mz.ec2.cloud.rlrcp.com:19385"
  ]
}
```

* The following update database JSON request will remove all source databases:

```json
{
  "replicaOf": []
}
```

