---
Title: Database metrics not collected during resharding
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/troubleshooting/database-metrics-blank-during-resharding.md,
    /rs/administering/troubleshooting/database-metrics-blank-during-resharding/,
    /rs/clusters/monitoring/database-metrics-blank-during-resharding.md,
    /rs/clusters/monitoring/database-metrics-blank-during-resharding/,

]
---
Because data is being moved around across shards during the resharding
process, it is impossible to report the values of some of the metrics in
an accurate manner. Therefore, several database metrics are not
collected, and as a result, the graph is blank when you view the
database or shard metrics.

Examples of metrics that are not collected during the resharding process
are:

- Used memory
- Memory usage
- Total keys
- Write misses/sec
- Read misses/sec
- Expired objects/sec
- Evicted objects/sec
- Incoming traffic
- Outgoing traffic
