---
Title: Redis Data Integration configuration file
linkTitle: RDI configuration
description: Describes properties defined in the RDI configuration file. 
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The Redis Data Integration (RDI) configuration file is a YAML file that defines objects with properties that configure and control RDI.

This references describes supported properties.

## Objects 

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**applier**](#applier)|`object`, `null`|Configuration details of Redis Data Integration Applier Gear<br/>|no|
|[**connections**](#connections)|`object`|Connections<br/>|yes|

**Additional Properties:** not allowed  
**Example**

```yaml
connections:
  target: {}

```

<a name="applier"></a>
## applier: object,null

Configuration details of Redis Data Integration Applier Gear


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**on\_failed\_retry\_interval**|`integer`, `string`|Interval (in seconds) on which to perform retry on failure<br/>Default: `5`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**batch**|`integer`, `string`|The batch size on which data will be written to target<br/>Default: `100`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**duration**|`integer`, `string`|Interval (in ms) in which data will be written to target even if batch size was not reached<br/>Default: `100`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**error\_handling**|`string`|Error handling strategy: ignore - skip, dlq - store rejected messages in a dead letter queue<br/>Default: `"ignore"`<br/>Pattern: ^\\$\{\.\*\}$\|ignore\|dlq<br/>||
|**dlq\_max\_messages**|`integer`, `string`|Dead letter queue max messages per stream<br/>Default: `1000`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**target\_data\_type**|`string`|Target data type: hash/json - RedisJSON module must be in use in the target DB<br/>Default: `"hash"`<br/>Pattern: ^\\$\{\.\*\}$\|hash\|json<br/>||
|**wait\_enabled**|`boolean`|Checks if the data has been written to the replica shard<br/>Default: `false`<br/>||
|**wait\_timeout**|`integer`, `string`|Timeout in milliseconds when checking write to the replica shard<br/>Default: `1000`<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>||
|**retry\_on\_replica\_failure**|`boolean`|Ensures that the data has been written to the replica shard and keeps retrying if not<br/>Default: `true`<br/>||

**Additional Properties:** not allowed  
<a name="connections"></a>
## connections: object

Connections


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**target**](#connectionstarget)|`object`|Redis target connection details<br/>|yes|

**Additional Properties:** not allowed  
**Example**

```yaml
target: {}

```

<a name="connectionstarget"></a>
### connections\.target: object

Redis target connection details


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**host**|`string`|Redis target DB host<br/>|yes|
|**port**|`integer`, `string`|Redis target DB port<br/>Pattern: ^\\$\{\.\*\}$<br/>Minimum: `1`<br/>Maximum: `65535`<br/>|yes|
|**user**<br/>(Redis DB user)|`string`||no|
|**password**|`string`|Redis target DB password<br/>|no|
|**key**|`string`|Private key file to authenticate with<br/>|no|
|**cert**|`string`|Client certificate file to authenticate with<br/>|no|
|**cacert**|`string`|CA certificate file to verify with<br/>|no|

**Additional Properties:** not allowed  

