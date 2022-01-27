---
Title: CallNext
linkTitle: callNext
description: Calls the next execution that overrides the command or the original command itself. A more flexible version of callNextArray.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static java.lang.Object callNext(java.lang.String... args)
```

When you override a Redis command with the [`CommandOverrider`]({{<relref "/modules/redisgears/jvm/classes/readers/commandoverrider">}}), use `callNext` to run the next execution that overrides the command or the original command itself.

It is a more flexible version of [`callNextArray`]({{<relref "/modules/redisgears/jvm/classes/gearsbuilder/callNextArray">}}) since the list of string arguments does not have to be an explicit `String[]` object. This allows function calls like: `callNext("key", "value")`.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| args | string | Redis command arguments |

## Returns

Returns the command result. It could be a string or an array of strings, depending on the command.

## Example

Without `String[]`:

```java
GearsBuilder.callNext("restaurant:1", "reviews", "50");
```

With `String[]`:

```java
GearsBuilder.callNext(new String[]{"restaurant:1", "reviews", "50"});
```
