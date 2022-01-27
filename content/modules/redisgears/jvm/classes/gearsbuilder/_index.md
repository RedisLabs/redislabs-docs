---
Title: GearsBuilder
linkTitle: GearsBuilder
description: Creates a RedisGears pipeline of operations to transform data.
weight: 60
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

The `GearsBuilder` class allows you to create a pipeline of RedisGears functions that transform data.

It requires a reader to supply data to the pipe.

To create a `GearsBuilder` object, follow this example code:

```java
BaseReader reader = ...; // Initialize the reader
builder = GearsBuilder.CreateGearsBuilder(reader);
```

## Functions

{{<table-children columnNames="Function,Description" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}