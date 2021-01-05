---
Title: Using kustomize for deployment
description: A primer on how to use the kustomize tool with the Redis Enterprise operator on Kubernetes
weight: 32
alwaysopen: false
categories: ["Platforms"]
aliases:
---

[Kustomize](https://kustomize.io) is a template-free way to customize application configuration that is [Kubernetes native](https://github.com/kubernetes-sigs/kustomize) and built into kubectl via apply -k. It provides a declarative approach to configuration management that can be used with a variety of deployment tools for Kubernetes.

## Motivation for use with Redis Enterprise

Our operator is deployed onto your target Kubernetes cluster via a bundle or automation tools like OpenShift’s OLM. The standard practice is to deploy this bundle without any configuration changes as the specific settings are part of how our product has been designed. Customers are unlikely to need any configuration changes for the operator itself.

The need for configuration management arises in the use of the operator via the [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) defined for Redis Enterprise clusters and databases (see the documentation for the [cluster CR](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md) and [database CR](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_database_api.md)). You will likely want to set different parameters for a different applications while having consistency for company policies. At the same time, you'll want to manage the differences in deployment topologies for development, QA, and production clusters and databases.

For example, production clusters will likely have additional or larger settings for resources requests and limits that exceed the capacity of development or testing systems. Meanwhile, all the clusters will share the same set of names and features. Also, for each deployment for development, QA, or production, the secrets, passwords, and other security settings are likely very different. This is just the kind of situation that kustomize is designed to handle well.

## A simple example

Kustomize works on the building variants from a hierarchy of configurations. In the simplest setup, there is one “base” directory containing all the common resources. For each variant, there are different directories each with instructions on how to produce the variant.

For example, say we simply want to control the the limits and requests for a node so that they are different values for development and production. To start, we must create a “base” directory that contains a default configuration for a simple cluster:

```
mkdir -p base
cat << EOF > base/cluster.yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: test
spec:
  nodes: 3
  username: "app@example.org"
EOF
```

We then need to configure the “base” directory to be recognized by kustomize. The simplest configuration just lists the resources:

```
cat << EOF > base/kustomization.yaml
resources:
 - cluster.yaml
EOF
```

Now we can create a variant for development purposes that tunes down the CPU requirements and also creates a single node cluster while changing the namespace:

```
mkdir -p dev
cat << EOF > dev/cluster.yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: test
spec:
  nodes: 1
  redisEnterpriseNodeResources:
    limits:
      cpu: 1
      memory: 4Gi
    requests:
      cpu: 1
      memory: 4Gi
EOF
```

In this example, the cluster resource must repeat the prolog metadata so that kustomize can match our resources. At minimum, we need the apiVersion, kind, and metadata.name.

As before, we need to tell kustomize about our resources via a kustomization.yaml file. In this case, we need to tell kustomize what to do with our variant of cluster.yaml. Specifically, we want to patch the base cluster.yaml via a strategic merge of properties:

```
cat << EOF > dev/kustomization.yaml
bases:
 - ../base

namespace: dev

patchesStrategicMerge:
 - cluster.yaml
EOF
```

For a QA deployment, we might need more resources:

```
mkdir -p qa
cat << EOF > qa/cluster.yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: test
spec:
  nodes: 5
  redisEnterpriseNodeResources:
    limits:
      cpu: 2
      memory: 25Gi
    requests:
      cpu: 2
      memory: 25Gi
EOF
cat << EOF > qa/kustomization.yaml
bases:
 - ../base

namespace: qa

patchesStrategicMerge:
 - cluster.yaml
EOF
```

At this, we can test our “dev” customization via:

```
kubectl kustomize dev
```

and the output should look something like:

```
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: test
  namespace: dev
spec:
  nodes: 1
  redisEnterpriseNodeResources:
    limits:
      cpu: 1
      memory: 4Gi
    requests:
      cpu: 1
      memory: 4Gi
  username: app@example.org
```

Here you’ll see that the various properties under “spec” from the base version of “cluster.yaml” have been preserved in our new variant. Meanwhile, we’ve added a namespace and the additional properties for the resource limits and requests.

This strategy preserves the common spec settings in the base so they don’t appear in more than one place. We can also do things list adjust names with namePrefix or create complex hierarchy of changes, patches via strategic merges, and addition of resources like deployment-specific secrets.

## How to use kustomize

Kustomize is a tool that fits in with the idea of “configuration as code”. There is a wide ranges of ways that kustomize can be used successfully and it depends on where your project or organization is in terms of automation. These configuration are compatible with many CI/CD tools for Kubernetes such as Flux CD.

The simplest way is to just via kubectl apply. In the example, we could create our development cluster by:

```
kubectl apply -k dev
```

If we need to feed the output to another tool, the output of “kubectl kustomize” has the appropriate separators to be used as a bundle. We can simple redirect the output for use in another tool:

```
kubectl kustomize dev > bundle.yaml
```

Finally, kustomize can be run as its own binary outside of kubectl. The “kustomize build” command has the same outcome as “kubectl kustomize”:

```
kustomize build dev
```

Note: you can install kustomize directly in a variety of ways (e.g. via homebrew on the Mac).
