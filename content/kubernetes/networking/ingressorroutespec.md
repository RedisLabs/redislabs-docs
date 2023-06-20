---
Title: Establish external routing on the RedisEnterpriseCluster
linkTitle: REC external routing
description: 
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/external-routing.md,
    /kubernetes/preview/external-routing/,
    /kubernetes/networking/external-routing.md,
    /kubernetes/networking/external-routing/,
    /kubernetes/networking/ingressorroutespec/,

}
---
An Ingress is an API resource that provides a standardized and flexible way to manage external access to services running within a Kubernetes cluster.

## Install Ingress controller

Redis Enterprise for Kubernetes supports the Ingress controllers below:
* [HAProxy](https://haproxy-ingress.github.io/)
* [NGINX](https://kubernetes.github.io/Ingress-nginx/)
* [Istio](https://istio.io/latest/docs/setup/getting-started/)

OpenShift users can use [routes]({{<relref "/kubernetes/networking/routes.md">}}) instead of an Ingress.

Install your chosen Ingress controller, making sure `ssl-passthrough` is enabled. `ssl-passthrough` is turned off by default for NGINX but enabled by default for HAProxy.

## Configure DNS

1. Choose the hostname (FQDN) you will use to access your database according to the recommended naming conventions below, replacing `<placeholders>` with your own values.

     REC API hostname: `api-<rec-name>-<rec-namespace>.<subdomain>`
     REAADB hostname: `*-db-<rec-name>-<rec-namespace>.<subdomain>`
     
     We recommend using a wildcard (`*`) in place of the database name, followed by the hostname suffix.

1. Retrieve the `EXTERNAL-IP` of your Ingress controller's `LoadBalancer` service.

     ``` sh
     $ kubectl get svc <haproxy-ingress | ingress-ngnix-controller> \
                         -n <ingress-ctrl-namespace>
     ```

     Below is example output for an HAProxy ingress controller running on a K8s cluster hosted by AWS.  

     ``` sh
     NAME              TYPE           CLUSTER-IP    EXTERNAL-IP                                                              PORT(S)                      AGE   
     haproxy-ingress   LoadBalancer   10.43.62.53   a56e24df8c6173b79a63d5da54fd9cff-676486416.us-east-1.elb.amazonaws.com   80:30610/TCP,443:31597/TCP   21m
     ```

1. Create DNS records to resolve your chosen REC API hostname and database hostname to the `EXTERNAL-IP` found in the previous step.

## Edit the REC spec

Edit the RedisEnterpriseCluster (REC) spec to add the `ingressOrRouteSpec` field, replacing `<placeholders>` below with your own values.

### NGINX or HAproxy ingress controllers

* Define the REC API hostname (`apiFqdnUrl`) and database hostname suffix (`dbFqdnSuffix`) you chose when configuring DNS.
* Set `method` to `ingress`.
* Set `ssl-passthrough` to "true".
* Add any additional annotations required for your ingress controller. See [NGINX docs](https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/advanced-configuration-with-annotations/) or [HAproxy docs](https://www.haproxy.com/documentation/kubernetes/latest/community/configuration-reference/ingress/) for more information.

```sh
kubectl patch rec  <rec-name> --type merge --patch "{\"spec\": \
    {\"ingressOrRouteSpec\": \
      {\"apiFqdnUrl\": \"api-<rec-name>-<rec-namespace>.redis.com\", \
      \"dbFqdnSuffix\": \"-db-<rec-name>-<rec-namespace>.redis.com\", \
      \"ingressAnnotations\": \
       {\"kubernetes.io/ingress.class\": \
       \"<ingress-controller>\", \
       \"<ingress-controller>.ingress.kubernetes.io/ssl-passthrough\": \ \"true\"}, \
      \"method\": \"ingress\"}}}"
```

### OpenShift routes

* Define the REC API hostname (`apiFqdnUrl`) and database hostname suffix (`dbFqdnSuffix`) you chose when configuring DNS.
* Set `method` to `openShiftRoute`.

```sh
kubectl patch rec <rec-name> --type merge --patch "{\"spec\": \
     {\"ingressOrRouteSpec\": \
     {\"apiFqdnUrl\": \"api-<rec-name>-<rec-namespace>.redis.com\", \"dbFqdnSuffix\": \"-db-<rec-name>-<rec-namespace>.redis.com\", \"method\": \"openShiftRoute\"}}}"
```

OpenShift routes do not require any `ingressAnnotations` in the `ingressOrRouteSpec`.