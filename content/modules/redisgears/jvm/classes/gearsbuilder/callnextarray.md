---
Title: CallNextArray
linkTitle: callNextArray
description: Calls the next execution that overrides the command or the original command itself.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static native java.lang.Object callNextArray(java.lang.String[] command)
```

When you override a Redis command with the [`CommandOverrider`]({{<relref "/modules/redisgears/jvm/classes/readers/commandoverrider">}}), use `callNextArray` to run the next execution that overrides the command or the original command itself.

It accepts an array of strings, which represents the command arguments.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| args | array of strings | Redis command arguments |

## Returns

Returns the command result. It could be a string or an array of strings, depending on the command.

## Example

```java
GearsBuilder.callNextArray(new String[]{"restaurant:1", "reviews", "50"});
```