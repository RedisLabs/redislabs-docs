---
Title: redis.lookup
linkTitle: redis.lookup
description: Get data from another key
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Get data from another key

**Properties**

| Name                             | Type           | Description                   | Required |
| -------------------------------- | -------------- | ----------------------------- | -------- |
| [**connection**](#option1fields) | `string`       | Connection name<br/>          | yes      |
| [**cmd**](#option1fields)        | `string`       | Redis command to execute<br/> | yes      |
| [**args**](#option1fields)       | `list[string]` | Command's parameters<br/>     | yes      |
| [**language**](#option1fields)   | `string`       | Expression language<br/>      | yes      |
| [**field**](#option1fields)      | `string`       | Target field<br/>             | yes      |

**Allowed commands:**

| Command             | Return type     |
| ------------------- | --------------- |
| HGETALL             | Hash            |
| JSON.GET            | JSON            |
| SMEMBERS            | Set.All         |
| ZRANGE              | SortedSet.Range |
| ZRANGE with BYSCORE | SortedSet.Score |
| ZPOPMAX             | SortedSet.Max   |
| ZPOPMIN             | SortedSet.Min   |
| GET                 | String          |
| MGET                | Strings         |

**Additional Properties:** not allowed

**Example**

```yaml
source:
  server_name: redislabs
  schema: dbo
  table: emp
transform:
  - uses: redis.lookup
    with:
      connection: target
      cmd: HGETALL
      args:
        - concat(['empno:', empno, ':data'])
      language: jmespath
      field: obj
```
