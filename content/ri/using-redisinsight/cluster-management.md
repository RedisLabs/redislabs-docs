---
Title: Cluster Management
date: 2018-10-12 03:49:29 +0530
weight: 30
categories: ["RI"]
path: features/cluster-management/
---
RedisInsight Cluster Management provides a graphical user interface (GUI) to manage your Redis Cluster. Cluster Management comes with three different views to analyze your cluster architecture.

1. **Master Layout** - This view only contains information about the masters present in the Redis Cluster. The information present is - slot ranges, host, port and few metrics gathered from redis INFO Command.
1. **Master-Replica Layout** - This view contains masters along with their replicas. This view contains information about slots ranges, host, port, etc for both master and replica.
1. **Physical Layout** - This view gives you a representation of your server i.e. it groups all nodes according to the physical server they reside in.

![cluster-management](/images/ri/cluster-management.png)

## Cluster Management actions

Cluster Management not only gives you a representation of your cluster but also helps you administer your cluster by using the following actions -

1. **Cluster Rebalance** - Cluster Rebalance helps you migrate all slots according to slot percentages amongst cluster nodes.
1. **Manual Resharding** - Manual Resharding asks for source and destination nodes with slot ranges. Using this you can migrate the specified slot range from source to destination node in just a few clicks.
1. **Add Node to Cluster**- Cluster Management allows you to add a new node to your cluster as a master. The node should be empty and should have cluster enabled.
1. **Manual Failover** - Using this you can manually failover a replica node to become the master.
1. **Delete Node in Cluster** - Using this to delete a replica.  (Master nodes cannot be deleted.)
1. **Make a node Replica of Master** - Cluster management includes a feature to make the selected node replica of a master. If the node is already a replica, no work is required. If the node is a master, then that should be empty i.e. - no hash slots and keys.
1. **Cluster Health Monitoring & Alerts** - Cluster Management constantly runs health checks for your cluster and returns alerts if there is any issue with the cluster. It also provides alerts if the master and replica are on the same server. The alerts for the cluster can be fixed by using the Fix Cluster feature.

## Compatibility

RedisInsight Cluster Management capabilities are available for [OSS Redis Clusters](https://redis.io/topics/cluster-tutorial)
Currently we do not support Redis Enterprise Software clusters that have the [OSS Cluster API]({{< relref "rs/concepts/data-access/oss-cluster-api.md" >}}) enabled. 

{{% note %}}

RedisInsight Cluster Management tool for TLS databases is not supported on Microsoft Windows because Windows does not include the OpenSSL library.
You can run RedisInsight using [Docker]({{< relref "ri/installing/install-docker.md" >}}) on Windows to manage TLS databases.

{{% /note %}}
