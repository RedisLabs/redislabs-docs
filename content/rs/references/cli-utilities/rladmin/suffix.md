---
Title: rladmin suffix
linkTitle: suffix
description: Manages the DNS suffixes in the cluster.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin suffix` manages the DNS suffixes in the cluster.

## `suffix add`

Adds a DNS suffix to the cluster.

``` sh
rladmin suffix add name <name>
                    [default]
                    [internal]
                    [mdns]
                    [use_aaaa_ns]
                    [slaves <ip>..]
```

### Parameters

| Parameter | Type/Value       | Description                                                                                   |
|-----------|------------------|-----------------------------------------------------------------------------------------------|
| name      | string           | DNS suffix to add to the cluster                                                             |
| default   |                  | Sets the given suffix as default. If there is already a default set, this will overwrite it.  |
| internal  |                  | Forces the given suffix to use private IPs                                                    |
| mdns      |                  | Activates multicast DNS support for the given suffix                                           |
| slaves    | list of IPv4 addresses | The given suffix will notify the frontend DNS servers when a change in frontend DNS has occurred |
| use_aaaa_ns |                | Activates IPv6 address support |

### Returns

Returns `Added suffixes successfully` if the suffix was added. Otherwise, it returns an error.

### Example

``` sh
$ rladmin suffix add name new.rediscluster.local
Added suffixes successfully
```

## `suffix delete`

Deletes an existing DNS suffix from the cluster.

``` sh
rladmin suffix delete name <name>
```

### Parameters

| Parameter | Type/Value       | Description                                                                                   |
|-----------|------------------|-----------------------------------------------------------------------------------------------|
| name      | string           | DNS suffix to delete from the cluster                                                         |

### Returns

Returns `Suffix deleted successfully` if the suffix was deleted. Otherwise, it returns an error.

### Example

``` sh
$ rladmin suffix delete name new.rediscluster.local
Suffix deleted successfully
```

## `suffix list`

Lists the DNS suffixes in the cluster.

```sh
rladmin suffix list
```

### Parameters

None.

### Returns

Returns a list of the DNS suffixes.

### Example

``` sh
$ rladmin suffix list
List of all suffixes:
cluster.local
new.rediscluster.local
```
