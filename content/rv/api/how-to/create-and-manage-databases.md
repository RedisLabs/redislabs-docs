---
Title: Create and manage Databases
description: 
weight: 70
alwaysopen: false
categories: ["RC Pro"]
---

This article describes how to create and manage a database using `cURL` commands. 

For an introduction to using `cURL` with API operations, see "[Using the cURL HTTP client]({{< relref  "/rv/api/how-to/using-curl#using-the-curl-http-client" >}})".


## Create a database

The API operation that creates a database is `POST /subscriptions/{subscription-id}/databases`.

A database is created within an existing (or a newly created) subscription. When a subscription is created, at least one database is created as well. Additional databases can be added to the subscription, and existing databases can be updated and deleted.

Creating a database is an asynchronous operation. For details see "[Provisioning lifecycle - Asynchronous operations]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md#asynchronous-operations" >}})".

The following Linux shell script sends a `POST /subscriptions/{subscription-id}/databases` and waits for a database Id. When the database Id is received, the **processing phase** is completed and the database (as well as the subscription that contains it) is in the **provisioning phase** (in the `pending` status).  


### Pre-requisites

* Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/06-set-variables-with-subscription-id.sh" %}}
```


### Database creation script

You can run the **create database** script using a command line `bash path/script-name.sh`.

Below is the sample script that you can use as a reference to calling the API operation to create a database. 

Note that the script relies on the pre-requisite variables to be set (see above), as well as on the `jq` tool (JSON conmmand-line processor)


```shell
{{% embed-code "rv/api/11-create-database.sh" %}}
```

### Database JSON body

The created database is defined by a JSON document that is sent as the body of the API request.

In the example above, that JSON document is stored in the `create-database-basic.json` file:


```shell
{{% embed-code "rv/api/create-database-basic.json" %}}
```

* The JSON body contains only the most basic, required parameters in order to create a database: 
    * Database name (unique name per subscription and may contain only alphanumeric characters and hyphens)
    * Maxmium database size in GB
    * Database password
* There are many additional parameters and settings that can be defined on database creation. 
    * For details on database parameters and options, see [Swagger OpenAPI documentation](https://api-beta.redislabs.com/beta1/swagger-ui.html#/Databases)
    * Select `POST Create database`
    * Under `Database definition` click on the `Model` options

![swagger-database-create-documentation](/images/rv/api/swagger-database-create-documentation.png)