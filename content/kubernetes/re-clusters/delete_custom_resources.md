---
Title: Delete custom resources
linkTitle: Delete custom resources
description: This article explains how to delete Redis Enterprise clusters and Redis Enterprise databases from your Kubernetes environment.
weight: 80
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-clusters/delete_custom_resources.md,
    /kubernetes/re-clusters/delete_custom_resources/,
]
---

## Delete a database

To delete a database created by the Redis Enterprise Kubernetes operator, run `kubectl delete redb <your-db-name>` from your K8s cluster.

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



### Troubleshoot REC deletion

## Delete the operator

### Delete custom resource definitions (CRDs)
