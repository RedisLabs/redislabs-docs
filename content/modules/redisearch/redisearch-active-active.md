---
Title: RediSearch in Active-Active databases
linkTitle: Search Active-Active databases
description: Search Active-Active databases.
weight: 30
alwaysopen: false
categories: ["Modules"]
---
Starting with RediSearch 2.x, supported in Redis Enterprise Software (RS) 6.0 and later, you can [add the RediSearch module]({{<relref "/modules/install/add-module-to-database">}}) to an [Active-Active database]({{< relref "/rs/databases/active-active/" >}}) at the time of creation.

You can run search operations on any instance of an Active-Active database.

## How it works

1. Create an Active-Active database with RediSearch 2.x enabled.
1. [Create the index](https://redis.io/commands/ft.create/) on each instance of the database.
1. If you are using [synonyms](https://redis.io/docs/stack/search/reference/synonyms/), you need to add them to each replica.
1. The index is maintained by each instance outside of the database keyspace, so only updates to the hashes in the databases are synchronized.

## Command compatibility

Active-Active databases do not support the following RediSearch commands: 

- `FT.DROP`
- [`FT.SUGADD`](https://redis.io/commands/ft.sugadd/)
- [`FT.SUGGET`](https://redis.io/commands/ft.sugget/)
- [`FT.SUGDEL`](https://redis.io/commands/ft.sugdel/)
- [`FT.SUGLEN`](https://redis.io/commands/ft.suglen/)

## Example

Here's an example to help visualize Active-Active RediSearch:

| Time  | Description | CRDB Instance1 | RediSearch Instance 1 | CRDB Instance 2 | RediSearch Instance 2 |
| :---: | :--- | :--- | :--- | :--- | :--- |
|  t0 | Create the index on each instance |  | FT.CREATE idx .... |  | FT.CREATE idx .... |
|  t1 | Add doc1 as a hash on instance 1; RediSearch indexes doc1 on instance 1 | HSET doc1 field1 "a" | (Index doc1 field1 "a") |  |  |
|  t2 | Add doc2 as a hash on instance 2; RediSearch indexes doc2 on instance 2 |  |  | HSET doc1 field2 "b" | (Index doc1 field2 "b") |
|  t3 | Searching for "a" in each instance only finds the result in instance 1 |  | FT.Search idx "a"<br/>1) 1<br/>2) doc1 |  | FT.Search idx "a"<br/>1) 0 |
|  t4 | Active-Active synchronization | - Sync - |  | - Sync - |  |
|  t5 | Both hashes are found in each instance | HGETALL doc1<br/>1) "field2"<br/>2) "b"<br/>3) "field1"<br/>4) "a" |  | HGETALL doc1<br/>1) "field2"<br/>2) "b"<br/>3) "field1"<br/>4) "a" |  |
|  t6 | Searching for "a" in each instance finds both documents |  | FT.Search idx "a"<br/>1) 1<br/>2) doc1 |  | FT.Search idx "a"<br/>1) 1<br/>2) doc1 |

The practical result is that you have a geo-distributed database with a high level of consistency that can also run search operations on any instance.
