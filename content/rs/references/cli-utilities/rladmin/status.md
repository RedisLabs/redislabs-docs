---
Title: rladmin status
linkTitle: status
description: Displays the current cluster status and topology information.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin status` displays the current cluster status and topology information.

## `status`

Displays the current status of all nodes, databases, database endpoints, and shards on the cluster.

``` sh
rladmin status
        [ extra <parameter> ]
        [ issues_only]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| extra     | Extra options that show more information |
| issues_only | Filters out all items that have an "OK" status  |

| Extra parameter | Description |
|-------------------|-------------|
| extra all | Shows all `extra` information |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra nodestats | Shows shards per node |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all databases in the cluster |
| extra state_machine | Shows execution of state machine information  |
| extra watchdog | Shows watchdog status  |

### Returns

Returns tables of the status of all nodes, databases, and database endpoints on the cluster.

If `issues_only` is specified, it only shows instances that do not have an "OK" status.

### Example

``` sh
$ rladmin status extra all
CLUSTER:
OK. Cluster master: 1 (198.51.100.2)
Cluster health: OK, [1, 0.13333333333333333, 0.03333333333333333]
failures/minute - avg1 1.00, avg15 0.13, avg60 0.03.

CLUSTER NODES:
NODE:ID ROLE   ADDRESS      EXTERNAL_ADDRESS HOSTNAME     MASTERS SLAVES OVERBOOKING_DEPTH SHARDS CORES FREE_RAM        PROVISIONAL_RAM VERSION   SHA    RACK-ID STATUS
node:1  master 198.51.100.2                  3d99db1fdf4b 4       0      10.91GB           4/100  6     14.91GB/19.54GB 10.91GB/16.02GB 6.2.12-37 5c2106 -       OK    
node:2  slave  198.51.100.3                  fc7a3d332458 0       0      11.4GB            0/100  6     14.91GB/19.54GB 11.4GB/16.02GB  6.2.12-37 5c2106 -       OK    
*node:3 slave  198.51.100.4                  b87cc06c830f 0       0      11.4GB            0/100  6     14.91GB/19.54GB 11.4GB/16.02GB  6.2.12-37 5c2106 -       OK    

DATABASES:
DB:ID NAME      TYPE  STATUS SHARDS PLACEMENT REPLICATION PERSISTENCE ENDPOINT                        EXEC_STATE EXEC_STATE_MACHINE BACKUP_PROGRESS MISSING_BACKUP_TIME REDIS_VERSION
db:3  database3 redis active 4      dense     disabled    disabled    redis-11103.cluster.local:11103 N/A        N/A                N/A             N/A                 6.0.16       

ENDPOINTS:
DB:ID     NAME             ID                    NODE       ROLE       SSL        WATCHDOG_STATUS          
db:3      database3        endpoint:3:1          node:1     single     No         OK                       

SHARDS:
DB:ID NAME      ID      NODE   ROLE   SLOTS       USED_MEMORY BACKUP_PROGRESS RAM_FRAG WATCHDOG_STATUS STATUS
db:3  database3 redis:4 node:1 master 0-4095      2.08MB      N/A             4.73MB   OK              OK    
db:3  database3 redis:5 node:1 master 4096-8191   2.08MB      N/A             4.62MB   OK              OK    
db:3  database3 redis:6 node:1 master 8192-12287  2.08MB      N/A             4.59MB   OK              OK    
db:3  database3 redis:7 node:1 master 12288-16383 2.08MB      N/A             4.66MB   OK              OK
```

## `status databases`

Displays the current status of all databases on the cluster.

``` sh
rladmin status databases
        [ extra <parameters> ]
        [ sort <column_titles> ]
        [ issues_only ]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| extra <parameter> | Extra options that show more information |
| sort <column_titles> | Sort results by specified column titles |
| issues_only | Filters out all items that have an "OK" status  |


| Extra parameter | Description |
|-------------------|-------------|
| extra all | Shows all `extra` information |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra nodestats | Shows shards per node |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all databases in the cluster |
| extra state_machine | Shows execution of state machine information  |
| extra watchdog | Shows watchdog status  |

### Returns

Returns a table of the status of all databases on the cluster.

If `sort <column_titles>` is specified, the result is sorted by the specified table columns.

If `issues_only` is specified, it only shows databases that do not have an "OK" status.

### Example

``` sh
$ rladmin status databases sort REPLICATION PERSISTENCE
DB:ID NAME      TYPE  STATUS SHARDS PLACEMENT REPLICATION PERSISTENCE ENDPOINT                                       
db:1  database1 redis active 1      dense     disabled    disabled    redis-10269.testdbd11169.localhost:10269
db:2  database2 redis active 1      dense     disabled    snapshot    redis-13897.testdbd11169.localhost:13897
db:3  database3 redis active 1      dense     enabled     snapshot    redis-19416.testdbd13186.localhost:19416
```

## `status endpoints`

Displays the current status of all endpoints on the cluster.

``` sh
rladmin status endpoints
        [ node <id> ]
        [ extra <parameters> ]
        [ sort <column_titles> ]
        [ issues_only ]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| extra <parameter> | Extra options that show more information |
| sort <column_titles> | Sort results by specified column titles |
| issues_only | Filters out all items that have an "OK" status  |


| Extra parameter | Description |
|-------------------|-------------|
| extra all | Shows all `extra` information |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra nodestats | Shows shards per node |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all endpoints in the cluster |
| extra state_machine | Shows execution of state machine information  |
| extra watchdog | Shows watchdog status  |

### Returns

Returns a table of the status of all endpoints on the cluster.

If `sort <column_titles>` is specified, the result is sorted by the specified table columns.

If `issues_only` is specified, it only shows endpoints that do not have an "OK" status.

### Example

``` sh
$ rladmin status endpoints
DB:ID     NAME             ID                    NODE        ROLE        SSL    
db:1      database1        endpoint:1:1          node:1      single      No     
db:2      database2        endpoint:2:1          node:2      single      No     
db:3      database3        endpoint:3:1          node:3      single      No
```

## `status nodes`

Displays the current status of all nodes on the cluster.

``` sh
rladmin status nodes
        [ extra <parameters> ]
        [ sort <column_titles> ]
        [ issues_only ]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| extra <parameter> | Extra options that show more information |
| sort <column_titles> | Sort results by specified column titles |
| issues_only | Filters out all items that have an "OK" status  |


| Extra parameter | Description |
|-------------------|-------------|
| extra all | Shows all `extra` information |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra nodestats | Shows shards per node |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all nodes in the cluster |
| extra state_machine | Shows execution of state machine information  |
| extra watchdog | Shows watchdog status  |

### Returns

Returns a table of the status of all nodes on the cluster.

If `sort <column_titles>` is specified, the result is sorted by the specified table columns.

If `issues_only` is specified, it only shows nodes that do not have an "OK" status.

### Example

``` sh
$ rladmin status nodes sort PROVISIONAL_RAM HOSTNAME
CLUSTER NODES:
NODE:ID     ROLE       ADDRESS          EXTERNAL_ADDRESS          HOSTNAME            SHARDS     CORES          FREE_RAM                 PROVISIONAL_RAM          VERSION        STATUS   
node:1      master     198.51.100.2                                 3d99db1fdf4b        4/100      6              14.74GB/19.54GB          10.73GB/16.02GB          6.2.12-37      OK       
*node:3     slave      198.51.100.4                                 b87cc06c830f        0/100      6              14.74GB/19.54GB          11.22GB/16.02GB          6.2.12-37      OK       
node:2      slave      198.51.100.3                                 fc7a3d332458        0/100      6              14.74GB/19.54GB          11.22GB/16.02GB          6.2.12-37      OK       
```

## `status shards`

Displays the current status of all shards on the cluster.

``` sh
rladmin status shards
        [ node <id> ] 
        [ db {db:<id> | <name>} ]
        [ extra <parameters> ]
        [ sort <column_titles> ]
        [ issues_only ]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| extra <parameter> | Extra options that show more information |
| sort <column_titles> | Sort results by specified column titles |
| issues_only | Filters out all items that have an "OK" status  |


| Extra parameter | Description |
|-------------------|-------------|
| extra all | Shows all `extra` information |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra shardstats | Shows shards per node |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all shards in the cluster |
| extra state_machine | Shows execution of state machine information  |
| extra watchdog | Shows watchdog status  |

### Returns

Returns a table of the status of all shards on the cluster.

If `sort <column_titles>` is specified, the result is sorted by the specified table columns.

If `issues_only` is specified, it only shows shards that do not have an "OK" status.

### Example

``` sh
$ rladmin status shards sort USED_MEMORY ID
SHARDS:
DB:ID               NAME                       ID                   NODE               ROLE               SLOTS                           USED_MEMORY                     STATUS          
db:3                database3                  redis:6              node:1             master             8192-12287                      2.04MB                          OK              
db:3                database3                  redis:4              node:1             master             0-4095                          2.08MB                          OK              
db:3                database3                  redis:5              node:1             master             4096-8191                       2.08MB                          OK              
db:3                database3                  redis:7              node:1             master             12288-16383                     2.08MB                          OK              
```
