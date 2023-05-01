---
Title: Edit Redis Enterprise remote clusters
linkTitle: Edit RERC
description: Edit the configuration details of an existing RERC with Redis Enterprise for Kubernetes.
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/preview/edit-rerc

}
---

define RERC and link to creation steps

## Edit RERC

Use the `kubectl patch rerc <rerc-name> --type merge --patch` command to patch the local RERC custom resource with your changes. For a full list of available fields, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

The following example edits the `dbFqdnSuffix` field for the RERC named `rerc1`.

```sh
kubectl patch rerc rerc1 --type merge --patch \
'{"spec":{"dbFqdnSuffix": "-example2-cluster-rec1-ns1.redis.com"}}'
```

## Update RERC secret

If the credentials are changed or updated for a REC participating cluster, you need to manually edit the RERC secret and apply it to all participating clusters.

1. On the local cluster, update the secret with new credentials and name it with the following convention:  `redis-enterprise-<rerc-name>`.

  A secret for a remote cluster named `rerc1` would be similar to the following:

   ```yaml
  apiVersion: v1
  data:
    password: PHNvbWUgcGFzc3dvcmQ+
    username: PHNvbWUgdXNlcj4
  kind: Secret
  metadata:
    name: redis-enterprise-rerc1
  type: Opaque
```

1. Apply the file.

  ```sh
  kubectl apply -f <secret-file>
  ```

1. Watch the RERC to verify the status is "Active" and the spec status is "Valid."

  ```sh
  kubectl get rerc <rerc-name>
  ```

  The output should look like this:

  ```sh
   NAME        STATUS   SPEC STATUS   LOCAL
    rerc1   Active   Valid         true
  ```

  To troubleshoot invalid configurations, view the RERC custom resource events and the [Redis Enterprise operator logs]({{<relref "/kubernetes/logs/">}}).

1. Verify the status each REAADB using that RERC is "Active" and the spec status is "Valid."

  ```sh 
  kubectl get reaadb <reaadb-name>
  ```

  The output should look like this:

  ```sh
    NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
  example-aadb-1   active   Valid                                      
  example-aadb-2   active   Valid                                      
  ```

  To troubleshoot invalid configurations, view the RERC custom resource events and the [Redis Enterprise operator logs]({{<relref "/kubernetes/logs/">}}).

1. Repeat the above steps on all other participating clusters.