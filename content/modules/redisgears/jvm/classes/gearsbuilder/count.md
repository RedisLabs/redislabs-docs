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

Counts the number of records in the pipe and returns the total as a single record.

## Parameters
 
None

## Returns

Returns a GearsBuilder object with a new template type (Integer).

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).count();
```