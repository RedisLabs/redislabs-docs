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
--memory-size <maximum_memory> /
--instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
--instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
[--port <port_number>] /
[--no-wait] /
[--default-db-config <configuration>] /
[--default-db-config-file <filename>] /
[--compression (0-6)] /
[--causal-consistency { true | false } ] /
[--password <password>] /
[--replication { true | false } ] /
[--encryption { true | false } ] /
[--sharding { false | true } ] /
[--shards-count <number_of_shards>] /
[--shard-key-regex <regex_rule>] /
[--oss-sharding { true | false } ] /
[--oss-cluster { true | false } ] /
[--bigstore { true | false }]
[--bigstore-ram-size <maximum_memory>]
[--with-module name=<module_name>,version=<module_version>,args=<module_args>]
```

### Prerequisites

Before you create an Active-Active database, you must have:

- At least two participating clusters
- [Network connectivity]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) between the participating clusters

### Parameters


| Parameter                                                                             | Value                                           | Description                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name \<CRDB_name\>                                                                  | string                                          | Name of the Active-Active database (required)                                                                                                                                                                                |
| memory-size \<maximum_memory\>                                                                | size in bytes, kilobytes (KB) or gigabytes (GB) | Maximum database memory (required)                                                                                                                                                                                           |
| instance fqdn=\<cluster_fqdn\>,username=\<username\>,password=\<password\>         | strings                                         | The connection information for the participating clusters (required for each participating cluster)                                                                                                                          |
| port \<port_number\>                                                                 | integer                                         | TCP port for the Active-Active database on all participating clusters                                                                                                                                                        |
| default-db-config \<configuration\>                                                  | string                                          | Default database configuration options                                                                                                                                                                                       |
| default-db-config-file \<filename\>                                                  | filepath                                        | Default database configuration options from a file                                                                                                                                                                           |
| no-wait                                                                               |                                                 | Prevents CRDB-CLI from running another command before this command finishes                                                                                                                                                  |
| compression                                                                           | 0-6                                             | The level of data compression: 0=Compression disabled <br> <br> 6=High compression and resource load (Default: 3)                                                                                                            |
| causal-consistency                                                                    | true <br> <br> **false**                        | [Causal consistency]({{< relref "/rs/administering/database-operations/causal-consistency-crdb.md" >}}) applies updates to all instances in the order they were received                                                     |
| password \<password\>                                                                | string                                          | Password for access to the database                                                                                                                                                                                          |
| replication                                                                           | **true** <br> <br> false                        | Activates or deactivates [database replication]({{< relref "/rs/concepts/high-availability/replication.md" >}}) where every master shard replicates to a replica shard                                                       |
| encryption                                                                            | true <br> <br> **false**                        | Activates or deactivates encryption                                                                                                                                                                                          |
| sharding                                                                              | true <br> <br> **false**                        | Activates or deactivates sharding (also known as [database clustering]({{< relref "/rs/concepts/high-availability/replication.md" >}})) so that there is only one shard for the database                                     |
| shards-count \<number_of_shards\>                                                              | integer                                         | If sharding is enabled, this specifies the number of Redis shards for each database instance                                                                                                                                 |
| oss-sharding                                                                          | true<br>**false**                               | Use OSS sharding policy instead of regex rules                                                                                                                                                                               |
| oss-cluster                                                                           | true<br>**false**                               | Activates [OSS cluster API]({{< relref "/rs/administering/designing-production/networking/using-oss-cluster-api" >}})                                                                                                                                |
| shard-key-regex \<regex_rule\>                                                       | string                                          | If clustering is enabled, this defines a regex rule (also known as a [hashing policy]({{< relref "/rs/concepts/high-availability/clustering#custom-hashing-policy" >}}) that determines which keys are located in each shard |
| bigstore                                                                              | true <br> <br> **false**                        | If true, the database uses Reids on Flash to add Flash memory to the database                                                                                                                                                |
| bigstore-ram-size \<size\>                                                           | size in bytes, kilobytes (KB) or gigabytes (GB) | Maximum RAM limit for the Redis on Flash database                                                                                                                                                                            |
| --with-module name=\<module_name\>,version=\<module_version\>,args=\<module_args\> | strings                                         | Creates a database with a specific module                                                                                                                                                                                    |
| eviction-policy                                                     | noeviction<br>allkeys-lru<br>allkeys-lfu<br>allkeys-random<br>volatile-lru<br>volatile-lfu<br>volatile-random<br>volatile-ttl | Sets [Eviction policy]({{< relref "/rs/databases/configure/eviction-policy" >}})                                                                                                          |
| proxy-policy                                                                          | all-nodes<br>all-master-shards<br>single        | Sets Proxy policy |



### Returns

Returns the task ID of the task that is creating the database. If --no-wait is specified, the command exits. Otherwise, it will wait for the database to be created and then return the CRDB GUID.

### Example

```sh
$ crdb-cli crdb create --name database1 --memory-size 1GB --port 12000 \
           --instance fqdn=cluster1.redis.local,username=admin@redis.local,password=admin \
           --instance fqdn=cluster2.redis.local,username=admin@redis.local,password=admin
Task 633aaea3-97ee-4bcb-af39-a9cb25d7d4da created
  ---> Status changed: queued -> started
  ---> CRDB GUID Assigned: crdb:d84f6fe4-5bb7-49d2-a188-8900e09c6f66
  ---> Status changed: started -> finished
```
