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

## Create a RedisEnterpriseCluster custom resource

Redis Enterprise Cluster (REC): an API to create Redis Enterprise clusters. Note that only one cluster is supported per operator deployment.

Create a RedisEnterpriseCluster(REC) using the

default configuration, which is suitable for development type deployments and works in typical scenarios. 

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  nodes: 3
```

Default values:

serviceAccountName : redis enterprise cluster name
createServiceAccount: TRUE
uiServiceType: ClusterIP
license: empty string (trial mode license)
licenseSecretName: empty string
username: demo@relisabs.com
redisEnterpriseImageSpec: default for this version
redisEnterpriseServicesRiggerSpec: default for this version
bootstrapperImageSpec: default for this version
redisEnterpriseNodeResources: 2 CPUs and 4 GB memory
bootstrapperResources: .5 CPU and .5GB memory
pullSecrets: empty
sideContainersSpec: empty
extraLabels: empty
podSecurityPolicyName: empty
enforceIPv4: FALSE





The full list of attributes supported through the Redis Enterprise Cluster (REC) API can be found HERE.

kubectl apply -f rec.yaml


Note: The Operator can only manage one Redis Enterprise Cluster custom resource in a namespace. To deploy another Enterprise Clusters in the same Kubernetes cluster, deploy an Operator in an additional namespace for each additional Enterprise Cluster required. 

Note that each Enterprise Cluster can effectively host hundreds of Redis Database instances. Deploying multiple clusters is typically used for scenarios where complete operational isolation is required at the cluster level.

Run kubectl get rec and verify creation was successful. rec is a shortcut for RedisEnterpriseCluster. The cluster takes around 5-10 minutes to come up. A typical response may look like this:

NAME  AGE
rec   5m
Note: Once the cluster is up, the cluster GUI and API could be used to configure databases. It is recommended to use the K8s REDB API that is configured through the following steps. To configure the cluster using the cluster GUI/API, use the 

ui service created by the operator and the default credentials as set in a secret.

The secret name is the same as the cluster name within the namespace.

### Create a single-node cluster

Single-node clusters have small minimum node resources and small database capacity. The most common use case for single-node clusters is for a volatile cache.

```
apiVersion: app.redislabs.com/v1alpha1
kind: RedisEnterpriseCluster
metadata:
  name: "any-name-you-want"
spec:
  nodes: 1
  redisEnterpriseNodeResources:
    limits:
      cpu: "2"
      memory: 2Gi
    requests:
      cpu: "2"
      memory: 2Gi
  redisEnterpriseServicesConfiguration:
    mdnsServer:
      operatingMode: "disabled"
    cmServer:
      operatingMode: "disabled"
    pdnsServer:
      operatingMode: "disabled"
    crdbCoordinator:
      operatingMode: "disabled"
    crdbWorker:
      operatingMode: "disabled"
```

## Modify your Redis Enterprise cluster (REC)

The Redis Enterprise operator overrides settings made from the admin console or via `rladmin`. Any settings changed in the admin console that are also configured in the custom resource, will be overridden by the operator.

 For more info on what settings are managed by the operator, see the [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md).

### Modify your REC custom resource

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

### Modify your Redis cluster via rladmin

rladmin is a command-line utility for performing administrative tasks in Redis Enterprise Software. To use the `rladmin` tool with Kubernetes, you need to open a bash shell into your Redis Enterprise pod.

```
kubectl exec -it <rec-name> -c <container-name> --/bin/bash
```

From there, you can run `rladmin` commands like you would for a regular Redis Enterprise Software deployment. See [rladmin]({{<relref "">}}) for more information about the `rladmin` command.

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