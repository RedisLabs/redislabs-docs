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
Redis Enterprise Software uses various algorithms to optimize
performance. As part of this process, Redis Enterprise Software examines usage
and load to adjust its runtime configuration. Depending
on your specific usage and load, Redis Enterprise Software might take some
time to adjust for optimal performance.

To ensure optimal performance, you must run your workload several times
and for a long duration until performance stabilizes.

## Failure detection sensitivity policies

You can optimize your cluster's thresholds and timeouts for different environments using the `failure_detection_sensitivity` cluster policy:

- `high` (previously known as `local-network watchdog_profile`) – high failure detection sensitivity, lower thresholds, and faster failure detection and failover

- `low` (previously known as `cloud watchdog_profile`) – low failure detection sensitivity and higher tolerance for latency variance (also called network jitter)

Depending on which policy you choose, Redis Enterprise Software uses different
thresholds to make operation-related decisions.

The default policy is `high` failure detection sensitivity for `local-network` environments. If you are
running Redis Enterprise in a cloud environment, you should change the
configuration.

## Change failure detection sensitivity

To change the cluster's `failure_detection_sensitivity`, run one of the following [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}) commands.

- For Redis Enterprise Software version 6.4.2-TBA and later, run:

    ```sh
    rladmin tune cluster failure_detection_sensitivity [ low | high ]
    ```

- For Redis Enterprise Software version 6.4.2-61 and earlier, run:

    ```sh
    rladmin tune cluster watchdog_profile [ cloud | local-network ]
    ```

If Redis Enterprise Software still
does not meet your performance expectations after following these instructions, [contact support](https://redis.com/company/support/) for help optimizing your environment.
