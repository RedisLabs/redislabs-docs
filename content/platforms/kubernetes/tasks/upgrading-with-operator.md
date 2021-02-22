---
Title: Upgrading a Redis Enterprise Cluster on Kubernetes
description: This task describes how to upgrade a Redis Enterprise cluster via the operator.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/administering/kubernetes/upgrading-redis-enterprise-cluster-kubernetes-deployment-operator/
         /platforms/kubernetes/upgrading-kubernetes-with-operator/
---
Redis Labs implements rolling updates for software upgrades in Kubernetes deployments.

## Upgrading Redis Enterprise in Operator

### Download the bundle
You need to ensure that you pull the correct version of the bundle. You can find the version tags
by checking the [operator releases on GitHub](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases)
or by [using the GitHub API](https://docs.github.com/en/rest/reference/repos#releases).

You can download the bundle for the latest release by issuing the following `curl` command:

```
VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep tag_name | awk -F'"' '{print $4}'`
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/bundle.yaml
```

If you need a different release, replace `VERSION` in the above with a specific release tag.

### Apply the bundle

Applying the bundle applies the changes made in the new release to custom resource definitions, roles, role binding, operator service account and deploys a new operator binary.

    {{< note >}}
If you are not pulling images from Docker Hub, update the operator image spec to point to your private repository.
If you have made changes to the role, role binding, rbac or crd in the previous version you must merge them with the updated declarations in the new version files.
    {{< /note >}}
    
You can upgrade the bundle and operator with a single apply command, passing in the bundle YAML file:

```
kubectl apply -f bundle.yaml
```

After running this command, you should see a result similar to this:

```
role.rbac.authorization.k8s.io/redis-enterprise-operator configured
serviceaccount/redis-enterprise-operator configured
rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator configured
customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
customresourcedefinition.apiextensions.k8s.io/redisenterprisedatabases.app.redislabs.com configured
deployment.apps/redis-enterprise-operator configured
```

### Verify that the operator is running

You can verify the operator is running in your namespace by checking the deployment as follows:

```
kubectl get deployment -l name=redis-enterprise-operator
```

You should see a result similar to this:

```
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
redis-enterprise-operator   1/1     1            1           0m36s
```

### Upgrade the Redis Enterprise cluster version

After the Operator upgrade is complete:
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
