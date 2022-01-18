---
Title: AccumulateBy
linkTitle: accumulateBy
description: Extracts specific data from multiple records in the pipe and reduces them to a single record.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public <I extends java.io.Serializable> GearsBuilder<I> accumulateBy​(
	gears.operations.ExtractorOperation<T> extractor, 
	gears.operations.AccumulateByOperation<T,​I> accumulator)

public <I extends java.io.Serializable> GearsBuilder<I> accumulateBy​(
	gears.operations.ValueInitializerOperation<I> valueInitializer, 
	gears.operations.ExtractorOperation<T> extractor, 
	gears.operations.AccumulateByOperation<T,​I> accumulator)
```

Add an accumulateBy operation to the pipe.

The accumulateBy takes an extractor and an accumulator.

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
| valueInitializer | gears.operations.ValueInitializerOperation<I> | Whenever the accumulated value is null, use this function to initialize it |
| extractor | gears.operations.ExtractorOperation<T> | The extractor operation |
| accumulator | gears.operations.AccumulateByOperation<T,​I> | The accumulator operation |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

Both of the following examples count the number of unique values.

Without the `valueInitializer` parameter:

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

With the `valueInitializer` parameter:

```java
GearsBuilder.CreateGearsBuilder(reader).
    	accumulateBy(()->{
   		return 0;
   	},r->{
   		return r.getStringVal();
   	},(k, a, r)->{
   		return a + 1;
   	});
```
