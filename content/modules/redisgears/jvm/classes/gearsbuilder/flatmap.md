---
Title: FlatMap
linkTitle: flatMap
description: Add a flatmap operation to the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

Add a flatmap operation to the pipe.

The operation must return an Iterable object. RedisGears iterate over the element in the Iterable object and pass them one by one in the pipe.

## Parameters
 
Type Parameters:
I - The template type of the returned builder

Parameters:
flatmapper - the flatmap operation

## Returns

GearsBuilder with a new template type, notice that the return object might be the same as the previous.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).flatMap(r->{
   	return r.getListVal();
}); 
```