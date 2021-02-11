---
Title: Glossary
description:
weight: 100
alwaysopen: false
categories: ["Glossary"]
---
<dl class="glossary">

{{%definition "Redis Enterprise Cloud"%}}
The [cloud version]() of Redis Enterprise.
{{%/definition%}}

{{%definition "Redis Enterprise Software"%}}
The [on-premises]() version of Redis Enterprise.
{{%/definition%}}

{{<definition "Redis instance">}}
Single-threaded Redis OSS database.
{{</definition>}}

{{<definition "Redis on Flash (RoF)">}}
Enables your Redis databases to span both RAM and dedicated flash memory (SSD). Redis on Flash manages the location of key values (RAM vs Flash) in the database via a LRU-based (least-recently-used) mechanism. 
{{</definition>}}

{{<definition "Replica Of">}}
The Redis Enterprise implementation of active-passive database replication.
{{</definition>}}

{{<definition "replication">}}
Database replication provides a mechanism to ensure high availability. 
{{</definition>}}

{{<definition "role-based access control (RBAC)">}}
A security approach that restricts system access to authorized users.
{{</definition>}}

{{<definition "shard">}}
Redis process that is part of the Redis clustered database.
{{</definition>}}

{{<definition "sharding">}}
Technique that has been used to scale larger data storage and processing loads. Sharding take your data, partitions it into smaller pieces and then send the data to different locations depending on which partition the data has been assigned to.
{{</definition>}}

{{<definition "Simple Authentication and Security Layer (SASL)">}}
Framework for adding authentication support and data security to connection-based protocols via replaceable mechanisms.
{{</definition>}}

{{<definition "snapshot (RDB)">}}
Data persistence file that performs a data dump every one, six, or twelve hours.
{{</definition>}}

{{<definition "Transport Layer Security (TLS)">}}
Protocols that provide communications security over a computer network.
{{</definition>}}

{{<definition "VPC peering">}}
Networking connection between two VPCs that enables you to route traffic between them using private IP addresses. Instances in either VPC can communicate with each other as if they are within the same network.
{{</definition>}}


</dl>