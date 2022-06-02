---
Title: crdb-cli crdb update
linkTitle: update
description: Updates the configuration of an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb update` changes the configuration of an Active-Active database.

```sh
crdb-cli crdb update --crdb-guid <guid> /
[--no-wait] [--force] /
[--db-config-json <file_content>] /
[--db-config-json-file <filename>] /
[--compression (0-6)] /
[--causal-consistency { true | false } ] /
[--password <password>] /
[--encryption { true | false } ] /
[--oss-cluster { true | false } ]
[--bigstore-ram-size <maximum_memory>]
```


### Parameters

| Parameter                          | Value                                           | Description                                                                                                                                                              |
|------------------------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| crdb-guid \<\guid\>                | string                                          | GUID of the Active-Active database (required)                                                                                                                            |
| db-config-json \<\file_content\>   | JSON value                                      |                                                                                                                                                                          |
| db-config-json-file \<\filename\>  | filepath                                        |                                                                                                                                                                          |
| no-wait                            |                                                 | Prevents CRDB-CLI from running another command before this command finishes                                                                                              |
| compression                        | 0-6                                             | The level of data compression: 0=Compression disabled <br> <br> 6=High compression and resource load (Default: 3)                                                        |
| causal-consistency                 | true <br> <br>false                             | [Causal consistency]({{< relref "/rs/administering/database-operations/causal-consistency-crdb.md" >}}) applies updates to all instances in the order they were received |
| password \<\password\>             | string                                          | Updates the password for access to the database                                                                                                                          |
| encryption                         | true <br> <br>false                             | Activates or deactivates encryption                                                                                                                                      |
| oss-cluster                        | true <br> <br>false                             | Activates or deactivates OSS Cluster mode                                                                                                                                |
| bigstore-ram-size                  | size in bytes, kilobytes (KB) or gigabytes (GB) | Maximum RAM limit for the Redis on Flash database, if activated                                                                                                          |
| force                              |                                                 | Increase the configuration version even if there are no changes                                                                                                          |

### Returns



### Example

```sh

```
