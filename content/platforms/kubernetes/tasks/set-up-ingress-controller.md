---
Title: Set up an ingress controller
description: 
weight: 25
alwaysopen: false
categories: [""]
aliases: 
---

Every time a Redis Enterprise Database (REDB) is created in a Kubernetes (K8s) environment, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) is created that allows requests to be routed to that database. This [type of service](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) is called ClusterIP and can only be accessed from within the K8s cluster. For requests to be routed to the REDB from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller. Redis Enterprise Software on Kubernetes supports two ingress controllers, [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/).

## Prerequisites

You'll need a database with the following:
- Status: active
- Placement: dense
- Replication: enabled
- Persistence: disabled
- a corresponding Kubernetes service available
- a fully qualified hostname to access the database
    - (`<service-name>.<namespace>.svc.cluster.local`)

{{< note >}} This example uses an EKS Kubernetes environment. This is not a requirement but you will need to adjust the vendor specific steps according to your choosen cloud provider. {{< /note >}}

### Determine your desired hostname

For the hostname you will use to access your database, we recommend including the Redis Enterprise cluster name and K8s cluster name. In the example below the RE cluster is called `rec` and the K8s cluster is called `ldr-eks-04`. The goal in the example below is to access each database through `redis-<port>.rec.ldr-eks-04.cs.redislabs.com`.

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
{{< note >}} In this example we are using AWS as a cloud provider and the load balancer was provisioned for us by AWS. {{< /note >}}

7. Go to the `cs.redislabs.com` hosted zone of [Route 53](https://aws.amazon.com/route53/) and create a new recordset with the type `CNAME`. 
    1. Use an external IP address of the `haproxy-controller` service as the value (example: `afd79dd212dcc11eaafbb0e678032796-1566764726.us-east-1.elb.amazonaws.com`)
    1. Use the [desired hostname](/platforms/kubernetes/tasks/set-up-ingress-controller/#determine-the-desired-hostname-for-accessing-your-databases) as the name. (example: `*.rec.ldr-eks-04`). {{< note >}} Using the wildcard `*` as part of the hostnames allows you to access all your databases using this load balancer. {{< /note >}}
