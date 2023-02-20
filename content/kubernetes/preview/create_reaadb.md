---
Title: Create Active-Active database for Kubernetes
linkTitle: Create database
description: 
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/prepare.md,
    /kubernetes/preview/prepare/,
}
---

{{<note>}} This feature is currently in preview and is not for production use. {{</note>}}

## Prepare participating clusters

An Active-Active database can span 2-3 Redis Enterprise clusters. Make sure you have enough memory resources available for the database (see [hardware requirements]({{<relref "/rs/installing-upgrading/hardware-requirements.md">}})). Prepare each Redis Enterprise cluster (REC) for use in your Active-Active deployment with the following steps.

## Enable Active-Active controllers

For each each Redis Enterprise cluster (REC), you must enable the Active-Active and remote cluster controllers. This prepares the cluster to become a participating cluster in your Active-Active database and only needs to be done once per cluster. 

1. Apply custom resource definitions for the Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC) to install those controllers.

    ```sh
    kubectl apply -f reaadb_crd.yaml
    kubectl apply -f rerc_crd.yaml
    ```

1. Enable the Active-Active and remote cluster controllers on the operator ConfigMap.

    ```sh
    kubectl patch cm  operator-environment-config --type merge --patch "{\"data\": \
    {\"ACTIVE_ACTIVE_DATABASE_CONTROLLER_ENABLED\":\"true\", \
    \"REMOTE_CLUSTER_CONTROLLER_ENABLED\":\"true\"}}"
    ```

1. Configure routing for external access with an [ingress controller]({{<relref "/kubernetes/re-databases/set-up-ingress-controller.md">}}) (use [routes]({{<relref "/kubernetes/re-databases/routes.md">}}) for OpenShift).

## Collect REC credentials

1. Get the REC credentials secret for the participating cluster, replacing `<rec-name>` with the REC name.

    ```sh
    kubectl get secret -o yaml <rec-name>
    ```

1. Generate a new secret with the data and name it `redis-enterprise-<rec-name>-<rec-namespace>`, replacing your own values for the `<rec-name>` and `<rec-namespace>` placeholders.

    This example secret shows a Redis Enterprise cluster (REC) named `rec1` residing in the `ns1` namespace.

    ```yaml
    apiVersion: v1
    data:
      password: PHNvbWUgcGFzc3dvcmQ+
      username: PHNvbWUgdXNlcj4
    kind: Secret
    metadata:
      name: redis-enterprise-rec1-ns1
    type: Opaque
    ```

1. Apply the secret file.

    ```sh
    kubectl apply -f redis-enterprise-<rec-name>-<rec-namespace>
    ```

1. Complete these steps for each participating Redis Enterprise cluster (REC).

[//]: # (Is there an advantage to applying them all at once, or can they apply each secret as they create it?)


