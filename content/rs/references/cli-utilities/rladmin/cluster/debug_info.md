---
Title: rladmin cluster debug_info
linkTitle: debug_info
description: Creates a support package.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

`rladmin cluster debug_info` downloads a support package to the specified path. If you do not specify a path, it downloads the package to the default path specified in the cluster configuration file.

```sh
rladmin cluster debug_info [ path <path> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| path | filepath | Specifies the location where the support package should download |

### Returns

Reports the progress of the support package download.

### Example

```sh
$ rladmin command x
response
```
