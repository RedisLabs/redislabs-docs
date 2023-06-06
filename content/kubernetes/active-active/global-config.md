---
Title: Set global database configurations
linkTitle: Global configuration
description: The REAADB contains the field '.spec.globalConfigurations' and through this the database configurations are set.
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/preview/global-config/,
    /kubernetes/active-active/global-config/,

}
---


The Redis Enterprise Active-Active database (REAADB) custom resource contains the field `.spec.globalConfigurations`. This field sets configurations for the Active-Active database across all participating clusters, such as memory size or shard count, as well as the global database secret.

The [REAADB API reference](https://github.com/RedisLabs/redis-enterprise-operator/blob/master/deploy/redis_enterprise_active_active_database_api.md) contains a full list of available fields.

## Edit global configurations

1. Edit or patch the REAADB custom resource with your global configuration changes.

  The example command below patches the REAADB named `example-aadb-1` to set the global memory size to 200MB:

  ```sh
  kubectl patch reaadb example-aadb-1 --type merge --patch \
  '{"spec": {"globalConfigurations": {"memorySize": "200mb"}}}'
  ```

1. Verify the status is `active` and the spec status is `Valid`.

  This example shows the status for the `example-aadb-1` database.

  ```sh
  kubectl get reaadb example-aadb-1

  NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
  example-aadb-1   active   Valid    
  ```

1. View the global configurations on each participating cluster to verify they are synced.

  ```sh
  kubectl get reaadb <reaadb-name> -o yaml
  ```

## Set global database secret

One of the fields available for `globalConfigurations` is `databaseSecretName` which can point to a secret containing the database password.

1. On an existing participating cluster, generate a YAML file containing the database secret with the database password.

  This example shoes a secret named `my-db-secret` with the password `my-password` encoded in base 64.

  ```yaml
  apiVersion: v1
  data:
    password: bXktcGFzcw
  kind: Secret
  metadata:
    name: my-db-secret
  type: Opaque
  ```

1. Apply the secret file from the previous step, substituting your own value for `<db-secret-file>`.

    ```sh
    kubectl apply -f <db-secret-file>
    ```

1. Patch the REAADB custom resource to specify the database secret, substituting your own values for `<reaadb-name>` and `<secret-name>`.

    ```sh
    kubectl patch reaadb <reaadb-name> --type merge --patch \
    '{"spec": {"globalConfigurations": {"databaseSecretName": "secret-name"}}}'
    ```

1. Check the REAADB status for an `active` status and `Valid` spec status.

    ```sh
    kubectl get reaadb <reaadb-name>

    NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
    example-aadb-1   active   Valid
    ```

1. On each other participating cluster, check the secret status.

    ``sh
    kubectl get reaadb <reaadb-name> -o=jsonpath='{.status.secretsStatus}'
    ```

    The output should show the status as `Invalid`.

    ```sh
    [{"name":"my-db-secret","status":"Invalid"}]
    ```

1. Sync the secret on each participating cluster.

    ```sh
    kubectl apply -f <db-secret-file>
    ```

1. Repeat the previous two steps on every participating cluster.

## Manage global configuration secrets


