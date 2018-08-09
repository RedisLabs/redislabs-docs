---
Title: Updating database configuration
description: $description
weight: $weight
alwaysopen: false
---
[You can change the configuration of a Redis Enterprise Software
database at any time.]{style="font-weight: 400;"}

[To edit the configuration of a database:]{style="font-weight: 400;"}

1.  [Click the relevant database row on the Databases page. The selected
    database page appears.]{style="font-weight: 400;"}
2.  [Select the Configuration tab.]{style="font-weight: 400;"}
3.  [Click Edit at the bottom of the page.]{style="font-weight: 400;"}
4.  [The database settings appear. You can edit any of the configurable
    parameters. For explanation, refer to
    ]{style="font-weight: 400;"}[[Creating a new
    database]{style="font-weight: 400;"}](https://redislabs.com/redis-enterprise-documentation/administering/database-operations/creating-database/)[.]{style="font-weight: 400;"}
5.  [Click Update.]{style="font-weight: 400;"}

 

**Updating CRDB configuration**

[A Conflict-Free Replicated Database (CRDB) is a global database that
spans multiple Redis Enterprise clusters called
]{style="font-weight: 400;"}**Participating Clusters**[ and is made up
of individual database instances. When creating a new CRDB you must
configure which Participating Clusters are to host instances of the
CRDB. However when updating database configurations with CRDB, most
database settings only apply to the local CRDB instance configuration.
Changes done to "Memory limit", "Data persistence", "Redis password",
"Number of Shards", or "SSL Mode" and "Periodic backup" are only applied
to the local CRDB instance and not applied to all Participating
Clusters.]{style="font-weight: 400;"}

 

**Participating Clusters**

[If the CRDB topology needs to change, you can add and remove
Participating Clusters of a CRDB. Use the Participating Clusters list to
manage the changes to CRDB topology in the UI. You can make one or more
changes at any one time to the Participating Cluster list. The changes
you make to the list are committed when the database configuration is
saved.]{style="font-weight: 400;"}

![](https://redislabs.com/wp-content/uploads/2014/12/pasted-image-0-1.png){.alignnone
.size-full .wp-image-37257 width="1534" height="233"}

[When adding new Participating Clusters, a CRDB requires that all
existing participating clusters are online and in a syncing state. If
you need to remove one or more offline Participating Clusters, all
remaining Participating Clusters need to be online and in a syncing
state. ]{style="font-weight: 400;"}

[After any new Participating Clusters are added to an existing CRDB, the
new CRDB instance does allow connections and read operations, however it
does not allow write operations until it catches up to the syncing
state.]{style="font-weight: 400;"}

[It is recommended that removals are done when all Participating
Clusters of the CRDB are online. However it is possible to remove
offline Participating Clusters using forced removal. Participating
Cluster removed forcefully may later resurrect back to life. However the
forcefully removed Participating Cluster will be out of date on CRDB
membership. Even though, it still thinks it is part of the CRDBonce a
Participating Cluster is removed, all updates received by remaining CRDB
Instances from the removed CRDB instance, are
rejected.]{style="font-weight: 400;"}

 

**SSL Authentication and Encryption**

[When creating CRDBs, you can specify SSL in two
ways:]{style="font-weight: 400;"}

1.  [Require SSL for All Communications -- This configures the CRDB to
    support SSL for both data access operations performed on the
    database as well as inter-cluster CRDB
    communications.]{style="font-weight: 400;"}
2.  [Require SSL for CRDB Communications Only -- This configures the
    CRDB to support SSL for only inter-cluster CRDB
    communications.]{style="font-weight: 400;"}

[To enable SSL for all communication between Participating Clusters,
select the ]{style="font-weight: 400;"}**Require SSL for all
communications**[ from the ]{style="font-weight: 400;"}**SSL
Authentication**[ drop down.]{style="font-weight: 400;"}

![](https://redislabs.com/wp-content/uploads/2014/12/pasted-image-SSL.png){.alignnone
.size-full .wp-image-37258 width="1080" height="1221"}

 
