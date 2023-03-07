---
Title: Establish external routing
linkTitle: External routing
description: 
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/create_reaadb.md,
    /kubernetes/preview/create_reaadb/,
}
---

{{<note>}} This feature is currently in preview and is not for production use. To use this feature, upgrade to the 6.2.4-1 release. {{</note>}}

Every time a Redis Enterprise database (REDB), Redis Enterprise Active-Active database (REAADB), or Redis Enterprise cluster (REC) is created, the Redis Enterprise operator, automatically creates a [service](https://kubernetes.io/docs/concepts/services-networking/service/) to allow requests to be routed to that resource. 

Redis Enterprise supports three [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) for accessing databases: `ClusterIP`, `headless`, or `LoadBalancer`.

For accessing Redis Enterprise clusters (REC), Redis Enterprise supports [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types): `ClusterIP`,`nodePort`, or `LoadBalancer`.

By default, the operator creates a `ClusterIP` type service, which exposes a cluster-internal IP and can only be accessed from within the K8s cluster. For requests to be routed from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller (or [routes](https://docs.openshift.com/container-platform/4.12/networking/routes/route-configuration.html) if you are using OpenShift).

## Install ingress controller

Redis Enterprise for Kubernetes supports three ingress controllers:
* [HAProxy](https://haproxy-ingress.github.io/)
* [NGINX](https://kubernetes.github.io/ingress-nginx/)
* [Istio]({{<relref "kubernetes/re-databases/ingress_routing_with_istio/">}}) [routes]

OpenShift users can use ({{<relref "/kubernetes/re-databases/routes/">}}) instead of a ingress controller.

Install your chosen ingress controller, making sure `ssl-passthrough` is enabled. `ssl-passthrough` is disabled by default for NGINX but enabled by default for HAProxy. 