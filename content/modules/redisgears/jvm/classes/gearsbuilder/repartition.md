---
Title: Repartition
linkTitle: repartition
description: Add a repartition operation to the operation pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

Add a repartition operation to the operation pipe. The repartition moves the records between the shards according to the extracted data.

## Parameters
 
extractor - The extractor operation

## Returns

Returns a GearsBuilder object with a new template type. The return object might be the same as the previous.

## Example

Repartition by value:

```java
GearsBuilder.CreateGearsBuilder(reader).
   	repartition(r->{
   		return r.getStringVal();
});
```