---
Title: Run
linkTitle: run
description: Runs the pipeline of functions immediately.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public void run​(boolean jsonSerialize, boolean collect)
```

Runs the pipeline of functions immediately upon execution. It will only run once.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| jsonSerialize | boolean | Indicate whether or not to serialize the results to JSON before returning them |
| collect | boolean | Indicate whether or not to collect the results from the entire cluster before returning them |

## Returns

None

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).run();
```