---
Title: Add tables to existing pipelines
linkTitle: Add tables to pipeline
description: Explains how to setup and use Debezium in order to add additional tables to an existing pipeline.
weight: 80
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Sometimes you would like to add a new table to a pipeline that is already in streaming (CDC) mode, without resetting Debezium Server and executing a new full snapshot. In Debezium this is called incremental snapshot and it is performed using a table on the source database as the interface with the Debezium connector. In this guide we will explain how to setup and use Debezium in order to add additional tables to an existing pipeline.

## Preparing the Source Database for Debezium Incremental Snapshots

In this section we describe the one time preparation you need to introduce to your source database in order to allow for incremental snapshot.

Incremental snapshot is needed when adding a new table to the pipeline while it's already in streaming (CDC mode).

For more formation, please refer to [Debezium documentation](https://debezium.io/documentation/reference/stable/configuration/signalling).

### Create the Signaling Table

On the source database, create a signaling table for sending signals to the connector:

```sql
CREATE TABLE <signalingTableName>
(
  id VARCHAR(42) PRIMARY KEY,
  type VARCHAR(32) NOT NULL,
  data VARCHAR(2048) NULL
);
```

For more information about the required structure of the signaling table, please refer to [structure of a signaling data collection](https://debezium.io/documentation/reference/stable/configuration/signalling.html#debezium-signaling-data-collection-structure).

### SQL Server - Enable CDC for the Signalling Table

On the source database, enable CDC for the signaling table by running this stored procedure:

```sql
USE <databaseName>
GO

EXEC sys.sp_cdc_enable_table
@source_schema = N'<schemaName>'
@source_name   = N'<tableName>',
@role_name     = N'<roleName>',
@filegroup_name = N'<fileGroupName>',
@supports_net_changes = 0
GO
```

For more details on the stored procedure arguments, please see [here](#sql-server-sp_cdc_enable_table-stored-procedure-arguments).

### Configure Debezium Server's `application.properties`

- Add the property `debezium.source.signal.data.collection` and set its value to the fully-qualified name of the signaling table that you created [here](#create-the-signaling-table).

  The format for the fully-qualified name of the signaling table depends on the source database type.
  The following example shows the naming formats to use for each supported database:

  - MySQL: `<databaseName>.<tableName>`

  - Oracle: `<databaseName>.<schemaName>.<tableName>`

  - PostgreSQL: `<schemaName>.<tableName>`

  - SQL Server: `<databaseName>.<schemaName>.<tableName>`

## Snapshotting an Additional Table (Incremental Snapshot)

This section describes the needed steps in order to snapshot an additional table using Debezium signalling table mechanism.

For more information, please refer to [Debezium documentation](https://debezium.io/documentation/reference/1.6/configuration/signalling.html).

### Prerequisites

A signaling table exists on the source database and the connector is configured to capture it as described [here](#preparing-the-source-database-for-debezium-incremental-snapshots).

### Debezium Server's `application.properties`

Update the property `debezium.source.table.include.list` to contain the new table name to be monitored.

### SQL Server - Enable CDC for the Table

On the source database, enable CDC for the additional table by running this stored procedure:

```sql
USE <databaseName>
GO

EXEC sys.sp_cdc_enable_table
@source_schema = N'<schemaName>'
@source_name   = N'<tableName>',
@role_name     = N'<roleName>',
@filegroup_name = N'<fileGroupName>',
@supports_net_changes = 0
GO
```

For more details on the stored procedure arguments, please see [here](#sql-server-sp_cdc_enable_table-stored-procedure-arguments).

### Signal Debezium to Execute Incremental Snapshot

The following `INSERT` statement will trigger a snapshot signal to the signaling table on the source database. After Debezium detects the change in the signaling table, it reads the signal and runs the requested snapshot operation.

```sql
INSERT INTO
   <signalingTableName>(id, type, data)
VALUES
   (
      '<signalRequestID>', 'execute-snapshot', '{"data-collections":["_<tableName1>_","_<tableName2>_">],"type":"incremental"}'
   )
;
```

The data-collections array lists tables by their fully-qualified names, using the same format as mentioned [here](#configure-debezium-servers-applicationproperties).

#### Signaling Table Columns

| Column | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| id     | An arbitrary string that is assigned as the id identifier for the signal request. |
| type   | The type of signal to send.                                                       |
| data   | An array of table names to include in the snapshot.                               |

## SQL Server: `sp_cdc_enable_table` Stored Procedure Arguments

- `@source_name` - Specifies the name of the table that you want to capture.
- `@role_name` - Specifies a role MyRole to which you can add users to whom you want to grant SELECT permission on the captured columns of the source table. Users in the sysadmin or db_owner role also have access to the specified change tables. Set the value of @role_name to NULL, to allow only members in the sysadmin or db_owner to have full access to captured information.
- `@filegroup_name` - Specifies the filegroup where SQL Server places the change table for the captured table. The named filegroup must be already exist. It is best not to locate change tables in the same filegroup that you use for source tables.
