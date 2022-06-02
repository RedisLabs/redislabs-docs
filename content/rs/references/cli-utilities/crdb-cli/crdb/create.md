---
Title: crdb-cli crdb create
linkTitle: create
description: Create an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb create` creates an Active-Active database.

```sh
crdb-cli crdb create --name <name> /
--memory-size <maximum_memory> --port <port_number> /
--instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
--instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
[--no-wait] /
[--db-config-json <file_content>] /
[--db-config-json-file <filename>] /
[--compression (0-6)] /
[--causal-consistency true] /
[--password <password>] /
[--replication true] /
[--encryption true] /
[--sharding false] /
[-- shards-count <number_of_shards>] /
[--shard-key-regex <regex_rule>] /
[--oss-sharding BOOLEAN] /
[--oss-cluster true]
[--bigstore true]
[--bigstore-ram-size <maximum_memory>]
[--with-module name=<module_name>,version=<module_version>,args=<module_args>]
```

### Prerequisites

Before you create an Active-Active database, you must have:

- At least two participating clusters
- [Network connectivity]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) between the participating clusters

### Parameters

| Parameter                                                                     | Value                                           | Description                                                                                                                                                                                                                  |
|-------------------------------------------------------------------------------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name \<CRDB_name\>                                                           | string                                          | Name of the Active-Active database (required)                                                                                                                                                                                |
| memory-size \<size\>                                                         | size in bytes, kilobytes (KB) or gigabytes (GB) | Maximum database memory (required)                                                                                                                                                                                           |
| port \<port_number\>                                                         | integer                                         | TCP port for the Active-Active database on all participating clusters (required)                                                                                                                                             |
| instance fqdn=\<cluster_fqdn\>,username=\<username\>,password=\<password\> | strings                                         | The connection information for the participating clusters (required for each participating cluster)                                                                                                                          |
| no-wait                                                                       |                                                 | Prevents CRDB-CLI from running another command before this command finishes                                                                                                                                                  |
| compression                                                                   | 0-6                                             | The level of data compression: 0=Compression disabled <br> <br/> 6=High compression and resource load (Default: 3)                                                                                                                 |
| causal-consistency                                                            | true <br> <br/> **false**                         | [Causal consistency]({{< relref "/rs/administering/database-operations/causal-consistency-crdb.md" >}}) applies updates to all instances in the order they were received                                                     |
| password \<password\>                                                        | string                                          | Password for access to the database                                                                                                                                                                                          |
| replication                                                                   | **true** <br> <br/> false                         | Activates or deactivates [database replication]({{< relref "/rs/concepts/high-availability/replication.md" >}}) where every master shard replicates to a replica shard                                                                        |
| encryption                                                                    | true <br> <br/> **false**                         | Activates or deactivates encryption                                                                                                                                                                                                            |
| sharding                                                                      | true <br> <br/> **false**                         | Activates or deactivates sharding (also known as [database clustering]({{< relref "/rs/concepts/high-availability/replication.md" >}})) so that there is only one shard for the database                                        |
| shards-count \<number\>                                                      | integer                                         | If sharding is enabled, this specifies the number of Redis shards for each database instance                                                                                                                                 |
| shard-key-regex \<regex_rule\>                                               | string                                          | If clustering is enabled, this defines a regex rule (also known as a [hashing policy]({{< relref "/rs/concepts/high-availability/clustering#custom-hashing-policy" >}}) that determines which keys are located in each shard |
| --with-module name=\<module_name\>,version=\<module_version\>,args=\<module_args\> | strings | Creates a database with a specific module |


### Returns

Returns the task number of the task that is creating the database. If --no-wait is specified, the command exits. Otherwise, it will wait for the database to be created and then return the CRDB GUID.

### Example

```sh
$ crdb-cli crdb create --name database1 --memory-size 1GB --port 12000 \
           --instance fqdn=cluster1.redis.local,username=admin@redis.local,password=admin \
           --instance fqdn=cluster2.redis.local,username=admin@redis.local,password=admin \
Task 633aaea3-97ee-4bcb-af39-a9cb25d7d4da created
  ---> Status changed: queued -> started
  ---> CRDB GUID Assigned: crdb:d84f6fe4-5bb7-49d2-a188-8900e09c6f66
  ---> Status changed: started -> finished
```
