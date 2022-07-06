---
Title: Use OpenShift routes for external database access
linkTitle: OpenShift routes
description:  
weight: 15
alwaysOpen: false
categories: ["Platforms"]
aliases: [
   /kubernetes/re-databases/routes.md 
]
---

[comment]: <> (Need info on purpose of routes with our operator here)

## Create OpenShift route

1. Select the **Networking/Routes** section of the OpenShift web console.

1. Select **Create route** and fill out the following fields:

  - Name: Choose any name you want as the first part of your generated hostname.
  - Hostname: Leave blank.
  - Path: Leave as is ("/").
  - Service: Select the service for the database you want to access.
  - TLS Termination: Choose **passthrough**.
  - Insecure Traffic: Select "None".

  Select **Create**.

1. Find the hostname for your new route. After route creation, it will be in the "Host" field.

1. Create a DNS entry to resolve the hostname for your new route to the cluster's load balancer.

## Access database

1. Before you can connect to your database, you'll need the root CA certificate of the DMC Proxy server to validate the server certificate.

By default, the DMC Proxy uses a self-signed certificate.  You can retrieve it from the Redis Enterprise admin console and save it as a file (for example, named "ca.pem") on the client machine.

1. Make sure your database had TLS encryption enabled.

1. Use the `openssl` command to access the database from outside the cluster.

  ```sh
  openssl s_client -connect <hostname>:443 -crlf -CAfile ./ca.pem -servername <hostname>
  ```

  Replace the `<hostname>` value with the hostname for your new route.