---
Title: Set up an ingress controller
description: 
weight: 25
alwaysopen: false
categories: [""]
aliases: 
---

Every time a Redis Enterprise Database (REDB) is created in a Kubernetes (K8s) environment, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) is created that allows requests to be routed to that database. This [type of service](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) is called ClusterIP and can only be accessed from within the K8s cluster. For requests to be routed to the REDB from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller. Redis Enterprise Software on Kubernetes supports two ingress controllers, [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/).

## Prerequistes

You'll need a database with the following:
- Status: active
- Placement: dense
- Replication: enabled
- Persistence: disabled
- a corresponding Kubernetes service available
- a fully qualified hostname to access the database
    - (`<service-name>.<namespace>.svc.cluster.local`)

## Set up HAProxy ingress controller

1. Create the namespace for the ingress controller.

    ```bash
    kubectl create namespace ingress-controller
    ```

1. Find the name of your worker nodes and label them for the ingress controller role. 
    ```bash
    kubectl get nodes
    ```

    ```bash
    kubectl label node <node-name> role=ingress-controller
    ```

1. Deploy the project.

    ```bash
    kubectl create -f https://haproxy-ingress.github.io/resources/haproxy-ingress.yaml
    ```

1. Verify the controller was deployed successfully.

    ```bash
    kubectl get pods -n ingress-controller
    ```

    You should see an `ingress-default-backend-<id>` pod and at least one `haproxy-ingress-<id>` pod. If not, make sure you have your node(s) labeled as `role=ingress-controller` and try again. 

1. Create another service using the port 443 (if one does not already exist). Save the following YAML file and apply it with `kubectl apply -f <YAML-file>`.

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    labels:
     run: haproxy-ingress
    name: haproxy-ingress
    namespace: ingress-controller
  spec:
  ports:
    - name: https
      port: 443
      protocol: TCP
      targetPort: 443
    selector:
      run: haproxy-ingress
    sessionAffinity: None
    type: LoadBalancer
  ```
6. Check the services in that namespace again. The new service with the type `LoadBalancer` should appear.
    ```bash
    $ kubectl get svc -n ingress-controller
    ```
    ```bash
    NAME                      TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)         AGE
    haproxy-ingress           LoadBalancer   10.100.210.118   afd79dd212dcc11eaafbb0e678032796-1566764726.us-east-1.elb.amazonaws.com   443:30405/TCP   13h
    ingress-default-backend   ClusterIP      10.100.76.69     <none>                                                                    8080/TCP        14h
    ```
