---
Title: Redis Labs Kubernetes Architecture
description: Redis Labs based its K8s architecture on the use of a standard
  extension mechanism called an operator. The operator is service that
  facilitates the specific needs of Redis Enterprise on Kubernetes and
  guarantees the same set of enterprise features by translating them
  into K8s-based pods and services whilst interacting with cluster events.
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/concepts/kubernetes/redis-labs-kubernetes-architecture-overview
         /rs/concepts/kubernetes-architecture/
---
Redis Labs bases its Kubernetes (K8s) architecture on several vital concepts.

## Layered architecture

Kubernetes is an excellent and widely adopted orchestration platform. While it can provide the building blocks for a variety of applications, it was not designed to deal with all the nuances associated with operating Redis Enterprise. Therefore, without help, the Kubernetes cluster cannot react accurately to internal Redis Enterprise events, failure conditions, or user requests.

The orchestration within a Kubernetes cluster runs outside the Redis Cluster deployment. As such, it is not aware of internal events and so can not respond to trigger failover events. For example, the Kubernetes cluster will not be aware of split network scenarios that affect Redis Enterprise clusters.

To fill in this gap and make the Kubernetes cluster more aware of the needs of Redis Enterprise clusters, Redis Labs created a layered architecture approach that splits responsibilities between operations Kubernetes does well, procedures Redis Enterprise Cluster excels at, and the processes both can orchestrate together. The figure below illustrated this layered orchestration architecture:

![kubernetes-overview-layered-orchestration]( /images/rs/kubernetes-overview-layered-orchestration.png )

## Operator-based deployment

An [operator is a software extension to Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) that makes use of
[custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) to describe and manage an application. The Redis Labs Operator enables a user to describe a cluster (or other Redis resources) using a custom resource much like they would a deployment or other Kubernetes workloads. The operator then translates the requested resource into specific deployments, pods, and services that constitute the resources running within Kubernetes.

Operator allows Redis Labs to maintain a unified deployment solution across all Kubernetes environments, i.e., RedHat OpenShift, Pivotal Container Services (PKS), Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS), Amazon Elastic Container Service for Kubernetes (EKS) and OSS Kubernetes. By utilizing various Kubernetes features like [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) and anti-affinity rules, the operator guarantees that each Redis Enterprise node resides on a Pod that is hosted on a different VM or physical server. See this setup shown in the figure below:

![kubernetes-overview-unified-deployment]( /images/rs/kubernetes-overview-unified-deployment.png )

## Network-attached persistent storage {#networkattached-persistent-storage}

While a pod may be located on a K8s node with local storage, data may be lost in a Pod failure event. To prevent this, storage volumes are network-attached to the pod instances to guarantee data durability.  See the figure below:

![kubernetes-overview-network-attached-persistent-storage]( /images/rs/kubernetes-overview-network-attached-persistent-storage.png )

On the left-hand side (marked #1), Redis Enterprise uses local ephemeral storage for durability. When a Pod fails, the Kubernetes scheduler launches another Pod as a replacement. When this Pod comes up, it will likely be on another K8s node with empty local ephemeral storage and the data from the original Pod is now lost.

On the right-hand side of the figure (marked #2), Redis Enterprise uses network-attached storage for data durability. In this case, when a Pod fails, the Kubernetes scheduler launches another Pod and automatically connects the same storage device used by the failed Pod. Redis Enterprise then instructs all the database instances running on the newly created node to load the data from the network-attached storage. This process guarantees a durable setup.

Redis Enterprise is not only great as an in-memory database but also extremely efficient in the way it uses persistent storage, even when the user chooses to configure Redis Enterprise to write every change to the disk. Compared to a disk-based database that requires multiple interactions (in most cases) with a storage device for every read or write operation, Redis Enterprise uses a single IOPS, in most cases, for a write operation and zero IOPS for a read operation. As a result, the performance of Redis Enterprise is not impacted significantly by using network-based storage. Moreover, significant performance improvements over other similarly deployment databases are typical in Kubernetes environments, as illustrated in the figures below:

![kubernetes-overview-performance-improvements-read]( /images/rs/kubernetes-overview-performance-improvements-read.png )![kubernetes-overview-performance-improvements-write]( /images/rs/kubernetes-overview-performance-improvements-write.png )

## Multiple services on each Pod

Redis Labs took a different approach to managing Redis Enterprise over the Kubernetes environment. Each Pod includes multiple Redis Enterprise instances (multiple services). By deploying doing so, this allows us to better utilize the hardware resources used by the Pod such as CPU, memory, and network while keeping the same level of isolation. This is shown on the left side of the figure below.

In our experience, we found that the traditional method of deploying a Redis Enterprise database in Kubernetes as separate pods, preserving a dedicated amount of computed resources (CPU & memory), that contain a single Redis Enterprise instance was notably inefficient. Redis Enterprise is exceptionally fast and in many cases can use just a fraction of the CPU resources to deliver the requested throughput. Furthermore, when running a Redis Enterprise Cluster with multiple Redis Enterprise instances across multiple Pods, the Kubernetes network can quickly become the deployment’s bottleneck. This is show on the right side of the figure below.

![kubernetes-overview-multiple-services-per-pod]( /images/rs/kubernetes-overview-multiple-services-per-pod.png )
