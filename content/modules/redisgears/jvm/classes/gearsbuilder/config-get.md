---
Title: ConfigGet
linkTitle: configGet
description: Gets the value of a RedisGears configuration setting.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static java.lang.String configGet​(java.lang.String key)
```

Gets the value of a RedisGears [configuration setting](https://oss.redis.com/redisgears/configuration.html).

{{<note>}}
You can set configuration values when you load the module or use the [`RG.CONFIGSET`](https://oss.redislabs.com/redisgears/commands.html#rgconfigset) command.
{{</note>}}

## Parameters

| Name | Type | Description |
|------|------|-------------|
| key | string | The configuration setting to get |

## Returns

Returns the configuration value of a RedisGears configuration setting.

## Example

```java
GearsBuilder.configGet("ExecutionMaxIdleTime");
```