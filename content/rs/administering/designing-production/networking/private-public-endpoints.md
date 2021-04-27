---
title: Private and Public Endpoints on Redis Enterprise Software
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The cluster can be configured to support both private and public IPs to
connect to database endpoints through both public and private networks.

In certain environments, and especially in cloud platforms, an instance
can have both:

- A private IP address that can be used only from within the internal
    network
- Public IP addresses that can be used from the public network
    (Internet)

In this case, it is possible to configure Redis Enterprise Software to
expose two sets of database endpoints in order to connect to the
database through both the private and the public IP addresses.

To enable this configuration you need to:

- Make sure that the IPs are already bound to the server/instance.
- Enable private and public endpoint support when the cluster is created, or
    use rladmin to enable support for an existing cluster.
- Configure public IP of the machine to be used for external traffic
    in the node configuration.
- Configure private IP to be used for both internal and external
    traffic in the node configuration so it can be used for private
    database endpoints.

Once this configuration is in place, both sets of endpoints are
available for the databases in the cluster.

## Modifying an existing cluster

You can enable it by using the ***rladmin suffix add*** command.

To add an internal FQDN/IP to a cluster:

```sh
rladmin suffix add name <internal.clustername.domain.com> internal
```

To add an internal FQDN/IP to a cluster, but signal to the cluster there
is slave for DNS:

```sh
rladmin suffix add name <internal.clustername.domain.com> internal slave 10.0.1.1
```
