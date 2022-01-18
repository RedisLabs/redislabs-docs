---
Title: Count
linkTitle: count
description: Counts the number of records in the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public GearsBuilder<java.lang.Integer> count()
```

Add a count operation to the pipe. The operation returns a single record that represents the number of records in the pipe.

## Parameters
 
None

## Returns

Returns a GearsBuilder object with a new template type (Integer). The return object might be the same as the previous.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).count();
```