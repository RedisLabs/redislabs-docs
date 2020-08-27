---
Title: Causal Consistency in a Conflict-free Replicated Database (CRDB)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you enable Causal Consistency in Active-Active databases,
the order of operations on a specific key are maintained across all Active-Active database instances.

For instance, if operations A and B were applied on the same key and the effect of A was observed by the instance that initiated B before B was applied to the key,
then all instances of an Active-Active databases would observe the effect of A before observing the effect of B.
This way, any causal relationship between operations on the same key is also observed and maintained by every replica.

### Causal consistency side effects

When the Causal Consistency option is enabled, each instance maintains the order of operations it received from another instance
and relays that information to all other N-2 instances,
where N represents the number of instances used by the Active-Active database.

As a result, network traffic is increased by a factor of (N-2).
The memory consumed by each instance and overall performance are also impacted when Causal Consistency is activated.

### Enabling causal consistency

When you create an Active-Active database, Causal Consistency is set as:

![create_db_causal](/images/rs/create_db_causal.png?width=1050&height=930)

Once enabled, additional operations to enable or disable can only be performed using the REST API or the crdb-cli tool.
In this case, the updated Active-Active database behavior happens only for commands and operations received after the change.
