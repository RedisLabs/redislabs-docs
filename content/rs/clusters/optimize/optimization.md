---
Title: Cluster environment optimization
linktitle: Environment optimization
description: Optimize your cluster environments for better performance.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/performance/optimization.md,
    /rs/administering/designing-production/performance/optimization/,
    /rs/clusters/optimize/optimization.md,
    /rs/clusters/optimize/optimization/,
]
---
Redis Enterprise Software employs various algorithms to optimize
performance. As part of this process, Redis Enterprise Software examines usage characteristics
and load to adjust its run-time configuration accordingly. Depending
on your specific usage characteristics and load, it might take Redis Enterprise Software some
time to adjust itself to optimal performance.

To ensure optimal performance, you must run your workload several times
and for a long duration until performance stabilizes.

In addition, you can optimize your cluster for two different environments:

- Local-network environment
- Cloud environment

Depending on which configuration you choose, Redis Enterprise Software uses different
thresholds to make operation related decisions.

The default configuration is for local-network environments. If you are
running in a cloud environment, it is advisable that you change the
configuration.

## How to change the cluster environment configuration

In the `rladmin` command-line interface (CLI), run the following command:

```sh
rladmin tune cluster watchdog_profile [cloud | local-network]
```

If after following all of the instructions above, you find that RS still
does not meet your performance expectations, contact us
at <support@redislabs.com> to help you optimize RS to your specific
needs.
