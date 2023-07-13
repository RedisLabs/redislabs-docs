---
Title: Edit Redis Enterprise remote clusters
linkTitle: Edit RERC
description: Edit the configuration details of an existing RERC with Redis Enterprise for Kubernetes.
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/preview/edit-rerc,
    /kubernetes/active-active/edit-rerc/,


}
---
{{<note>}}This feature is supported for general availability in releases 6.4.2-6 and later. Preview of this feature is available in versions 6.4.2-4 and 6.4.2-5, but we recommend using the GA version 6.4.2-6. This feature is not supported in versions 6.2.18-41 and before.{{</note>}}

Before a RedisEnterpriseCluster (REC) can participate in an Active-Active database, it needs an accompanying RedisEnterpriseRemoteCluster (RERC) custom resource. The RERC contains details allowing the REC to link to the RedisEnterpriseActiveActiveDatabase (REAADB). The RERC resource is listed in the REAADB resource to become a participating cluster for the Active-Active database.

For more details, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

## Edit RERC

Use the `kubectl patch rerc <rerc-name> --type merge --patch` command to patch the local RERC custom resource with your changes. For a full list of available fields, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

The following example edits the `dbFqdnSuffix` field for the RERC named `rerc-ohare`.

```sh
kubectl patch rerc rerc-ohare --type merge --patch \
'{"spec":{"dbFqdnSuffix": "-example2-cluster-rec-chicago-ns-illinois.redis.com"}}'
```

## Update RERC secret

If the credentials are changed or updated for a REC participating cluster, you need to manually edit the RERC secret and apply it to all participating clusters.

1. On the local cluster, update the secret with new credentials and name it with the following convention:  `redis-enterprise-<rerc-name>`.

    A secret for a remote cluster named `rerc-ohare` would be similar to the following:

    ```yaml
    apiVersion: v1
    data:
      password: PHNvbWUgcGFzc3dvcmQ+
      username: PHNvbWUgdXNlcj4
    kind: Secret
    metadata:
      name: redis-enterprise-rerc-ohare
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
        rerc-ohare   Active   Valid         true
      ```
      
    To troubleshoot invalid configurations, view the RERC custom resource events and the [Redis Enterprise operator logs]({{<relref "/kubernetes/logs/">}}).

1. Verify the status of each REAADB using that RERC is "Active" and the spec status is "Valid."

    ```sh 
    kubectl get reaadb <reaadb-name>
    ```

    The output should look like this:

    ```sh
      NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
    reaadb-boeing   active   Valid                                      
    example-aadb-2   active   Valid                                      
    ```

    To troubleshoot invalid configurations, view the RERC custom resource events and the [Redis Enterprise operator logs]({{<relref "/kubernetes/logs/">}}).

1. Repeat the above steps on all other participating clusters.