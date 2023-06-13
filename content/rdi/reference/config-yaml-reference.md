---
Title: Redis Data Integration configuration file
linkTitle: RDI configuration file
description: Redis Data Integration configuration file reference
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

# Redis Data Integration Configuration File

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**applier**](#applier)<br/>(Configuration details of Redis Data Integration Applier Gear)|`object`, `null`|||
|[**connections**](#connections)|`object`|||

**Additional Properties:** not allowed  
<a name="applier"></a>
## applier: Configuration details of Redis Data Integration Applier Gear

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**on\_failed\_retry\_interval**<br/>(Interval \(in seconds\) on which to perform retry on failure)|`integer`, `string`|Default: `5`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>||
|**read\_batch\_size**<br/>(The batch size for reading data from source database)|`integer`, `string`|Default: `2000`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>||
|**dedup**<br/>(Enable deduplication mechanism)|`boolean`|Default: `false`<br/>||
|**dedup\_max\_size**<br/>(Max size of the deduplication set)|`integer`|Default: `1024`<br/>Minimum: `1`<br/>||
|**dedup\_strategy**<br/>(Deduplication strategy: reject \- reject messages\(dlq\), ignore \- ignore messages)|`string`|Default: `"ignore"`<br/>Enum: `"reject"`, `"ignore"`<br/>||
|**duration**<br/>(Time \(in ms\) after which data will be read from stream even if read\_batch\_size was not reached)|`integer`, `string`|Default: `100`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>||
|**write\_batch\_size**<br/>(The batch size for writing data to target Redis database\. Should be less or equal to the read\_batch\_size)|`integer`, `string`|Default: `200`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>||
|**error\_handling**<br/>(Error handling strategy: ignore \- skip, dlq \- store rejected messages in a dead letter queue)|`string`|Default: `"dlq"`<br/>Pattern: ``^\${.*}$|ignore|dlq``<br/>||
|**dlq\_max\_messages**<br/>(Dead letter queue max messages per stream)|`integer`, `string`|Default: `1000`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>||
|**target\_data\_type**<br/>(Target data type: hash/json \- RedisJSON module must be in use in the target DB)|`string`|Default: `"hash"`<br/>Pattern: ``^\${.*}$|hash|json``<br/>||
|**json\_update\_strategy**<br/>(Target update strategy: replace/merge \- RedisJSON module must be in use in the target DB)|`string`|(DEPRECATED)<br/>Property 'json_update_strategy' will be deprecated in future releases. Use 'on_update' job-level property to define the json update strategy.<br/>Default: `"replace"`<br/>Pattern: ``^\${.*}$|replace|merge``<br/>||
|**initial\_sync\_processes**<br/>(Number of processes RDI Engine creates to process the initial sync with the source)|`integer`, `string`|Default: `4`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>Maximum: `32`<br/>||
|**wait\_enabled**<br/>(Checks if the data has been written to the replica shard)|`boolean`|Default: `false`<br/>||
|**wait\_timeout**<br/>(Timeout in milliseconds when checking write to the replica shard)|`integer`, `string`|Default: `1000`<br/>Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>||
|**retry\_on\_replica\_failure**<br/>(Ensures that the data has been written to the replica shard and keeps retrying if not)|`boolean`|Default: `true`<br/>||

**Additional Properties:** not allowed  
<a name="connections"></a>
## connections: Connections

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**target**](#connectionstarget)<br/>(Redis DB connection details)|`object`||yes|

**Properties (Pattern)**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**^\(?\!\.\*target\)\.\*$**](#connectionstarget)<br/>(Non\-Redis database configuration)|`object`|||
|**additionalProperties**||||

**Example**

```yaml
target: {}

```

<a name="connectionstarget"></a>
### connections\.target: Redis DB connection details

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**|`string`|DB type<br/>Constant Value: `"redis"`<br/>|no|
|**host**<br/>(Redis target DB host)|`string`||yes|
|**port**<br/>(Redis DB port)|`integer`, `string`|Pattern: ``^\${.*}$``<br/>Minimum: `1`<br/>Maximum: `65535`<br/>|yes|
|**user**<br/>(Redis DB user)|`string`||no|
|**password**<br/>(Redis DB password)|`string`||no|
|**key**<br/>(Private key file to authenticate with)|`string`||no|
|**key\_password**<br/>(Password for unlocking an encrypted private key)|`string`||no|
|**cert**<br/>(Client certificate file to authenticate with)|`string`||no|
|**cacert**<br/>(CA certificate file to verify with)|`string`||no|

**Additional Properties:** not allowed  
**If property *key* is defined**, property/ies *cert* is/are required.  
**If property *cert* is defined**, property/ies *key* is/are required.  
**If property *key_password* is defined**, property/ies *key* is/are required.  
<a name="connectionstarget"></a>
##### connections\.^\(?\!\.\*target\)\.\*$: Non\-Redis database configuration

   
**Option 1 (alternative):** 
SQL database


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**|`string`|DB type<br/>Enum: `"mysql"`, `"oracle"`, `"postgresql"`, `"sqlserver"`<br/>||
|**host**|`string`|DB host<br/>||
|**port**|`integer`|DB port<br/>Minimum: `1`<br/>Maximum: `65535`<br/>||
|**database**|`string`|DB name<br/>||
|**user**|`string`|DB user<br/>||
|**password**|`string`|DB password<br/>||
|[**connect\_args**](#option1connect_args)|`object`|Additional arguments to use when connecting to the DB<br/>||
|[**query\_args**](#option1query_args)|`object`|Additional query string arguments to use when connecting to the DB<br/>||

**Additional Properties:** not allowed  
   
**Option 1 (alternative):** 
**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**||Constant Value: `"oracle"`<br/>|yes|
|**database**|`string`||yes|
|**query\_args**|||no|


   
**Option 2 (alternative):** 
**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**||Constant Value: `"oracle"`<br/>|yes|
|**database**|||no|
|**query\_args**|||yes|


   
**Option 3 (alternative):** 
**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**||Enum: `"mysql"`, `"postgresql"`, `"sqlserver"`<br/>|yes|
|**database**|`string`||yes|


**Example**

```yaml
hr:
  type: postgresql
  host: localhost
  port: 5432
  database: postgres
  user: postgres
  password: postgres
  connect_args:
    connect_timeout: 10
  query_args:
    sslmode: verify-ca
    sslrootcert: /opt/ssl/ca.crt
    sslcert: /opt/ssl/client.crt
    sslkey: /opt/ssl/client.key

```

**Example**

```yaml
my-oracle:
  type: oracle
  host: 172.17.0.4
  port: 1521
  user: c##dbzuser
  password: dbz
  query_args:
    service_name: ORCLPDB1

```


   
**Option 2 (alternative):** 
Cassandra


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**|`string`|DB type<br/>Constant Value: `"cassandra"`<br/>|yes|
|[**hosts**](#option2hosts)|`string[]`|Cassandra hosts<br/>|yes|
|**port**|`integer`|Cassandra DB port<br/>Default: `9042`<br/>Minimum: `1`<br/>Maximum: `65535`<br/>|no|
|**database**|`string`|DB name<br/>|no|
|**user**|`string`|DB user<br/>|no|
|**password**|`string`|DB password<br/>|no|

**Additional Properties:** not allowed  
**Example**

```yaml
cache:
  type: cassandra
  hosts:
    - localhost
  port: 9042
  database: myDB
  user: myUser
  password: myPassword

```


<a name="option1connect_args"></a>
## Option 1: connect\_args: object

Additional arguments to use when connecting to the DB


**Additional Properties:** allowed  
<a name="option1query_args"></a>
## Option 1: query\_args: object

Additional query string arguments to use when connecting to the DB


**Additional Properties:** allowed  
<a name="option2hosts"></a>
## Option 2: hosts\[\]: array

Cassandra hosts


**Items: Address of Cassandra node**

**Item Type:** `string`  
