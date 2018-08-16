---
Title: Causal Consistency in a Conflict-free Replicated Database (CRDB)
description: $description
weight: $weight
alwaysopen: false
---
[When enabling Causal Consistency in CRDBs, the order of operations on a
specific key will be maintained across all CRDB
instances.]{style="font-weight: 400;"}

[For instance, if operations A and B were applied on the same key, and B
was performed after the effect of A was observed by the CRDB Instance
that initiated B, then all CRDB instances would observe the effect of A
before observing the effect of B. This way, any causal relationship
between operations on the same key is also observed and maintained by
every replica.]{style="font-weight: 400;"}

### **Causal Consistency Side Effects**

[When the Causal Consistency option is enabled, each CRDB instance
should maintain and relay the order of operations it received from
another CRDB instance to all other N-2 CRDB instances, where N
represents the number of instances used by the
CRDB.]{style="font-weight: 400;"}

[As a result, network traffic is increased by a factor of (N-2). The
memory consumed by each CRDB instance and overall performance are also
impacted when Causal Consistency is
activated.]{style="font-weight: 400;"}

### **Enabling Causal Consistency**

[During the creation of a CRDB, the Causal Consistency parameter should
be set as illustrated in the figure below:]{style="font-weight: 400;"}

![](/images/rs/create_db_causal.png){.alignnone
.size-full .wp-image-38582 width="1050" height="930"}

[Once enabled, additional operations to
]{style="font-weight: 400;"}[enable or disable can only be performed
using the REST API or the crdb-cli tool. In this case, the updated CRDB
behavior will take place only for ]{style="font-weight: 400;"}[commands
and operations received after the
change]{style="font-weight: 400;"}[.]{style="font-weight: 400;"}
