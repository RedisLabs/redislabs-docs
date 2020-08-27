---
Title: Redis Enterprise Pack 5.0 Release Notes (November 2017)
description:
weight: 93
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software 5.0 is now available. Key features include
Geo-Distributed Active-Active Conflict-free Replicated Databases (CRDB),
LDAP integration, Redis Module integration, and support for the Redis
Cluster API.

## Overview

If you are upgrading from a previous version, make sure to review the
upgrade instructions before beginning the upgrade process.

You can upgrade to RS 5.0 from RS 4.4.2 and above. If you have a version
older than this, you must first upgrade to at least 4.4.2.

## New features

### Support for Redis Cluster API

The Redis Cluster API support in Redis Enterprise Software (RS) provides
a simple mechanism for Cluster enabled Redis clients to learn and know
the cluster topology. This enables clients to connect directly to an RS
proxy on the node hosting the master shard for the data being operated
on. The result is that for all but the initial call to get the cluster
topology or reacquire the location of the master shard, the client will
connect to the RS endpoint proxy where the master shard is located.
[Learn more about the Cluster API
implementation]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}}).

### Geo-distributed Active-Active conflict-free replicated databases (CRDB) {#geodistributed-activeactive-conflictfree-replicated-databases-crdb}

Developing globally distributed applications can be challenging, as
developers have to think about race conditions and complex combinations
of events under geo-failovers and cross-region write conflicts. CRDBs
simplify developing such applications by directly using built-in smarts
for handling conflicting writes based on the data type in use. Instead
of depending on just simplistic "last-writer-wins" type conflict
resolution, geo-distributed CRDBs combines techniques defined in CRDT
(conflict-free replicated data types) research with Redis types to
provide smart and automatic conflict resolution based on the data type's
intent.

For more information, go here. For information, go to [Developing with
CRDBs]({{< relref "/rs/developing/crdbs/_index.md" >}}).

### Redis modules

Redis Modules enable you to extend the functionality of Redis Enterprise
Pack. One can add new data types, capabilities, etc. to tailor the
cluster to a specific use case or need. Once installed, modules benefit
from the high performance, scalability, and high availability that Redis
Enterprise is known for.

#### Redis Labs modules

There are three modules Redis Labs has developed and certified with
Redis Enterprise Pack (RS). The modules are:

- [RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
    - This module turns RS into a supercharged distributed in-memory
      full-text indexing and search beast.
- [ReJSON]({{< relref "/modules/redisjson/_index.md" >}})
    - Now you have the convenience JSON as a built-in data type and
      easily able to address nested data via a path.
- [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
    - Enables RS to have a scalable bloom filter as a data type. Bloom
      filters are probabilistic data structures that do a very good job at
      quickly determining if something is contained within a set.

#### Custom modules

In addition, Redis Enterprise Pack provides the ability to load and use
custom [Redis modules](https://redislabs.com/community/redis-modules-hub/) or of
your own creation.

## Support for Docker

Deploying and running your Redis Enterprise Software cluster on Docker
containers is supported in development systems and
available to pull from Docker hub. With the official image, you can
easily and quickly test several containers to build the scalable
and highly available cluster Redis Enterprise Software is famous for.

For more information, go to [quick start with Redis Enterprise Pack on
Docker.]({{< relref "/rs/getting-started/docker/_index.md" >}})

## LDAP Integration

As part of our continued emphasis on security, administrative user
accounts in Redis Enterprise Pack can now use either built-in
authentication or authenticate externally via LDAP with saslauthd. The
accounts can be used for administering resources on the cluster via
command line, Rest API, or Web UI.

For more information see [LDAP
Integration]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}).

## Additional capabilities

Support for additional Redis commands and features:

- Support for Redis version 4.0.2
- Support added for RHEL/CentOS 6.9 and 7.4

## Information

- In the node bootstrap API, the structure of the JSON has changed for
    adding an external IP during the bootstrap process.
- End-of-Life for RHEL/CentOS 6.5 and 6.6 have been reached, so those
    versions are no longer supported.
- Modules are not supported in Redis Enterprise Pack 5.0 for
    RHEL/CentOS 6.x

## Important fixes

### 5.0.0-31 {#5-0-031}

- RP9299 - Issue with reliability of metric ingress
- RP9680 - Redis Enterprise Pack starting before /etc/rc.local script
    executed
- RP12363 - In some cases, flash drives do not mount following a
    stop/start of the node
- RP12493 - Allow change to debug package creation location
- RP13079 - DNS doesn't change after having removed the external IP
    address in some cases
- RP13933 - rladmin balance sometimes shows incorrect information
- RP14060 - pubsub stats aren't reflected correctly by the stats
    archiver
- RP14939 - Add license checks to all needed entry points in the
    cluster
- RP15090 - Problem in log rotate script causes other logs to not
    rotate
- RP15104 - rlutil check fix doesn't work sometimes
- RP15130 - Fixed permission on two logs with incorrect ownership
- RP15160 - Allow option to change ports for API and CM in NGINX
- RP15164 - Allow unix socket folder to be configurable at build time
- RP15499 - rladmin command not responding on a cluster with large
    number of shards
- RP15853 - When trying to add a new db the 'activate' button was
    changed to 'update' and was grayed out.
- RP15861 - Allow unix socket folder to be configurable at install
    time
- RP16115 - TTL bug with Replica Of and import
- RP16447 - DMC client connection reports incorrect number of
    connections to monitoring applications.
- RP16481 - In some cases, resource_mgr uses incorrect directories
    to compute persistent and ephemeral storage
