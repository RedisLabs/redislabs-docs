---
Title: 
linkTitle: 
description: 
weight: 
alwaysopen: false
categories: ["Platforms"]
aliases: {

}
---
## Prerequisites

To prepare the Redis Enterprise cluster (REC) to participate in an Active-Active database, perform the following tasks from [Prepare participating clusters]({{<relref "/kubernetes/active-active/preview/prepare-clusters">}}):

- Make sure the cluster meets the hardware and naming requirements. 
- Enable the Active-Active controllers
- Configure external routing
- Configure `ValidatingWebhookConfiguration`


## Collect REC credentials

To communicate with other clusters, all participating clusters need access to the admin credentials for all other clusters.

1. Locate the file holding the admin credentials for all participating RECs created while [preparing the clusters]({{<relref "/kubernetes/active-active/preview/prepare-clusters/">}}) (such as `all-rec-secrets.yaml`).

1. Within that file, create a secret for the new participating cluster named `redis-enterprise-<rerc>`. 
  {{<note>}}The file should contain a secret for each exiting participating cluster.{{</note>}}

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

1. Get the REC credentials secret for the new participating cluster.

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

1. Add the username and password to the new secret for that REC and namespace.

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

## Create RERC

1. From one of the exiting particpating clusters, create a `RedisEnterpriseRemoteCluster` (RERC) custom resource file for the new participating cluster. 

  This example shows a RERC custom resource for an REC named `rec3` in the namespace `ns3`. 

  ```yaml
  apiVersion: app.redislabs.com/v1alpha1
kind: RedisEnterpriseRemoteCluster
metadata:
  name: rerc3
spec:
  recName: rec3
  recNamespace: ns3
  apiFqdnUrl: test-example-api-rec3-ns3.redis.com
  dbFqdnSuffix: -example-cluster-rec3-ns3.redis.com
  secretName: redis-enterprise-rerc3
  ```

1. Create the RERC custom resource. 

  ```sh
  kubectl create -f <new-RERC-file>
  ```

1. Check the status of the newly created RERC custom resource.

  ```sh
  kubectl get rerc <RERC-name>
  ```

  The output should look like this: 
  ```sh
    NAME        STATUS   SPEC STATUS   LOCAL
  rerc3   Active   Valid         true
  ```

## Edit REAADB spec


