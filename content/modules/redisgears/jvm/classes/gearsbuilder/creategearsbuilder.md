---
Title: CreateGearsBuilder
linkTitle: CreateGearsBuilder
description: Creates a new GearsBuilder object.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static <I extends java.io.Serializable> GearsBuilder<I> CreateGearsBuilder​(
    gears.readers.BaseReader<I> reader)

public static <I extends java.io.Serializable> GearsBuilder<I> CreateGearsBuilder​(
    gears.readers.BaseReader<I> reader, 
    java.lang.String desc)
```

Creates a new `GearsBuilder` object. Use this function instead of a `GearsBuilder` constructor to avoid type warnings.

## Parameters

Type Parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder. The reader determines the type. |

Parameters:

| Name | Type | Description |
|------|------|-------------|
| desc | string | The description |
| reader | BaseReader<I> | The pipe reader |

## Returns

Returns a new GearsBuilder object.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader);
```