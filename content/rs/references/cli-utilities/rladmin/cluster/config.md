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
        [ cipher_suites <BoringSSL cipher list> ]
        [ cm_port <number> ]
        [ cm_session_timeout <minutes> ]
        [ cnm_http_port <number> ]
        [ cnm_https_port <number>]
        [ data_cipher_list <openSSL cipher list> ]
        [ debuginfo_path <path/to/directory> ]
        [ handle_redirects { enabled | disabled } ]
        [ http_support { enabled | disabled } ]
        [ ipv6 { enabled | disabled } ]
        [ min_control_TLS_version <control_tls_version>]
        [ min_data_TLS_version <data_tls_version> ]
        [ min_sentinel_TLS_version <sentinel_tls_version> ]
        [ s3_url <URL> ]
        [ saslauthd_ldap_conf </tmp/ldap.conf> ]
        [ sentinel_ssl_policy { allowed | required | disabled} ]
        [ sentinel_cipher_suites <golang cipher list>]
        [ services { cm_server | crdb_coordinator | crdb_worker | mdns_server | pdns_server | saslauthd | stats_archiver } { enabled | disabled } ]
        [ upgrade_mode { enabled | disabled } ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| cipher_suites | | Cipher suites used for TLS connections to the admin console; specified in the format understood by the BoringSSL library |
| cm_port | integer | UI server listening port |
| cm_session_timeout | integer | Timeout in minutes for the CM session
| cmn_http_port | integer | HTTP REST API server listening port |
| cnm_https_port | integer | HTTPS REST API server listening port |
| data_cipher_list | | Cipher suites used by the the data plane; specified in the format understood by the OpenSSL library |
| debuginfo_path | | Path to local directory to place file when generating support packages |
| handle_redirects | 'enabled'<br />'disabled' | Enable or disable handling DNS redirects when DNS is not configured and running behind a load balancer |
| http_support | 'enabled'<br />'disabled' | Enable or disable using HTTP for REST API connections (info cluster) |
| ipv6 | 'enabled'<br />'disabled' | Enable or disable IPv6 connections to the RS admin console |
| min_control_TLS_version | | The minimum version of TLS protocol which is supported at the control path |
| min_data_TLS_version | | The minimum version of TLS protocol which is supported at the data path |
| min_sentinel_TLS_version | | |
| s3_url | | The URL of S3 export and import |
| saslauthd_ldap_conf | | Updates LDAP authentication configuration for the cluster (see Cluster-based LDAP Authentication or Kubernetes LDAP configuration) |
| sentinel_cipher_suites | | Cipher suites used by the sentinel service (supported ciphers are implemented by the golang.org cipher suites package) |
| sentinel_ssl_policy | 'allowed'<br />'required'<br />'disabled' | Define SSL policy for the Discovery Service: required/disabled/allowed |
| services | 'cm_server'<br />'crdb_coordinator'<br />'crdb_worker'<br />'mdns_server'<br />'pdns_server'<br />'saslauthd'<br />'stats_archiver'<br /><br />'enabled'<br />'disabled' | |
| upgrade_mode | 'enabled'<br />'disabled' | |


### Returns

### Example

```sh
$ rladmin command x
response
```
