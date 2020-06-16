---
Title: Monitoring and Metrics
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
On the **Database > Metrics** page you can view detailed real-time
graphs of various database metrics, as well as shard-related metrics.

## Cluster metrics

On the **Cluster > Metrics** page you can view detailed real-time
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

## Node metrics

On the **Node > Metrics** page you can view detailed graphs of various
node metrics in real-time.

You can choose which metrics are shown in each of the two graphs at the
top of the page, as follows:

- Below the top two graphs there is a group of smaller graphs that
    displays all available **metrics**, such as CPU utilization and
    operations per second.
- In each of the bottom graphs, clicking the left arrow displays that
    metric in the top left graph, while clicking the right arrow
    displays that metric in the top right graph.

In addition, the scale selector at the top of the page allows you to set
the scale of the graphs' X-axis (time).

## Database metrics

You can choose which metrics are shown in each of the two detailed
graphs at the top of the page, as follows:

- Below the top two graphs there is a group of smaller graphs that
    display all available metrics, such as CPU utilization and
    operations per second.
- In each of the bottom graphs, you can click the left arrow to
    display that metric in the top left graph, and the right arrow to
    display that metric in the top right graph.

In addition, the scale selector at the top of the page allows you to set
the scale of the graphs' X-axis (time).

## Shards metrics

You can choose which resources and metrics are shown in each of the
two detailed graphs at the top of the page, as follows:

- Below the top two graphs there are two groups of smaller graphs:
    - The first group displays all available **resources**: the
        database itself, and each of the database shards. These can be
        master shards, slave shards (if [Database
        replication]({{< relref "/rs/concepts/high-availability/replication.md" >}}) is
        enabled), or shards that take part of a clustered database (for
        additional details, refer to [Database
        clustering]({{< relref "/rs/administering/cluster-operations/new-cluster-setup.md" >}}).
        The shard name refers to the shard role (whether master or
        slave).
        Each small shard graph also lists the node it is located on, and
        the hash slot to which it is mapped, if it is part of a
        clustered database.
        Note that corresponding master / slave shards in a clustered
        database have the same hash slot.
    - The second group displays all available **metrics**, such as
        operations per second and used memory.
- In each of the **resources **graphs, you can click the left arrow to
    display that resource in the top left graph, and the right arrow to
    display that resource in the top right graph.
- In each of the **metrics **graphs, you can click the left arrow to
    display that metric in the top left graph, and the right arrow to
    display that metric in the top right graph.

In addition, the scale selector at the top of the page allows you to set
the scale of the graphs' X-axis (time).
