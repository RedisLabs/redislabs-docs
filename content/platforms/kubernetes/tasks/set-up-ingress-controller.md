---
Title: Establish external routing with an ingress controller
linkTitle: Configure ingress
weight: 25
alwaysopen: false
categories: [""]
aliases: 
---

Every time a Redis Enterprise Database (REDB) is created in a Kubernetes (K8s) environment, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) is created that allows requests to be routed to that database. Redis Enterprise supports three [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) for this purpose: `ClusterIP`, headless, or `LoadBalancer`.

REDB's default to the `ClusterIP` type that exposes a cluster-internal IP and can only be accessed from within the K8s cluster. For requests to be routed to the REDB from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller.

{{< info >}} You won't need an ingress controller if your REDB uses a `LoadBalancer`  or headless service. a `LoadBalancer` service is exposed externally through a cloud provider's load balancer. Headless services don't allocate a cluster IP and instead allows you to use a different discovery method all together that is not tied to your Kubernetes implementation. {{< /info >}}

Redis Enterprise Software on Kubernetes supports two ingress controllers, [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/).

## Prerequisites



### Determine your desired hostname

For the hostname you will use to access your database, we recommend including the Redis Enterprise cluster name and K8s cluster name. In the example below the RE cluster is called `rec` and the K8s cluster is called `eks-04`. The goal in the example below is to access each database through `redis-<port>.rec.eks-04.cs.redislabs.com`.

## Set up HAProxy ingress controller

    1. Use an external IP address of the `haproxy-controller` service as the value
    1. Use the [desired hostname](/platforms/kubernetes/tasks/set-up-ingress-controller/#determine-the-desired-hostname-for-accessing-your-databases) as the name. (example: `*.rec.eks-04`). {{< note >}} Using the wildcard `*` as part of the hostnames allows you to access all your databases using this load balancer. {{< /note >}}

8. Create the ingress resource yaml file.

  ```yaml
   apiVersion: networking.k8s.io/v1beta1
   kind: Ingress
   metadata:
     name: rec-ingress
     annotations:
       ingress.kubernetes.io/ssl-passthrough: "true"
   spec:
     rules:
     - host: redis-<port>.rec.eks-04.cs.redislabs.com
       http:
         paths:
         - path: /
           backend:
             serviceName: myfirstdb
             servicePort: <port> 
  ```

