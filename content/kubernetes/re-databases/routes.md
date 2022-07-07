---
Title: Use OpenShift routes for external database access
linkTitle: OpenShift routes
description:  
weight: 15
alwaysOpen: false
categories: ["Platforms"]
aliases: [
   /kubernetes/re-databases/routes.md,
   /kubernetes/re-databases/routes/,
]
---

Every time a Redis Enterprise database (REDB) is created with the Redis Enterprise operator, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) is created that allows requests to be routed to that database. Redis Enterprise supports three [types of services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) for accessing databases: `ClusterIP`, `headless`, or `LoadBalancer`.

By default, REDB creates a `ClusterIP` type service, which exposes a cluster-internal IP and can only be accessed from within the cluster. OpenShift routes allow requests to be routed to the REDB from outside the cluster. For OpenShift deployments, routes provides a preferred alternative to an ingress.

## Prerequisites

- Before you can connect to your database from outside the cluster, you'll need the root CA certificate of the DMC Proxy server to validate the server certificate.

  By default, the DMC Proxy uses a self-signed certificate.  You can retrieve it from the Redis Enterprise admin console and save it as a file (for example, named "ca.pem") on the client machine.

- Your database also needs TLS encryption enabled.


## Create OpenShift route

1. Select the **Networking/Routes** section of the OpenShift web console.

1. Select **Create route** and fill out the following fields:

  - **Name**: Choose any name you want as the first part of your generated hostname
  - **Hostname**: Leave blank
  - **Path**: Leave as is ("/")
  - **Service**: Select the service for the database you want to access
  - **TLS Termination**: Choose "passthrough"
  - **Insecure Traffic**: Select "None"

  Select **Create**.

1. Find the hostname for your new route. After route creation, it will be in the "Host" field.

1. Verify you have a DNS entry to resolve the hostname for your new route to the cluster's load balancer.

## Access database

1. Use the `openssl` command to access the database from outside the cluster.

  ```sh
  openssl s_client -connect <hostname>:443 -crlf -CAfile ./ca.pem -servername <hostname>
  ```

  Replace the `<hostname>` value with the hostname for your new route.