---
Title: Recommendations for production environment configuration
linkTitle: Configuration recommendations
description: 
weight: 
alwaysopen: false
categories: ["Platforms"]
aliases: [
]  
---

## Quality of service

There are three Quality of Service classes you can assign to a pod when it's created: `Guaranteed`, `Burstable`, and `BestEffort`. The Quality of Service class determines which pods are evicted when node resources run out. Best practice for Redis Enterprise is to use the `Guaranteed` class. 

In a pod managed by the Redis Enterprise operator, every container needs the same memory limit or memory request. The same applies to the CPU limit and CPU requests. These settings are required to keep the Guaranteed Quality of Service and are set by default. If you make changes to the resources for Redis Enterprise, the services riggeer, or the bootstrapper, make sure these requirements are still met. This also applies to side containers running alongside Redis Enterprise.

## Priority class

high

## Dedicated resources

dedicated node pools

## Monitor resources

node conditions to watch: MemoryPressure and DiskPressure

## Eviction thresholds

high soft evcition threshold
high eviction-max-pod-grace-period
high eviction-soft-grace-period

## Resource limits

resource section in spec, operator has resource limits and requests, 
example shows operator defaults


## Pod security
