---
Title: Viewing cluster metrics on Redis Enterprise Software (RS)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
On the **Cluster \> Metrics** page you can view detailed real-time
graphs of various metrics for the entire cluster, as well as specific
nodes.

You can choose which resources and metric to display in each of the two
detailed graphs at the top of the page, as follows:

- Below the top two graphs there are two groups of smaller graphs:
  - The first group displays all available **resources**: the
        cluster itself, and each of the cluster nodes.
  - The second group displays all available **metrics**, such as CPU
        utilization and operations per second.
- In each of the **resources** graphs, clicking the left arrow
    displays that resource in the top left graph. Clicking the right
    arrow displays that resource in the top right graph.
- In each of the **metrics** graphs, you can choose which metric to
    display for the two selected resources.

Thus, you can compare the same metric for two different resources.

In addition, the scale selector at the top of the page allows you to set
the scale of the graphs' X-axis (time).

If you need, there is a [definition of each
metric]({{< relref "/rs/administering/monitoring-metrics/definitions.md" >}}).
