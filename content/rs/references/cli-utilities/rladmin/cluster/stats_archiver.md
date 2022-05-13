---
Title: rladmin cluster stats_archiver
linkTitle: stats_archiver
description: Enables/deactivates the stats archiver.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
tags: ["configured"]
categories: ["RS"]
aliases: 
---

Enables or deactivates the stats archiver, which logs statistics in CSV (comma-separated values) format.

```sh
rladmin cluster stats_archiver { enabled | disabled }
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| enabled | Turn on the stats archiver |
| disabled | Turn off the stats archiver |

### Returns

Returns the updated status of the stats archiver. 

### Example

```sh
$ rladmin cluster stats_archiver enabled 
Status: enabled
```