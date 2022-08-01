---
Title: Enable causal consistency in an Active-Active database
linkTitle: Enable causal consistency
description: 
weight: 85
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/causal-consistency-crdb/,
    /rs/databases/active-active/causal-consistency-crdb.md,
    /rs/databases/active-active/causal-consistency-crdb/,
]
---
When you enable causal consistency in Active-Active databases,
the order of operations on a specific key are maintained across all Active-Active database instances.<!--more--> [comment] <> : (What happens if it's left at default? What is the default? Why would you change it?)

For example, if operations A and B were applied on the same key and the effect of A was observed by the instance that initiated B before B was applied to the key.
All instances of an Active-Active databases would then observe the effect of A before observing the effect of B.
This way, any causal relationship between operations on the same key is also observed and maintained by every replica.

### Enable causal consistency

When you create an Active-Active database, casual consistency is set as:

![create_db_causal](/images/rs/create_db_causal.png)

Once enabled, additional operations to enable or disable can only be performed using the REST API or the `crdb-cli` tool. 
[comment] <> : (Link to commands in crdb-cli and rest api reference)
In this case, the updated Active-Active database behavior happens only for commands and operations received after the change.


### Causal consistency side effects

When the causal consistency option is enabled, each instance maintains the order of operations it received from another instance
and relays that information to all other N-2 instances,
where N represents the number of instances used by the Active-Active database.

As a result, network traffic is increased by a factor of (N-2).
The memory consumed by each instance and overall performance are also impacted when causal consistency is activated.

### Enable causal consistency

When you create an Active-Active database, casual consistency is set as:

![create_db_causal](/images/rs/create_db_causal.png)

Once enabled, additional operations to enable or disable can only be performed using the REST API or the crdb-cli tool.
In this case, the updated Active-Active database behavior happens only for commands and operations received after the change.
