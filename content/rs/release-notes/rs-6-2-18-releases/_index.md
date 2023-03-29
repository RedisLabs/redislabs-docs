---
Title: Redis Enterprise Software release notes 6.2.18
linkTitle: 6.2.18 releases
description: Database auditing. Private key encryption. Active-Active database support for MEMORY USAGE command.
compatibleOSSVersion: Redis 6.2.6
weight: 73
alwaysopen: false
toc: "true"
categories: ["RS"]
---

[Redis Enterprise Software version 6.2.18](https://redislabs.com/redis-enterprise-software/download-center/software/) is now available! 

This version of Redis Enterprise Software offers:

- RedisJSON on Active-Active General Availability 
- Database connection auditing
- Private key encryption
- Active-Active support for `memory usage` command
- `crdb-cli` improvements
- Compatibility with open source Redis v6.2.6
- Additional enhancements and fixes

## Detailed release notes

For more detailed release notes, select a build version from the following table:

{{<table-children columnNames="Version&nbsp;(Release&nbsp;date)&nbsp;,Major changes,OSS&nbsp;Redis compatibility" columnSources="LinkTitle,Description,compatibleOSSVersion" enableLinks="LinkTitle">}}

## Known upgrade limitations

Before you upgrade a cluster that hosts Active-Active databases with modules to v6.2.18, perform the following steps:

1. Use `crdb-cli` to verify that the modules (`modules`) and their versions (in `module_list`) are as they appear in the database configuration and in the default database configuration:

    ```sh
    crdb-cli crdb get --crdb-guid <crdb-guid>
    ```

1. From the admin console's **redis modules** tab, validate that these modules with their specific versions are loaded to the cluster.

1. If one or more of the modules/versions are missing or if you need help, [contact Redis support](https://redis.com/company/support/) before taking additional steps.
