---
Title: AsyncForeach
linkTitle: asyncForeach
description: For each record in the pipe, asynchronously runs some operations.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public GearsBuilder<T> asyncForeach​(
    gears.operations.AsyncForeachOperation<T> foreach)
```

The `asyncForeach` function allows you to use a [`GearsFuture`]({{<relref "/modules/redisgears/jvm/classes/gearsfuture">}}) object to define a set of operations and run them asynchronously for each record in the pipe.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| foreach | AsyncForeachOperation<T> | The set of operations to run for each record |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).map(r->r.getKey()).
	asyncForeach(r->{
		GearsFuture<Serializable> f = new GearsFuture<Serializable>();
		new Thread(new Runnable() {
				
			@Override
			public void run() {
				try {
					Thread.sleep(1);
						
					f.setResult(r);
				} catch (Exception e) {
					e.printStackTrace();
				}					
			}
		}).start();
		return f;
});
```