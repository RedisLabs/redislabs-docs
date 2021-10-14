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

THE OPERATOR ALWAYS WINS

Any settings changed in the admin console that are also configured in the custom resource, will be overridden by the operator.

It's best only to change settings that are not managed via the API. For more info on what settings are managed by the operator, see the [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md).

### Modify your REC custom resource

The custom resource defines the properties of the Redis Enterprise cluster (REC).

1. You can use one of two methods to change your REC custom resource file.

    Method 1: Edit your original specification and apply the change with <nobr>`kubectl apply -f <rec-resource>.yaml`.</nobr>

    Method 2: Edit the resource definition with <nobr>`kubectl edit rec <rec-resource>`</nobr>.

1. Change the specification (only properties in `spec` section) and save the changes.  

1. Monitor the status to see when the changes take effect:

    ```sh
    kubectl get rec <rec-name> -o jsonpath="{.status.status}"
    ```

    When the status is `active`, the Redis Enterprise cluster is ready for use.

### Modify your Redis cluster via rladmin

To use the `rladmin` tool with Kubernetes, you need to open a bash shell into your Redis Enterprise pod.

```
kubectl exec -it <rec-name> -c <container-name> --/bin/bash
```

From there, you can run rladmin commands like you would for a regular Redis Enterprise Software deployment. See [rladmin]({{<relref "">}}) for more information about the `rladmin` command.

### Modify your Redis cluster via the admin console

1. Switch to the namespace with your Redis Enterprise cluster (REC) and find your cluster name from your list of secrets.

    ```sh
    kubectl config set-context --current --namespace=<namespace-of-rec>
    kubectl get secret
    ```

    In this example, the cluster name is `rec`.

1. Extract and decode your credentials from the secret.

    ```sh
    kubectl get secret <rec-name> -o jsonpath='{.data.username}' | base64 --decode
    kubectl get secret <rec-name> -o jsonpath='{.data.password}' | base64 --decode
    ```

1. Find the port for the REC UI service in the `spec:ports` section of the service definition file.

    ```sh
    kubectl get service/<rec-name>-ui -o yaml
    ```

1. Open a bash shell in your Redis Enterprise cluster (REC).
    ```sh
    kubectl exec -it <rec-name> -c <container-name> --/bin/bash
    ```

Now you can make changes to your Redis Enterprise cluster from the admin console.

## Related links

- [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md)