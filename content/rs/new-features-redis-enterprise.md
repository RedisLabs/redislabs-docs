---
Title: What's new in Redis Enterprise Software 6.x?
description:
weight: 20
alwaysopen: false
draft: true
categories: ["RS"]
---
Below are detailed a few of the major features of this release of Redis Enterprise Software (RS)
along with bug fixes and patches.

## Geo-Distributed Active-Active Conflict-free Replicated Databases (CRDB) {#geodistributed-activeactive-conflictfree-replicated-databases-crdb}

Developing globally distributed applications can be challenging, as
developers have to think about race conditions and complex combinations
of events under geo-failovers and cross-region write conflicts. Active-Active databases
simplify developing such applications by directly using built-in smarts
for handling conflicting writes based on the data type in use. Instead
of depending on just simplistic "last-writer-wins" type conflict
resolution, geo-distributed Active-Active databases combines techniques defined in CRDT
(conflict-free replicated data types) research with Redis types to
provide smart and automatic conflict resolution based on the data type's
intent.

For more information, go here. For information, go to [Developing with
Active-Active databases]({{< relref "/rs/developing/crdbs/_index.md" >}}).

## Redis modules

Redis Modules enable you to extend the functionality of Redis Enterprise
Software. One can add new data types, capabilities, etc. to tailor the
cluster to a specific use case or need. Once installed, modules benefit
from the high performance, scalability, and high availability that Redis
Enterprise is known for.

### Redis Labs modules

Redis Labs developed and certified these modules for use with RS:

- [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
    - Enables RS to have a scalable bloom filter as a data type. Bloom
      filters are probabilistic data structures that do a very good job at
      quickly determining if something is contained within a set.
- [RedisGraph](https://oss.redislabs.com/redisgraph/#quickstart)
    - RedisGraph is the first queryable Property Graph database to use sparse
      matrices to represent the adjacency matrix in graphs and linear algebra to query the graph.
      RedisGraph uses [Cypher](https://www.opencypher.org/) as its query language.
- [RedisJSON]({{< relref "/modules/redisjson/_index.md" >}})
    - Now you have the convenience JSON as a built-in data type and easily
      able to address nested data via a path.
- [RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
    - This module turns RS into a supercharged distributed in-memory
      full-text indexing and search beast.

### Custom modules

In addition, Redis Enterprise Software provides the ability to load and
use custom [Redis modules](https://redislabs.com/community/redis-modules-hub/) or
of your own creation.

## Support for Docker

Deploying and running your Redis Enterprise Software cluster on Docker
containers is supported in development systems and
available to pull from Docker hub. With the official image, you can
easily and quickly test several containers to build the scalable
and highly available cluster Redis Enterprise Software is famous for.

For more information go to [quick start with Redis Enterprise Software
on Docker.]({{< relref "/rs/getting-started/docker/_index.md" >}})

## LDAP integration

As part of our continued emphasis on security, administrative user
accounts in Redis Enterprise Software can now use either built-in
authentication or authenticate externally via LDAP with saslauthd. The
accounts can be used for administering resources on the cluster via
command line, Rest API, or admin console.

For more information see [LDAP
Integration]({{< relref "/rs/security/database-security/authentication-and-authorization.md#setting-up-ldap" >}}).
