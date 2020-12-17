---
Title: Upgrading a Redis Enterprise Cluster in Operator-based Architecture
description:
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/administering/kubernetes/upgrading-redis-enterprise-cluster-kubernetes-deployment-operator/
---
Redis Labs implements rolling updates for software upgrades in Kubernetes deployments.

## Upgrading Redis Enterprise in Operator

1. Clone this repository, which contains the deployment files:

    ```sh
    git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
    ```

    Example response:

    ```sh
    Cloning into 'redis-enterprise-k8s-docs'...
    remote: Enumerating objects: 37, done.
    remote: Counting objects: 100% (37/37), done.
    remote: Compressing objects: 100% (30/30), done.
    remote: Total 168 (delta 19), reused 9 (delta 7), pack-reused 131
    Receiving objects: 100% (168/168), 45.32 KiB | 7.55 MiB/s, done.
    Resolving deltas: 100% (94/94), done.
    ```

1. Apply the [bundle.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/bundle.yaml), or the openshift.bundle.yaml file if you are running OpenShift.

    {{< note >}}
If you are not pulling images from Docker Hub, update the operator Image spec to point to your private repository.
If you have made changes to the role, role binding, rbac or crd in the previous version you must merge them with the updated declarations in the new version files.
    {{< /note >}}

1. After the Operator upgrade is complete:
    1. Run `kubectl edit rec` in the namespace your Redis Enterprise Cluster is deployed in.
    1. Replace the `image:` declaration under `redisEnterpriseImageSpec` with the new version tag provided in the release documentation.

    For example, in Operator release [5.4.10-8](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases/tag/5.4.10-8) the tag is `5.4.10-22` for the Ubuntu-based Redis Enterprise image.

    1. Save the changes.
        If your default text editor is vim then enter `<ESC>:wq` to save the file.

The rolling upgrade of the cluster nodes' statefulSet starts.

To see the status of the current rolling upgrade, run:

```sh
kubectl rollout status sts <REC_name>
```

## How does the upgrade work?

Rolling updates allow you to update deployments with zero downtime
by incrementally updating Redis Enterprise Cluster instances in the pods with new instances.

These diagrams show how a rolling update works:

- Each hexagon represents a node
- Each box represents a pod

![kubernetes-rolling-updates](/images/rs/kubernetes-rolling-updates.png)

The pods are updated one by one in the diagram, starting from left to right.
Each pod is updated after the last one completes successfully.

![kubernetes-rolling-updates-newapp](/images/rs/kubernetes-rolling-updates-newapp.png)

![kubernetes-rolling-updates-newcluster](/images/rs/kubernetes-rolling-updates-newcluster.png)

![kubernetes-rolling-updates-done](/images/rs/kubernetes-rolling-updates-done.png)

The pods in the StatefulSet are updated in reverse ordinal order.
The Kubernetes controller terminates each pod and waits for it to transition to `Running` and then to `Ready`.

After a pod is updated, the next pod is terminated and updated.
After all of the pods are updated, the upgrade process is complete.
