---
Title: Managing Container Images
description: This section details how the Redis Enterprise Software and Kubernetes operator images can be configured to be pulled from a variety of sources. This page describes how to configure alternate private repositories for images, plus some techniques for handling public repositories with rate limiting.
weight: 92
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/managing-images/
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
from a public registry once and then push them to a private registry under
your control.

**Note:** It is very important that the images you are pushing to the private registry have the same exact version tag than the original images.

Furthermore, because [Docker now rate limits public pulls](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/),
you may want to consider pulling images from a
private registry to avoid deployment failures when you hit your DockerHub rate limit.


The information below will enable you to track and prescribe the right
solution for where your deployments pull container images.

{{< note >}}

Before you deploy private repositories for managing container
images for the Redis Enterprise operator and cluster, take care to note:

 * Each version of the Redis Enterprise operator is mapped to a specific version
   of Redis Enterprise Software. The semantic versions always match (e.g., 6.0.8), although the specific release numbers
   may be different (e.g., 6.0.8-1 is the operator version for RS 6.0.8-28).
 * A specific operator version only supports a specific Redis Enterprise
   version. Other combinations of operator and Redis Enterprise versions are
   **not supported**.
{{< /note >}}

## Determining container image sources

Every pod in your deployed application has a source registry. You
can determine the sources by running this command:

```
kubectl get pods --all-namespaces -o jsonpath="{..image}" |tr -s '[[:space:]]' '\n' | uniq -c
```

The output lists all of the images used by your cluster. You can
limit this command to specific namespaces by replacing the `--all-namespaces` parameter with
a set of `-n {namespace}` parameters, where each `{namespace}` is a specific
namespace of interest on your cluster.

Any image not prefixed by a registry domain name (e.g., "gcr.io") will pull
from the default registry for the Kubernetes cluster (i.e., DockerHub).

To specifically determine the pull source for the Redis Enterprise Operator itself, run the following command:
simple filter:

```
kubectl get pods --all-namespaces -o jsonpath="{..image}" |tr -s '[[:space:]]' '\n' | uniq -c | grep redislabs
```

## Rating limiting with DockerHub

Docker [rate limits image pulls](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/).
Anonymous users are allowed 100 pulls every 6 hours; for authenticated users, the limit is 200 pulls every 6 hours.
These rate limits may affect your Kubernetes cluster in a number of ways:

 * The cluster nodes will likely be treated as a one anonymous user.
 * The number of pulls during an initial or subsequent deployment might
   exceed the rate limit for other deployment dependencies, including our operator, Redis Enterprise Software, or for other non-Redis pods.
 * Pull failures may prevent your deployment from downloading the required images in a timely manner. Delays here can affect the stability of deployments like StatefulSet, which is used by the Redis Enterprise operator.

For these reasons, you should seriously consider where your images
are pulled from to avoid failures caused by rate limiting. The easiest solution
is to push the required images to a private container registry under your control.

## Managing image sources

The images for Redis Enterprise Software and its Kubernetes operator are distributed on DockerHub,
Red Hat, and other public registries. Your organization may
require these images to be copied to other container registries used by your Kubernetes
clusters.

### Creating a private container registry

You can set up a private container registry in a couple of ways:

 * On-premise via [Docker registry](https://docs.docker.com/registry/deploying/),
   [Red Hat Quay](https://www.redhat.com/en/technologies/cloud-computing/quay), or other providers
 * Cloud provider based registries (e.g., Azure Container Registry, Google Container Registry, etc.).

Once you have set up a private container registry, you will identify the container registry using:

 * A domain name
 * A port (optional)
 * An repository path (optional)

You use this information to reference the images you
push to your private registry. For example, a Google Container Registry
will start with `gcr.io/{project-id}` where `{project-id}` is the cloud project
identifier that prefixes the repository path for your container images.

### Pushing Redis Enterprise images to a private container registry

A Kubernetes deployment uses a variety of images. Some of the important images for a Redis Enterprise Software deployment include:

 * Redis Enterprise Software
 * Bootstrapping a Redis Enterprise cluster node (in the operator image)
 * The Service Rigger
 * The Redis Enterprise Software operator

Once you have created a private container registry, you will need to push
all these images to your private container registry. In general,
to push the images you must:

 1. Pull the various images locally for the Redis Enterprise Software, Service Rigger, and the operator.
 2. Tag the local images with the private container registry, repository, and version tag.
 3. Push the newly tagged images.

For example, here are the commands for pushing the images for Redis Enterprise Software and its operator to your private container registry:

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

## Using a private container registry

Once you push your images to your private container registry, you need to
configure your deployments to use the private container registry and repository
for the various container images for a Redis Enterprise Software and operator
deployment. There are two different deployments to consider:

 1. The Redis Enterprise operator
 2. The Redis Enterprise pods and Service Rigger created by the operator

For (1), the operator container image is configured directly by the operator deployment
bundle. Whereas, for (2), the Redis Enterprise cluster pod (RS and bootstrapper) and Service Rigger
images are configured in the Redis Enterprise Custom Resource.

Also, depending on your Kubernetes platform, your private container registry may
require authentication. If you are using a private container registry associated with
your K8s cluster, you may be able to pull the images without credentials. For
example, a GKE cluster in the same project as the GCR container registry will have the
necessary authorization to pull the images. Otherwise, you may
need to add a [pull secret](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) to your namespace
and then tell Kubernetes and the operator to use the pull secret.

See the following two sections for how to specify registry credentials.

### Specifying the operator image

The operator bundle (e.g., see the [6.0.8-1 bundle.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/6.0.8-1/bundle.yaml))
contains the operator deployment and the reference to the operator image (redislabs/operator). To use a private container registry, you must
change this image reference before you deploy the operator. This image
should point to the same repository and tag pushed to the private container registry:

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
the operator's pod will restart. As the operator is stateless, the restart will
not not affect any existing cluster managed by the operator.

If your container registry requires a pull secret, you may specify the standard `imagePullSecrets`
 on the operator deployment:


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

 * **`redislabs/redis`**: the Redis Enterprise Software container image
 * **`redislabs/operator`**: the bootstrapper is packaged within the operator container image
 * **`redislabs/k8s-controller`**: the Service Rigger container image

By default, a new Redis Enterprise Software cluster is created using the
container images listed above. These container images will be pulled from the default
container registry for the Kubernetes cluster. This may not be the same
container registry from which the operator itself was pulled.

To pull the Redis Enterprise Software and related container images from
a private container registry, you must specify all three of these images in the
Redis Enterprise cluster custom resource. The container
images are controlled by an image specification that specifies the
image pull policy, the container image (the container registry and repository),
and the version tag.

The corresponding image specification labels are:

 * **`redisEnterpriseImageSpec`**: controls the Redis Enterprise Software container image. *The version should match the RS version associated with the operator version*.
 * **`bootstrapperImageSpec`**": controls the bootstrapper container image. *The version must match the operator version*.
 * **`redisEnterpriseServicesRiggerImageSpec`**: controls the Service Rigger container image. *The version must match the operator version*.

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

If your private container registry requires pull secrets, you must add `pullSecrets`
to the `spec`:

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
