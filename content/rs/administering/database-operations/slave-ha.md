---
Title: High Availability for Slave Shards
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Motivation
Before this project, when a node fails the cluster does not attempt to relocate the slaves from failed node to another node (even if there is plenty of room).

We need to enable high availability slaves, without potentially triggering cascading failures.

HA slaves makes our software product more stable, as it could handle outages and changes more gracefully.

This could translate to sales advantage, and ease operations.

Slave High Availability Mechanism
Say we have a green, happy cluster, with one replicated, non-sharded DB.

Say node:2 has the master shard, and node:3 holds the slave.

Say node:2 fails. this will trigger a failover - the slave shard on node:3 is promoted to master.

So far, we haven't used the slaveHA mechanism.

At this point, node:2 is in failed state, and so is it's shard.

SlaveHA mechanism on master node notes the death of node (using cluster_wd).

After grace period (configurable), SlaveHA mechanism on master node triggers the move of shards on failed node, to another node.

In this instance, slave shard is moved to node:1, as it has the resources, and does not hold the master shard for the same DB.



Not Just Slaves 
the feature is named slaveHA, but actually it can relocate master shards of cache DBs.

if a DB is not replicated and not persisted, it is considered a cache DB.

we relocate master shards of such DBs because:

if a master shard of such a DB resides in a dead node, DB is unusable.
though moving it will cause data loss, DB is not replicated and not persisted, therefore user may not expect data persistence.
Feature Toggle
Feature may be enabled and disabled at cluster and DB level.
Currently, the default values are disabled at cluster level but enabled at db level, so if user enables the feature at cluster level,

all DBs will have the feature enabled unless specified differently for a specific db explicitly.

Feature must be enabled at cluster level in order for the mechanism to work.

Feature can be enabled/disabled via rladmin:

rladmin tune cluster slave_ha <enabled\disabled>

rladmin tune db <bdb_uid> slave_ha <enabled\disabled>

DB toggle may also be edited via API, as part of BDB.

Grace Period
The time between when cluster_wd on master node declares a node has failed, and when slave_ha starts moving shards

The point of grace period is to prevent slaveHA from running:

 when a node is temporarily marked unavailable by cluster_wd, and springs back to life pretty quick.
when a user does some maintenance work on one of the nodes.
grace period is configurable, using rladmin - rladmin tune cluster slave_ha_grace_period <positive integer>

Paz comments that we may need slave HA to work also during node maintenance for HA purposes, this will include shortening the grace period. In such case, we will have to make sure that the effect of such operation over the cluster is minimal (limit bandwidth etc.).

DB SlaveHA Priority
When relocating shards from a dead node, slaveHA will move DBs by the order of their priority.

DBs are prioritized in this order:

slave_ha_priority - by default 0. user may change this to any positive integer, to override the whole priority mechanism
rladmin tune db <bdb_uid> slave_ha_priority <positive integer>
is_crdt - crdt DBs are a high priority, since their regional replication is critical, and relies on a working slave.
is_cache - DBs that are not replicated and not persisted are prioritised. see see explanation above
negative_size - the smaller the DB, the easier it is to move, so we move the smaller DBs first.
bdb_uid - as a tie breaker, higher uid means a higher priority.
Cooldown Periods
To prevent cascading failure, a two level cooldown period was implemented (node and DB).

When a failed node undergoes shard relocation, the start time is marked in CCS, in cluster key, in fields: slave_ha_last_relocation_time  and slave_ha_last_relocated_node.

Until cluster cooldown period has passed, no other node may undergo shard relocation.

Also, when DB is relocated, the start time is marked in CCS, in BDB key, in field slave_ha_last_relocation_time.

Until DB cooldown has passed, the DB may not be relocated again, from another node. 

DB cooldown should be much longer than cluster cooldown, to prevent a "node killing shard" from moving through cluster nodes, killing them in the process.

Cooldown periods are configurable via rladmin.

Constraints
When relocating shards, slaveHA mechanism uses the planner.

Therefore, any planner constraints are respected by default.

In ticket RED-20305, we will consider relaxing some of the constraints (only in slaveHA).

Specifically, we are considering relaxing the rack awareness constraint.

If a cluster is rack aware, it is likely that a shard won't have a node to relocate to in the same rack, since we usually don't have many nodes per rack.

It may be unreasonable to expect customer to buy that much hardware, just to prevent a temporary violation of rack awareness constraint. 
Paz is against relaxing constraints like rack-awareness, otherwise, it will be very difficult to manage and trust clusters.

Alerts
Email alerts are sent in the following scenarios (and written to event_log.log):

Database relocation fails in planner stage (missing memory resources) - this is a db-level alert. This is a throttled event that will be reported once in an hour(since if db relocation fails it will probably keep failing for some time when we retry the relocation)
When a node fails, grace period passes, and relocation begins
When a node fails but relocation of shards from this node is suspended due to cluster cooldown period (there was another node relocation before and cooldown period didn't pass yes) 
This does not appear in the UI at this point.