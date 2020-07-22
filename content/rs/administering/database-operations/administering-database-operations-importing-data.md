---
Title: Importing Data into your Active-Active database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When importing data into an Active-Active database, there are two options:

- Perform a flushall to the database, thus deleting all data.
    Then import the data into the Active-Active database.
- Import data but merge it into the existing or add new data from the import file.

Because Active-Active databases have a numeric counter data type,
when you merge the imported data into the existing data RS increments counters by the value that is in the imported data.
The import through the Redis Enterprise web UI handles these data types for you.

You can import data into an Active-Active database [from the web UI]({{< relref "/rs/administering/database-operations/importing-data.md" >}}).
When you import data into an Active-Active database, there is a special prompt.

![Import into an Active-Active database](/images/rs/Screen-Shot-2018-03-29-at-10.00.12-PM.png?width=1720&height=702)
