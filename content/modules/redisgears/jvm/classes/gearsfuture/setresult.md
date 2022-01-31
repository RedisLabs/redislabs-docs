---
Title: SetResult
linkTitle: setResult
description: Sets a computation to run asynchronously.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public void setResult​(I result) 
	throws java.lang.Exception
```

Sets a computation to run asynchronously.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| result | template type I | The result of a computation |

## Returns

None

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).map(r->r.getKey()).
	asyncFilter(r->{
		GearsFuture<Boolean> f = new GearsFuture<Boolean>();
		try {
			f.setResult(r.equals("x"));	
		} catch (Exception e) {
			e.printStackTrace();
		}			
		return f;
});
```
