---
Title: redis.write
linkTitle: redis.write
description: Write to a Redis data structure
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Write to a Redis data structure

**Properties**

| Name                                 | Type     | Description                                                                                                              | Required |
| ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| **connection**<br/>(Connection name) | `string` |                                                                                                                          | yes      |
| **command**<br/>(Redis command)      | `string` | Redis command<br/>Default: `"HSET"`<br/>Enum: `"HSET"`, `"SADD"`, `"XADD"`, `"RPUSH"`, `"LPUSH"`, `"SET"`, `"ZADD"`<br/> | no       |
| [**key**](#key)                      | `object` | Field to use as the Redis key<br/>                                                                                       | yes      |

**Additional Properties:** not allowed

**Example**

```yaml
command: HSET
key: {}
```

<a name="key"></a>

## key: object

Field to use as the Redis key

**Properties**

| Name           | Type     | Description                                   | Required |
| -------------- | -------- | --------------------------------------------- | -------- |
| **expression** | `string` | Expression<br/>                               | yes      |
| **language**   | `string` | Language<br/>Enum: `"jmespath"`, `"sql"`<br/> | yes      |
