---
Title: RedisAI 1.2 release notes
linkTitle: v1.2 (November 2021)
description: Strings tensor support. Backend updates - TF 2.6, PyTorch 1.9, ONNXRuntime 1.9. Redis now manages ONNXRuntime memory.
weight: 99
alwaysopen: false
categories: ["Modules"]
---

## 1.2.5 (November 2021)

Headlines:

- [#832](https://github.com/RedisAI/RedisAI/pull/832) Strings tensor support (TF and ONNXRUNTIME only).
- [#847](https://github.com/RedisAI/RedisAI/pull/847), [#806](https://github.com/RedisAI/RedisAI/pull/806) Backends update - TF 2.6, PyTorch 1.9, ONNXRuntime 1.9
- [#827](https://github.com/RedisAI/RedisAI/pull/827) ONNXRuntime memory is now managed by Redis (Cloud readiness)

Bug fixes:

- [#829](https://github.com/RedisAI/RedisAI/pull/829) Remove deprecation warnings from deprecated commands on Redis logs.
- [#852](https://github.com/RedisAI/RedisAI/pull/852) Fixed invalid deletion of outputs after execution error in TF
