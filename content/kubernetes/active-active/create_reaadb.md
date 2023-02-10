---
Title: Create Active-Active database for Kubernetes
linkTitle: Create database
description: 
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/prepare.md,
    /kubernetes/active-active/prepare/,
}
---

{{<note>}} This feature is currently in preview and is not for production use. {{</note>}}

## Prerequisites 

Before creating Active-Active databases, you'll need 2-3 working Kubernetes clusters that have: 

- Routing for external access with an [ingress controller]({{<relref "/kubernetes/re-databases/set-up-ingress-controller.md">}}) (use [routes]({{<relref "/kubernetes/re-databases/routes.md">}}) for OpenShift)

- A working [Redis Enterprise cluster (REC)]({{<relref "/kubernetes/reference/cluster-options.md">}}) with a unique name

- Enough memory resources available for the database (see [hardware requirements]({{<relref "/rs/installing-upgrading/hardware-requirements.md">}}))

## Prepare participating clusters

1. Apply custom resource definitions for the Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC) to install those controllers.

    ```sh
    kubectl apply -f reaadb_crd.yaml
    kubectl apply -f rerc_crd.yaml
    ```

{{<note>}}
This is only required the first time a this Redis Enterprise cluster (REC) is configured to host Active-Active databases.
{{</note>}}

[//]: # (Do we really need to tell them this? Is there any harm in applying it more than once? I'm worried it might cause confusion.)

1. Enable the Active-Active and remote cluster controllers on the operator ConfigMap.

    ```sh
    kubectl patch cm  operator-environment-config --type merge --patch "{\"data\": \
    {\"ACTIVE_ACTIVE_DATABASE_CONTROLLER_ENABLED\":\"true\", \
    \"REMOTE_CLUSTER_CONTROLLER_ENABLED\":\"true\"}}"
    ```

1. Configure routing for external access with an [ingress controller]({{<relref "/kubernetes/re-databases/set-up-ingress-controller.md">}}) (use [routes]({{<relref "/kubernetes/re-databases/routes.md">}}) for OpenShift). 