---
Title: RedisTimeSeries configuration compatibility with Redis Enterprise 
linkTitle: Configuration 
description: RedisTimeSeries configuration settings supported by Redis Enterprise.
weight: 30
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

[Redis Enterprise Software]({{<relref "/rs">}}) lets you manually change any [RedisTimeSeries configuration setting](https://redis.io/docs/stack/timeseries/configuration/#redistimeseries-configuration-parameters).

[Redis Enterprise Cloud]({{<relref "/rc">}}) does not let you configure RedisTimeSeries manually. However, if you have a Flexible or Annual [subscription]({{<relref "/rc/subscriptions">}}), you can contact [support](https://redis.com/company/support/) to request a configuration change. You cannot change RedisTimeSeries configuration for Free or Fixed subscriptions.

| Setting | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [CHUNK_TYPE](https://redis.io/docs/stack/timeseries/configuration/#chunk_type) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: COMPRESSED |
| [COMPACTION_POLICY](https://redis.io/docs/stack/timeseries/configuration/#compaction_policy) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: No default compaction rules |
| [DUPLICATE_POLICY](https://redis.io/docs/stack/timeseries/configuration/#duplicate_policy) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: BLOCK |
| [NUM_THREADS](https://redis.io/docs/stack/timeseries/configuration/#num_threads) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual\*</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | \* Updates automatically when you change your plan.<br /><br />Redis Enterprise default: Set by plan<br /><br />Redis Cloud defaults:<br />• Flexible & Annual: Set by plan<br />• Free & Fixed: 1<br /> |
| [RETENTION_POLICY](https://redis.io/docs/stack/timeseries/configuration/#retention_policy) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 0 |
