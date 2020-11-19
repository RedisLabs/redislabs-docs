---
Title: Managing Container Images
description: The operator and Redis Enterprise images can be configured to be pulled from a variety of sources. This section describes how to configure alternate private repositories for images or techniques for handling public repositories and possible rate limiting.
weight: 92
alwaysopen: false
categories: ["Platforms"]
aliases:
---

Redis Enterprise Software, its Kubernetes operator, and the Service Rigger
are all distributed as separate container images.
Your Kubernetes deployment will pull these images as needed.
 You can control where these images are
pulled from within the operator deployment and also via the
Redis Enterprise custom resource.

In general, images for deployments that do not have a registry domain
name (e.g., `gcr.io` or `localhost:5000`) are pulled from the default registry associated
with the Kubernetes cluster. As such, an
undecorated reference to `redislabs/redis` will likely pull from DockerHub
(except on OpenShift where it pulls from Red Hat).

For security reasons (e.g., in air-gapped environments), you may want to pull the images
from a public repository once and then push them to a private repository under
your control.  Furthermore, because [Docker now rate limits public pulls](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/),
rate limiting for public pulls, you may want to consider pulling images from a
private repository to avoid deployment failures when you hit your rate limit.


The information below will enable you to track and prescribe the right
solution for where your deployments pull container images.

**IMPORTANT NOTE**

Before you deploy private repositories for managing container
images for the Redis Enterprise operator and cluster, take care to note:

 * Each version of Redis Enterprise operator is mapped to a specific version
   of Redis Enterprise. The semantic versions match (e.g., 6.0.8) but the releases
   may be different (e.g., 6.0.8-1 is the operator version for RS 6.0.8-28).
 * A specific operator version only supports a specific Redis Enterprise
   version. Other combinations of operator and Redis Enterprise versions are
   **not supported**.


## Determining image pull sources

Every pod in your various deployed application has a source repository. You
can determine the sources by a simple command:

```
kubectl get pods --all-namespaces -o jsonpath="{..image}" |tr -s '[[:space:]]' '\n' | uniq -c
```

The output is list all the images and their counts used on your cluster. You can
limit this command to specific namespaces by changing the `--all-namespaces` to
a set of `-n {namespace}` parameters where each `{namespace}` is a specific
namespace of interest on your cluster.

Any image that is not prefixed by a repository domain name (e.g., "gcr.io"), will pull
from the default repository for the Kubernetes cluster (i.e., DockerHub).

For the Redis Enterprise Operator, you can determine your pull source by a
simple filter:

```
kubectl get pods --all-namespaces -o jsonpath="{..image}" |tr -s '[[:space:]]' '\n' | uniq -c | grep redislabs
```

## Rating limiting with DockerHub

Docker [announced restrictions](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/)
via rate limiting for the number of pulls, anonymous or authenticated,
on the scale of 100 and 200 pulls per 6 hours, respectively. In the context of
a Kubernetes cluster, this may affect the cluster in a number of ways:

 * the cluster nodes will likely be treated as a one anonymous user,
 * the number of pulls during an initial or subsequent deployment could
   exceed the rate limiting for any aspect of the deployment: for our operator, Redis Enterprise, or for other non-Redis pods,
 * pull failures may cause serious delays in the ability for a deployment to pull the necessary images and so will
   affect the stability of deployments like the StatefulSet used by the Redis Enterprise operator.

For this reason, serious consideration should be applied to where the images
are pulled from to avoid failures caused by rate limiting. The easiest solution
is to push the required images to a private repository under your control.

## Managing image sources

Redis Enterprise operator and cluster images are pushed to DockerHub,
Red Hat, and other public registries for distribution. Your organization may
require these images be copied to other registries used by your Kubernetes
clusters.

### Creating a private repository

A private registry can be setup via:

 * on-premise via [Docker registry](https://docs.docker.com/registry/deploying/),
   RedHat Quay, or other providers,
 * via a cloud provider (e.g., Azure Container Registry, Google Container Registry, etc.).

Once you have setup a repository, you will have:

 * a domain name,
 * an optional port,
 * an optional registry path suffix,

This information identifies your registry and must be used to references images you
push to your private registry. For example, a Google Container Registry
will start with `gcr.io/{project-id}` where '{project-id}' is the cloud project
identifier.

### Pushing Redis Enterprise images to a private repository

A Kubernetes deployment uses different images for various purposes:

 * Redis Enterprise
 * bootstrapping a Redis Enterprise cluster node
 * the Service Rigger
 * the Redis Enterprise operator

Once you have setup a private repository, you will need to push these images
to your private repository. The process to do so is:

 1. Pull the various images locally for Redis Enterprise and the operator.
 2. Tag the local images with the repository prefixed onto the name.
 3. Push the new tagged images name with the repository prefix.

For Redis Enterprise and the operator, this process can be accomplished by:

```
PRIVATE_REPO=...your repo...
RS_VERSION=6.0.8-28
OPERATOR_VERSION=6.0.8-1
docker pull redislabs/redis:${RS_VERSION}
docker pull redislabs/operator:${OPERATOR_VERSION}
docker pull redislabs/k8s-controller:${OPERATOR_VERSION}
docker tag redislabs/redis:${RS_VERSION} ${PRIVATE_REPO}/redislabs/redis:${RS_VERSION}
docker tag redislabs/operator:${OPERATOR_VERSION} ${PRIVATE_REPO}/redislabs/operator:${OPERATOR_VERSION}
docker tag redislabs/k8s-controller:${OPERATOR_VERSION} ${PRIVATE_REPO}/redislabs/k8s-controller:${OPERATOR_VERSION}
docker push ${PRIVATE_REPO}/redislabs/redis:${RS_VERSION}
docker push ${PRIVATE_REPO}/redislabs/operator:${OPERATOR_VERSION}
docker push ${PRIVATE_REPO}/redislabs/k8s-controller:${OPERATOR_VERSION}
```

## Using a private repository

After pushing your desired version to your private repository, you just need to
configure your deployments to use the private repository. There are two
different deployments to consider:

 1. The Redis Enterprise operator.
 2. The Redis Enterprise pods and Service Rigger created by the operator.

For (1), the operator container image is controlled directly by the deployment
bundle. Whereas, for (2), the Redis Enterprise cluster pod (RS and bootstrapper) and Service Rigger
images are controlled in the Redis Enterprise Custom Resource.

Also, depending on your Kubernetes platform, your private repository may
require authentication. If you are using a private repository associated with
your K8s cluster, you may be able to pull the images without credentials. For
example, a GKE cluster in the same project as the GCR registry will have the
necessary authorization to pull the images. Otherwise, you may
need to add a [pull secret](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) to your namespace
and then tell Kubernetes and the operator to use the pull secret.

If you need to specify credentials, each of the following sections will
detail where the pull secret needs to be specified.

### Specifying the operator image

The operator bundle (e.g., see the [6.0.8-1 bundle.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/6.0.8-1/bundle.yaml))
contains the operator deployment and the reference to the operator image (redislabs/operator). To use a private repository, you must
change this image reference before you deploy the operator. This image
should point to the same value tag pushed to the private repository:

```
${PRIVATE_REPO}/redislabs/operator:${OPERATOR_VERSION}
```

For example:

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-enterprise-operator
spec:
  replicas: 1
  selector:
    matchLabels:
      name: redis-enterprise-operator
  template:
    metadata:
      labels:
        name: redis-enterprise-operator
    spec:
      serviceAccountName: redis-enterprise-operator
      containers:
        - name: redis-enterprise-operator
          image: gcr.io/yourproject/redislabs/operator:6.0.8-1
...
```

Note that if you apply this change to modify an existing operator deployment,
the operator's pod will restart. As the operator is stateless, it will pull
the image from the private repository (as necessary) and restart the pod. This
kind of change will not affect any existing cluster managed by the operator.

If your registry requires a pull secret, the standard `imagePullSecrets`
may be specified on the operator deployment:


```YAML
spec:
  template:
    spec:
      imagePullSecrets:
      - name: regcred
```

### Specifying the Redis Enterprise cluster images

A Redis Enterprise cluster managed by the operator consists of three
container images:

 * **`redislabs/redis`** - the Redis Enterprise container image
 * **`redislabs/operator`** - the bootstrapper container image packaged with the operator
 * **`redislabs/k8s-controller`** - the service rigger container image

By default, when a new cluster is created by the operator, it uses the
standard container images listed above. As such, it will not necessarily pull
them from the same private repository from which the operator may have been
pulled. The images will be pulled from the default container registry for
the Kubernetes cluster (i.e., typically DockerHub).

The consequence is that you must specify all three container images
to pull all the images from the same private repository. The container
images are controlled by an image specification that specifies the
image pull policy, the container image, and the version tag.

The corresponding image spec labels are:

 * **`redisEnterpriseImageSpec`**: controls the Redis Enterprise container image. *The version should match the RS version associated with the operator version*.
 * **`bootstrapperImageSpec`**": controls the bootstrapper container image. *The version must match the operator version*.
 * **`redisEnterpriseServicesRiggerImageSpec`**: controls the service rigger version. *The version must match the operator version*.

For example, the following pulls all three container images from a
private registry:

```YAML
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  nodes: 3
  redisEnterpriseImageSpec:
    imagePullPolicy: IfNotPresent
    repository: gcr.io/yourproject/redislabs/redis
    versionTag: 6.0.8-28
  bootstrapperImageSpec:
    imagePullPolicy: IfNotPresent
    repository: gcr.io/yourproject/redislabs/operator
    versionTag: 6.0.8-1
  redisEnterpriseServicesRiggerImageSpec:
    imagePullPolicy: IfNotPresent
    repository: gcr.io/yourproject/redislabs/k8s-controller
    versionTag: 6.0.8-1
```

If you require pull secrets, you must add `imagePullSecrets`:

```YAML
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  nodes: 3
  pullSecrets:
    -name: regcred
  redisEnterpriseImageSpec:
    imagePullPolicy: IfNotPresent
    repository: gcr.io/yourproject/redislabs/redis
    versionTag: 6.0.8-28
  bootstrapperImageSpec:
    imagePullPolicy: IfNotPresent
    repository: gcr.io/yourproject/redislabs/operator
    versionTag: 6.0.8-1
  redisEnterpriseServicesRiggerImageSpec:
    imagePullPolicy: IfNotPresent
    repository: gcr.io/yourproject/redislabs/k8s-controller
    versionTag: 6.0.8-1
```
