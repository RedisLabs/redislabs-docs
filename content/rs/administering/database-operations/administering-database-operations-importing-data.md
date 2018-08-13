---
Title: Importing Data into your CRDB
description: $description
weight: $weight
alwaysopen: false
---
When importing data into a CRDB, there are two options:

1.  1.  Perform a flushall to the database, thus deleting all data. Then
        import the data into the CRDB.
    2.  Import data but merge it into the existing or add new data from
        the import file.

When using option \#2, there are special considerations to be aware of.
Unlike a traditional Redis database, CRDBs have a numeric counter data
type and thus require special ways to increment. The import through the
Redis Enterprise web UI handles these data types for you. When you
import data into a CRDB, there will be a special prompt such as the
below.

![Import into a
CRDB](https://redislabs.com/wp-content/uploads/2018/03/Screen-Shot-2018-03-29-at-10.00.12-PM.png){.size-full
.wp-image-37176 width="1720" height="702"}

Import into a CRDB

As part of the import in the UI, RS will increment counters by the value
that is in the importing data.

You can read more on how to perform the import
[here](https://redislabs.com/redis-enterprise-documentation/administering/database-operations/importing-data).
