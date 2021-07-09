---
Title: Redis Modules
description:
weight: 70
alwaysopen: false
categories: ["Modules"]
aliases: /rs/developing/modules/
---
Redis Labs develops several modules that extend the core Redis feature set. Some of the features these modules provide include [querying, indexing and full-text search]({{< relref "/modules/redisearch" >}}), [JSON support]({{< relref "/modules/redisjson" >}}), and [probabalistic data structures]({{< relref "/modules/redisbloom" >}}).

You can use these modules [Redis Enterprise Software]({{< relref "/rs" >}}).  [Redis Enterprise Cloud]({{< relref "/rc" >}}) supports a selected set of modules.  For details, see [Supported modules]({{< relref "/rc/databases/create-database#supported-modules" >}}).

{{<note>}}
Redis Enterprise Cloud currently supports a subset of available modules.
{{</note>}}
Each module has its own quick start guide to help you get up and running quickly.

{{< embed-html "modules.html" >}}
