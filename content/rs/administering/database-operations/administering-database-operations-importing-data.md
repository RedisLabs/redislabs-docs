---
Title: Importing Data into your Active-Active Database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When importing data into an Active-Active database, there are two options:

- Perform a flushall to the database, thus deleting all data. Then
        import the data into the Active-Active database.
- Import data but merge it into the existing or add new data from
        the import file.

When using option #2, there are special considerations to be aware of.
Unlike a traditional Redis database, Active-Active databases have a numeric counter data
type and thus require special ways to increment. The import through the
Redis Enterprise web UI handles these data types for you. When you
import data into an Active-Active database, there is a special prompt such as the
below.

![Import into an Active-Active database](/images/rs/Screen-Shot-2018-03-29-at-10.00.12-PM.png?width=1720&height=702)

Import into an Active-Active database

As part of the import in the UI, RS increments counters by the value
that is in the importing data.

You can read more on how to perform the import
[here]({{< relref "/rs/administering/database-operations/importing-data.md" >}}).
