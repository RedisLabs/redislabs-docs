---
Title: ExecuteArray
linkTitle: executeArray
description: Runs a Redis command.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static native java.lang.Object executeArray(
    java.lang.String[] command)
```

Runs a Redis command. It accepts an array of strings, which represents the command to execute.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| command | array of strings | A Redis command |

## Returns

Returns the command result. It could be a string or an array of strings, depending on the command.

## Example

```java
GearsBuilder.executeArray(new String[]{"SET", "age:maximum", "100"});
```