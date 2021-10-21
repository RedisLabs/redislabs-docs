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
| name         | string           | Suffix name, unique, and represents its zone (read-only) |
| mdns         | boolean          | Support for Multicast DNS (read-only) |
| internal     | boolean          | Does the Suffix point to internal ip addresses (read-only) |
| default      | boolean          | Suffix is default suffix for the cluster (read-only) |
| use_aaaa_ns  | boolean          | Suffix uses AAAA NS entries (read-only) |
| slaves       | array of string  | Frontend DNS servers to be updated by this suffix |