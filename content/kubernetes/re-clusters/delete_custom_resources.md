---
Title: Delete custom resources
linkTitle: Delete custom resources
description: This article explains how to delete Redis Enterprise clusters and Redis Enterprise databases from your Kubernetes environment.
weight: 90
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-clusters/delete_custom_resources.md,
    /kubernetes/re-clusters/delete_custom_resources/,
]
---

## Delete a database

To delete a database managed by the Redis Enterprise Kubernetes operator, run `kubectl delete redb <your-db-name>` from your K8s cluster.

When you delete a database, your data and the REDB custom resource file are also deleted.

### Troubleshoot REDB deletion

After a deletion request, the operator attaches a finalizer to the Redis Enterprise database (REDB) object. This makes sure the database is deleted before the REDB custom resource is removed from the K8s cluster.

If the finalizer isn't removed automatically by the operator, you won't be able to delete your REDB resource.

If this happens, you can remove the finalizer manually with the following command:

```sh
kubectl patch redb <your-db-name> --type=json -p \
    '[{"op":"remove","path":"/metadata/finalizers","value":"finalizer.redisenterprisedatabases.app.redislabs.com"}]'
```

## Delete a Redis Enterprise cluster (REC)

To delete a Redis Enterprise cluster managed by the operator:

1. Delete all the databases in your cluster

1. Delete all the PVC's you created for the cluster.

1. Run `kubectl delete rec <your-rec-name>` from your K8s cluster.

When you delete your cluster, your data and the REC custom resource file are also deleted.

### Troubleshoot REC deletion

After a deletion request, the operator attaches a finalizer to the Redis Enterprise cluster (REC) object. This makes sure the Redis cluster is deleted before the REC custom resource is removed from the K8s cluster.

If the finalizer isn't removed automatically by the operator, you won't be able to delete your REC resource.

If this happens, you can remove the finalizer manually with the following command:

```sh
kubectl patch rec <your-rec-name> --type=json -p \
    '[{"op":"remove","path":"/metadata/finalizers","value":"redbfinalizer.redisenterpriseclusters.app.redislabs.com"}]'
```

## Delete the operator

To delete the operator from your K8s cluster and namespace, you can delete the operator bundle with `kubectl delete bundle.yaml`. This will remove the operator and its custom resource definitions (CRDs) from your K8s cluster.

{{<warning>}} The Redis Enterprise CRDs are non-namespaced resources, meaning they are shared across your entire K8s cluster. Deleting CRDs in one namespace will delete custom resources in every other namespace across the K8s cluster.{{</warning>}}

If you have Redis Enterprise clusters running in different namespaces on the same K8s cluster, deleting the entire operator bundle might cause data loss.

To safely delete the operator from one namespace without affecting the others, delete the operator files individually, excluding the CRD files:

```sh
kubectl delete role.yaml
kubectl delete role_binding.yaml
kubectl delete service_account.yaml
kubectl delete admission-service.yaml
kubectl delete operator.yaml
```
