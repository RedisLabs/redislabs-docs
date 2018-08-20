---
Title: What happens when my database fills up?
description: 
weight: $weight
alwaysopen: false
---
As detailed in the open source [Redis FAQ](http://redis.io/topics/faq),
under "What happens if Redis runs out of memory?":

[*...\[you\] can use the "maxmemory" option in the config file to put a
limit to the memory Redis can use. If this limit is reached Redis will
start to reply with an error to write commands (but will continue to
accept read-only commands), or you can configure it to evict keys when
the max memory limit is reached in the case you are using Redis for
caching.*]{style="color: #808080;"}

You can set the **maxmemory** value of each Redis^e^ Pack database in
the management UI using the **Memory limit** property, as well as
configure an eviction policy by setting it to any of the standard Redis
behaviors, without interrupting database operations.
