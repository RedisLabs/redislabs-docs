---
Title: Upgrade a Redis Enterprise cluster on Kubernetes
linkTitle: Ugrade a Redis cluster
description: This task describes how to upgrade a Redis Enterprise cluster via the operator.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/administering/kubernetes/upgrading-redis-enterprise-cluster-kubernetes-deployment-operator/
         /platforms/kubernetes/upgrading-kubernetes-with-operator/
---
Redis implements rolling updates for software upgrades in Kubernetes deployments.

## Upgrading Redis Enterprise 

### Download the bundle
You need to ensure that you pull the correct version of the bundle. You can find the version tags
by checking the [operator releases on GitHub](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases)
or by [using the GitHub API](https://docs.github.com/en/rest/reference/repos#releases).

You can download the bundle for the latest release by issuing the following `curl` command:

```
VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep tag_name | awk -F'"' '{print $4}'`
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/bundle.yaml
```
For openshift environments, the name of the bundle is openshift.bundle.yaml, and so the curl command to run is:

```
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/openshift.bundle.yaml
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

If you are using openshift, run this instead:

```
kubectl apply -f openshift.bundle.yaml
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
kubectl get deployment/redis-enterprise-operator
```

You should see a result similar to this:

```
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
redis-enterprise-operator   1/1     1            1           0m36s
```

### Upgrade the Redis Enterprise cluster version

Before beginning the upgrade of the Redis Enterprise cluster version, check the K8s operator release notes to find the Redis Enterprise image tag. For example, in Redis Enterprise K8s operator release [6.0.12-5](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases/tag/v6.0.12-5), the `Images` section shows the Redis Enterprise tag is `6.0.12-57`.

After the Operator upgrade is complete, you can upgrade Redis Enterprise cluster version using the following steps.

1. Run `kubectl edit rec` in the namespace your Redis Enterprise cluster is deployed in.
2. Replace the `image:` declaration under `redisEnterpriseImageSpec` with the new version tag you found in the operator release notes.
3. Save the changes to apply

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
