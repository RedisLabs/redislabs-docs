---
Title: Installing the Operator
description: The Redis Enterprise Operator is a software component that must be
  installed first to facilitate cluster deployments. Installing the operator is
  a simple process.
weight: 35
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/concepts/kubernetes/k8s-operator-installation
---

The Redis Enterprise Operator is a software component that must be
installed first to facilitate cluster deployments. Some environments provide
ways to install operators through managed catalogs. For example, the
[OpenShift OperatorHub](https://docs.openshift.com/container-platform/4.3/operators/olm-adding-operators-to-cluster.html)
provides an administration interface by which you can find and install the Redis Enterprise
Operator.

If you are using OpenShift, see [Getting Started with OpenShift and Kubernetes]({{< relref "/platforms/kubernetes/openshift/_index.md" >}}) for
installation information

If you are using PKS, see [Getting Started with PKS (Pivotal Container Service)]({{< relref "/platforms/kubernetes/pks/_index.md" >}}) for
installation information.

Otherwise, the operator can be installed on a supported Kubernetes platform
directly by the following procedure outlined here.

## Overview of the operator

The operator acts on [Custom Resource Definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) (CRD) that describe Redis Enterprise clusters. The operator itself is a deployment, backed by pods, that runs within your deployment namespace. These operator pods must run with sufficient privileges to create the Redis Enterprise cluster resources within that namespace.

When installed, the following are created:

 * a service account under which the operator will run,
 * a set of Roles that define the privileges necessary for the operator to perform its tasks,
 * a set of Role Bindings to the service account to authorize the service account to have the correct roles (see above),
 * the CRD definition for a cluster,
 * the operator (a deployment).

 The operator is deployed and runs within single namespace and is scoped to operate only on cluster CRD's in that namespace. This allows a multi-tenant deployment of the operator supporting different versions in different namespaces.

## Getting the operator

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

VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep "tag_name" | sed -E 's/.*"([^"]+)".*/\1/'`
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/bundle.yaml
```

or you can replace `VERSION` in the above with a specific release tag.


If you inspect this YAML file, you will find definitions for the various items
described in the previous section. Installing the operator is just a simple apply
command.

```
kubectl apply -f bundle.yaml -n my-namespace
```

You should see a result similar to:

```
role.rbac.authorization.k8s.io/redis-enterprise-operator created
serviceaccount/redis-enterprise-operator created
rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
deployment.apps/redis-enterprise-operator created
```

## Verifying the operator is running

You can verify the operator is running in your namespace checking the deployment:

```
kubectl get deployment -l name=redis-enterprise-operator -n my-namespace
```

You should see a result similar to:

```
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
redis-enterprise-operator   1/1     1            1           0m36s
```

## Testing the operator

A cluster is created by creating a RedisEnterpriseCluster CRD.

You can create a simple minimal cluster by the following procedure:

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
2. Create the CRD in the namespace with the file `simple-cluster.yaml`:

    ```
    kubectl apply -f simple-cluster.yaml -n my-namespace
    ```

    You should see a result similar to:

    ```
    redisenterprisecluster.app.redislabs.com/test-cluster created
    ```

3. You can verify the creation of the with:

    ```
    kubectl get rec -n my-namespace
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
kubectl rollout status sts/test-cluster -n my-namespace
```

or by simply looking at the status of all the resources in your namespace:

```
kubectl get all -n my-namespace
```
