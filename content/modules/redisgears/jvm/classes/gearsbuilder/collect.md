---
Title: Collect
linkTitle: collect
description: Collects all the records to the shard that started the execution.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public GearsBuilder<T> collect()
```

Collects all the records to the shard that started the execution.

## Parameters
 
None

## Returns

GearsBuilder with the same template type as the input builder, notice that the return object might be the same as the previous.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).collect();
```