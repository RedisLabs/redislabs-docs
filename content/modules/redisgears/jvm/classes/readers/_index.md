---
Title: RedisGears readers
linkTitle: Readers
description: Extracts data from the database and creates records to pass through a RedisGears pipeline.
weight: 60
alwaysopen: false
categories: ["Modules"]
---

A reader extracts data from the database and creates records.

The [`GearsBuilder.CreateGearsBuilder(reader)`]({{<relref "/modules/redisgears/jvm/classes/gearsbuilder/creategearsbuilder">}}) function takes a reader as a parameter and passes the generated records through a pipeline of RedisGears functions.

## Classes

{{<table-children columnNames="Class,Description" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}