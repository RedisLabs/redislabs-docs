---
Title: Hardware requirements
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The hardware requirements for Redis Enterprise Software (RS) are different for development and productions environments.

## Development environment hardware requirements

If you are looking to do development, test or experimentation with RS, you can use non-production hardware (e.g.
laptops, desktop, small VM/instance, etc.).

| Item | Description | Minimum Requirements | Recommended |
|------------|-----------------|------------|-----------------|
| \# of nodes per cluster | One node is fine, but to utilize the advanced cluster features at least two nodes are required. | 1 node | 2+ |
| RAM | The amount of RAM for the node. | At least 2GB --> in 5.4 (or maybe even before), we need more minimum RAM. CAn you please ask Uri for this value and update accordingly?  | 4GB |
| Storage | The amount of storage space for the node. | At least 10GB of free space | 20GB |

This minimal setup is meant for simple development and minimal
functional testing, not for any kind of load, failure or failover
testing. With two or fewer nodes in a cluster, a quorum cannot be
attained in the event of failure. For that kind of testing or anything
more serious, please see the production environment requirements.

## Production environment hardware requirements

The table below explains the minimum and the recommended hardware
requirements for a production system:

| Item | Description | Minimum Requirements | Recommended |
|------------|-----------------|------------|-----------------|
| # of nodes per cluster  | At least 3 nodes are needed in order to support a reliable, highly available deployment that handles process failure, node failure, and network split events in a consistent manner. | 3 nodes | >=3 nodes; must be odd number of nodes to maintain quorum |
| # of cores per node | RS is based on a multi-tenant architecture and can run multiple Redis processes (or shards) on the same core without significant performance degradation.</br>Once the CPU load of a node has reached a certain threshold, RS will try to migrate "noisy" shards to a different node in the cluster and will send an alert to the operator.</br>If your application is designed to impose a lot of load on your Redis database, make sure that you have at least one available core for each shard of your database.</br>Additional recommendations:</br>1.  If some of the cluster nodes are utilizing more than 80% of the CPU, you should look at migrating busy resources to less busy nodes.</br>2.  If all the cluster nodes are utilizing over 80% of the CPU, scale-out the cluster by [adding a node]({{< relref "/rs/administering/cluster-operations/adding-node.md" >}}). | 4 cores | >=8 cores |
| RAM | Defining your RAM size should be part of the capacity planning for your Redis usage. Since Redis uses a relatively large amount of buffers (i.e. for slave communication, for the client communication and for pub/sub commands) the operator should take extra care to maintain at least 30% of the RAM "unused" on each node.</br>Additional recommendations:</br>1.  If some of the cluster nodes are utilizing more than 65% of the RAM, you should look at migrating busy resources to less busy nodes.</br>2.  If all the cluster nodes are utilizing over 70% of the RAM, you should look to scale out the cluster by [adding a node]({{< relref "/rs/administering/cluster-operations/adding-node.md" >}}).</br>3.  Do not run other memory-consuming systems on the same machine that is used as an RS node. | 15GB | >=30GB |
| Storage | For better I/O performance, Redis Enterprise Software enables two storage systems to be connected to each node in the cluster (as described below). It is also highly recommended that you use SSD-based storage to avoid performance issues when persisting data to disk.</br>If [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) is used, the size of the Flash storage must be at least ten times (10x) the size of the RAM storage. For additional details, refer to [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) page. | | |
| Ephemeral Storage | Used for storing replication files (RDB format) and cluster log files.</br>For additional details, refer to [Persistent and Ephemeral Storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}). | 2x node's RAM size | >=4x node's RAM size |
| Persistent Storage | Used for storing snapshot (RDB format) and AOF files over a persistent storage media, which (unlike ephemeral storage) is not deleted in cases of node failure.</br>For additional details, refer to [Persistent and Ephemeral Storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).</br>Examples of persistent storage devices:</br>-   AWS Elastic Block Storage (EBS)</br>-   Azure Data Disk</br> | 3x node's RAM size | >=6x node's RAM size. For extreme 'write' scenarios, refer to the [Disk size requirements for extreme write scenarios]({{< relref "/rs/administering/designing-production/performance/disk-sizing-heavy-write-scenarios.md" >}}) section to determine the right Persistent Storage size.</br>If [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) is enabled, calculate the recommended size as 5x of (RAM+Flash). |
| Network | Redis Labs recommends running RS over a low-latency high-throughput network, wherein each NIC can support a few hundred thousand packets per second.</br>That said, RS could still perform very well over a single 1Gbps interface network that is used for processing application requests, inter-cluster communication, and storage access. | 1G | >=10G |
