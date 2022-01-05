---
Title: Configure Istio as an ingress controller for external routing
linkTitle: Istio ingress routing
description: Configure Istio as an ingress controller for access to your Redis Enterprise databases from outside the Kubernetes cluster. 
weight: 25
alwaysOpen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-databases/ingress_routing_with_istio.md,
    /kubernetes/re-databases/ingress_routing_with_istio/,
]
---

Redis Enterprise for Kubernetes version 6.2.8-tbd introduces the ability to use an Istio ingress gateway as an alternative to NGINX or HaProxy ingress controllers. To configure Istio to work with the Redis Kubernetes operator, you need to configure two custom resources: a `Gateway` and a `VirtualService`. Then you'll be able to establish external access to your database.


1. [Download](https://istio.io/latest/docs/setup/getting-started/) and [install](https://istio.io/latest/docs/setup/getting-started/) Istio (see instructions from Istio's [Getting Started](https://istio.io/latest/docs/setup/getting-started/) guide).

1. Create a DNS entry that resolves your chosen database  hostname (or a domain with a wildcard) to the Istio external IP address.