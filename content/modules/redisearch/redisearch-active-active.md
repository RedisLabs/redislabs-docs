---
Title: RediSearch in Active-Active databases
linkTitle: Search active-active databases
description:
weight: 30
alwaysopen: false
categories: ["Modules"]
---
Starting with RediSearch 2.x, supported in Redis Enterprise Software (RS) 6.0 and higher, you can [add the RediSearch module]({{<relref "/modules/install/add-module-to-database">}}) to an [Active-Active database]({{< relref "/rs/databases/active-active/_index.md" >}}) at the time that you create the database.

That means that you can run search operations on any of the instances of the Active-Active database.

The way it works is that:

1. You create the Active-Active database with RediSearch 2.x.
1. You create the index in each instance of the database.
1. If you are using [synomyms](https://oss.redislabs.com/redisearch/Synonyms/), they need to be added on each replica.
1. The index is maintained by each instance outside of the database keyspace, so only updates to the hashes in the databases are synchronized.
1. The following commands are not supported: FT.DROP, FT.SUGADD, FT.SUGGET, FT.SUGDEL, FT.SUGLEN.

To help visualize this process, let's look at this example:

| Time  | Description | CRDB Instance1 | RediSearch Instance 1 | CRDB Instance2 | RediSearch Instance 2 |
| :---: | :--- | :--- | :--- | :--- | :--- |
|  t0 | Create the index on each instace |  | FT.CREATE idx .... |  | FT.CREATE idx .... |
|  t1 | Add doc1 as hash on instance 1; RediSearch indexes doc1 on instance 1 | HSET doc1 field1 "a" | (Index doc1 field1 "a") |  |  |
|  t2 | Add doc2 as hash on instance 2; RediSearch indexes doc2 on instance 2 |  |  | HSET doc1 field2 "b" | (Index doc1 field2 "b") |
|  t3 | Search for "a" in each instance only finds the result in instance 1 |  | FT.Search idx "a"<br/>1) 1<br/>2) doc1 |  | FT.Search idx "a"<br/>1) 0 |
|  t4 | Active-Active synchronization | - Sync - |  | - Sync - |  |
|  t5 | Both hashes are found in each instance | HGETALL doc1<br/>1) "field2"<br/>2) "b"<br/>3) "field1"<br/>4) "a" |  | HGETALL doc1<br/>1) "field2"<br/>2) "b"<br/>3) "field1"<br/>4) "a" |  |
|  t6 | Search for "a" in each instance finds both documents |  | FT.Search idx "a"<br/>1) 1<br/>2) doc1 |  | FT.Search idx "a"<br/>1) 1<br/>2) doc1 |

The practical result here is that you have a geo-distributed database with a high level of consistency that can also receive search operations on any instance.
