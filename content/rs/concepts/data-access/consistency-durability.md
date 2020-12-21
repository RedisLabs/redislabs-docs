---
Title: Consistency and Durability
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) comes with the ability to replicate data
to another slave for high availability and persist in-memory data on
disk permanently for durability. With the new WAIT command, you can
control the consistency and durability guarantees for the replicated and
persisted database in RS.

Any updates that are issued to the database are typically performed with
the following flow shown below;

1. Application issues a write,
1. Proxy communicates with the correct master "shard" in the system
    that contains the given key,
1. The acknowledgment is sent to proxy once the write operation
    completes
1. The proxy sends the acknowledgment back to the application.

Independently, the write is communicated from master to slave and
replication acknowledges the write back to the master. These are steps 5
and 6.

Independently, the write to a slave is also persisted to disk and
acknowledged within the slave. These are steps 7 and 8.

![Weak Consistency](/images/rs/weak-consistency.png)

With the new WAIT command, applications can ask to wait for
acknowledgments only after replication or persistence is confirmed on
the slave. The flow of a write operation with the WAIT command is
shown below:

1. Application issues a write,
1. Proxy communicates with the correct master "shard" in the system
    that contains the given key,
1. Replication communicated the update to the slave shard.
1. Slave persists the update to disk (assuming AOF every write setting
    is selected).
1. The acknowledgment is sent back from the slave all the way to the
    proxy with steps 5 to 8.

With this flow, the application only gets the acknowledgment from the
write after durability is achieved with replication to the slave and to
the persistent storage.

![Strong Consistency](/images/rs/strong-consistency.png)

With the WAIT command, applications can have a guarantee that even under
a node failure or node restart, an acknowledged write is recorded.

See the WAIT command for details on the new durability and
consistency options.
