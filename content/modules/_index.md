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

[Redis Stack]({{< relref "/modules/redis-stack" >}}) lets you install and leverage modules quickly; it enables access to multiple modules in a single Redis database.  

You can use these modules with [Redis Enterprise Software]({{< relref "/rs" >}}).

You can use many, but not all, modules with [Redis Enterprise Cloud]({{< relref "/rc" >}}).  For details, see [Redis Enterprise module support]({{<relref "modules/enterprise-capabilities#redis-enterprise-module-support">}}).

Each module includes a quick start guide.

{{< embed-html "modules.html" >}}
