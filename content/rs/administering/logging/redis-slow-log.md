---
Title: Viewing Redis Slow Log
description: 
weight: $weight
alwaysopen: false
---
On the **Database** \> **Slow Log** page, you can view Slow Log details
for Redis Enterprise Software (RS) databases.

[Redis Slow Log](http://redis.io/commands/slowlog) is one of the best
tools for debugging and tracing your Redis database, especially if you
experience high latency and high CPU usage with Redis operations.
Because Redis is based on a single threaded architecture, Redis Slow Log
can be much more useful than slow log mechanisms of multi-threaded
database systems such as MySQL Slow Query Log.

Unlike tools that introduce lock overhead (which makes the debugging
process very complex, Redis Slow Log is highly effective at showing the
actual processing time of each command.

Redis Enterprise Software includes enhancements to the standard Redis
Slow Log capabilities that allow you to analyze the execution time
complexity of each command. This enhancement can help you better analyze
Redis operations, allowing you to compare the differences between
execution times of the same command, observe spikes in CPU usage, and
more.

This is especially useful with complex commands such as
[ZUNIONSTORE](http://redis.io/commands/zunionstore),
[ZINTERSTORE](http://redis.io/commands/zinterstore) and
[ZRANGEBYSCORE](http://redis.io/commands/zrangebyscore).

The enhanced RS Slow Log adds the **Complexity Info** field to the
output data.

View the Complexity Info data by its respective Command in the table
below:

+-----------------------+-----------------------+-----------------------+
| Command               | Value of interest     | Complexity            |
+=======================+=======================+=======================+
| LINSERT               | N - list len         | O(N)                  |
+-----------------------+-----------------------+-----------------------+
| LREM                  | N - list len         | O(N)                  |
+-----------------------+-----------------------+-----------------------+
| LTRIM                 | N - number of        | O(N)                  |
|                       | removed elements      |                       |
+-----------------------+-----------------------+-----------------------+
| PUBLISH               | N - number of        | O(N+M)                |
|                       | channel subscribers   |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | subscribed patterns   |                       |
+-----------------------+-----------------------+-----------------------+
| PSUBSCRIBE            | N - number of        | O(argc\*N)            |
|                       | patterns client is    |                       |
|                       | subscribed to         |                       |
|                       |                       |                       |
|                       | argc - number of     |                       |
|                       | arguments passed to   |                       |
|                       | the command           |                       |
+-----------------------+-----------------------+-----------------------+
| PUNSUBSCRIBE          | N - number of        | O(argc\*(N+M))        |
|                       | patterns client is    |                       |
|                       | subscribed to         |                       |
|                       |                       |                       |
|                       | M - total number of  |                       |
|                       | subscribed patterns   |                       |
|                       |                       |                       |
|                       | argc - number of     |                       |
|                       | arguments passed to   |                       |
|                       | the command           |                       |
+-----------------------+-----------------------+-----------------------+
| SDIFF                 | N - total number of  | O(N)                  |
|                       | elements in all sets  |                       |
+-----------------------+-----------------------+-----------------------+
| SDIFFSTORE            | N - total number of  | O(N)                  |
|                       | elements in all sets  |                       |
+-----------------------+-----------------------+-----------------------+
| SINTER                | N - number of        | O(argc\*N)            |
|                       | elements in smallest  |                       |
|                       | set                   |                       |
|                       |                       |                       |
|                       | argc - number of     |                       |
|                       | arguments passed to   |                       |
|                       | the command           |                       |
+-----------------------+-----------------------+-----------------------+
| SINTERSTORE           | N - number of        | O(argc\*N)            |
|                       | elements in smallest  |                       |
|                       | set                   |                       |
|                       |                       |                       |
|                       | argc - number of     |                       |
|                       | arguments passed to   |                       |
|                       | the command           |                       |
+-----------------------+-----------------------+-----------------------+
| SMEMBERS              | N - number of        | O(N)                  |
|                       | elements in a set     |                       |
+-----------------------+-----------------------+-----------------------+
| SORT                  | N - number of        | O(N+M\*log(M))O(N)    |
|                       | elements in the       | when no sorting       |
|                       | list/set/zset         |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | elements in result    |                       |
+-----------------------+-----------------------+-----------------------+
| SUNION                | N - total number of  | O(N)                  |
|                       | elements in all sets  |                       |
+-----------------------+-----------------------+-----------------------+
| SUNIONSTORE           | N - total number of  | O(N)                  |
|                       | elements in all sets  |                       |
+-----------------------+-----------------------+-----------------------+
| UNSUBSCRIBE           | N - total number of  | O(N)                  |
|                       | clients subscribed to |                       |
|                       | all channels          |                       |
+-----------------------+-----------------------+-----------------------+
| ZADD                  | N - number of        | O(log(N))             |
|                       | elements in the zset  |                       |
+-----------------------+-----------------------+-----------------------+
| ZCOUNT                | N - number of        | O(log(N)+M)           |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | elements between min  |                       |
|                       | and max               |                       |
+-----------------------+-----------------------+-----------------------+
| ZINCRBY               | N - number of        | O(log(N))             |
|                       | elements in the zset  |                       |
+-----------------------+-----------------------+-----------------------+
| ZINTERSTORE           | N - number of        | O(N\*K)+O(M\*log(M))  |
|                       | elements in the       |                       |
|                       | smallest zset         |                       |
|                       |                       |                       |
|                       | K - number of zsets  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | elements in the       |                       |
|                       | results set           |                       |
+-----------------------+-----------------------+-----------------------+
| ZRANGE                | N - number of        | O(log(N)+M)           |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | results               |                       |
+-----------------------+-----------------------+-----------------------+
| ZRANGEBYSCORE         | N - number of        | O(log(N)+M)           |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | results               |                       |
+-----------------------+-----------------------+-----------------------+
| ZRANK                 | N - number of        | O(log(N))             |
|                       | elements in the zset  |                       |
+-----------------------+-----------------------+-----------------------+
| ZREM                  | N - number of        | O(argc\*log(N))       |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | argc - number of     |                       |
|                       | arguments passed to   |                       |
|                       | the command           |                       |
+-----------------------+-----------------------+-----------------------+
| ZREMRANGEBYRANK       | N - number of        | O(log(N)+M)           |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | elements removed      |                       |
+-----------------------+-----------------------+-----------------------+
| ZREMRANGEBYSCORE      | N - number of        | O(log(N)+M)           |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | elements removed      |                       |
+-----------------------+-----------------------+-----------------------+
| ZREVRANGE             | N - number of        | O(log(N)+M)           |
|                       | elements in the zset  |                       |
|                       |                       |                       |
|                       | M - number of        |                       |
|                       | results               |                       |
+-----------------------+-----------------------+-----------------------+
| ZREVRANK              | N - number of        | O(log(N))             |
|                       | elements in the zset  |                       |
+-----------------------+-----------------------+-----------------------+
| ZUNIONSTORE           | N - sum of element   | O(N)+O(M\*log(M))     |
|                       | counts of all zsets   |                       |
|                       |                       |                       |
|                       | M - element count of |                       |
|                       | result                |                       |
+-----------------------+-----------------------+-----------------------+
