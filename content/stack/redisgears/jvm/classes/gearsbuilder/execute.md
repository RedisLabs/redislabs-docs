---
Title: Execute
linkTitle: execute
description: Runs a Redis command. A more flexible version of executeArray.
weight: 50
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisgears/jvm/classes/gearsbuilder/execute/
---

```java
public static java.lang.Object execute​(java.lang.String... command)
```

Runs a Redis command, similar to [`executeArray`]({{<relref "/stack/redisgears/jvm/classes/gearsbuilder/executeArray">}}). However, the `execute` function is more flexible. Unlike `executeArray`, the list of string arguments does not have to be an explicit `String[]` object. It allows function calls like this: <nobr>`execute("SET", "key", "value")`.</nobr>

## Parameters

| Name | Type | Description |
|------|------|-------------|
| command | string | A Redis command |

## Returns

Returns the command result. It could be a string or an array of strings, depending on the command.

## Examples

Without `String[]`:

```java
GearsBuilder.execute("SET", "age:maximum", "100");
```

With `String[]`:

```java
GearsBuilder.execute(new String[]{"SET", "age:maximum", "100"});
```
