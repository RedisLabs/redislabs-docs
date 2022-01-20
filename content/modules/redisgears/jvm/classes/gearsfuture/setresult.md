---
Title: SetResult
linkTitle: setResult
description: Sets the future's result.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public void setResult​(I result) 
	throws java.lang.Exception
```

Sets the future's result.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| result | template type I | The future's result |

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
