---
Title: Redis Enterprise for VMWare Tanzu (TAS)
description:
weight: 99
alwaysopen: false
hidden: true
aliases: 
---

## Overview

Redis Enterprise clusters are enterprise-grade, highly available, and scalable Redis clusters with substantially lower operational overhead than any other Redis deployment method.

Redis Enterprise extends open source Redis and delivers tangible benefits of stable high performance, zero-downtime linear scaling, and hassle-free, true high availability, with significant operational savings.

This documentation describes Redis Enterprise for VMware Tanzu. Redis Enterprise for VMware Tanzu exposes its service plans on the Marketplace. Developers can provision highly available and scalable Redis databases by creating instances of the service plans using Apps Manager or the Cloud Foundry Command Line Interface (cf CLI).

## Requirements

Redis Enterprise for VMware Tanzu requires a valid license from Redis for the Redis Enterprise cluster.
Otherwise, you receive a thirty-day trial license by default.

## Additional documentation

- [Installing and Configuring for VMware Tanzu]({{<relref "/tas/installing">}})
- [Using Redis Enterprise for VMware Tanzu]({{<relref "/tas/using">}})
- [Redis Enterprise Modules on VMware Tanzu]({{<relref "/tas/modules">}})
- [Backing Up and Restoring for VMware Tanzu]({{<relref "/tas/backup">}})
- [Release notes 2022-2023](#release-notes)
- [Release notes 2017-2021]({{<relref "/tas/release-notes">}})

## Release notes

Redis Enterprise is an enterprise-grade cluster that acts as a container for managing and running multiple Redis databases in a highly available and scalable manner.

By default, a three-node Redis Enterprise cluster is deployed for you.

For specific information about Redis Enterprise, and to get started, see the [Redis Enterprise documentation](https://docs.redis.com/latest/rs/).

### 6.2.1865000003

**Release Date:** January 19, 2023

This release supersedes 6.2.1012900001 to include new features and bug fixes

**New Features**

- Support for Redis Enterprise Cluster 6.2.18-65
  - [Redis Enterprise 6.2.18-65 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-18/)

**Bug Fixes**

- Fix OpsMan upgrade/upgrade failures/stemcell update issues due to file mounting changes (RED-85514)

**Known Limitations**

- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)
- Tile restore operations might fail. A workaround is to run the join command manually (RED-76006)
- Delete crdb (active/active) from AppManager fails. Workaround - delete the instance manually using Redis Enterprise UI and then delete from the AppManager.

### 6.2.1012900001

**Release Date:** August 25, 2022

This release supersedes v6.2.109600003 to include new features and bug fixes

**New Features**
- Support for Redis Enterprise Cluster 6.2.10-129
  - [Redis Enterprise 6.2.10-129 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-10-february-2022/)

**Bug fixes**

- Fix upgrade failures when large AOF databases are in use (RED-75785)

**Known Limitations**

- A 'no-exec' directive was introduced for /var/opt directory in a previous release of the bosh agent. This resulted in some 621 stemcell minor versions preventing Redis Enterprise Software processes from executing. Redis Enterprise Software BOSH tile is strictly incopatible with stemcell minor 621.211. The issue was addressed in stemcell minor 621.224.
- When trying to add new peer to existing A-A (CRDB) deployment from App Manager, it creates a new A-A deployment
- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)
- Tile restore operations might fail. A workaround is to run the join command manually (RED-76006)

### 6.2.109600003

**Release Date:** April 14, 2022

This release supersedes v6.2.84100001 to include new features and bug fixes

**New Features**
- Support for Redis Enterprise Cluster 6.2.10-96
  - [Redis Enterprise 6.2.10-96 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-10-february-2022/)
- Added the ability to configure S3 URL for backup target in tile configuration (RED-71480)
- Added the ability to install a new Redis Enterprise Software license key in tile configuration (RED-71481)

**Bug fixes**

- Creating a database with Redis module/s fails (72868)
- Address breaking change in 621 stemcell and bosh agent that prevented Redis Enterprise Software processes from executing (RED-72869)

**Known Limitations**

- A 'no-exec' directive was introduced for /var/opt directory in a previous release of the bosh agent. This resulted in some 621 stemcell minor versions preventing Redis Enterprise Software processes from executing. Redis Enterprise Software BOSH tile is strictly incopatible with stemcell minor 621.211. The issue was addressed in stemcell minor 621.224.
- When trying to add new peer to existing A-A (CRDB) deployment from App Manager, it creates a new A-A deployment
- Cluster password **may not contain** the following characters:
  - ":" (colon)
  - " " (space)
  - "'" (single quote)
  - '"' (double quotes)

