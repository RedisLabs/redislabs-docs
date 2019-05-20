---
Title: Working with Redis Enterprise Software (RS) with Docker Containers
description:
weight: 30
alwaysopen: false
categories: ["RS"]
---
You can run Redis Enterprise Software on Docker containers on
[Linux, Windows, or MacOS]({{< relref "/rs/getting-started/docker/getting-started-docker.md" >}}).
The [Redis Enterprise Software container](https://hub.docker.com/r/redislabs/redis/)
represents a node in an RS Cluster. When deploying RS using Docker, there are a couple
of common topologies:

  **Topology #1:** The simplest topology is to run a single-node RS Cluster with a single container in a single host machine. This is best for local development or functional testing. Obviously, single-node clusters come with limited functionality in a few ways. For instance, in a single-node topology, RS can't replicate to slave shards or provide any protection for failures. Simply follow the instruction in the Getting Started pages for Windows, macOS and Linux to build your development environment.

  ![0-2](/images/rs/0-2.png?width=255&height=378)

  **Topology #2:** You may also run multi-node RS Cluster with multiple RS containers deployed to a single host machine. This topology is similar to the Topology #1 except that you run a multi-node cluster to develop and test against. The result is a system that is scale-minimized but similar to your production Redis Enterprise Software deployment. It is important to note that this topology isn't ideal for performance-sensitive systems. In this topology, containers may interfere with each other under load. In addition, even though the RS cluster provides replication to protect against failures (as all nodes reside on the same physical host), the cluster cannot protect you against the failure of the single host. With all this, Topology #2 (or other hybrid deployment methods in which you put multiple RS nodes in containers on the same physical host) is not recommended if you are looking for predictable performance or high availability.

  ![Docker Redis Enterprise Software Cluster](/images/rs/0-1.png?width=777&height=380)

  **Topology #3:** You may also run multi-node RS Cluster with multiple RS containers each deployed to its own host machine. This topology minimizes interference between RS containers, so it performs more predictably than Topology #2.

  ![0](/images/rs/0.png?width=780&height=380)