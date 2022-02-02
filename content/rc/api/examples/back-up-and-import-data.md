---
Title: Database backup and import
description: When you create or update a database, you can specify the backup path.
    The import API operation lets you import data from various source types and specified locations.
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/backup-and-import-databases/
         /rc/api/how-to/backup-and-import-databases/
         /rc/api/how-to/backup-and-import-databases.md
         /rc/api/examples/back-up-and-import-data/
         /rc/api/examples/back-up-and-import-data.md
---

## Back up a database

When you create or update a database in a Flexible or Annual account, you can specify the (optional) `periodicBackupPath` parameter
with a [backup path](/rv/administration/configuration/backups/).
This parameter enables periodic and on-demand backup operations for the specified database.

The API operation for on-demand backups is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/backup`.
On-demand database backup is an [asynchronous operation]({{<relref "/rc/api/get-started/process-lifecycle.md#asynchronous-operations">}}).

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

You can import data into an existing database from multiple storage sources, including AWS S3, Redis, and FTP.
Database import is an [asynchronous operation]({{<relref  "/rc/api/get-started/process-lifecycle.md#asynchronous-operations">}}).

The API operation for performing on-demand backup is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/import`.

The requirements for data import are:

- The URI of the data
    - The source URI must be accessible to the importing database
    - The data format must be a Redis backup file or a Redis database
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

You can specify the backup location with the `sourceType` and `importFromUri` values for these sources:

|Data location|sourceType|importFromUri|
|---|---|---|
|Amazon AWS S3|aws-s3|s3://bucketname/[path/]filename.rdb[.gz]|
|FTP|ftp|ftp://[username][:password]@[:port]/[path/]filename.rdb[.gz]|
|Google Blob Storage|google-blob-storage|gs://bucketname/[path/]filename.rdb[.gz]|
|Microsoft Azure Blob Storage|azure-blob-storage|abs://:storage_account_access_key@storage_account_name/[container/]filename.rdb[.gz]|
|Redis server|redis|redis://[db_password]@[host]:[port]|
|Web server|HTTP|HTTP://[username][:password]@[:port]/[path/]filename.rdb[.gz]|
