---
Title: Shards metrics
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can choose which resources and metrics are shown in each of the
two detailed graphs at the top of the page, as follows:

- Below the top two graphs there are two groups of smaller graphs:
    - The first group displays all available **resources**: the
        database itself, and each of the database shards. These can be
        master shards, slave shards (if [Database
        replication]({{< relref "/rs/concepts/high-availability/replication.md" >}}) is
        enabled), or shards that take part of a clustered database (for
        additional details, refer to [Database
        clustering]({{< relref "/rs/administering/new-cluster-setup.md" >}}).
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
