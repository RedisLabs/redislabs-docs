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

## Database ports

Make sure that the ports [Redis assigns to databases]({{< relref "/rs/networking/port-configurations.md" >}}) are available and are not being used by the operating system or other processes.

To avoid port collision, update `/etc/sysctl.conf` to include:

``` sh
net.ipv4.ip_local_port_range = 30000 65535
```

## Port 53

{{<embed-md "port-53.md">}}
