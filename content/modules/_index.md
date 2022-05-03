---
Title: Redis Stack and modules
linkTitle: Redis Stack & modules
description:
weight: 70
alwaysopen: false
categories: ["Modules"]
aliases: /modules/
         /rs/developing/modules/
---
Redis develops several modules that extend the core Redis feature set. Some of the features these modules provide include [querying, indexing and full-text search]({{< relref "/modules/redisearch" >}}), [JSON support]({{< relref "/modules/redisjson" >}}), and [probabalistic data structures]({{< relref "/modules/redisbloom" >}}).

[Redis Stack](https://redis.io/docs/stack/) lets you install and leverage modules quickly; it enables access to multiple modules in a single Redis database.  

[Redis Enterprise Software]({{< relref "/rs" >}}) and [Redis Enterprise Cloud]({{< relref "/rc" >}}) support all capabilities of [Redis Stack]({{< relref "/modules/redis-stack" >}}).

Each module includes a quick start guide.

{{< embed-html "modules.html" >}}
