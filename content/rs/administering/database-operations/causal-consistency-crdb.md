---
Title: Causal Consistency in a Active-Active Databases
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When enabling Causal Consistency in Active-Active databases, the order of operations on a
specific key are maintained across all Active-Active database
instances.

For instance, if operations A and B were applied on the same key, and B
was performed after the effect of A was observed by the Active-Active database Instance
that initiated B, then all Active-Active database instances would observe the effect of A
before observing the effect of B. This way, any causal relationship
between operations on the same key is also observed and maintained by
every replica.

### **Causal Consistency Side Effects**

When the Causal Consistency option is enabled, each Active-Active database instance
should maintain and relay the order of operations it received from
another Active-Active database instance to all other N-2 Active-Active database instances, where N
represents the number of instances used by the
Active-Active database.

As a result, network traffic is increased by a factor of (N-2). The
memory consumed by each Active-Active database instance and overall performance are also
impacted when Causal Consistency is
activated.

### **Enabling Causal Consistency**

During the creation of an Active-Active database, the Causal Consistency parameter should
be set as illustrated in the figure below:

![create_db_causal](/images/rs/create_db_causal.png?width=1050&height=930)

Once enabled, additional operations to
enable or disable can only be performed
using the REST API or the crdb-cli tool. In this case, the updated Active-Active database
behavior happens only for commands
and operations received after the
change.
