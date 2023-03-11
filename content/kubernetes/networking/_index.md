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

For accessing Redis Enterprise clusters (REC), Redis Enterprise supports the following [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types): `ClusterIP`,`nodePort`, or `LoadBalancer`.

By default, the operator creates a `ClusterIP` type service, which exposes a cluster-internal IP and can only be accessed from within the K8s cluster. For requests to be routed from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller (or [routes](https://docs.openshift.com/container-platform/4.12/networking/routes/route-configuration.html) if you are using OpenShift).

* To use NGNX or HAProxy, see [Establish external routing with an ingress]({{<relref "/kubernetes/networking/set-up-ingress-controller.md">}}).
* To use OpenShift routes, see [Use OpenShift routes for external database access]({{<relref "/kubernetes/networking/routes.md">}}).
* To use Istio, see [Configure Istio for external routing]({{<relref "/kubernetes/networking/ingress-routing-with-istio.md">}})

## 6.4.2-4 preview feature

{{<note>}} Preview features are not fit for production environments.{{</note>}}

The 6.4.2-4 release of Redis Enterprise for Kubernetes includes a public preview feature for ingress configuration. The `ingressOrRouteSpec` field is available in the RedisEnterpriseCluster spec which automatically creates an ingress (or route) for the API service and databases (REAADB) on that REC. See [Establish external routing on the REC]({{<relref "/kubernetes/networking/external-routing.md">}}) for more details.

The preview release of this feature only supports automatic ingress creation for Active-Active databases with the RedisEnterpriseActiveActiveDatabase (REAADB) custom resource. Use with the standard Redis Enterprise database (REDB) is not supported in the public preview.
