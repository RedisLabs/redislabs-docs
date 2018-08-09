---
Title: Consistency and Durability
description: $description
weight: $weight
alwaysopen: false
---
Redis Enterprise Software (RES) comes with the ability to replicate data
to another slave for high availability and persist in-memory data on
disk permanently for durability. With the new WAIT command, you can
control the consistency and durability guarantees for the replicated and
persisted database in RES.

Any updates that are issued to the database are typically performed with
the following flow depicted below;

1.  Application issues a write,
2.  Proxy communicates with the correct master "shard" in the system
    that contains the given key,
3.  The acknowledgment is sent to proxy once the write operation
    completes
4.  The proxy sends the acknowledgment back to the application.

Independently, the write is communicated from master to slave and
replication acknowledges the write back to the master. These are steps 5
and 6.

Independently, the write to a slave is also persisted to disk and
acknowledged within the slave. These are steps 7 and 8.

![Weak
Consistency](/wp-content/uploads/2016/12/weak_consistency-300x161.png){.alignnone
.wp-image-21386 width="440" height="236"
sizes="(max-width: 440px) 100vw, 440px"
srcset="https://redislabs.com/wp-content/uploads/2016/12/weak_consistency-300x161.png 300w, https://redislabs.com/wp-content/uploads/2016/12/weak_consistency.png 683w"}

With the new WAIT command, applications can ask to wait for
acknowledgments only after replication or persistence is confirmed on
the slave. The flow of a write operation with the WAIT command is
depicted below:

1.  Application issues a write,
2.  Proxy communicates with the correct master "shard" in the system
    that contains the given key,
3.  Replication communicated the update to the slave shard.
4.  Slave persists the update to disk (assuming AOF every write setting
    is selected).
5.  The acknowledgment is sent back from the slave all the way to the
    proxy with steps 5 to 8.

With this flow, the application only gets the acknowledgment from the
write after durability is achieved with replication to the slave and to
the persistent storage.

![Strong
Consistency](/wp-content/uploads/2016/12/strong_consistency-300x156.png){.alignnone
.wp-image-21385 width="423" height="220"
sizes="(max-width: 423px) 100vw, 423px"
srcset="https://redislabs.com/wp-content/uploads/2016/12/strong_consistency-300x156.png 300w, https://redislabs.com/wp-content/uploads/2016/12/strong_consistency.png 702w"}

With the WAIT command, applications can have a guarantee that even under
a node failure or node restart, an acknowledged write will be present in
the system and will not be lost.

Please see the WAIT command for details on the new durability and
consistency options.
