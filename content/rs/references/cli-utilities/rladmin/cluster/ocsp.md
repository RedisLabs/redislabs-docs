---
Title: rladmin cluster ocsp
linkTitle: ocsp
description: Manage OCSP.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
tags: ["configured"]
categories: ["RS"]
aliases: 
---

Use the `rladmin cluster ocsp` commands to manage OCSP configuration and verify the status of a server certificate maintained by a third-party [certificate authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority).

## `ocsp certificate_compatible`

Checks if the proxy certificate contains an OCSP URI. Returns the OCSP URI if it exists.

```sh
rladmin cluster ocsp certificate_compatible
```

### Parameters

### Returns

### Example

```sh
$ rladmin
```

## `ocsp config`

Displays or updates OCSP configuration. Run the command without the `set` option to display the current configuration of a parameter.

```sh
rladmin cluster ocsp config <OCSP parameter>
        [set <value>]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|---------------|-------------|
| ocsp_functionality | enabled<br></br>disabled | Enables or turns off OCSP for the cluster |
| query_frequency | integer <nobr>(range: 60-86400)</nobr> <nobr>(default: 3600)</nobr> | The time interval in seconds between OCSP queries to check the certificate's status |
| recovery_frequency | integer <nobr>(range: 60-86400)</nobr> <nobr>(default: 60)</nobr> | The time interval in seconds between retries after a failed query |
| recovery_max_tries | integer <nobr>(range: 1-100)</nobr> <nobr>(default: 5)</nobr> | The number of retries before the validation query fails and invalidates the certificate |
| responder_url | string | The OCSP server URL embedded in the proxy certificate (you cannot manually set this parameter) |
| response_timeout | integer <nobr>(range: 1-60)</nobr> <nobr>(default: 1)</nobr> | The time interval in seconds to wait for a response before timing out |

### Returns

### Example

```sh
$ rladmin
```

## `ocsp status`

Returns the latest cached status of the certificate's OCSP response.

```sh
rladmin cluster ocsp status
```
### Parameters

### Returns

### Example

```sh
$ rladmin
```

## `ocsp test_certificate`

Queries the OCSP server for the certificate's latest status, then caches and displays the response.

```sh
rladmin cluster ocsp test_certificate
```

### Parameters

### Returns

### Example

```sh
$ rladmin
```
