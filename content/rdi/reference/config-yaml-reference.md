---
Title: Redis Data Integration configuration file
linkTitle: RDI configuration file
description: Redis Data Integration configuration file reference
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

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
|**on\_failed\_retry\_interval**<br/>(Interval \(in seconds\) on which to perform retry on failure)|`integer`, `string`|Default: `5`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**batch**<br/>(The batch size on which data will be written to target)|`integer`, `string`|Default: `2000`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**duration**<br/>(Interval \(in ms\) in which data will be written to target even if batch size was not reached)|`integer`, `string`|Default: `100`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**error\_handling**<br/>(Error handling strategy: ignore \- skip, dlq \- store rejected messages in a dead letter queue)|`string`|Default: `"dlq"`<br/>Pattern: ^\\$\{\.\*\}$\|ignore\|dlq<br/>||
|**dlq\_max\_messages**<br/>(Dead letter queue max messages per stream)|`integer`, `string`|Default: `1000`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**target\_data\_type**<br/>(Target data type: hash/json \- RedisJSON module must be in use in the target DB)|`string`|Default: `"hash"`<br/>Pattern: ^\\$\{\.\*\}$\|hash\|json<br/>||
|**json\_update\_strategy**<br/>(Target update strategy: replace/merge \- RedisJSON module must be in use in the target DB)|`string`|Default: `"replace"`<br/>Pattern: ^\\$\{\.\*\}$\|replace\|merge<br/>||
|**initial\_sync\_processes**<br/>(Number of processes RDI Engine creates to process the initial sync with the source)|`integer`, `string`|Default: `4`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>Maximum: `32`<br/>||
|**wait\_enabled**<br/>(Checks if the data has been written to the replica shard)|`boolean`|Default: `false`<br/>||
|**wait\_timeout**<br/>(Timeout in milliseconds when checking write to the replica shard)|`integer`, `string`|Default: `1000`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
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
|**^\(?\!\.\*target\)\.\*$**||||
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
|**host**<br/>(Redis target DB host)|`string`||yes|
|**port**<br/>(Redis DB port)|`integer`, `string`|Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>Maximum: `65535`<br/>|yes|
|**user**<br/>(Redis DB user)|`string`||no|
|**password**<br/>(Redis DB password)|`string`||no|
|**key**<br/>(Private key file to authenticate with)|`string`||no|
|**cert**<br/>(Client certificate file to authenticate with)|`string`||no|
|**cacert**<br/>(CA certificate file to verify with)|`string`||no|

**Additional Properties:** not allowed  

