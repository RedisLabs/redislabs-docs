---
Title: Backup & import databases
description: When creating or updating a database, you can specify the backup path parameter. The import API operation allows importing from various source types and specified locations
weight: 72
alwaysopen: false
categories: ["RC Pro"]
---


## Backup a database

When creating or updating a database, you can specify the (optional) `periodicBackupPath` parameter. Setting this parameter enables periodic and on-demand backup operations for the specific database. For details on how to define a path for periodic backups, see "[Database Backups
](/rv/administration/configuration/backups/)".

The API operation for performing on-demand backup is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/backup`.

On-demand database backup is an asynchronous operation. For details see "[Provisioning lifecycle - Asynchronous operations]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md#asynchronous-operations" >}})".

### Pre-requisites

- Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/07-set-variables-with-subscription-and-database-id.sh" %}}
```


### Database backup script

```shell
{{% embed-code "rv/api/12-backup-database.sh" %}}
```

The backup database API does not require a body. It relies on and requires that the `periodicBackupPath` be set to a valid path with available storage capacity to store the backup files for the specific database.

## Import a database

You can import data into an existing database from multiple storage sources, including S3, Redis, FTP etc. 

The API operation for performing on-demand backup is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/import`.

For an import operation to be successful:
   * The source URI must be accessible to the importing database (e.g. located in a publicly accessible S3 path) 
   * The data format must be Redis compatible (e.g. the output of a database backup operation).

The duration of the import process varies based on the size of the data to be imported and the network bandwidth between the data source and the importing database.

Database import is an asynchronous operation. For details see "[Provisioning lifecycle - Asynchronous operations]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md#asynchronous-operations" >}})".


{{% note %}}
Importing data into an existing database will overwrite any existing values.
{{% /note %}}
   



### Pre-requisites

- Import database requires that you specify the Subscription Id and Database Id of the destination database 
- Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/07-set-variables-with-subscription-and-database-id.sh" %}}
```

### Database import script

```shell
{{% embed-code "rv/api/13-import-database.sh" %}}
```


### Database import JSON body

The database import operation is defined by a JSON document that is sent as the body of the API request.

In the example above, that JSON document is stored in the `import-database-s3.json` file:


```shell
{{% embed-code "rv/api/import-database-s3.json" %}}
```