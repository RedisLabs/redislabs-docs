---
Title: Deploy Redis Enterprise Software on Kubernetes
linkTitle: Kubernetes 
description: How to install Redis Enterprise Software on Kubernetes.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: [
  /platforms/kubernetes/getting-started/quick-start/,
  /platforms/kubernetes/getting-started/quick-start.md,
  /platforms/kubernetes/deployment/quick-start/,
  /platforms/kubernetes/deployment/quick-start.md, 
  /kubernetes/deployment/quick-start.md,
  /kubernetes/deployment/quick-start/
]
---

To deploy Redis Enterprise Software on Kubernetes, you first need to install the Redis Enterprise operator.

This quick start guide is for generic Kubernetes distributions ([kOps](https://kops.sigs.k8s.io)) as well as:

* [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/) (AKS)
* [Rancher](https://rancher.com/products/rancher/) / [Rancher Kubernetes Engine](https://rancher.com/products/rke/) (RKE)
* [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) (GKE)
* [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) (EKS)

If you're running either OpenShift or VMWare Tanzu, we provide specific getting started guides for installing the Redis Enterprise Operator on these platforms:

* [Redis Enterprise on OpenShift]({{< relref "/kubernetes/deployment/openshift/_index.md" >}})
* [Redis Enterprise on VMWare Tanzu]({{< relref "/kubernetes/deployment/tanzu/_index.md" >}})

## Prerequisites

To deploy the Redis Enterprise operator, you'll need:

* a Kubernetes cluster in a [supported distribution]({{<relref "/kubernetes/reference/supported_k8s_distributions.md">}})
* a minimum of three worker nodes
* a Kubernetes client (kubectl)
* access to DockerHub, RedHat Container Catalog, or a private repository that can hold the required images.

See your version's [release notes]({{<relref "/kubernetes/release-notes/_index.md">}}) for a list of required images.

If you are not pulling images from DockerHub, see [Private Repositories](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/README.md#private-repositories) for additional sections to add to your REC resource file and your `operator.yaml` file.

### Create a new namespace

The Redis Enterprise operator manages a single Redis Enterprise cluster in a single namespace.

Throughout this guide, you should assume that each command is applied to the namespace in which the Redis Enterprise cluster operates.

1. Create a new namespace

    ```sh
    kubectl create namespace <my-namespace>
    ```

2. Change the namespace context to make the newly created namespace default for future commands.

    ```sh
    kubectl config set-context --current --namespace=<my-namespace>
    ```

## Install the operator

The Redis Enterprise operator implementation is published as a Docker container. For more information about image sources, see [Manage container images]({{<relref "/kubernetes/deployment/container-images.md">}})

The operator [definition and reference materials](https://github.com/RedisLabs/redis-enterprise-k8s-docs) are available on GitHub. The operator definitions are [packaged as a single generic YAML file](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/bundle.yaml).

{{<note>}}
If you do not pull images from DockerHub or another public registry, you'll need additional configuration in your operator deployment file and your Redis Enterprise cluster resource file. See [Manage image sources]({{<relref "/kubernetes/deployment/container-images#manage-image-sources">}}) for more info.
{{</note>}}

### Deploy the operator bundle

To ensure that you pull the correct version of the bundle, check versions tags listed with the [operator releases on GitHub](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases)
or by [using the GitHub API](https://docs.github.com/en/rest/reference/repos#releases).

```sh
VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep tag_name | awk -F'"' '{print $4}'`
```

If you need a different release, replace `VERSION` in the above with a specific release tag. Now deploy the operator with 

```sh
kubectl apply -f https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/bundle.yaml
```

  You should see a result similar to this:

  ```sh
  role.rbac.authorization.k8s.io/redis-enterprise-operator created
  serviceaccount/redis-enterprise-operator created
  rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
  customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
  customresourcedefinition.apiextensions.k8s.io/redisenterprisedatabases.app.redislabs.com configured
  deployment.apps/redis-enterprise-operator created
  ```

#### Verify the operator is running

Check the operator deployment to verify it's running in your namespace:

```sh
kubectl get deployment redis-enterprise-operator
```

You should see a result similar to this:

```sh
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
redis-enterprise-operator   1/1     1            1           0m36s
```

## Create a Redis Enterprise cluster (REC)

A cluster is created by creating a custom resource with the kind "RedisEnterpriseCluster"
that contains the specification of the cluster option. See the
[Redis Enterprise Cluster API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md)
for more information on the various options available.

You can test the operator by creating a minimal cluster by following this procedure:

1. Create a file called `test-rec.yaml` that defines a Redis Enterprise cluster with three nodes:

    ```sh
    cat <<EOF > test-rec.yaml
    apiVersion: "app.redislabs.com/v1"
    kind: "RedisEnterpriseCluster"
    metadata:
      name: "test-rec"
    spec:
      nodes: 3
    EOF
    ```

    This will request a cluster with three Redis Enterprise nodes using the
    default requests (i.e., 2 CPUs and 4GB of memory per node).

    To test with a larger configuration, use the example below to add node resources to the `spec` section of your test cluster (`test-rec.yaml`).

    ```yaml
      redisEnterpriseNodeResources:
        limits:
          cpu: 2000m
          memory: 16Gi
        requests:
          cpu: 2000m
          memory: 16Gi
    ```
    {{<note>}}
Each cluster must have at least 3 nodes. Single-node RECs are not supported.
    {{</note>}}

    See the [Redis Enterprise hardware requirements]({{< relref "/rs/installing-upgrading/hardware-requirements.md">}}) for more
    information on sizing Redis Enterprise node resource requests.
  
1. Apply your custom resource definition (CRD) file in the same namespace as `test-rec.yaml`.

    ```sh
    kubectl apply -f test-rec.yaml
    ```

    You should see a result similar to this:

    ```sh
    redisenterprisecluster.app.redislabs.com/test-rec created
    ```

1. You can verify the creation of the cluster with:

    ```sh
    kubectl get rec
    ```

    You should see a result similar to this:

    ```sh
    NAME           AGE
    test-rec   1m
    ```

   At this point, the operator will go through the process of creating various
   services and pod deployments.

   You can track the progress by examining the
   StatefulSet associated with the cluster:

   ```sh
   kubectl rollout status sts/test-rec
   ```

   or by looking at the status of all of the resources in your namespace:

   ```sh
   kubectl get all
   ```


## Enable the admission controller

The admission controller dynamically validates REDB resources configured by the operator. It is strongly recommended that you use the admission controller on your Redis Enterprise Cluster (REC). The admission controller only needs to be configured once per operator deployment.

As part of the REC creation process, the operator stores the admission controller certificate in a Kubernetes secret called `admission-tls`. You may have to wait a few minutes after creating your REC to see the secret has been created.

1. Verify the secret has been created.

    ```sh
     kubectl get secret admission-tls
    ```
  
    The output will look similar to
  
    ```
     NAME            TYPE     DATA   AGE
     admission-tls   Opaque   2      2m43s
    ```

1. Save the certificate to a local environment variable.

    ```sh
    CERT=`kubectl get secret admission-tls -o jsonpath='{.data.cert}'`
    ```

1. Create a patch file for the Kubernetes validating webhook.

    ```sh
    sed 's/NAMESPACE_OF_SERVICE_ACCOUNT/demo/g' admission/webhook.yaml | kubectl create -f -

    cat > modified-webhook.yaml <<EOF
    webhooks:
    - name: redb.admission.redislabs
      clientConfig:
        caBundle: $CERT
      admissionReviewVersions: ["v1beta1"]
    EOF
    ```

1. Patch the webhook with the certificate.

    ```sh
    kubectl patch ValidatingWebhookConfiguration redb-admission --patch "$(cat modified-webhook.yaml)"
    ```

### Limit the webhook to the relevant namespaces {#webhook}

The webhook will intercept requests from all namespaces unless you edit it to target a specific namespace. You can do this by adding the `namespaceSelector` section to the webhook spec to target a label on the namespace.

1. Make sure the namespace has a unique `namespace-name` label.

    ```sh
    apiVersion: v1
    kind: Namespace
    metadata:
       labels:
        namespace-name: example-ns
    name: example-ns
    ```

1. Patch the webhook to add the `namespaceSelector` section.

    ```sh
    cat > modified-webhook.yaml <<EOF
    webhooks:
    - name: redb.admission.redislabs
      namespaceSelector:
        matchLabels:
          namespace-name: staging
    EOF
    ```

1. Apply the patch.

    ```sh
    kubectl patch ValidatingWebhookConfiguration redb-admission --patch "$(cat modified-webhook.yaml)"
    ```

1. Verify the admission controller is installed correctly by applying an invalid resource. This should force the admission controller to correct it.

    ```sh
    $ kubectl apply -f - << EOF
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseDatabase
    metadata:
      name: redis-enterprise-database
    spec:
      evictionPolicy: illegal
    EOF
    ```

  You should see your request was denied by the `admission webhook "redb.admission.redislabs"`.

    ```sh
    Error from server: error when creating "STDIN": admission webhook "redb.admission.redislabs" denied the request: eviction_policy: u'illegal' is not one of [u'volatile-lru', u'volatile-ttl', u'volatile-random', u'allkeys-lru', u'allkeys-random', u'noeviction', u'volatile-lfu', u'allkeys-lfu']
    ```

## Create a Redis Enterprise Database (REDB)

Once the cluster is running, you can create a test database.

1. Define the database with a sample REDB custom resource YAML file.

   ```sh
   cat <<EOF > smalldb.yaml
   apiVersion: app.redislabs.com/v1alpha1
   kind: RedisEnterpriseDatabase
   metadata:
     name: smalldb
   spec:
     memorySize: 100MB
   EOF
   ```

1. Apply the REDB resource file.

   ```sh
   kubectl apply -f smalldb.yaml
   ```

1. The connectivity information for the database is now stored in a Kubernetes secret using the same name but prefixed with `redb-`:

   ```sh
   kubectl get secret/redb-smalldb -o yaml
   ```

   From this secret you can get the service name, port, and password for the
   default user.
