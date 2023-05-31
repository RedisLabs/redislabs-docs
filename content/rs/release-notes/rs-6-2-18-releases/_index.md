---
Title: Redis Enterprise Software release notes 6.2.18
linkTitle: 6.2.18 releases
description: Database auditing. Private key encryption. Active-Active database support for MEMORY USAGE command.
compatibleOSSVersion: Redis 6.2.6
weight: 73
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
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

## Deprecations

### Active-Active database persistence

The snapshot option for [data persistence on Active-Active databases](https://docs.redis.com/latest/rs/databases/active-active/manage/#data-persistence) will be deprecated in a future version of Redis Enterprise Software. If you have an Active-Active database using snapshot persistence, switch to AOF persistence. Use `crdb-cli` to do so:
```text
crdb-cli crdb update --crdb-guid <CRDB_GUID> --default-db-config '{"data_persistence": "aof", "aof_policy":"appendfsync-every-sec"}'
```

### TLS 1.0 and TLS 1.1 

TLS 1.0 and TLS 1.1 connections are considered deprecated in favor of TLS 1.2 or later.  

Please verify that all clients, apps, and connections support TLS 1.2.  Support for the earlier protocols will be removed in a future release.

Certain operating systems, such as RHEL 8, have removed support for the earlier protocols. Redis Enterprise Software does not support connection protocols that are not supported by the underlying operating system.

### 3DES encryption cipher

The 3DES encryption cipher is considered deprecated in favor of stronger ciphers like AES.

Please verify that all clients, apps, and connections support the AES cipher. Support for 3DES will be removed in a future release.

Certain operating systems, such as RHEL 8, have already removed support for 3DES. Redis Enterprise Software cannot support cipher suites that are not supported by the underlying operating system.

## Known limitations
    
### Feature limitations

- RS54131 Running the `QUIT` command on a TLS connected database closes connection and does not return a `+OK` reply

- An intermittent issue can occur where a CRDB process becomes stuck in a restart loop. If this issue occurs while upgrading to Redis Enterprise Software version 6.2.18, please upgrade to the latest version [6.4.2-69]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-69">}}) or [contact support](https://redis.com/company/support/).

- RS40641 - API requests are redirected to an internal IP in case the request arrives from a node which is not the master. To avoid this issue, use [`rladmin cluster config`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}}) to configure `handle_redirects` or `handle_metrics_redirects`.

- RS62986 - When upgrading from version 6.0.x to 6.2.x, you must restart `cnm_exec`.

### Upgrade limitations

Before you upgrade a cluster that hosts Active-Active databases with modules to v6.2.18, perform the following steps:

1. Use `crdb-cli` to verify that the modules (`modules`) and their versions (in `module_list`) are as they appear in the database configuration and in the default database configuration:

    ```sh
    crdb-cli crdb get --crdb-guid <crdb-guid>
    ```

1. From the admin console's **redis modules** tab, validate that these modules with their specific versions are loaded to the cluster.

1. If one or more of the modules/versions are missing or if you need help, [contact Redis support](https://redis.com/company/support/) before taking additional steps.
