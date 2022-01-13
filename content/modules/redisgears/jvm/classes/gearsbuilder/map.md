---
Title: Map
linkTitle: map
description: Add a map operation to the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

Add a map operation to the pipe. It maps records one-to-one. 

## Parameters
 
Type Parameters:
I - The template type of the returned builder

Parameters:
mapper - The map operation

## Returns

Returns a GearsBuilder object with a new template type. The returned object might be the same as the previous.

## Example

Map each record to its string value:

```java
GearsBuilder.CreateGearsBuilder(reader).
 		map(r->{
    		return r.getStringVal();
});
```