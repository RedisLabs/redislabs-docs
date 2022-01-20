---
Title: Execute
linkTitle: execute
description: Runs a Redis command.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static java.lang.Object execute​(java.lang.String... command)
```

Runs a Redis command.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| command | string | A Redis command |

## Returns

Returns the command result. It could be a string or an array of strings, depending on the command.

## Example

```java
GearsBuilder.execute("SET", "age:maximum", "100");
```