---
Title: rladmin cluster config
linkTitle: config
description: Updates the cluster's configuration.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

`rladmin cluster config` updates the cluster configuration.

```sh
 rladmin cluster config 
        [ cipher_suites <BoringSSL_cipher_list> ]
        [ cm_port <number> ]
        [ cm_session_timeout <minutes> ]
        [ cnm_http_port <number> ]
        [ cnm_https_port <number>]
        [ data_cipher_list <data-cipher-suites-str> ]
        [ debuginfo_path <path/to/directory> ]
        [ handle_redirects <enabled/disabled>]
        [ http_support <enabled/disabled>]
        [ ipv6 <enabled/disabled> ]
        [ min_control_TLS_version <control_tls_version>]
        [ min_data_TLS_version <data_tls_version> ]
        [ min_sentinel_TLS_version <sentinel_tls_version> ]
        [ s3_url <url> ]
        [ saslauthd_ldap_conf </tmp/ldap.conf> ]
        [ sentinel_ssl_policy <allowed/required/disabled> ]
        [ data_cipher_list <openSSL_cipher_list> ]
        [ sentinel_cipher_suites <golang_cipher_list>]
        [ services <cm_server | crdb_coordinator | crdb_worker | mdns_server | pdns_server | saslauthd | stats_archiver> <enabled | disabled> ]
        [ upgrade_mode < enabled | disabled> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| param1 | Description |
| param2 | Description |

### Returns

### Example

```sh
$ rladmin command x
response
```
