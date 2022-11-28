---
Title: RedisBloom configuration compatibility with Redis Enterprise 
linkTitle: Configuration 
description: RedisBloom configuration settings supported by Redis Enterprise.
weight: 30
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

[Redis Enterprise Software]({{<relref "/rs">}}) lets you manually change any [RedisBloom configuration setting](https://redis.io/docs/stack/bloom/configuration/#redisbloom-configuration-parameters).

[Redis Enterprise Cloud]({{<relref "/rc">}}) does not let you configure RedisBloom manually. However, if you have a Flexible or Annual [subscription]({{<relref "/rc/subscriptions">}}), you can contact [support](https://redis.com/company/support/) to request a configuration change. You cannot change RedisBloom configuration for Free or Fixed subscriptions.

| Setting | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [CF_MAX_EXPANSIONS](https://redis.io/docs/stack/bloom/configuration/#cf_max_expansions) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 32 |
| [ERROR_RATE](https://redis.io/docs/stack/bloom/configuration/#error_rate) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 0.01 |
| [INITIAL_SIZE](https://redis.io/docs/stack/bloom/configuration/#initial_size) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 100 |
