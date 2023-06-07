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

Redis Enterprise for Kubernetes supports several ways to route external traffic to your RedisEnterpriseCluster:

- Ingress controllers [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/) require an `ingress` API resource.
- [Istio](https://istio.io/latest/docs/setup/getting-started/) requires `Gateway` and `VirtualService` API resources.
- OpenShift uses [routes]({{<relref "/kubernetes/networking/routes.md">}}) to route external traffic.
- The RedisEnterpriseActiveActiveDatabase (REAADB) requires any of the above routing methods to be configured in the RedisEnterpriseCluster (REC) with the `ingressOrRoutesSpec` field.

## External routing using Redis Enterprise for Kubernetes

Every time a RedisEnterpriseDatabase (REDB), Redis Enterprise Active-Active database (REAADB), or Redis Enterprise cluster (REC) is created, the Redis Enterprise operator, automatically creates a [service](https://kubernetes.io/docs/concepts/services-networking/service/) to allow requests to be routed to that resource.

Redis Enterprise supports three [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) for accessing databases: `ClusterIP`, `headless`, or `LoadBalancer`.

By default, the operator creates a `ClusterIP` type service, which exposes a cluster-internal IP and that can only be accessed from within the K8s cluster. For requests to be routed from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) (or [route](https://docs.openshift.com/container-platform/4.12/networking/routes/route-configuration.html) if you are using OpenShift). See [kubernetes.io](https://kubernetes.io/docs/) for more details on [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) and [ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).

* To use NGNX or HAProxy ingress controllers, see [Establish external routing with an ingress]({{<relref "/kubernetes/networking/set-up-ingress-controller.md">}}).
* To use OpenShift routes, see [Use OpenShift routes for external database access]({{<relref "/kubernetes/networking/routes.md">}}).
* To use Istio as an ingress controller, see [Configure Istio for external routing]({{<relref "/kubernetes/networking/ingress-routing-with-istio.md">}})

## `ingressOrRouteSpec` for Active-Active databases

Versions 6.4.2 or later of Redis Enterprise for Kubernetes include a feature for ingress configuration. The `ingressOrRouteSpec` field is available in the RedisEnterpriseCluster spec to automatically create an ingress (or route) for the API service and databases (REAADB) on that REC. See [Establish external routing on the REC]({{<relref "/kubernetes/networking/external-routing.md">}}) for more details.

This feature only supports automatic ingress creation for Active-Active databases created and managed with the RedisEnterpriseActiveActiveDatabase (REAADB) custom resource. Use with the standard Redis Enterprise database (REDB) is not currently supported.
