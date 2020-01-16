---
Title: Upgrading a Redis Enterprise Cluster in Operator-based Architecture
description:
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/administering/kubernetes/upgrading-redis-enterprise-cluster-kubernetes-deployment-operator/
---

Redis Labs implements rolling updates for software upgrades in Kubernetes deployments.

## Performing an upgrade

1. Clone this repository, which contains the deployment files:
```
$ git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
```
Example of a response:
```

Cloning into 'redis-enterprise-k8s-docs'...
remote: Enumerating objects: 37, done.
remote: Counting objects: 100% (37/37), done.
remote: Compressing objects: 100% (30/30), done.
remote: Total 168 (delta 19), reused 9 (delta 7), pack-reused 131
Receiving objects: 100% (168/168), 45.32 KiB | 7.55 MiB/s, done.
Resolving deltas: 100% (94/94), done.
```

2. Apply the [bundle.yaml] file (https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/bundle.yaml) - (or openshif.bundle.yaml file if running OpenShift)
{{% note %}} If you are not pulling images from DockerHub, update the operator Image spec to point to your private repository. If you have made changes (uncommon) to role, role binding, rbac or crd in the previous version you will need to merge them with the updated declarations in the new version files{{% /note %}}

3. Once the Operator and Services Rigger upgrade are complete, run `kubectl edit rec` in the namespace your Redis Enterprise Cluster is deployed in and replace the `image:` declaration under `redisEnterpriseImageSpec` with the new version tag provided in the release documentation.
For example, in Operator release [5.4.10-8](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases/tag/5.4.10-8)that tag is `redislabs/redis:5.4.10-22` for the Ubuntu based Redis Enterprise image.
Once you save your changes (if using vim as the default text editor that would be `<ESC>:wq`), the rolling upgrade of the cluster nodes' statefulSet will commence.

To view the status of the current rolling upgrade run:

```src
    kubectl rollout status sts
```

## How are upgrades performed?

Rolling updates allow deployments’ updates to take place with zero downtime
by incrementally updating Pods’ Redis Enterprise Cluster instances with new ones.

The following illustrations depict how a rolling update occurs:

- Each hexagon represents a node
- Each box represents a Pod

![kubernetes-rolling-updates]( /images/rs/kubernetes-rolling-updates.png )

The Pods are updated one by one, in the diagram starting from left to right.
Upgrade progresses to the next Pod only once the current Pod has completed
the upgrade process successfully.

![kubernetes-rolling-updates-newapp]( /images/rs/kubernetes-rolling-updates-newapp.png )

![kubernetes-rolling-updates-newcluster]( /images/rs/kubernetes-rolling-updates-newcluster.png )

![kubernetes-rolling-updates-done]( /images/rs/kubernetes-rolling updates-done.png )

Updates to the Pods in the StatefulSet are performed in reverse ordinal order.
The Kubernetes controller terminates each Pod and waits for it to transition to Running,
and then to Ready, before updating the next Pod, until all Pods are updated
and the upgrade process is complete.
