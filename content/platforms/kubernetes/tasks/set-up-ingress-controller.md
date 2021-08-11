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

Redis Enterprise Software on Kubernetes supports two ingress controllers, [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/).

## Prerequisites

### Redis Enterprise database (REDB)

Create a Redis Enterprise database with "TLS for all communication" enabled and "client authentication" disabled.

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

##### If you choose to use a previously created database: 

If you are using an existing REDB that was created with a yaml file, you cannot make edits to that database in the Redis Enterprise UI. All changes need to be made in the yaml file.

If you are using an existing database that is managed from the UI, see [Enable TLS for client connections]({{< relref "content/rs/security/tls-ssl.md" >}}) for more information on these security settings.

### Ingress controller

Install one of the supported ingress controllers:

- [NGINX Ingress Controller Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)
- [HAProxy Ingress Getting Started](https://haproxy-ingress.github.io/docs/getting-started/)

{{< warning >}}You'll need to make sure `ssl-passthrough` is enabled. It's enabled by default for HAProxy, but disabled by default for NGINX. See the [NGINX User Guide](https://kubernetes.github.io/ingress-nginx/user-guide/tls/#ssl-passthrough) for details. {{< /warning >}}


## Create ingress resource

1. Retrieve the hostname of your ingress controller's `LoadBalancer` service with `kubectl get svc <ingress-cntrl>-ingress -n ingress-controller`.

```bash
$ kubectl get svc <haproxy-ingress | ingress-ngnix-controller> -n ingress-controller
```

Below is example output for an HAProxy ingress controller running on a K8s cluster hosted by AWS.

```bash
NAME              TYPE           CLUSTER-IP    EXTERNAL-IP                                                              PORT(S)                                      AGE
haproxy-ingress   LoadBalancer   10.43.62.53   a56e24df8c6173b79a63d5da54fd9cff-676486416.us-east-1.elb.amazonaws.com   80:30610/TCP,443:31597/TCP   21m
```
 

1. Create the ingress resource yaml file.

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: rec-ingress
  annotations:
    <nginx | haproxy>.ingress.kubernetes.io/ssl-passthrough: "true"
spec:
  rules:
  - host: <hostname>
    http:
      paths:
      - path: /
        backend:
          serviceName: <db-name>
          servicePort: <port>
```

The `ssl-passthrough` annotation is required to allow access to the database. The specific format changes depending on which ingress controller you have. See [NGINX Configuration annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/) and [HAProxy Ingress Options](https://www.haproxy.com/documentation/kubernetes/latest/configuration/ingress/) for updated annotation formats.

## Test your external access

#### RedisInsight

#### Openssl

#### Python