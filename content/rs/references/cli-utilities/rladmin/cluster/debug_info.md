---
Title: rladmin cluster debug_info
linkTitle: debug_info
description: Creates a support package.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
tags: ["configured"]
categories: ["RS"]
aliases: 
---

Downloads a support package to the specified path. If you do not specify a path, it downloads the package to the default path specified in the cluster configuration file.

```sh
rladmin cluster debug_info
        [ node <ID> ]
        [ path <path> ]
        [ sanitized ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| node | integer | Downloads a support package for the specified node |
| path | filepath | Specifies the location where the support package should download |
| sanitized | | Removes sensitive data (passwords, certificates, etc.) from the support package |

### Returns

Reports the progress of the support package download.

### Example

```sh
$ rladmin cluster debug_info node 1 sanitized
Preparing the debug info files package
Downloading...
[==================================================]
Downloading complete. File /tmp/debuginfo.20220511-215637.node-1.tar.gz is saved.
```
