The hardware requirements for Redis Enterprise Software are different for development and production environments.

- In a development environment, you can test your application with a live database.

    If you want to test your application under production conditions, use the production environment requirements.

- In a production environment you must have enough resources to handle the load on the database and recover from failures.

## Development environment

You can build your development environment with non-production hardware, such as a laptop, desktop, or small VM or instance,
and with these hardware requirements:

| Item | Description | Minimum Requirements | Recommended |
|------------|-----------------|------------|-----------------|
| Nodes per cluster | You can install on one node but many features require at least two nodes. | 1 node | >= 2 nodes |
| RAM per node | The amount of RAM for each node. | 4GB | >= 8GB |
| Storage per node | The amount of storage space for each node. | 10GB | >= 20GB |

## Production environment

We recommend these hardware requirements for production systems or for development systems that are designed to demonstrate production use cases:

| Item | Description | Minimum Requirements | Recommended |
|------------|-----------------|------------|-----------------|
| Nodes per cluster<sup>*</sup> | At least 3 nodes are required to support a reliable, highly available deployment that handles process failure, node failure, and network split events in a consistent manner. | 3 nodes | >= 3 nodes (Must be an odd number of nodes) |
| Cores<sup>*</sup> per node | RS is based on a multi-tenant architecture and can run multiple Redis processes (or shards) on the same core without significant performance degradation. | 4 cores | >=8 cores |
| RAM<sup>*</sup> per node | Defining your RAM size must be part of the capacity planning for your Redis usage. | 15GB | >=30GB |
| Ephemeral Storage | Used for storing [replication files (RDB format) and cluster log files]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}). | RAM x 2 | >= RAM x 4 |
| Persistent Storage | Used for storing [snapshot (RDB format) and AOF files]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}) over a persistent storage media, such as AWS Elastic Block Storage (EBS) or Azure Data Disk. | RAM x 3 | In-memory >= RAM x 6 (except for [extreme 'write' scenarios]({{< relref "/rs/administering/designing-production/performance/disk-sizing-heavy-write-scenarios.md" >}})); [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) >= (RAM + Flash) x 5. |
| Network | We recommend using multiple NICs per node where each NIC is >100Kbps, but RS can also run over a single 1Gbps interface network used for processing application requests, inter-cluster communication, and storage access. | 1G | >=10G |

<sup>*</sup>Additional considerations:
- Nodes per Cluster:
    - For clusters which are configured with 3 nodes, where one of them is considered as a quorum node - database availability can be compromised in a (non-quorum) node failure scenario.
    - Active-Active Redis databases are not recommended to run on a 3 node cluster, where one of them is considered as a quorum node. Synchronization process will pause in case of a (non-quorum) node failure scenario.
- Cores:
    - When the CPU load reaches a certain level, Redis Enterprise Software sends an alert to the operator.  

    - If your application is designed to put a lot of load on your Redis database, make sure that you have at least one available core for each shard of your database.

    - If some of the cluster nodes are utilizing more than 80% of the CPU, consider migrating busy resources to less busy nodes.

    - If all the cluster nodes are utilizing over 80% of the CPU, consider scaling out the cluster by [adding a node]({{< relref "/rs/administering/adding-node.md" >}}).

- RAM:
    - Redis uses a relatively large number of buffers, which enable replica communication, client communication, pub/sub commands, and more.  As a result, you should ensure that 30% of the RAM is available on each node at any given time.

    - If one or more cluster nodes utilizes more than 65% of the RAM, consider migrating resources to less active nodes.

    - If all cluster nodes are utilizing more than 70% of available RAM, consider [adding a node]({{< relref "/rs/administering/adding-node.md" >}}).

    - Do not run any other memory-intensive processes on the Redis Software node.
