---
Title: Prepare participating clusters
linkTitle: Prepare clusters
description: Prepare your participating RECs to be part of an Active-Active database deployment.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/prepare/prepare.md,
    /kubernetes/preview/prepare/,
    /kubernetes/active-active/prepare-clusters.md,
    /kubernetes/active-active/prepare-clusters/,
    /kubernetes/active-active/preview/prepare-clusters.md,
    /kubernetes/active-active/preview/prepare-clusters/,

}
---
{{<banner-article bannerColor="#fff8dc">}}
This feature is currently in public preview. Contact Redis support if you plan to use this feature.
See [Create Active-Active databases for Kubernetes]({{<relref "/kubernetes/active-active/create-aa-database.md">}}) for the currently supported procedure.
{{</banner-article>}}


## Prepare participating clusters

An Active-Active database can span multiple clusters. Make sure you have enough memory resources available for the database (see [hardware requirements]({{<relref "/rs/installing-upgrading/hardware-requirements.md">}})).

### Cluster names

The combination of the REC name and namespace (`<rec-name>.<namespace-name>`) must be unique for each participating cluster the Active-Active database.

For example, if you have two K8s clusters, each with their own REC named `rec1` in a namespace named `ns1`. The value of `<rec-name>.<namespace-name>` for both RECs would be `rec1.ns1`. These can't be used for the same Active-Active database.

### Enable Active-Active controllers

To allow operator to handle managed Active-Active databases, enable the Active-Active and remote cluster controllers. You need to do this only once per cluster.

1. Download the custom resource definitions (CRDs) for the most recent release (6.4.2-4) from [redis-enterprise-k8s-docs Github](https://github.com/RedisLabs/redis-enterprise-k8s-docs/tree/master/crds).

1. Apply the new CRDs for the Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC) to install those controllers.

    ```sh
    kubectl apply -f crds/reaadb_crd.yaml
    kubectl apply -f crds/rerc_crd.yaml
    ```

1. Enable the Active-Active and remote cluster controllers on the operator ConfigMap.

    ```sh
    kubectl patch cm  operator-environment-config --type merge --patch "{\"data\": \
    {\"ACTIVE_ACTIVE_DATABASE_CONTROLLER_ENABLED\":\"true\", \
    \"REMOTE_CLUSTER_CONTROLLER_ENABLED\":\"true\"}}"
    ```

### Configure external routing

Active-Active databases require external routing access to sync properly. To configure external routing through an ingress or OpenShift route, see [Establish external routing on the REC]({{<relref "/kubernetes/networking/external-routing.md">}}).

### Configure `ValidatingWebhookConfiguration`

The admission controller using a validating webhook to dynamically validate resources configured by the operator. The `ValidatingWebhookConfiguration` is required for Active-Active databases. Learn how to enable and configure admission controller in the [Enable admission controller]({{<relref "/kubernetes/deployment/quick-start.md#enable-the-admission-controller/">}}) section of the [Deploy Redis Enterprise Software for Kubernetes]({{<relref "/kubernetes/deployment/quick-start.md">}}) instructions.


### Collect REC credentials

To communicate with other clusters, all participating clusters will need access to the admin credentials for all other clusters.

1. Create a file to hold the admin credentials for all participating RECs (such as `all-rec-secrets.yaml`).

1. Within that file, create a new secret for each participating cluster named `redis-enterprise-<rerc>`.

    The example below shows a file (`all-rec-secrets.yaml`) holding secrets for two participating clusters:

    ```yaml
    apiVersion: v1
    data:
      password: 
      username: 
    kind: Secret
    metadata:
      name: redis-enterprise-rerc1
    type: Opaque

    ---

    apiVersion: v1
    data:
      password: 
      username: 
    kind: Secret
    metadata:
      name: redis-enterprise-rerc2
    type: Opaque

    ```

1. Get the REC credentials secret for each participating cluster.

    ```sh
    kubectl get secret -o yaml <rec-name>
    ```

    The admin credentials secret for an REC named `rec1` would be similar to this:

    ```yaml
    apiVersion: v1
    data:
      password: ABcdef12345
      username: GHij56789
    kind: Secret
    metadata:
      name: rec1
    type: Opaque
    ```

1. Add the username and password new secret for that REC and namespace.

    This example shows the collected secrets file (`all-rec-secrets.yaml`) for `rec1` in namespace `ns1` and `rec2` in namespace `ns2`.

    ```yaml
    apiVersion: v1
    data:
      password: ABcdef12345
      username: GHij56789
    kind: Secret
    metadata:
      name: redis-enterprise-rerc1
    type: Opaque

    ---

    apiVersion: v1
    data:
      password: KLmndo123456
      username: PQrst789010
    kind: Secret
    metadata:
      name: redis-enterprise-rerc2
    type: Opaque

    ```

1. Apply the file of collected secrets to every participating REC.

    ```sh
    kubectl apply -f <all-rec-secrets-file>
    ```

 If the admin credentials for any of the clusters changes, the file will need to be updated and reapplied to all clusters.

## Next steps

Now you are ready to [create your Redis Enterprise Active-Active database]({{<relref "/kubernetes/active-active/preview/create-reaadb.md">}}).
