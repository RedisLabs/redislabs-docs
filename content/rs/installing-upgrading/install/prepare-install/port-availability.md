---
Title: Ensure port availability
linkTitle: Ensure port availability
description: Make sure required ports are available.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: 
---

Before [installing Redis Enterprise Software]({{<relref "/rs/installing-upgrading/install">}}), make sure all required ports are available.

{{<embed-md "port-availability.md">}}

## Update `sysctl.conf` to avoid port collisions

{{<embed-md "port-collision-avoidance.md">}}

## Ubuntu conflicts with port 53

{{<embed-md "port-53.md">}}
