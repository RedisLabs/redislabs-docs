---
Title: Redis Enterprise Service Broker for VMware Tanzu release notes
description:
weight: 91
alwaysopen: false
hidden: true
aliases: 
---

These are release notes for Redis Enterprise Service Broker for VMware Tanzu.

For related information see:

- [Redis Enterprise Service Broker for VMware Tanzu]({{<relref "/tas/service-broker/">}})
- [Installing and configuring the Redis Enterprise Service Broker for VMware Tanzu]({{<relref "/tas/service-broker/installing">}})

## 6.2.1865000003

**Release Date:** January 19, 2023

Features included in this release:

- Support for Redis Enterprise 6.2.18-65

## 6.2.1012900001

**Release Date:** August 25, 2022

Features included in this release:

- Support for Redis Enterprise 6.2.10-129

## 6.2.109600003

**Release Date:** April 14, 2022

Features included in this release:

- Support for Redis Enterprise 6.2.10-96

## 6.2.84100001

**Release Date:** Dec 23, 2021

Features included in this release:

- Support for TAS 2.12
- Support for Redis Enterprise 6.2.8-41

## v6.0.209700002

**Release Date:** Aug 17, 2021

Features included in this release:

- Support for LTS 1 - TAS 2.7; OpsMan 2.10
- Support for Redis Enterprise 6.0.20-97

## v6.0.206900001

**Release Date:** May 14, 2021

Features included in this release:

- Support for VMware Tanzu 2.11
- Support for Redis Enterprise 6.0.20-69

## v6.0.82800001

**Release Date:** December 18, 2020

Features included in this release:

- Support for VMware Tanzu 2.10
- Support for Redis Enterprise 6.0.8-28

## v6.0.63900002

**Release Date:** August 3, 2020

Features included in this release:

- Support for VMware Tanzu 2.9
- Support for Redis Enterprise 6.0.6-39

## v5.4.102200010

**Release Date:** February 21, 2020

Features included in this release:

- Support for VMware Tanzu 2.8

## v5.4.102200007

**Release Date:** December 14, 2019

Features included in this release:

- Support for Redis Enterprise 5.4.10-22
- Support for VMware Tanzu 2.7

## v5.4.40700169

**Release Date:** July 17, 2019

Features included in this release:

- Support for Redis Enterprise 5.4.4
- Support for VMware Tanzu 2.6

## v5.4.22700167

**Release Date:** July 17, 2019

Features included in this release:

- Move persistence away from stat.json and into bdb tags

## v5.4.22000163

**Release Date:** May 7, 2019

Features included in this release:

- Support for Xenial stemcells
- Support for Redis Enterprise 5.4.0, 5.4.2
- Update Redis Enterprise Service Broker to work with VMware Tanzu v2.5

Notes:

- This release of the Redis Enterprise Service Broker requires Redis Enterprise Cluster release 5.4.0 and above. Please upgrade existing clusters accordingly.
- When upgrading the tile, the cluster name configuration is removed. Please preserve the cluster name before the upgrade and reconfigure the upgraded tile.

## v5.2.000000054

**Release Date:** September 7, 2018

{{<note>}}Version numbers have changed to match the Redis Enterprise product versions.{{</note>}}

Features included in this release:

- Support for VMware Tanzu v2.3, as of November 1, 2018
- Update Redis Enterprise Service Broker to work with VMware Tanzu v2.2

## v5.2.000000053

**Release Date:** July 19, 2018

{{<note>}} Version numbers have changed to match the Redis Enterprise product versions.{{</note>}}

Features included in this release:

- Update Redis Enterprise Service Broker to work with Redis Enterprise Software v5.2.X

## v5.0.200000037

**Release Date:** May 2, 2018

{{<note>}} Version numbers have changed to match the Redis Enterprise product versions.{{</note>}}

Features included in this release:

- Fixed: Service-Broker Sub-Domain Form Validation

## v5.0.200000013

**Release Date:** March 20, 2018

{{<note>}} Version numbers have changed to match the Redis Enterprise product versions.{{</note>}}

Features included in this release:

- Update Redis Enterprise Service Broker to work with Redis Enterprise Software v5.0.x
- New look and feel to match BOSH tile release
- Support endpoint mode DBs
- VMware Tanzu/TAS for VMs v2.0 support

## v2.0.0

**Release Date:** September 14, 2017

Features included in this release:

- Redis Enterprise v5.0 is fully compatible with open source Redis v4.0.

## v1.6.5

**Release Date:** August 4, 2017

Features included in this release:

- Updated stemcell version.

## v1.6.4

**Release Date:** April 26, 2017

Features included in this release:

- Bug fixes and quality improvements.

## v1.6.3

**Release Date:** September 25, 2016

Features included in this release:

- The broker now returns the DNS endpoint of the redis db as 'host'.

## v1.0

**Release Date:** June 28, 2016

## v1.0 BETA

**Release Date:** May 25, 2016

Features included in this release:

- A service broker to connect Redis Enterprise, an enterprise-grade cluster that acts as a container for managing and running multiple Redis databases with VMware Tanzu.

