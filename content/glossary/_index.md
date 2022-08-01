---
Title: Glossary
description:
weight: 100
alwaysopen: false
categories: ["Glossary"]
aliases: /glossary/
---
<dl class="glossary">

<!--- 
{{%definition ""%}}
{{%/definition%}}
--->

## A, B {#letter-a}

{{%definition "admission controller"%}}
A piece of code that intercepts requests to the Kubernetes API server prior to persistence of the object.

More info: [Using Admission Controllers](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
{{%/definition%}}

{{%definition "access control list (ACL)"%}}
Allows you to manage permissions based on key patterns.

More info: [redis.io/topics/acl](https://redis.io/topics/acl); [ACL wikipedia](https://en.wikipedia.org/wiki/Access-control_list); [Database access control]({{<relref "/rs/security/access-control">}}); [Update database ACLs]({{<relref "/rs/security/access-control/ldap/update-database-acls">}}); [Passwords, users, and roles]({{<relref "/rc/security/database-security/passwords-users-roles.md">}})
{{%/definition%}}

<a name="active-active"></a>
{{%definition "Active-Active database (CRDB)"%}}
Geo-distributed databases that span multiple [Redis Enterprise Software]({{<relref "#redis-enterprise-software">}}) [clusters]({{<relref "#cluster">}}). Active-Active databases, also known as conflict-free replicated databases (CRDB), depend on [multi-master replication (MMR)]({{<relref "#multi-master-replication-mmr">}}) and [conflict-free replicated data types (CRDTs)]({{<relref "#conflict-free-replicated-data-types-crdt">}}) to power a simple development experience for geo-distributed applications.

More info: [Active-Active Geo-Distributed Redis]({{<relref "/rs/databases/active-active/_index.md">}}), [Geo-Distributed Active-Active Redis Applications]({{<relref "/rs/databases/active-active/" >}}), [Developing Applications for Active-Active Databases]({{<relref "rs/databases/active-active/develop/_index.md">}})
{{%/definition%}}

{{%definition "Active-Active database instance"%}}
A “member database” of a global Active-Active database which is made up of its own master and replica shards spanning a single cluster.
{{%/definition%}}

{{%definition "active-passive database replication"%}}
Provides applications read-only access to replicas of the data set from different geographical locations. The Redis Enterprise implementation of active-passive replication is called [Replica Of]({{<relref "#replica-of">}}).
{{%/definition%}}

{{%definition "append-only file (AoF)"%}}
Log files that keep a record of data changes by writing to the end of a file. This happens with every write, or every second to allow data recovering the entire
dataset by replaying the append-only log from the beginning to the end.

More info: [Data Persistence]({{<relref "/rc/databases/configuration/data-persistence.md" >}}), [Data Persistence with Redis Enterprise Software]({{<relref "/rs/databases/configure/database-persistence.md" >}})
{{%/definition%}}

## C {#letter-c}

{{%definition "causal consistency"%}}
A distributed database is causally consistent if it maintains the same order of operations on a piece of data across all database copies.

More info: [Causal consistency wikipedia](https://en.wikipedia.org/wiki/Causal_consistency), [Causal consistency in an Active-Active database]({{<relref "/rs/databases/active-active/causal-consistency-crdb">}})
{{%/definition%}}

{{%definition "CIDR allowlist"%}}
Classless Inter-Domain Routing (CIDR) is a method to allocate and route IP addresses. A CIDR allowlist defines a range of IP addresses and permits connections to them.

More info: [CIDR wikipedia](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing), [Configure CIDR allowlist]({{<relref "/rc/security/cidr-whitelist.md">}})
{{%/definition%}}

{{%definition "cluster"%}}
A Redis Enterprise cluster is composed of identical nodes that are deployed within a data center or stretched across local availability zones.

More info: [Database Clustering]({{<relref "/rc/databases/configuration/clustering.md" >}})
{{%/definition%}}

{{%definition "Cluster Configuration Store (CSS)"%}}
An internally managed Redis database that acts a single repository for all cluster meta-data.
{{%/definition%}}

{{%definition "Cluster Node Manager (CNM)"%}}
A collection of Redis Enterprise services responsible for provisioning, migration, monitoring, re-sharding, re-balancing, de-provisioning, auto-scaling
{{%/definition%}}

{{%definition "conflict-free replicated databases (CRDB)"%}}

Conflict-free replicated databases (CRDB) are an alternate name for [Active-Active databases](#active-active).
{{%/definition%}}

{{%definition "conflict-free replicated data types (CRDT)"%}}
Techniques used by Redis data types in Active-Active databases that handle conflicting concurrent writes across member Active-Active databases. The Redis Enterprise implementation of CRDT is called an Active-Active database (formerly known as CRDB).

More info: [CRDT info]({{<relref "/rs/databases/active-active/develop/#info" >}}), [Active-Active geo-distributed Redis]({{< relref "/rs/databases/active-active/_index.md" >}}), [CRDT wikipedia](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
{{%/definition%}}

{{%definition "CustomResourceDefinition (CRD)"%}}
Custom code that defines a resource to add to your Kubernetes API server without building a complete custom server. 

More info: [CustomResourceDefinition](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-CustomResourceDefinition), [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
{{%/definition%}}

## D - F {#letter-d}

{{%definition "data eviction policy"%}}
Defines how excess data is handled when the database exceeds the memory limit.

More info: [Data Eviction Policy]({{<relref "/rc/databases/configuration/data-eviction-policies.md">}})
{{%/definition%}}

{{%definition "Domain Name Service (DNS)"%}}
Naming system for computers, services, or other resources connected to the Internet or a private network. It associates various information with domain names assigned to each of the participating entities.

More info: [DNS wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
{{%/definition%}}

{{%definition "eventual consistency"%}}

After updating data on one instance of a distributed database, the other database copies may have stale data for a short time while they sync. Eventual consistency means that the updated data will eventually be the same across all database copies.

More info: [Eventual consistency wikipedia](https://en.wikipedia.org/wiki/Eventual_consistency)
{{%/definition%}}

{{%definition "`fysnc`"%}}
Linux command to synchronize a file's in-core state with a storage device

More info: [`fsync` man page]("https://man7.org/linux/man-pages/man2/fsync.2.html")
{{%/definition%}}

## G - J {#letter-g}

{{%definition "hash slot"%}}
The result of a hash calculation.

More info: [Database Clustering]({{<relref "/rs/databases/configure/clustering.md">}})
{{%/definition%}}

{{%definition "hash tag"%}}
A part of the key that is used in the hash calculation.

More info: [Database Clustering]({{<relref "/rs/databases/configure/clustering.md">}})
{{%/definition%}}

{{%definition "ingress"%}}
An API object that manages external access to the services in a Kubernetes cluster, typically HTTP.

More info: [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
{{%/definition%}}

## K, L {#letter-k}

{{%definition "kubectl"%}}
A command line tool for communicating with a Kubernetes API server. 

More info: [Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)
{{%/definition%}}

{{%definition "Lightweight Directory Access Protocol (LDAP)"%}}
A protocol for accessing and maintaining distributed directory services over an IP network, often used to authenticate users.

More info: [LDAP wikipedia](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol/), [LDAP authentication]({{<relref "/rs/security/ldap/_index.md">}})
{{%/definition%}}

## M - O {#letter-m}

{{%definition "Master node"%}}
Node that operates as the leader of a cluster
{{%/definition%}}

{{%definition "migration"%}}
Deciding when and where shards will be moved if more network throughput, memory, or CPU resources are needed
{{%/definition%}}

{{%definition "multi-factor authentication (MFA)"%}}
Method of authenticating users with pieces of evidence of the user's identity. When MFA is enabled on Redis Enterprise Cloud, users must enter their username, password, and an authentication code when logging in.

More info: [Multi-factor authentication]({{<relref "/rc/security/multi-factor-authentication.md">}})
{{%/definition%}}

{{%definition "multi-master replication (MMR)"%}}
Multi-directional replication that power the efficient replication required to achieve active-active concurrent writes in Active-Active databases.
{{%/definition%}}

{{%definition "namespace"%}}
An abstraction used by Kubernetes to support multiple virtual clusters on the same physical cluster.

More info: [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
{{%/definition%}}

{{%definition "operator"%}}
Operators are software extensions to Kubernetes that make use of custom resources to manage applications and their components.

More info: [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)
{{%/definition%}}

{{%definition "Out-of-Memory (OOM)"%}}
If a member Active-Active database is in an out of memory situation, that member is marked “inconsistent” by Redis Enterprise Software, the member stops responding to user traffic, and the syncer initiates full reconciliation with other peers in the Active-Active database.
{{%/definition%}}

## P - Q {#letter-p}

{{%definition "participating clusters"%}}
Clusters participating in the multi-master replication of an Active-Active database.
{{%/definition%}}

{{%definition "provisioning"%}}
Deciding where shards will be created and placed.
{{%/definition%}}

{{%definition "quorum node"%}}
Node provisioned only for cluster operations that can be elected as a master node. The quorum node participates in the cluster quorum and must be explicitly assigned this role via the `rladmin` command.
{{%/definition%}}

## R {#letter-r}

{{%definition "rack-zone awareness"%}}
Redis Enterprise feature that helps to ensure high availability in the event of a rack or zone failure. In the event of a rack or zone failure, the replicas and endpoints in the remaining racks/zones will be promoted.

More info: [Rack-zone awareness in Redis Enterprise Software]({{<relref "/rs/clusters/configure/rack-zone-awareness.md">}})
{{%/definition%}}

{{%definition "re-sharding"%}}
Distributing keys and their values among new shards.
{{%/definition%}}

{{%definition "rebalancing"%}}
Moving shards to nodes where more resources are available.
{{%/definition%}}

{{%definition "Redis Enterprise Cloud"%}}
The cloud version of Redis Enterprise.
{{%/definition%}}

{{%definition "Redis Enterprise cluster"%}}
Collection of Redis Enterprise nodes. A cluster pools system resources across nodes in the cluster and supports multi-tenant database instances.
{{%/definition%}}

{{%definition "Redis Enterprise database"%}}
Logical entity that manages your entire dataset across multiple Redis instances. It segments the data into shards and distributes them among nodes.
{{%/definition%}}

{{%definition "Redis Enterprise nodes"%}}
Physical or virtual machines or containers that runs a collection of Redis Enterprise services
{{%/definition%}}

{{%definition "Redis Enterprise Software"%}}
The on-premises version of Redis Enterprise.
{{%/definition%}}

{{%definition "Redis instance"%}}
Single-threaded Redis OSS database.
{{%/definition%}}

{{%definition "Redis on Flash (RoF)"%}}
Enables your Redis databases to span both RAM and dedicated flash memory (SSD). Redis on Flash manages the location of key values (RAM vs Flash) in the database via a LRU-based (least-recently-used) mechanism.

More info: [Redis on Flash]({{<relref "/rs/concepts/memory-performance/redis-flash.md">}}), [Getting Started with Redis on Flash (RoF)]({{<relref "/rs/administering/cluster-operations/getting-started-redis-flash.md">}})
{{%/definition%}}

{{%definition "Replica Of"%}}
The Redis Enterprise implementation of active-passive database replication.

More info: [Replica-Of
]({{<relref "/rs/databases/import-export/replica-of.md">}})
{{%/definition%}}

{{%definition "ReplicaSet"%}}
In Kubernetes, a ReplicaSet (aims to) maintain a set of replica Pods running at any given time.

More info: [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
{{%/definition%}}

{{%definition "replication"%}}
Database replication provides a mechanism to ensure high availability.

More info: [Database replication]({{<relref "/rs/databases/configure/replication.md">}})
{{%/definition%}}

{{%definition "role-based access control (RBAC)"%}}
A security approach that restricts system access to authorized users.

More info: [RBAC wikipedia](https://en.wikipedia.org/wiki/Role-based_access_control); [Database access control]({{<relref "/rs/security/access-control">}}); [Passwords, users, and roles]({{<relref "/rc/security/database-security/passwords-users-roles#role-based-access-control">}})
{{%/definition%}}

## S {#letter-s}

{{%definition "secret"%}}
Kubernetes term for object that stores sensitive information, such as passwords, OAuth tokens, and ssh keys.
{{%/definition%}}

{{%definition "shard"%}}
Redis process that is part of the Redis clustered database.

More info: [Database clustering]({{<relref "/rs/databases/configure/clustering.md">}})
{{%/definition%}}

{{%definition "sharding"%}}
Technique that has been used to scale larger data storage and processing loads. Sharding take your data, partitions it into smaller pieces and then send the data to different locations depending on which partition the data has been assigned to.
{{%/definition%}}

{{%definition "Simple Authentication and Security Layer (SASL)"%}}
Framework for adding authentication support and data security to connection-based protocols via replaceable mechanisms.

More info: [SASL wikipedia](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer)
{{%/definition%}}

{{%definition "snapshot (RDB)"%}}
Data persistence file that performs a data dump every one, six, or twelve hours.
{{%/definition%}}

## T - Z {#letter-t}

{{%definition "Transport Layer Security (TLS)"%}}
Protocols that provide communications security over a computer network.

More info: [TLS wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security), [Cloud database TLS]({{<relref "/rc/security/database-security/tls-ssl.md">}}), [Redis Enterprise TLS]({{<relref "/rs/security/tls">}})
{{%/definition%}}

{{%definition "VPC peering"%}}
Networking connection between two VPCs that enables you to route traffic between them using private IP addresses. Instances in either VPC can communicate with each other as if they are within the same network.

More info: [VPC wikipedia](https://en.wikipedia.org/wiki/Virtual_private_cloud), [Enable VPC peering]({{<relref "/rc/security/vpc-peering.md">}})
{{%/definition%}}


</dl>