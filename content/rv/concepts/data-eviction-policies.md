---
Title: Data Eviction Policies
description: 
weight: $weight
alwaysopen: false
---
For each database, you can choose from these six supported data eviction
policies:

  **Options**                                               **Description**
  --------------------------------------------------------- ------------------------------------------------------------------------------------------------------
  allkeys-lru                                               Evicts the least recently used (LRU) keys out of all keys in the database
  allkeys-random                                            Randomly evicts keys out of all keys in the database
  volatile-lru (**default**[)]{style="font-weight: 400;"}   Evicts the least recently used (LRU) keys out of keys with an "expire" field set
  volatile-random                                           Randomly evicts keys with an "expire" field set
  volatile-ttl                                              Evicts the shortest time-to-live and least recently used keys out of keys with an "expire" field set
  no eviction                                               Returns error if memory limit has been reached when trying to insert more data

One mechanism to avoid this, but still keep performance is to use [Redis
on
Flash](/redis-enterprise-documentation/concepts-architecture/memory-architecture/redis-flash/).
It can span your database across RAM + Flash Memory and intelligently
manage what data is hot and should be in RAM and what data is not and
can be on Flash memory (SSD).

Note: [Active-Active Geo-Replicated
CRDBs](/redis-enterprise-documentation/administering/intercluster-replication/crdbs/)
will always operate in noeviction mode.
