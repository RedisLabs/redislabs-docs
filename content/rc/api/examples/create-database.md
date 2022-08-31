---
Title: Create and manage databases
description: This article describes how to create and manage a database using `cURL` commands.
linkTitle: Create databases
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-and-manage-databases/
         /rc/api/how-to/create-and-manage-databases/
         /rc/api/how-to/create-and-manage-databases.md
         /rc/api/examples/create-database
         /rc/api/examples/create-database.md
---

You can use the Redis Enterprise Cloud REST API to create databases.

These examples use the [`cURL` utility]({{< relref "/rc/api/get-started/use-rest-api.md#using-the-curl-http-client" >}}); you can use any REST client to work with the Redis Cloud REST API.

## Create a database

To create a database, use `POST /subscriptions/{subscription-id}/databases`

The database is created in an existing or a newly created subscription.

When a subscription is created, it is created with at least one database.

You can add databases to the subscription; you can also update or delete existing databases.

Creating a database is an [asynchronous operation]({{< relref "/rc/api/get-started/process-lifecycle.md#asynchronous-operations" >}}).

The following API call creates a database.

```shell
POST "https://[host]/v1/subscriptions/$SUBSCRIPTION_ID/databases"
{
  "name": "Database-example-basic",
  "memoryLimitInGb": 10,
  "password": "P@ssw0rd"
}
```

The JSON body contains only the most basic, required parameters in order to create a database:

- Database name - A unique name per subscription that can contain only alphanumeric characters and hyphens
- Maximum database size in GB
- Database password

### Additional database parameters

There are many additional parameters and settings that can be defined on database creation:

- Review the database parameters and options in the [Swagger OpenAPI documentation](https://api.redislabs.com/v1/swagger-ui.html#/Databases).
- Select `POST Create database`.
- Under `Database definition`, click on the `Model` options.

![swagger-database-create-documentation](/images/rv/api/swagger-database-create-documentation.png)
