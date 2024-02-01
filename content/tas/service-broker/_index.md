---
Title: Redis Enterprise Service Broker for VMware Tanzu
description:
weight: 99
alwaysopen: false
hidden: true
aliases: 
---

This documentation describes the Redis Enterprise Service Broker for VMware Tanzu. The Redis Enterprise Service Broker registers a service broker on VMware Tanzu and exposes its service plans on the Marketplace. Developers can provision Redis databases by creating instances of the service plans using Apps Manager or the Cloud Foundry Command Line Interface (cf CLI).

For related information see:

- [Installing and configuring the Redis Enterprise Service Broker for VMware Tanzu]({{<relref "/tas/service-broker/installing">}})
- [Redis Enterprise Service Broker for VMware Tanzu release notes]({{<relref "/tas/service-broker/release-notes">}})

## Overview

Redis Enterprise is an enterprise-grade cluster that acts as a container for managing and running multiple Redis databases in a highly available and scalable manner.

The Redis Enterprise Service Broker exposes four service plans on the Marketplace. The service plans correspond to the following preconfigured database plans:

* Simple Redis database: a single master shard.
* Highly-available Redis database: master/slave shards or master/multi-slave shards.
* Redis clustered database: multiple master shards.
* Highly-available Redis clustered database: multiple master shards each with its own slave shard, or multiple master/multi-slave shards.

For more information, see the [Redis Enterprise documentation](https://docs.redis.com/latest/rs/).

## Product Snapshot

The following table provides version and version-support information about Redis Enterprise Service Broker for VMware Tanzu.

| **Version** | **6.2.1012900001** |
|---|---|
| **Release date** | Aug 25, 2022 |
| **Software component version** | vRedis Enterprise v6.2.10-129 |
| **Compatible Ops Manager version(s)** | v2.10.x |
| **Compatible VMware Tanzu Application Service for VMs version(s)** | v2.7.x, v2.10.x, v2.11.x, v2.12.x and v2.13.x |
| **BOSH stemcell version** | Ubuntu Xenial 621 |
| **IaaS support** | AWS and vSphere |

## Requirements

To use the Redis Enterprise Service Broker for VMware Tanzu, you must have an RS cluster already deployed. To do this, see the [Installing and Configuring the Redis Enterprise Service Broker]({{<relref "/tas/service-broker/installing">}}) topic for more information.

Redis Enterprise Service for VMware Tanzu requires a valid license from Redis for the Redis Enterprise cluster.

## Feedback

Please provide any bugs, feature requests, or questions to the [VMware Tanzu Feedback](mailto:pivotal-cf-feedback@pivotal.io) list or send an email to support@redis.com.

## Limitations

At this time, Redis Enterprise Service for VMware Tanzu is limited to one cluster per deployment.

## Release Notes

This release of the Redis Enterprise Service Broker requires Redis Enterprise Cluster release 6.0 and above.
Support for Xenial Stemcells has been added with this release.

## License

If you are interested in using Redis Enterprise, go to [redis.com](https://redis.com/redis-enterprise-software/overview/). You are welcome to use Redis Enterprise under the trial license limitations. To obtain a production license and support, contact a Redis sales representative at sales@redis.com.
