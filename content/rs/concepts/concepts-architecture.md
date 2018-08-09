---
Title: Concepts and Architecture
description: $description
weight: $weight
alwaysopen: false
---
A Redis Enterprise cluster is composed of identical nodes that are
deployed within a data center or stretched across local availability
zones. Redis Enterprise architecture is made up of a management path
(depicted in the blue layer in Figure 1 below) and data access path
(depicted in the red layer in Figure 1 below).

-   Management path includes the cluster manager, proxy and secure REST
    API/UI for programmatic administration. In short, cluster manager is
    responsible for orchestrating the cluster, placement of database
    shards as well as detecting and mitigating failures. Proxy helps
    scale connection management.
-   Data Access path is composed of master and slave Redis shards.
    Clients perform data operations on the master shard. Master shards
    maintain slave shards using the in-memory replication for protection
    against failures that may render master shard inaccessible.

![Redis Enterprise
Stack](/wp-content/uploads/2016/07/rp_stack.png){.alignnone .size-full
.wp-image-29457 width="700" height="319"}

*Figure 1*\
*Redis Enterprise Nodes with blue layer representing the management path
and red tiles representing the data access path with Redis as the
shards.*

More Information
----------------

This section contains pages that explain the main concepts Redis
Enterprise Software is built around, as well as the Architecture it
utilizes and provides to solve real problems.

  ------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------
  **General**                                                                                                        **High Availability**                                                                                                 **Data Access Architecture**                                                                                              **Memory Architecture**
  [Architecture overview](/redis-enterprise-documentation/concepts-architecture/overview/)                           [Clustering](/redis-enterprise-documentation/concepts-architecture/high-availability/clustering/)                     [Consistency and Durability](/redis-enterprise-documentation/concepts-architecture/data-access/consistency-durability/)   [Memory Management](/redis-enterprise-documentation/concepts-architecture/memory-architecture/memory-management/)
  [Geo-distributed Active-Active](/redis-enterprise-documentation/concepts-architecture/intercluster-replication/)   [Rack/Zone Awareness](/redis-enterprise-documentation/concepts-architecture/high-availability/rack-zone-awareness/)   [Cluster API](/redis-enterprise-documentation/concepts-architecture/data-access/cluster-api/)                             [Redis on Flash](/redis-enterprise-documentation/concepts-architecture/memory-architecture/redis-enterprise-flash/)
  [Terminology](/redis-enterprise-documentation/concepts-architecture/terminology/)                                  [Database Replication](/redis-enterprise-documentation/concepts-architecture/high-availability/replication/)          [Discovery Service](/redis-enterprise-documentation/concepts-architecture/data-access/discovery-service/)                 
  ------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------
