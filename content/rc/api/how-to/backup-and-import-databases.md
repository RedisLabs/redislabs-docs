---
Title: Databases Backup and Import
description: When you create or update a database, you can specify the backup path.
    The import API operation lets you import data from various source types and specified locations.
weight: 72
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/backup-and-import-databases/
---

## Backup a database

When you create or update a database, you can specify the (optional) `periodicBackupPath` parameter
with a [backup path](/rv/administration/configuration/backups/).
This parameter enables periodic and on-demand backup operations for the specified database.

The API operation for on-demand backups is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/backup`.
On-demand database backup is an [asynchronous operation]({{< relref  "/rc/api/concepts/provisioning-lifecycle#asynchronous-operations" >}})".

### Prerequisites for backups

Before you enable backups, you must define the variables that the API requires:

```shell
{{% embed-code "rv/api/07-set-variables-with-subscription-and-database-id.sh" %}}
```

### Database backup script

```shell
{{% embed-code "rv/api/12-backup-database.sh" %}}
```

The backup database API does not require a body.
Instead, the `periodicBackupPath` must be set to a valid path with available storage capacity to store the backup files for the specific database.

## Import a database

You can import data into an existing database from multiple storage sources, including AWS S3, Redis, FTP.
Database import is an [asynchronous operation]({{< relref  "/rc/api/concepts/provisioning-lifecycle#asynchronous-operations" >}})".

The API operation for performing on-demand backup is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/import`.

The requirements for data import are:

- The URI of the data
    - The source URI must be accessible to the importing database
    - The data format must be a redis backup file or a redis database
- The subscription ID and database ID of the destination database

The duration of the import process depends on the amount of data imported and the network bandwidth between the data source and the importing database.

{{< warning >}}
Data imported into an existing database overwrites any existing data.
{{< /warning >}}
  
### Database import script

Before you import the data, you must set the import variables:

```shell
{{% embed-code "rv/api/07-set-variables-with-subscription-and-database-id.sh" %}}
```

To import the data, run:

```shell
{{% embed-code "rv/api/13-import-database.sh" %}}
```

### Database import JSON body

The database import operation is defined by a JSON document that is sent as the body of the API request.

In the example above, that JSON document is stored in the `import-database-s3.json` file:

```shell
{{% embed-code "rv/api/import-database-s3.json" %}}
```
