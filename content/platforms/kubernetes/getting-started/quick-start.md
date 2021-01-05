---
Title: Quick Start for Kubernetes
description: The Redis Enterprise Operator is a deployment that must be
  installed on your cluster to facilitate Redis Enterprise cluster deployments. Installing the operator is
  a simple process.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases:
---

The Redis Enterprise Operator is a software component that must be
installed first to facilitate cluster deployments. Some environments provide
ways to install operators through managed catalogs. For example, the
[OpenShift OperatorHub](https://docs.openshift.com/container-platform/4.3/operators/olm-adding-operators-to-cluster.html)
provides an administration interface by which you can find and install the Redis Enterprise
Operator.

If you are using OpenShift, see [Getting Started with OpenShift and Kubernetes]({{< relref "/platforms/kubernetes/getting-started/openshift/_index.md" >}}) for
installation information

If you are using VMWare Tanzu Kubernetes Grid Integrated Edition (formerly Pivotal PKS), see [Getting Started with VMWare Tanzu Kubernetes Grid Integrated Edition]({{< relref "/platforms/kubernetes/getting-started/tanzu/_index.md" >}}) for
installation information.

Otherwise, the operator can be installed on a supported Kubernetes platform
directly by the following procedure outlined here.

## Overview of the operator

The operator acts on [Custom Resource Definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) (CRD) that describe Redis Enterprise clusters and databases. The operator itself is a deployment, backed by pods, that runs within your deployment namespace. These operator pods must run with sufficient privileges to create the Redis Enterprise cluster resources within that namespace.

When installed, the following are created:

 * a service account under which the operator will run,
 * a set of Roles that define the privileges necessary for the operator to perform its tasks,
 * a set of Role Bindings to the service account to authorize the service account to have the correct roles (see above),
 * the CRD for a Redis Enterprise Cluster,
 * the CRD for a Redis Enterprise Database,
 * the operator (a deployment).

The operator currently runs within a single namespace and is scoped to operate only on Redis Enterprise Cluster CRD's in that namespace. This allows the deployment of the multiple instances of the operator on the same Kubernetes cluster, supporting multiple Redis Enterprise Clusters in multiple namespaces.

## Namespaces

The Redis Enterprise operator manages a single Redis Enterprise cluster in a single namespace. While
the operator can watch additional namespaces for consumer namespaces, the Redis Enterprise operator
and cluster must exist in the same namespace.

Throughout this guide you should assume each command is apply to the namespace in
which the Redis Enterprise cluster operates.

You can set the default namespace for these operations by:

```
kubectl config set-context --current --namespace=my-namespace
```

## Installing the operator

The definition and reference materials for the operator are on
[GitHub](https://github.com/RedisLabs/redis-enterprise-k8s-docs) and the
implementation is published as a Docker container. The operator
definitions are packaged as a single generic YAML file called
[bundle.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/bundle.yaml).

You need to ensure you pull the correct version of the bundle. The version tags
can be found by checking the [releases on Github](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases)
or via the GitHub API.

The bundle for the latest release can be downloaded via `curl` using the following:

```
VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep tag_name | awk -F'"' '{print $4}'`
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/bundle.yaml
```

or you can replace `VERSION` in the above with a specific release tag you desire.


If you inspect this YAML file, you will find definitions for the various items
described in the previous section.

You can install the operator with a single apply command:

```
kubectl apply -f bundle.yaml
```

You should see a result similar to:

```
role.rbac.authorization.k8s.io/redis-enterprise-operator created
serviceaccount/redis-enterprise-operator created
rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
customresourcedefinition.apiextensions.k8s.io/redisenterprisedatabases.app.redislabs.com configured
deployment.apps/redis-enterprise-operator created
```

## Verifying the operator is running

You can verify the operator is running in your namespace checking the deployment:

```
kubectl get deployment -l name=redis-enterprise-operator
```

You should see a result similar to:

```
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
redis-enterprise-operator   1/1     1            1           0m36s
```

## Testing the operator

A cluster is created by creating a custom resource with the kind "RedisEnterpriseCluster"
that contains the specification of the cluster option. See the
[Redis Enterprise Cluster API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md)
for more information on the various options available.

You can test the operator by creating a minimal cluster by following this procedure:

1. Create a file called `simple-cluster.yaml` that defines a Redis Enterprise
   cluster with three nodes:

    ```
    cat <<EOF > simple-cluster.yaml
    apiVersion: "app.redislabs.com/v1"
    kind: "RedisEnterpriseCluster"
    metadata:
      name: "test-cluster"
    spec:
      nodes: 3
    EOF
    ```

    This will request Redis Enterprise nodes with 2 CPUs and 4GB of memory.
    If you want to test with a larger or smaller configuration, you can
    specify the node resources. For example, we can reduce the CPU and memory
    for a quick test:

    ```
    cat <<EOF > simple-cluster.yaml
    apiVersion: "app.redislabs.com/v1"
    kind: "RedisEnterpriseCluster"
    metadata:
      name: "test-cluster"
    spec:
      nodes: 3
      redisEnterpriseNodeResources:
        limits:
          cpu: 1000m
          memory: 3Gi
        requests:
          cpu: 1000m
          memory: 3Gi
    EOF
    ```

2. Create the CRD in the namespace with the file `simple-cluster.yaml`:

    ```
    kubectl apply -f simple-cluster.yaml
    ```

    You should see a result similar to:

    ```
    redisenterprisecluster.app.redislabs.com/test-cluster created
    ```

3. You can verify the creation of the with:

    ```
    kubectl get rec
    ```

    You should see a result similar to:

    ```
    NAME           AGE
    test-cluster   1m
    ```


   At this point the operator will go through the process of creating various
   services and pod deployments. You can track the progress by examining the
   StatefulSet associated with the cluster:

   ```
   kubectl rollout status sts/test-cluster
   ```

   or by simply looking at the status of all the resources in your namespace:

   ```
   kubectl get all
   ```

4. Once the cluster is running, we can create a test database:

   ```
   cat <<EOF > smalldb.yaml
   apiVersion: app.redislabs.com/v1alpha1
   kind: RedisEnterpriseDatabase
   metadata:
     name: smalldb
   spec:
     memory: 100MB
   EOF
   ```

   and apply the database:

   ```
   kubectl apply -f smalldb.yaml
   ```

5. The connectivity information for the database is now stored in a Kubernetes
   secret using the same name but prefixed with `redb-`:

   ```
   kubectl get secret/redb-smalldb -o yaml
   ```

   From this secret you can get the service name, port, and password for the
   default user.
