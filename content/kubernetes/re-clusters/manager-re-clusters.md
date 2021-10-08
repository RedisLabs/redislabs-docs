---
Title: Manage Redis Enterprise clusters on Kubernetes
linkTitle: Manage RE clusters
description: How to create, delete, modify, and connect to your Redis Enteprise cluster (REC) on Kubernetes. 
weight: 5
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-clusters/manage_re-clusters.md,
   /kubernetes/re-clusters/manage_re-clusters/
]
---

## Create a RedisEnterpriseCluster custom resource


## Modify your Redis Enterprise cluster (REC)

## Connect to your Redis Enterprise cluster (REC)

1. Switch to the namespace with your Redis Enterprise cluster (REC).

    ```sh
    kubectl config set-context --current --namespace=<namespace-of-rec>
    ```

1. Find your cluster name from your list of secrets.

    ```sh
    kubectl get secret
    ```

    In this example, the cluster name is `rec`.

1. Extract and decode your credentials from the secret.

    ```sh
    kubectl get secret <cluster-name> -o jsonpath='{.data.username}' | base64 --decode
    kubectl get secret <cluster-name> -o jsonpath='{.data.password}' | base64 --decode
    ```

1. Find the port for the REC UI service in the `spec:ports` section of the service definition file.

    ```sh
    kubectl get service/<cluster-name>-ui -o yaml
    ```

1. Connect to your Redis Enterprise cluster (REC).
    ```sh
    kubectl exec -it rec-0 -c --bash????

    ```

## Delete your Redis Enterprise cluster

## Related