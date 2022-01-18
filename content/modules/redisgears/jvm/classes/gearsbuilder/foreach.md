---
Title: Foreach
linkTitle: foreach
description: For each record in the pipe, run some operations.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public GearsBuilder<T> foreach​(
    gears.operations.ForeachOperation<T> foreach)
```

Use the foreach function to define a set of operations to run for each record in the pipe.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| foreach | gears.operations.ForeachOperation<T> | The foreach operation |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

```java

```