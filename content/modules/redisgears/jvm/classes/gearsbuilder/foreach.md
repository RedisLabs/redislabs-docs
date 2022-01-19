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

Defines a set of operations to run for each record in the pipe.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| foreach | gears.operations.ForeachOperation<T> | The set of operations to run for each record |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

```java

```