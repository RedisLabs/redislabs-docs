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

rec Quality of Service class : guaranteed

## Priority class

high

## Node pools

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
