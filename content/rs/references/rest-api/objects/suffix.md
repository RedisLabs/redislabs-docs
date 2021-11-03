---
Title: Suffix object
linkTitle: suffix
description: An object that represents a DNS suffix
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a DNS suffix in the cluster.

| Name | Type/Value | Description |
|------|------------|-------------|
| default | boolean | Suffix is the default suffix for the cluster (read-only) |
| internal | boolean | Does the suffix point to internal IP addresses (read-only) |
| mdns | boolean | Support for multicast DNS (read-only) |
| name | string | Unique suffix name that represents its zone (read-only) |
| slaves | array of strings | Frontend DNS servers to be updated by this suffix |
| use_aaaa_ns | boolean | Suffix uses AAAA NS entries (read-only) |