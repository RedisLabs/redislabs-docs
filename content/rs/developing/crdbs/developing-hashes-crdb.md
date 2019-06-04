---
Title: Developing with Hashes in a CRDB
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Hashes are great for structured data that contain a map of fields and
values. They are used for managing distributed user or app session
state, user preferences, form data and so on. Hash fields contain string
type and string types operate just like the standard Redis string types
when it comes to CRDTs. Fields in hashes can be initialized as a string
using HSET or HMSET or can be used to initialize counter types that are
numeric integers using HINCRBY or floats using HINCRBYFLOAT.

Hashes in CRDBs behave the same and maintain additional metadata to
achieve an "OR-Set" behavior to handle concurrent conflicting writes.
With the OR-Set behavior, writes to add new fields across multiple CRDB
Instances are typically unioned except in cases of conflicts.
Conflicting Instance writes can happen when a CRDB Instance deletes a
field while the other adds the same field. In this case and observed
remove rule is followed. That is, remove can only remove fields it has
already seen and in all other cases element add/update wins.

Field values behave just like CRDT strings. String values can be types
string, counter integer based on the command used for initialization of
the field value. See "String Data Type in CRDBs" and "String Data Type
with Counter Value in CRDBs" for more details.

Here is an example of an "add wins" case

|  **Time** | **CRDB Instance1** | **CRDB Instance2** |
|  ------: | :------: | :------: |
|  t1 | HSET key1 field1 “a” |  |
|  t2 |  | HSET key1 field2 “b” |
|  t4 | - Sync - | - Sync - |
|  t5 | HGETALL key1<br/>1) “field2”<br/>2) “b”<br/>3) “field1”<br/>4) “a” | HGETALL key1<br/>1) “field2”<br/>2) “b”<br/>3) “field1”<br/>4) “a” |