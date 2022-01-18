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

Runs the pipeline of functions immediately upon execution.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| jsonSerialize | boolean | Indicate whether or not to serialize the results to json before returning them |
| collect | boolean | Indicate whether or not to collect the results from all the cluster before returning them |

## Returns

None

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).run();
```