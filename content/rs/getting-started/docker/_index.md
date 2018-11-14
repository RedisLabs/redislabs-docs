---
Title: Working with Redis Enterprise Software (RES) with Docker Containers
description: 
weight: 30
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software can be deployed using Docker Container on
[Windows]({{< relref "/rs/getting-started/docker/windows.md" >}}),
[macOS]({{< relref "/rs/getting-started/docker/macos.md" >}})
and
[Linux]({{< relref "/rs/getting-started/docker/linux.md" >}})-based
systems. [Redis Enterprise Software
container](https://hub.docker.com/r/redislabs/redis/) represents a node
in an RES Cluster. When deploying RES using Docker, there are a couple
of common topologies:

  **Topology #1:** The simplest topology is to run a single-node RES Cluster with a single container in a single host machine. This is best for local development or functional testing. Obviously, single-node clusters come with limited functionality in a few ways. For instance, in a single-node topology, RES can't replicate to slave shards or provide any protection for failures. Simply follow the instruction in the Getting Started pages for Windows, macOS and Linux to build your development environment.

  ![0-2](/images/rs/0-2.png?width=255&height=378)

  **Topology #2:** You may also run multi-node RES Cluster with multiple RES containers deployed to a single host machine. This topology is similar to the Topology #1 except that you run a multi-node cluster to develop and test against. The result is a system that is scale-minimized but similar to your production Redis Enterprise Software deployment. It is important to note that this topology isn't ideal for performance-sensitive systems. In this topology, containers may interfere with each other under load. In addition, even though the RES cluster provides replication to protect against failures (as all nodes reside on the same physical host), the cluster cannot protect you against the failure of the single host. With all this, Topology #2 (or other hybrid deployment methods in which you put multiple RES nodes in containers on the same physical host) is not recommended if you are looking for predictable performance or high availability.

  ![Docker Redis Enterprise Pack Cluster](/images/rs/0-1.png?width=777&height=380)

  **Topology #3:** You may also run multi-node RES Cluster with multiple RES containers each deployed to its own host machine. This topology minimizes interference between RES containers, so it performs more predictably than Topology #2.

  ![0](/images/rs/0.png?width=780&height=380)