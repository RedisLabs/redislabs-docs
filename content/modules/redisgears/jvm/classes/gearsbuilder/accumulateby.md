---
Title: AccumulateBy
linkTitle: accumulateBy
description: Add an accumulateBy operation to the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public <I extends java.io.Serializable> GearsBuilder<I> accumulateBy​(
	gears.operations.ExtractorOperation<T> extractor, 
	gears.operations.AccumulateByOperation<T,​I> accumulator)
```

Add an accumulateBy operation to the pipe.

The accumulate by takes an extractor and an accumulator.

The extractor extracts the data by which we should perform the group by. 

The accumulate is the reduce function. The accumulator gets the group, accumulated data, and current record and returns a new accumulated data.

The initial value of the accumulator is null.

## Parameters
 
Type parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder |

Function parameters:

| Name | Type | Description |
|------|------|-------------|
| extractor | gears.operations.ExtractorOperation<T> | The extractor operation |
| accumulator | gears.operations.AccumulateByOperation<T,​I> | The accumulator operation |

## Returns

Returns a GearsBuilder object with a new template type. The returned object might be the same as the previous.

## Example

The following example counts the number of unique values:

```java
GearsBuilder.CreateGearsBuilder(reader).
   	accumulateBy(r->{
   		return r.getStringVal();
   	},(k, a, r)->{
   		Integer ret = null;
   		if(a == null) {
   			ret = 0;
   		}else {
   			ret = (Integer)a;
   		}
   		return ret + 1;
});
```

TODO: add optional param