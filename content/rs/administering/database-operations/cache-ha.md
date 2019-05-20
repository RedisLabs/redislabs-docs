---
Title: High Availability for Cache Databases
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
draft: true
---
### Cache databases

When slave HA is enabled for a [non-persistent database]({{< relref "/rs/concepts/data-access/persistence.md" >}})
that does not have any slave shards (for example, a cache database),
the failover creates a new master on an available node. The data from the original master
is lost but the new master is available for new transactions.

### Persistent databases

When slave HA is enabled for a [persistent database]({{< relref "/rs/concepts/data-access/persistence.md" >}}), the slave shard is not migrated to
an available node in order to avoid data loss.