---
Title: FlatMap
linkTitle: flatMap
description: Add a flatmap operation to the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

Add a flatmap operation to the pipe. The record mapping is one-to-many (1:N), so it maps a single input record to one or more output records.

The operation must return an Iterable object. The RedisGears module iterates over the elements in the Iterable object and passes them one by one through the pipe.

## Parameters
 
Type Parameters:
I - The template type of the returned builder object

Parameters:
flatmapper - The flatmap operation

## Returns

A GearsBuilder object with a new template type. The returned object might be the same as the initial GearsBuilder.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).flatMap(r->{
   	return r.getListVal();
}); 
```