---
Title: Accumulate
linkTitle: accumulate
description: A many-to-one mapped, reduce the record in the pipe to a single record.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

A many-to-one mapped, reduce the record in the pipe to a single record. The initial accumulator object is null (same as for accumulateBy).

## Parameters
 
Type Parameters:
I - The template type of the returned builder

Parameters:
accumulator - The accumulate operation

## Returns

- GearsBuilder with a new template type, notice that the return object might be the same as the previous.

## Example

This example counts the number of records:

```java
GearsBuilder.CreateGearsBuilder(reader).accumulate((a, r)->{
    Integer ret = null;
    if(a == null) {
	    ret = 1;
    }else {
	    ret = (Integer)a;
    }
    return ret + 1;
});
```

TODO: add the optional parameters