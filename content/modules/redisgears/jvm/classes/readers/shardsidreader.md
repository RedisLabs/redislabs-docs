---
Title: ShardsIDReader
linkTitle: ShardsIDReader
description: Gets the shard ID for each shard in a database.
weight: 60
alwaysopen: false
categories: ["Modules"]
---

The `ShardsIDReader` creates a single record on each shard that represents the current shard's ID.
 
Use this reader when you want to run an operation on each shard in the database.

## Parameters

None

## Output records

Creates a record for each shard with the shard's cluster identifier.

## Example

```java
ShardsIDReader reader = new ShardsIDReader();
```