---
Title: Networking
linkTitle: Networking
description: 
weight: 40
alwaysopen: false
categories: ["Platforms"]
aliases: {
 /kubernetes/networking/_index.md,
 /kubernetes/networking/,
}
---
Every time a Redis Enterprise database (REDB), Redis Enterprise Active-Active database (REAADB), or Redis Enterprise cluster (REC) is created, the Redis Enterprise operator, automatically creates a [service](https://kubernetes.io/docs/concepts/services-networking/service/) to allow requests to be routed to that resource.

Redis Enterprise supports three [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) for accessing databases: `ClusterIP`, `headless`, or `LoadBalancer`.

For accessing Redis Enterprise clusters (REC), Redis Enterprise supports [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types): `ClusterIP`,`nodePort`, or `LoadBalancer`.

By default, the operator creates a `ClusterIP` type service, which exposes a cluster-internal IP and can only be accessed from within the K8s cluster. For requests to be routed from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller (or [routes](https://docs.openshift.com/container-platform/4.12/networking/routes/route-configuration.html) if you are using OpenShift).

{{< allchildren style="h2" description="true" />}}