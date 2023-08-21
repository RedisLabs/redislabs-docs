---
Title: Recover a Redis Enterprise cluster on Kubernetes
linkTitle: Recover a Redis cluster
description: This task describes how to recover a Redis Enterprise cluster on Kubernetes.
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /rs/concepts/kubernetes/cluster-recovery/,
    /platforms/kubernetes/cluster-recovery/,
    /platforms/kubernetes/kubernetes-cluster-recovery/,
    /platforms/kubernetes/tasks/cluster-recovery.md,
    /platforms/kubernetes/tasks/cluster-recovery/,
    /platforms/kubernetes/rec/cluster-recovery.md,
    /platforms/kubernetes/rec/cluster-recovery/,
    /kubernetes/re-clusters/cluster-recovery.md,
    /kubernetes/re-clusters/cluster-recovery/
]
---
When a Redis Enterprise cluster loses contact with more than half of its nodes either because of failed nodes or network split,
the cluster stops responding to client connections.
When this happens, you must recover the cluster to restore the connections.

You can also perform cluster recovery to reset cluster nodes, to troubleshoot issues, or in a case of active/passive failover.

The Redis Enterprise for Kubernetes automates these recovery steps:

1. Recreates a fresh Redis Enterprise cluster
1. Mounts the persistent storage with the recovery files from the original cluster to the nodes of the new cluster
1. Recovers the cluster configuration on the first node in the new cluster
1. Joins the remaining nodes to the new cluster.

## Prerequisites

- For cluster recovery, the cluster must be [deployed with persistence]({{< relref "/kubernetes/recommendations/persistent-volumes.md" >}}).

## Recover a cluster

1. Edit the REC resource to set the `clusterRecovery` flag to `true`.

    ```sh
    kubectl patch rec <cluster-name> --type merge --patch '{"spec":{"clusterRecovery":true}}'
    ```

    {{< note >}}
In some cases, pods do not terminate when the statefulSet is scaled down as part of the cluster recovery.
If pods are stuck in `terminating` or `crashLoopBack` and do not terminate gracefully, cluster recovery can pause.

To work around this, delete the pods manually with:

```sh
kubectl delete pods <pod> --grace-period=0 --force
```

When the last pod is manually deleted, the recovery process resumes.
    {{< /note >}}

1. Wait for the cluster to recover until it is in the "Running" state.

    To see the state of the cluster, run:

    ```sh
    watch "kubectl describe rec | grep State"
    ```

1. To recover the database, see [Recover a failed database]({{<relref "/rs/databases/recover.md">}}).