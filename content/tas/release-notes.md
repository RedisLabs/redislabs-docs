---
Title: Redis Enterprise for VMWare Tanzu (TAS) release notes
description: Release notes prior to 2022
weight: 90
alwaysopen: false
hidden: true
aliases: 
---

Below are the release notes for Redis Enterprise for VMWare Tanzu (TAS) versions released between 2017 and 2021. For more recent release notes, see the [TAS page]({{<relref "/tas/">}})

### 6.2.84100001



**Release Date:** Dec 23, 2021

This release supersedes v6.0.209700002 to include new features

**New Features**
- Support for Redis Enterprise Cluster 6.2.8-41
  - [Redis Enterprise 6.2.8-41 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-8-october-2021/)

**Bug fixes**

- Fixed recovery flow (RED-64910)

**Known Limitations** 

- When trying to add new peer to existing A-A (CRDB) deployment from App Manager, it creates a new A-A deployment
- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 6.0.209700002

**Release Date:** Aug 24, 2021

This release supersedes v6.0.206900001 to include new features

**New Features**
- Support for Redis Enterprise Cluster 6.0.20-97
  - [Redis Enterprise 6.0.20-97 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-0-20-april-2021/)
- Added support for VMware Tanzu LTS 1

**Breaking Changes**

- API certificates now must be configured and be valid for cluster FQDN; certificate common name (CN) must be equal to cluster FQDN
- CM and Metrics Endpoint certificates should be configured and be valid for cluster FQDN when the deployment leverages these services; certificate common name (CN) must be equal to cluster FQDN

**Known Limitations**

- When trying to add new peer to existing A-A (CRDB) deployment from App Manager, it creates a new A-A deployment (RED-61464)
- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 6.0.206900001

**Release Date:** May 14, 2021

This release supersedes v6.0.82800002 to include new features

**New Features**
- Support for Redis Enterprise Cluster 6.0.20-69
  - [Redis Enterprise 6.0.20-69 release notes](https://docs.redislabs.com/latest/rs/release-notes/rs-6-0-20-april-2021/)
- Support for VMware Tanzu 2.11

**Known Limitations**

- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 6.0.82800002

**Release Date:** Jan 12, 2020

This release supersedes v6.0.82800001 to include new features and bug fixes.

**Bug fixes**

- Address missing bundled packages for air-gapped environments

**Known Limitations**
- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 6.0.82800001

**Release Date:** Dec 18, 2020

This release supersedes v6.0.63900002 to include new features and bug fixes.

**New Features**
- Support for Redis Enterprise Cluster 6.0.8-28
  - [Redis Enterprise 6.0.8 release notes](https://docs.redislabs.com/latest/rs/release-notes/rs-6-0-8-september-2020/)
- Support for VMware Tanzu 2.10

**Known Limitations**

- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 6.0.63900002

**Release Date:** Aug 3, 2020

This release supersedes v5.4.102200010 to include new features and bug fixes.

**New Features**
- Support for Redis Enterprise Cluster 6.0.6-39
  - [Redis Enterprise 6.0.6 release notes](https://docs.redislabs.com/latest/rs/release-notes/rs-6-0-may-2020/)
- Support for VMware Tanzu 2.9
- High availability for replica shards ([Slave HA](https://docs.redislabs.com/latest/rs/administering/database-operations/slave-ha/)) is now enabled by default with a 30 minute [grace period.](https://docs.redislabs.com/latest/rs/administering/database-operations/slave-ha/#grace-period) 
- Resource config now enforces lower CPU and Memory minimums to reduce resource utilization in development and test environments

**Known Limitations**

- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 5.4.102200010

**Release Date:** Feb 25, 2020

This release supersedes v5.4.102200007 to include new features and bug fixes.

**New Features**

- Support for VMware Tanzu 2.8
- Added the option to enable [service instance sharing](https://docs.pivotal.io/application-service/2-8/services/enable-sharing.html) across spaces and organization
- Added the ability to configure TLS within plans. Note that some of the pre-configured plans in a fresh tile install now have TLS configured as enabled by default
- Added Shard Placement policy to plans configuration
- Resource Config now enforces resource minimums (VM  and Persistent Disk type) based on develop/test [minimum hardware requirements]({{<relref "/rs/installing-upgrading/install/plan-deployment/hardware-requirements">}}). Note that automatic resource config provides minimum hardware requirements for production - which did not change.

**Known Limitations**

- Enabling service instance sharing does not create unique credentials for each binding. Once shared, service instances cannot be unshared.
- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

**Bug fixes**

- Updated outdated logos
- Provide input validation, upon saving, on Administrative Password fields, to avoid installation failures as a result of using invalid characters within passwords

### 5.4.102200007

**Release Date:** Dec 14, 2019

This release supersedes v5.4.40700169 to include new features and bug fixes.

**New Features**

- Support for Redis Enterprise Cluster 5.4.10-22
  - [Redis Enterprise 5.4.10 release notes](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-10-december-2019/)
- Support for VMware Tanzu 2.7
- Support for creating Redis Enterprise Modules' enabled databases with Service Broker
- Improve upgrade and scale-down resiliency
  - Demote master node before enslave
  - Implement retry mechanism to minimize enslave failures
- Improve support for automation with `om`
  - Plan names are unique
  - Plans are configurable
- Changed product references from "PCF" to "VMware Tanzu"
- Add the ability for database metrics to report db name (configurable)
- Improve handling of extremely large MSET commands

**Bug fixes**

- Sentinel disappears after software upgrade
- PCF install fails when password contains some special characters

**Known Limitations**

- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

### 5.4.40700169

**Release Date:** Jul 17, 2019

This release supersedes v5.4.22700167 to include new features and bug fixes.

**New Features**

- Support for Redis Enterprise Cluster 5.4.4-7
- Support for VMware Tanzu 2.6
- Support for BOSH DNS
- Changing VMware Tanzu tile Resource Config defaults to include minimum persistent storage requirements

**Known Limitations**

- Smoke Test Errand fails, applying changes in Ops Manager after deploying tile in Recovery mode.
  - Workaround: Disable the Smoke Test Errand before applying changes to the tile in Recovery Mode. After the last recovery step (unchecking the Recovery checkbox), apply changes with Smoke Test Errand, which will now run.

### 5.4.22700167

**Release Date:** Jul 17, 2019

This release supersedes v5.4.22000164 to include new features and bug fixes.

**New Features**

- Support for Redis Enterprise Cluster 5.4.2-24
- Support for VMware Tanzu 2.5

**Bug Fixes**

- Redis tile drain script does not complete during BOSH deploy
- TCP Router port limits are applied when TCP Router is disabled

### 5.4.22000164

**Release Date:** May 16, 2019

This release supersedes v5.4.22000155 to include new features and bug fixes.

**New Features**

- Tile is based on Redis Enterprise release v5.4.2-20. [5.4.2 Release Notes](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-2-april-2019/).
- Security enhancement - The DB Viewer and Cluster Viewer roles cannot view the Redis password of a database
- Update Xenial stemcells to release 250
- Updated Redis Labs logo

**Bug fixes**

- Loggregator prevents nginx from starting after node restart

### 5.4.2600155

**Release Date:** March 12, 2019

This release supersedes 5.4.2400147 to include new features bug fixes.

**New Features**
- Support for Pivotal Cloud Foundry Loggregator integration
- Tile is based on Redis Enterprise release v5.4.0-26

**Bug fixes**

- Failed to disable client authentication after upgrade

### 5.4.2400147

**Release Date:** February 11, 2019

This release supersedes 5.4.2400142 to include bug fixes.

**Bug Fixes**

- Required binaries are now included in BOSH tile, for air-gapped deployments

### 5.4.2400142

**Release Date:** January 30, 2019

**New Features**

- Added VMware Tanzu v2.4 Support
- Updated stemcell to Ubuntu Xenial
- TLS client authentication is now optional when enabling TLS for database communications
- Tile based on Redis-Enterprise v5.4.0
- For more information, see [Redis Enterprise Release Notes](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-december-2018/).

### 5.2.21800135

**Release Date:** August 31, 2018

**New Features**
- Added VMware Tanzu v2.3 Support, as of November 2, 2018
- VMware Tanzu v2.2 Support
- Tile based on Redis-Enterprise v5.2.2
- For more information, see [Redis Enterprise Release Notes](https://redislabs.com/redis-enterprise-documentation/release-notes/).

**Bug fixes**

- Added the ability to configure both the API Certificate and Proxy Certificate information using the Ops Manager config panel.
- Both console and API fields in Ops Manager are set by default to non-FQDN values.

### 5.2.1400130

**Release Date:** June 21, 2018

**New Features**

- VMware Tanzu v2.1 Support
- Backup to FTP / S3
- Tile based on Redis-Enterprise v5.2
- For more information, see [Redis Enterprise Release Notes](https://redislabs.com/redis-enterprise-documentation/release-notes/).

### 5.0.13000036

**Release Date:** April 30, 2018

**New Features**

- Stemcell 3541.5 support

**Bug fixes**

- Operability between DNS sub-systems.

### 5.0.13000030

**Release Date:** March 5, 2018

**New Features**

- VMware Tanzu v2.0.x Support
- Added smoke-test errand
- Tile based on Redis-Enterprise v5.0.1-30
- Stemcell 3541.5 support

**Improvements**

- Using new Tile Generator v11
- Using final BOSH releases in Tile

**Bug fixes**

- Offline install capability
- Issue related to default Syslog integration option

### 5.0.1180018 (BETA)

**Release Date:** February 5, 2018

**New Features**

- Built and tested new tile with VMware Tanzu v1.12.12 (ERT and Ops Manager)
- Updated Redislabs enterprise cluster version to v5.0.1-17
- Upgrade support in Redis Enterprise tile
- Syslog integration

### 5.0.1100012 (BETA)

**Release Date:** January 21, 2018

**New Features**

- VMware Tanzu CRDB Integration using VMware Tanzu TCP Router 16720, 16721
- CRDB Support without DNS (doc item #6) and 16711
- Tile uses VMware Tanzu system domain to deploy tile 16045

**Geo-Distributed Active-Active Conflict-free Replicated Databases (CRDB) Across Multiple VMware Tanzu Foundations**
Developing globally distributed applications can be challenging. Developers have to think about race conditions and complex combinations of events under geo-failovers and cross-region write conflicts. CRDBs simplify developing such applications by directly using built-in smarts for handling conflicting writes based on the data type in use. Instead of depending on just simplistic "last-writer-wins" type conflict resolution, geo-distributed CRDBs combines techniques defined in CRDT (conflict-free replicated data types) research with Redis types to provide smart and automatic conflict resolution based on the data type's intent. This also includes support for TCP Routers.

For information, see [Developing with CRDBs](https://www.redislabs.com/redis-enterprise-documentation/developing/crdbs/").

### 5.0.0 (BETA)

**Release Date:** December 6, 2017

**New Features**

**Support for Redis Cluster API**
The Redis Cluster API support in Redis Enterprise provides a simple mechanism for Cluster-enabled Redis clients to learn and know the cluster topology. This enables clients to connect directly to an RP proxy on the node hosting the master shard for the data being operated on. As a result, all but the initial call to get the cluster topology or reacquire the location of the master shard, and the client will connect to the RP endpoint proxy where the master shard is located.[Learn more about the Cluster API implementation](https://www.redislabs.com/redis-enterprise-documentation/concepts-architecture/data-access/cluster-api/).

**Redis Modules**
Redis Modules enable you to extend the functionality of Redis Enterprise Pack. You can add new data types, capabilities, and more to tailor the cluster to a specific use case or need. Once installed, modules benefit from the high performance, scalability, and high availability that Redis Enterprise is known for.

**Redis Labs' Modules**

There are three modules Redis Labs has developed and certified with Redis Enterprise Pack. The modules are:

* [RediSearch](https://www.redislabs.com/redis-enterprise-documentation/developing/modules/redisearch/) - This module turns Redis Enterprise into a supercharged, distributed, in-memory, full-text indexing and search beast.
* [ReJSON](https://www.redislabs.com/redis-enterprise-documentation/developing/modules/rejson/) - Now you have the convenience of JSON as a built-in data type and can address nested data via a path easily.
* [ReBloom](https://www.redislabs.com/redis-enterprise-documentation/developing/modules/bloom-filters/) - Enables Redis Enterprise to have a scalable bloom filter as a data type. Bloom filters are probabilistic data structures that quickly determine if something is contained within a set.

**Custom Modules**

In addition, Redis Enterprise provides the ability to load and use custom modules from [redismodules.com](http://redismodules.com/) or of your own creation.

**LDAP Integration**

As part of our continued emphasis on security, administrative user accounts in Redis Enterprise can now either use built-in authentication or authenticate externally via LDAP with saslauthd. The accounts can be used for administering resources on the cluster through the command line, Rest API, or Web UI.

For more information, see [LDAP Integration](https://www.redislabs.com/redis-enterprise-documentation/administering/security/ldap-integration/).

**Additional Capabilities**

Support for additional Redis commands and features:

* Support for Redis v4.0.2

**Information**

* In the node bootstrap API, the structure of the JSON has changed for adding an external IP during the bootstrap process.

### v0.0.84

**Release Date:** December 1, 2017

Beta version of this tile with Support for Redis v4.0.2.

### v0.0.81

**Release Date:** June 15, 2017

Initial release of this tile.