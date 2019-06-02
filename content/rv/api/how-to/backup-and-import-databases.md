---
Title: Backup & import databases
description: 
weight: 72
alwaysopen: false
categories: ["RC Pro"]
---


## Backup a database

When creating or updating a database, you can specify the `periodicBackupPath` parameter. Setting this parameter enables periodic and on-demand backup operations for the specific database. For details on how to define a path for periodic backups, see "[Database Backups
](/rv/administration/configuration/backups/)".

The API operation for performing on-demand backup is `POST /subscriptions/{subscriptionId}/databases/{databaseId}/backup`.

On-demand database backup is an asynchronous operation. For details see "[Provisioning lifecycle - Asynchronous operations]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md#asynchronous-operations" >}})".

### Pre-requisites

* Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/07-set-variables-with-subscription-and-database-id.sh" %}}
```


### Database backup script

```shell
{{% embed-code "rv/api/12-backup-database.sh" %}}
```

The backup database API does not require a body. It relies on and requires that the `periodicBackupPath` be set to a valid path with available storage capacity to store the backup files for the specific database.

