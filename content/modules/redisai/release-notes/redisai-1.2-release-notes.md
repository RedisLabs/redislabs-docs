---
Title: RedisAI 1.2 release notes
linkTitle: v1.2 (November 2021)
description: Strings tensor support. Backend updates - TF 2.6, PyTorch 1.9, ONNXRuntime 1.9. Redis now manages ONNXRuntime memory.
min-version-db: 6.0.0
min-version-rs: 6.2.2
weight: 99
alwaysopen: false
toc: "true"
categories: ["Modules"]
---

## Requirements

RedisAI v1.2.7 requires:

- Minimum Redis compatibility version (database): 6.0.0
- Minimum Redis Enterprise Software version (cluster): 6.2.2

## 1.2.7 (June 2022)

This is a maintenance release for RedisAI 1.2.

Update urgency: `MODERATE`.

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor enhancements:

    - [#918](https://github.com/RedisAI/RedisAI/pull/918), [#924](https://github.com/RedisAI/RedisAI/pull/924) Add `AI.CONFIG GET` sub-command
    - [#914](https://github.com/RedisAI/RedisAI/pull/914), [#915](https://github.com/RedisAI/RedisAI/pull/915), [#917](https://github.com/RedisAI/RedisAI/pull/917) Backends update - TF 2.8, PyTorch 1.11, ONNXRuntime 1.11
    - [#904](https://github.com/RedisAI/RedisAI/pull/904) Enable saving model/script run statistics when run by a low-level API (by using RedisGears integration in particular) and retrieving the statistics with the `AI.INFO` command
    - [#897](https://github.com/RedisAI/RedisAI/pull/897) Restore support for MacOS build scripts
    - [#893](https://github.com/RedisAI/RedisAI/pull/893) Removed support for Linux Xenial

- Bug fixes:

    - [#923](https://github.com/RedisAI/RedisAI/pull/923) Fix a synchronization issue, regarding updates to the number of background threads, that rarely caused a crash upon executing models in ONNX

## 1.2.5 (November 2021)

Headlines:

- [#832](https://github.com/RedisAI/RedisAI/pull/832) Strings tensor support (TF and ONNXRUNTIME only).
- [#847](https://github.com/RedisAI/RedisAI/pull/847), [#806](https://github.com/RedisAI/RedisAI/pull/806) Backends update - TF 2.6, PyTorch 1.9, ONNXRuntime 1.9
- [#827](https://github.com/RedisAI/RedisAI/pull/827) ONNXRuntime memory is now managed by Redis (Cloud readiness)

Bug fixes:

- [#829](https://github.com/RedisAI/RedisAI/pull/829) Remove deprecation warnings from deprecated commands on Redis logs.
- [#852](https://github.com/RedisAI/RedisAI/pull/852) Fixed invalid deletion of outputs after execution error in TF
