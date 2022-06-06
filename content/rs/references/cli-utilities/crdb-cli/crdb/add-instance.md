---
Title: crdb-cli crdb add-instance
linkTitle: add-instance
description: Adds a peer replica to an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb add-instance` adds a peer replica to an Active-Active database.

```sh
crdb-cli crdb add-instance --crdb_guid <guid> /
                    --instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
                    [ --compression 0-6 ]
                    [ --no-wait ]
```

### Parameters

| Parameter                                                                     | Value   | Description                                                                                                       |
|-------------------------------------------------------------------------------|---------|-------------------------------------------------------------------------------------------------------------------|
| crdb_guid \<\guid\>                                                           | string  | The GUID of the database (required)                                                                               |
| instance fqdn=\<\cluster_fqdn\>,username=\<\username\>,password=\<\password\> | strings | The connection information for the new participating cluster (required)                |
| compression                                                                   | 0-6     | The level of data compression: 0=Compression disabled <br> <br> 6=High compression and resource load (Default: 3) |
| no-wait                                                                       |         | Does not wait for the task to complete                                                                            |

### Returns

Returns the task ID of the task that is adding the new instance. If --no-wait is specified, the command exits. Otherwise, it will wait for the instance to be added and return `finished`.

### Example

```sh
$ crdb-cli crdb add-instance --crdb-guid db6365b5-8aca-4055-95d8-7eb0105c0b35 --instance fqdn=north.rlabs.org,username=admin@rlabs.org,password=admin
Task f809fae7-8e26-4c8f-9955-b74dbbd47949 created
  ---> Status changed: queued -> started
  ---> Status changed: started -> finished
```
