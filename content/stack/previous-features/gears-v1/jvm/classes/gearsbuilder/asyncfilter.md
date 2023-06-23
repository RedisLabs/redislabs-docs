---
Title: AsyncFilter
linkTitle: asyncFilter
description: Asynchronously filters out records in the pipe based on a given condition.
weight: 50
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisgears/jvm/classes/gearsbuilder/asyncfilter/
---

```java
public GearsBuilder<T> asyncFilter​(
    gears.operations.AsyncFilterOperation<T> filter)
```

The `asyncFilter` function allows you to use a [`GearsFuture`]({{<relref "/stack/previous-features/gears-v1/jvm/classes/gearsfuture">}}) object to asynchronously filter out records in the pipe based on a given condition.

The filter operation should contain a conditional statement and return a boolean for each record:
- If `true`, the record will continue through the pipe. 
- If `false`, it filters out the record.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| filter | AsyncFilterOperation<T> | A function that checks a condition for each record in the pipe. Returns a boolean. |

## Returns

Returns a GearsBuilder object with the same template type as the input builder.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).map(r->r.getKey()).
	asyncFilter(r->{
		GearsFuture<Boolean> f = new GearsFuture<Boolean>();
		new Thread(new Runnable() {
				
			@Override
			public void run() {
				try {
					Thread.sleep(1);
						
					f.setResult(r.equals("x"));
				} catch (Exception e) {
					e.printStackTrace();
				}					
			}
		}).start();
		return f;
});
```