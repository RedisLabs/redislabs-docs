---
Title: Establish external routing with an ingress controller
linkTitle: Configure ingress
weight: 25
alwaysopen: false
categories: [""]
aliases: 
---

Every time a Redis Enterprise Database (REDB) is created in a Kubernetes (K8s) environment, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) is created that allows requests to be routed to that database. Redis Enterprise supports three [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) for accessing databases: `ClusterIP`, headless, or `LoadBalancer`.

REDB's default to the `ClusterIP` type that exposes a cluster-internal IP and can only be accessed from within the K8s cluster. For requests to be routed to the REDB from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller.

{{< info >}} You won't need an ingress controller if your REDB uses a `LoadBalancer`  or headless service. a `LoadBalancer` service is exposed externally through a cloud provider's load balancer. Headless services don't allocate a cluster IP and instead allows you to use a different discovery method all together that is not tied to your Kubernetes implementation. {{< /info >}}

Redis Enterprise Software on Kubernetes supports two ingress controllers, [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/).

{{< note >}} OpenShift uses [routes](https://docs.openshift.com/container-platform/3.11/architecture/networking/routes.html) for external access instead of ingress controllers. {{< /note >}}

## Prerequisites

### Redis Enterprise database (REDB)
- Create a Redis Enterprise database with "TLS for all communication" enabled and "client authentication" disabled.

The yaml to create this REDB must include `tlsMode: enabled` as shown in this example: 

```yaml
apiVersion: app.redislabs.com/v1alpha1
kind: RedisEnterpriseDatabase
metadata:
  name: <your-db-name>
spec:
  memorySize: <memory-size>MB
  tlsMode: enabled
```
#### If you choose to use a previously created database: 

If you are using an existing REDB that was created with a yaml file, you cannot make edits to that database in the Redis Enterprise UI. All changes need to be made in the yaml file.

If you are using an existing database that is managed from the UI, see [Enable TLS for client connections]({{<relref "content/rs/security/tls-ssl/#enable-tls-for-client-connections">}}) for more information on these security settings.

### Ingress controller

Install one of the supported ingress controllers: 
- [NGINX Ingress Controller Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)
- [HAProxy Ingress Getting Started](https://haproxy-ingress.github.io/docs/getting-started/)

{{< note >}}Important! You'll need to make sure `ssl-passthrough` is enabled. It's enabled by default for HAProxy, but disabled by default for NGINX.{{< /note >}}

## Determine your desired hostname

_This need to be revised to exclude cs.redislabs.com and cloud vendor specifics_
For the hostname you will use to access your database, we recommend including the Redis Enterprise cluster name and K8s cluster name. In the example below the RE cluster is called `rec` and the K8s cluster is called `eks-04`. The goal in the example below is to access each database through `redis-<port>.rec.eks-04.cs.redislabs.com`.

_add note about wildcard??_

## Create ingress resource

## Test your external access

### RedisInsight

### Openssl

### Python


