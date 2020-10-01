---
Title: Active-Active Region Application Failover
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/developing/crdbs/region-application-failover-active-active/
---
Active-Active Redis deployments use a leader-less replication architecture that doesn't have a built-in failover or failback mechanism.
An application deployed with an Active-Active database connects to a replica of the database that is geographically nearby.
If that replica is not available, the application can failover to a remote replica, and failback again if necessary.
In this article we explain how this process works.

Active-Active connection failover can improve data availability, but can negatively impact data consistency.
Active-Active replication, like Redis replication, is asynchronous.
An application that fails over to another replica can miss write operations.
If the failed replica saved the write operations in persistent storage,
then the write operations are processed when the failed replica recovers.

## Detecting Failure

There are two principle types of failure an application can detect:

1. **Local failures** - The local replica is down or otherwise unavailable
1. **Replication failures** - The local replica is available but fails to replicate writes to or from remote replicas

### Local Failures

Local failure detection is when the application is unable to connect to the Redis endpoint for any reason, for example: multiple node failures, configuration errors, connection refused, connection timed out, unexpected protocol level errors.

### Replication Failures

Replication failures are more difficult to detect reliably without causing false positives. Replication failures can include: network split, replication configuration issues, remote replica failures.

The most reliable method for health-checking replication is by using the Redis publish/subscribe (pub/sub) mechanism.

{{< note >}}
Note that this document does not suggest that Redis pub/sub is reliable in the common sense. Messages can get lost in certain conditions, but that is acceptable in this case because typically the application determines that replication is down only after not being able to deliver a number of messages over a period of time.
{{< /note >}}

When you use the pub/sub data type to detect failures:

1. The application establishes a connection to all replicas and subscribes to a dedicated per-replica channel.
1. The application establishes another connection to all replicas and periodically publishes a uniquely identifiable message.
1. The application monitors received messages and ensures that it is able to receive its own messages within a predetermined window of time.

You can also rely on known dataset changes to monitor the reliability of the replication stream,
but pub/sub is preferred method because:

1. It does not involve dataset changes.
1. It does not make any assumptions about the dataset.
1. In certain cases dataset keys may appear to be modified even though the replication link fails. This happens because keys may receive updates either through full-state replication (re-sync) or through online replication of effects. Pub/sub messages, however, are only delivered as replicated effects and are therefore a more reliable indicator of a live replication link.

## Impact of sharding on failure detection

Because shards are replicated individually and replication can fail for a specific shard or set of shards,
it’s necessary to use multiple keys (PUB/SUB channels, or real dataset keys) and that there will be at least one key per shard.

{{< note >}}
This is true when sharding configuration is symmetric, meaning that all replicas have the same number of shards and hash slots assignment.
If the sharding configuration is not symmetric, then it’s necessary to make sure that there is at least one key per hash slot that intersects a pair of source/target shards.
Because this is complex, we recommend against using non-symmetric configurations in a fail-over/fail-back mechanism.
{{< /note >}}

To make sure that there is at least one key per shard, the application should:

1. Use the Cluster API to retrieve the database sharding configuration.
1. Compute a number of key names, such that there is one key per shard.
1. Use those key names as channel names for the pub/sub mechanism.

### Failing over

When the application has determined it needs to fail over to another replica, it should simply re-establish its connections with the remote replica’s endpoint.

{{< note >}}
Sample code that maps a hash slot to a key name can be found in this Python script.
{{< /note >}}

Note that the remote endpoint may not have received all locally performed and acknowledged writes, due to the asynchronous nature of Active/Active and Redis replication. The application should therefore be resilient against not reading its own recent writes. Those writes may either be:

1. Lost forever, if the local replica has experienced double failure, loss of persistent files, etc.
1. Temporarily unavailable, but will converge and show up at a later time if the local replica only experiences a temporary failure and still maintains a copy of this data in memory or as persistent files.

## Fail-back Decision

The application may choose the same liveness checks described above to continue monitoring the state of the failed replica after fail-over.
Failing back is a more involved process: it is not enough for the local replica to be available, but we must also make sure it has successfully re-synced with remote replicas and that it is not in stale mode.
The PUB/SUB mechanism described above is an effective way to determine that a replica is available and not stale.
Dataset-based mechanisms are potentially less reliable for several reasons:

1. In order to determine that a local replica is not stale, it is not enough to simply read keys from it; it is also necessary to attempt to write to it.
1. As stated above, remote writes for some keys may appear in the local replica before the replication link is back up and while the replica is still in stale mode.
1. A replica that has never been written to will never become stale, so on startup it will be immediately ready but serve stale data for a longer period of time.

## Replica Configuration Changes

All fail-over and fail-back operations should be done strictly on the application side, and should not involve changes to the Active-Active configuration.
The only valid case for re-configuring the Active-Active deployment and removing a replica is when memory consumption becomes too high as garbage collection cannot be performed.
Once a replica has been removed, it can only be re-joined as a new fresh replica thereby losing any writes that were not converged.
