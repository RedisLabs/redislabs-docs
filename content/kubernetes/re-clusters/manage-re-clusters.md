---
Title: Manage Redis Enterprise clusters on Kubernetes
linkTitle: Manage RE clusters
description: How to create, delete, modify, and connect to your Redis Enteprise cluster (REC) on Kubernetes. 
weight: 5
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-clusters/manage_re-clusters.md,
   /kubernetes/re-clusters/manage_re-clusters/,
]
---

## HOW RECs WORK

1. yaml file is created in the namespace
2. Operator uses file to create cluster
2.1 Operator creates services: serviceRigger, API, UI service, ClusterIP service,
3. you can verify it was created
4. create REDBs

- only one cluster is supported per operator deployment. The operator can only manage one Redis Enterprise Cluster custom resource in a namespace. To deploy another Enterprise cluster in the same Kubernetes cluster, deploy an operator in an additional namespace for each additional Enterprise Cluster required. 
- each Enterprise Cluster can effectively host hundreds of Redis Database instances. Deploying multiple clusters is typically used for scenarios where complete operational isolation is required at the cluster level.
- ui service created by the operator and the default credentials as set in a secret.The secret name is the same as the (Redis Enterprise??) cluster name within the namespace.


## Create a RedisEnterpriseCluster custom resource

<note> Creating a default custom resource is part of the deployment process. If you haven't completed that yet, go to [Deploy Redis Enterprise Software on Kubernetes]({{<relref "/kubernetes/deployment/quick-start.md">}}) </note>

**DO THEY NEED TO DO IMAGESPEC SECTIONS AND PULL SECRETS AFTER DEPLOYMENT?**

**`KUBECTL CONFIG SET-CONTEXT --CURRENT --NAMESPACE=<>`????**

1. Create a RedisEnterpriseCluster(REC) custom resource yaml file. The default configuration below is best for development deployments and works in most typical scenarios. For production deployments, you'll need to configure **XYZ**

[Options for Redis Enterprise clusters]({{< relref "kubernetes/re-clusters/cluster-options.md" >}}) has more detail on common configuration options. 
The [Redis Enterprise Cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md) has a full list of supported attributes.

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  nodes: 3
```

2. Apply the changes to your custom resource file. The operator will use this resource to create your Redis Enterprise cluster. 

```bash
kubectl apply -f rec.yaml
```

3. Verify creation was successful. `rec` is a shortcut for RedisEnterpriseCluster. The cluster takes around 5-10 minutes to come up. A typical response looks like this:

```bash
NAME  AGE
rec   5m
```

## Modify your Redis Enterprise cluster (REC)

The Redis Enterprise operator overrides settings made from the admin console or via `rladmin`. Any settings changed in the admin console that are also configured in the custom resource, will be overridden by the operator.

 For more info on what settings are managed by the operator, see the [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md).

### Modify REC custom resource

The custom resource defines the properties of the Redis Enterprise cluster (REC).

1. You can use one of two methods to change your REC custom resource file.

    Method 1: Edit your original specification and apply the change with <nobr>`kubectl apply -f <rec-resource>.yaml`.</nobr>

    Method 2: Edit the resource definition with <nobr>`kubectl edit rec <rec-resource>`</nobr>.

1. Change the specification (properties in `spec` section) and save the changes. See [Options for Redis Enterprise clusters]({{< relref "/kubernetes/re-clusters/cluster-options.md">}}) for more details about cluster configuration options.

1. Monitor the status to see when the changes take effect:

    ```sh
    kubectl get rec <rec-name> -o jsonpath="{.status.status}"
    ```

    When the status is `active`, the Redis Enterprise cluster is ready for use.

### Modify REC via the admin console

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

### Modify REC via rladmin

rladmin is a command-line utility for performing administrative tasks in Redis Enterprise Software. To use the `rladmin` tool with Kubernetes, you need to open a bash shell into your Redis Enterprise pod.

```
kubectl exec -it <rec-name> -c <container-name> --/bin/bash
```

From there, you can run `rladmin` commands like you would for a regular Redis Enterprise Software deployment. See [rladmin]({{<relref "">}}) for more information about the `rladmin` command.



## Related links

- [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md)