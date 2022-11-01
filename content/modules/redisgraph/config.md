---
Title: RedisGraph configuration compatibility with Redis Enterprise 
linkTitle: Configuration 
description: RedisGraph configuration settings supported by Redis Enterprise.
weight: 30
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

[Redis Enterprise Software]({{<relref "/rs">}}) lets you manually change any [RedisGraph configuration setting](https://redis.io/docs/stack/graph/configuration/#redisgraph-configuration-parameters) with the [`GRAPH.CONFIG SET`](https://redis.io/commands/graph.config-set) command.

[Redis Enterprise Cloud]({{<relref "/rc">}}) does not let you use [`GRAPH.CONFIG SET`](https://redis.io/commands/graph.config-set) to configure RedisGraph. However, if you have a Flexible or Annual [subscription]({{<relref "/rc/subscriptions">}}), you can contact [support](https://redis.com/company/support/) to request a configuration change. You cannot change RedisGraph configuration for Free or Fixed subscriptions.

| Setting | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [CACHE_SIZE](https://redis.io/docs/stack/graph/configuration/#cache_size) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 25 |
| [MAX_QUEUED_QUERIES](https://redis.io/docs/stack/graph/configuration/#max_queued_queries) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 25 |
| [NODE_CREATION_BUFFER](https://redis.io/docs/stack/graph/configuration/#node_creation_buffer) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 16384 |
| [OMP_THREAD_COUNT](https://redis.io/docs/stack/graph/configuration/#omp_thread_count) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual\*</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | \* Updates automatically when you change your plan.<br /><br />Redis Enterprise default: Set by plan<br /><br />Redis Cloud defaults:<br />• Flexible & Annual: Set by plan<br />• Free & Fixed: 1<br /> |
| [QUERY_MEM_CAPACITY](https://redis.io/docs/stack/graph/configuration/#query_mem_capacity) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 100000000 |
| [RESULTSET_SIZE](https://redis.io/docs/stack/graph/configuration/#resultset_size) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 10000 |
| [THREAD_COUNT](https://redis.io/docs/stack/graph/configuration/#thread_count) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual\*</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | \* Updates automatically when you change your plan.<br /><br />Redis Enterprise default: Set by plan<br /><br />Redis Cloud defaults:<br />• Flexible & Annual: Set by plan<br />• Free & Fixed: 1<br /> |
| [TIMEOUT](https://redis.io/docs/stack/graph/configuration/#timeout) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 100 |
| [VKEY_MAX_ENTITY_COUNT](https://redis.io/docs/stack/graph/configuration/#vkey_max_entity_count) | <span title="Supported">&#x2705; Supported</span><br /><span><br /></span> | <span title="Supported">&#x2705; Flexible & Annual</span><br /><span title="Not supported"><nobr>&#x274c; Free & Fixed</nobr></span> | Default: 100000 |
