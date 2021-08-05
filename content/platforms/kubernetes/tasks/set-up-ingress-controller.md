---
Title: Establish routing with an ingress controller
linkTitle: Configure ingress
weight: 25
alwaysopen: false
categories: [""]
aliases: 
---

Every time a Redis Enterprise Database (REDB) is created in a Kubernetes (K8s) environment, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) is created that allows requests to be routed to that database. This [type of service](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) is called ClusterIP and can only be accessed from within the K8s cluster. For requests to be routed to the REDB from outside the K8s cluster, you need an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller. Redis Enterprise Software on Kubernetes supports two ingress controllers, [HAProxy](https://haproxy-ingress.github.io/) and [NGINX](https://kubernetes.github.io/ingress-nginx/).

## Prerequisites

You'll need a database with the following: <!--- SME QUESTION: are the values below necessary?? Why do they need replication enabled?? --->
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

2. Find the name of your worker nodes and label them for the ingress controller role.
    ```bash
    kubectl get nodes
    ```

    ```bash
    kubectl label node <node-name> role=ingress-controller
    ```

3. Deploy the project.

    ```bash
    kubectl create -f https://haproxy-ingress.github.io/resources/haproxy-ingress.yaml
    ```

4. Verify the controller was deployed successfully.

    ```bash
    kubectl get pods -n ingress-controller
    ```

    You should see an `ingress-default-backend-<id>` pod and at least one `haproxy-ingress-<id>` pod. If not, make sure you have your node(s) labeled as `role=ingress-controller` and try again. 

5. Create another service using the port 443 <!--- SME QUESTION: Is 443 a standard port or would it vary from customer to customer ---> (if one does not already exist). Save the following YAML file and apply it with `kubectl apply -f <YAML-file>`.

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
{{< note >}} In this example we are using AWS as a cloud provider and the load balancer was provisioned for us by AWS. {{< /note >}} <!--- SME QUESTION: What changes with different cloud vendors??? --->

7. Go to the `cs.redislabs.com` hosted zone of [Route 53](https://aws.amazon.com/route53/) and create a new recordset with the type `CNAME`. 
    1. Use an external IP address of the `haproxy-controller` service as the value
    1. Use the [desired hostname](/platforms/kubernetes/tasks/set-up-ingress-controller/#determine-the-desired-hostname-for-accessing-your-databases) as the name. (example: `*.rec.ldr-eks-04`). {{< note >}} Using the wildcard `*` as part of the hostnames allows you to access all your databases using this load balancer. {{< /note >}}

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
     - host: redis-<port>.rec.ldr-eks-04.cs.redislabs.com
       http:
         paths:
         - path: /
           backend:
             serviceName: myfirstdb
             servicePort: <port> 
  ```

### Next Steps

## Set up NGINX ingress controller


1. Go to your K8S cluster environment (make sure that kubectl accesses the relevant K8S cluster)

     ```bash 
     kubectl config current-context
     ```

2. Download three NGINX ingress yaml files listed below using `wget`.
     ```bash
     wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
     wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/service-l4.yaml
     wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l4.yaml
     ```
  {{% note %}} The `mandatory.yaml` file is necessary for all cloud providers. However the two other files are specific to AWS. If you are using a different cloud provider, you'll need different files. See [https://kubernetes.github.io/ingress-nginx/deploy/](https://kubernetes.github.io/ingress-nginx/deploy/) for vendor specific information. {{% /note %}}

3. Modify the `mandatory.yaml` file to add `--enable-ssl-passthrough` to the `arg` section that starts the controller.
     ```yaml
     args:
            - /nginx-ingress-controller
            - --configmap=$(POD_NAMESPACE)/nginx-configuration
            - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services
            - --udp-services-configmap=$(POD_NAMESPACE)/udp-services
            - --publish-service=$(POD_NAMESPACE)/ingress-nginx
            - --annotations-prefix=nginx.ingress.kubernetes.io
            - --enable-ssl-passthrough
     ```

4. Apply the `mandatory.yaml` file.
     ```bash
     $ kubectl apply -f mandatory.yaml
      namespace/ingress-nginx created
      configmap/nginx-configuration created
      configmap/tcp-services created
      configmap/udp-services created
      serviceaccount/nginx-ingress-serviceaccount created
      clusterrole.rbac.authorization.k8s.io/nginx-ingress-clusterrole created
      role.rbac.authorization.k8s.io/nginx-ingress-role created
      rolebinding.rbac.authorization.k8s.io/nginx-ingress-role-nisa-binding created
      clusterrolebinding.rbac.authorization.k8s.io/nginx-ingress-clusterrole-nisa-binding created
      deployment.apps/nginx-ingress-controller created

5. Apply the `service-l4.yaml` file.
     ```bash
     $ kubectl apply -f service-l4.yaml
      service/ingress-nginx created
      ```

6. Apply the `patch-configmap-l4.yaml` file.
     ```bash
     $ kubectl apply -f patch-configmap-l4.yaml
      configmap/nginx-configuration configured
      ```