---
Title: Accumulate
linkTitle: accumulate
description: A many-to-one mapped function that reduces the record in the pipe to a single record.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public <I extends java.io.Serializable> GearsBuilder<I> accumulate​(
    gears.operations.AccumulateOperation<T,​I> accumulator)
```

A many-to-one mapped function that reduces the records in the pipe to a single record. The initial accumulator object is null.

## Parameters
 
Type parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder |

Function parameters:

| Name | Type | Description |
|------|------|-------------|
| accumulator | gears.operations.AccumulateOperation<T,​I> | The accumulate operation |

## Returns

Returns a GearsBuilder object with a new template type. The return object might be the same as the previous.

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