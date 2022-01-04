---
Title: GearsBuilder
linkTitle: GearsBuilder
description: Creates a RedisGears pipeline of operations to transform data.
weight: 60
alwaysopen: false
categories: ["Modules"]
---

A RedisGears pipe builder. The reader supplies data to the pipe, which then passes through a series of operations that transforms the data.

To create a `GearsBuilder` object, follow this example code:

```java
BaseReader reader = ...; // initialize the reader
builder = GearsBuilder.CreateGearsBuilder(reader);
```

## Functions

{{<table-children columnNames="Function,Description" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}