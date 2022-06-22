---
Title: Upgrade a Redis Enterprise cluster (REC) on Kubernetes
linkTitle: Upgrade a Redis cluster
description: This task describes how to upgrade a Redis Enterprise cluster via the operator.
weight: 19
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /rs/administering/kubernetes/upgrading-redis-enterprise-cluster-kubernetes-deployment-operator/,
    /platforms/kubernetes/upgrading-kubernetes-with-operator/,
    /platforms/kubernetes/tasks/upgrading-with-operator.md,
    /platforms/kubernetes/tasks/upgrading-with-operator/,
    /platforms/kubernetes/rec/upgrade-redis-cluster.md,
    /platforms/kubernetes/rec/upgrade-redis-cluster/,
    /kubernetes/re-clusters/upgrade-redis-cluster.md,
    /kubernetes/re-clusters/upgrade-redis-cluster/,
]
---
Redis implements rolling updates for software upgrades in Kubernetes deployments. The upgrade process consists of two steps:

  1. Upgrade the Redis Enterprise operator
  2. Upgrade the Redis Enterprise cluster (REC)

{{< warning >}}
  **Do not** upgrade to the 6.2.10-34 release if you are an **OpenShift** customer and **also use modules**.
  
  There was a change in 6.2.10-34 to a new RHEL 8 base image for the Redis Server image. Due to binary differences in modules between the two operating systems, you cannot directly update RHEL 7 clusters to RHEL 8 when those clusters host databases using modules.
  
  This message will be updated as remediation plans and new steps are available to address this situation. Please contact support if you have further questions. {{</warning>}}

## Upgrade the operator

### Download the bundle

Make sure you pull the correct version of the bundle. You can find the version tags
by checking the [operator releases on GitHub](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases)
or by [using the GitHub API](https://docs.github.com/en/rest/reference/repos#releases).

You can download the bundle for the latest release with the following `curl` command:

```sh
VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep tag_name | awk -F'"' '{print $4}'`
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/bundle.yaml
```

For OpenShift environments, the name of the bundle is `openshift.bundle.yaml`, and so the `curl` command to run is:

```sh
curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/openshift.bundle.yaml
```

If you need a different release, replace `VERSION` in the above with a specific release tag.

### Apply the bundle

Apply the bundle to deploy the new operator binary. This will also apply any changes in the new release to custom resource definitions, roles, role binding, or operator service accounts.

{{< note >}}
If you are not pulling images from Docker Hub, update the operator image spec to point to your private repository.
If you have made changes to the role, role binding, RBAC or custom resource definition (CRD) in the previous version, merge them with the updated declarations in the new version files.
{{< /note >}}

Upgrade the bundle and operator with a single command, passing in the bundle YAML file:

```sh
kubectl apply -f bundle.yaml
```

If you are using OpenShift, run this instead:

```sh
kubectl apply -f openshift.bundle.yaml
```

After running this command, you should see a result similar to this:

```sh
role.rbac.authorization.k8s.io/redis-enterprise-operator configured
serviceaccount/redis-enterprise-operator configured
rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator configured
customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
customresourcedefinition.apiextensions.k8s.io/redisenterprisedatabases.app.redislabs.com configured
deployment.apps/redis-enterprise-operator configured
```

### Reapply other manual configurations

When upgrading the operator, there are few configurations you'll need to reapply.

If you have the admission controller enabled, you need to manually reapply the `ValidatingWebhookConfiguration`. See the [Enable the admission controller]({{<relref "/kubernetes/deployment/quick-start#enable-the-admission-controller">}}) step during deployment for more details.

If you are using OpenShift, you will also need to manually reapply the [Security context constraints](https://docs.openshift.com/container-platform/4.8/authentication/managing-security-context-constraints.html) file ([`scc.yaml`]({{<relref "/kubernetes/deployment/openshift/openshift-cli#deploy-the-operator" >}})).

```sh
oc apply -f openshift/scc.yaml
```

### Verify the operator is running

You can check your deployment to verify the operator is running in your namespace.

```sh
kubectl get deployment/redis-enterprise-operator
```

You should see a result similar to this:

```sh
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
redis-enterprise-operator   1/1     1            1           0m36s
```

{{< warning >}}
 We recommend upgrading the REC as soon as possible after updating the operator. After the operator upgrade completes, the operator suspends the management of the REC and its associated REDBs, until the REC upgrade completes.
 {{< /warning >}}

## Upgrade the Redis Enterprise cluster (REC)

The Redis Enterprise cluster (REC) can be updated automatically or manually. To trigger automatic upgrade of the REC after the operator upgrade completes, specify `autoUpgradeRedisEnterprise: true` in your REC spec. If you don't have automatic upgrade enabled, follow the below steps for the manual upgrade.

Before beginning the upgrade of the Redis Enterprise cluster, check the K8s operator release notes to find the Redis Enterprise image tag. For example, in Redis Enterprise K8s operator release [6.0.12-5](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases/tag/v6.0.12-5), the `Images` section shows the Redis Enterprise tag is `6.0.12-57`.

After the operator upgrade is complete, you can upgrade Redis Enterprise cluster (REC).

### Edit `redisEnterpriseImageSpec` in the REC spec

1. Edit the REC custom resource YAML file.

    ```sh
    kubectl edit rec <your-rec.yaml>
    ```

1. Replace the `versionTag:` declaration under `redisEnterpriseImageSpec` with the new version tag.

    ```YAML
    spec:
      redisEnterpriseImageSpec:
        imagePullPolicy:  IfNotPresent
        repository:       redislabs/redis
        versionTag:       <new-version-tag>
    ```

1. Save the changes to apply.

### Monitor the upgrade

You can view the state of the REC with `kubectl get rec`.

  During the upgrade, the state should be `Upgrade`.
  When the upgrade is complete and the cluster is ready to use, the state will change to `Running`.
  If the state is `InvalidUpgrade`, there is an error (usually relating to configuration) in the upgrade.

```sh
$ kubectl get rec
NAME   NODES   VERSION      STATE     SPEC STATUS   LICENSE STATE   SHARDS LIMIT   LICENSE EXPIRATION DATE   AGE
rec    3       6.2.10-107   Upgrade   Valid         Valid           4              2022-07-16T13:59:00Z      92m
```

To see the status of the current rolling upgrade, run:

```sh
kubectl rollout status sts <REC_name>
```

### Upgrade databases

After the cluster is upgraded, you can upgrade your databases. The process for upgrading databases is the same for both Kubernetes and non-Kubernetes deployments. More details on how to [upgrade a database]({{<relref "/rs/installing-upgrading/upgrading#upgrade-a-database">}}) in the [Upgrade an existing Redis Enterprise Software deployment]({{<relref "/rs/installing-upgrading/upgrading.md">}}) documentation.

Note that if your cluster [`redisUpgradePolicy]({{<relref "/kubernetes/reference/cluster-options#redisupgradepolicy">}}) or your database [`redisVersion`]({{<relref "/kubernetes/reference/db-options#redisversion">}}) are set to `major`, you won't be able to upgrade those databases to minor versions. See [Redis upgrade policy]({{<relref "/rs/installing-upgrading/upgrading#redis-upgrade-policy">}}) for more details.

## How does the REC upgrade work?

The Redis Enterprise cluster (REC) uses a rolling upgrade, meaning it upgrades pods one by one. Each pod is updated after the last one completes successfully. This helps keep your cluster available for use.

To upgrade, the cluster terminates each pod and deploys a new pod based on the new image.
  Before each pod goes down, the operator checks if the pod is a primary (master) for the cluster, and if it hosts any primary (master) shards. If so, a replica on a different pod is promoted to primary. Then when the pod is terminated, the API remains available through the newly promoted primary pod.

After a pod is updated, the next pod is terminated and updated.
After all of the pods are updated, the upgrade process is complete.
