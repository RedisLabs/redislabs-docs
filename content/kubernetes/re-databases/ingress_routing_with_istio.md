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

Redis Enterprise for Kubernetes version `6.2.8-tbd` introduces the ability to use an Istio ingress gateway as an alternative to NGINX or HaProxy ingress controllers.

Istio can also understand ingress resources, but using that mechanism takes away the advantages and options that the native Istio resources provide. Istio offers its own configuration methods using custom resources.

To configure Istio to work with the Redis Kubernetes operator, we will use two custom resources: a `Gateway` and a `VirtualService`. Then you'll be able to establish external access to your database.

## Install and configure Istio for Redis Enterprise

1. [Download](https://istio.io/latest/docs/setup/getting-started/) and [install](https://istio.io/latest/docs/setup/getting-started/) Istio (see instructions from Istio's [Getting Started](https://istio.io/latest/docs/setup/getting-started/) guide).

    Once the installation is complete, all the deployments, pods, and services will be deployed in a namespace called `istio-system`. This namespace contains a `LoadBalancer` type service called `service/istio-ingressgateway` that exposes the external IP address.

1. Find the `EXTERNAL-IP` for the `istio-ingressgateway` service.

    ```yaml
    kubectl get svc istio-ingressgateway -n istio-system
    NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)                                                                      AGE
    istio-ingressgateway   LoadBalancer   12.34.567.89   12.345.678.910   15021:12345/TCP,80:67891/TCP,443:23456/TCP,31400:78901/TCP,15443:10112/TCP   3h8m
    ```

1. Create a DNS entry that resolves your chosen database  hostname (or a domain with a wildcard) to the Istio `EXTERNAL-IP`. This hostname is what you will use to access your database from outside the cluster.

1. Verify the record was created successfully by running the `dig` command to your hostname (or any wildcard of the domain).
    ```yaml
    dig api.istio.k8s.my.redisdemo.com
    ```

    Look in the `ANSWER SECTION` for the record you just created.

    ```yaml
    ;; ANSWER SECTION:
    api.istio.k8s.my.redisdemo.com. 0 IN    A       12.345.678.910
    ```

## Create custom resources

On a different namespace from `istio-system`, create and apply the gateway and virtual service resource files.

1. Create a `Gateway` custom resource file (`redis-gateway.yaml`).

    ```yaml
    apiVersion: networking.istio.io/v1alpha3
    kind: Gateway
    metadata:
      name: redis-gateway
    spec:
      selector:
        istio: ingressgateway 
      servers:
      - hosts:
        - '*<.istio.k8s.my.redisdemo.com>'
        port:
          name: https
          number: 443
          protocol: HTTPS
        tls:
          mode: PASSTHROUGH
    ```

    {{<note>}}
    - Replace `<.istio.k8s.my.redisdemo.com>` in the example file below with the domain matching your DNS record.
    - The gateway's metadata name must be similar to the gateway's spec name (`redis-gateway` in this example).
    - TLS passthrough mode is required to allow secure access to the database.
    {{</note>}}

1. Apply `gateway.yaml` to create the ingress gateway.

    ```sh
    kubectl apply -f gateway.yaml
    ```

1. Verify the gateway was created successfully.

      ```sh
      kubectl get gateway
      NAME            AGE
      redis-gateway   3h33m
      ```

1. Create the `VirtualService` custom resource file (`redis-vs.yaml`).

    Replace `<.istio.k8s.my.redisdemo.com>` in the example file below with the domain matching your DNS record.

    ```yaml
    apiVersion: networking.istio.io/v1alpha3
    kind: VirtualService
    metadata:
      name: redis-vs
    spec:
      gateways:
      - redis-gateway
      hosts:
      - "*<.istio.k8s.my.redisdemo.com>"
      tls:
      - match:
        - port: 443
          sniHosts:
          - api<.istio.k8s.my.redisdemo.com>
        route:
        - destination:
            host: rec
            port:
              number: 9443
      - match:
        - port: 443
          sniHosts:
          - db1<.istio.k8s..my.redisdemo.com>
        route:
        - destination:
            host: db1
    ```
