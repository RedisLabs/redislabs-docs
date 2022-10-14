---
Title: Manage Redis Enterprise cluster (REC) credentials
linkTitle: Manage REC credentials
weight: 93
alwaysopen: false
categories: ["Platforms"]
aliases: 
  /platforms/kubernetes/concepts/manage_REC_credentials/
  /platforms/kubernetes/concepts/manage_REC_credentials.md
  /platforms/kubernetes/security/manage_REC_credentials/
  /platforms/kubernetes/security/manage_REC_credentials.md
  /kubernetes/security/manage_REC_credentials.md
  /kubernetes/security/manage_REC_credentials/
 
---
The Redis Enterprise Software on Kubernetes uses a custom resource called [`RedisEnterpriseCluster`]({{<relref "/kubernetes/reference/cluster-options.md">}}) to create a Redis Enterprise cluster (REC). During creation it generates random credentials for the operator to use. The credentials are saved in a Kubernetes (K8s) [secret](https://kubernetes.io/docs/concepts/configuration/secret/). The secret name defaults to the name of the cluster.

{{<note>}}
This procedure is only supported for operator versions 6.0.20-12 and above.
{{</note>}}

## Retrieve the current username and password

The credentials can be used to access the Redis Enterprise admin console or the API. Connectivity must be configured to the REC [pods](https://kubernetes.io/docs/concepts/workloads/pods/) using an appropriate service (or port forwarding).

1. Inspect the random username and password created by the operator during creation with the `kubectl get secret` command.

    ```sh
    kubectl get secret rec -o jsonpath='{.data}'
    ```

    The command outputs the encoded password and username, similar to the example below.

      ```sh
      map[password:MVUyTjd1Mm0= username:ZGVtb0ByZWRpc2xhYnMuY29t]
      ```

1. Decode the password and username with the `echo` command and the password from the previous step.

    ```bash
    echo MVUyTjd1Mm0= | base64 --decodexc
    ```

    This outputs the password and username in plain text. In this example, the plain text password is `12345678` and the username is `demo@redis.com`.

## Change the Redis Enterprise cluster (REC) credentials

### Change the REC password for the current username

1. Access a [pod](https://kubernetes.io/docs/concepts/workloads/pods/) running a Redis Enterprise cluster.

    ```bash
    kubectl exec -it <rec-resource-name>-0 bash
    ```

1. Add a new password for the existing user.

    ```bash
     REC_USER="`cat /opt/redislabs/credentials/username`" \
     REC_PASSWORD="`cat /opt/redislabs/credentials/password`" \
     curl -k --request POST \
       --url https://localhost:9443/v1/users/password \
       -u "$REC_USER:$REC_PASSWORD" \
       --header 'Content-Type: application/json' \
       --data "{\"username\":\"$REC_USER\", \
     \"old_password\":\"$REC_PASSWORD\", \
     \"new_password\":\"<NEW PASSWORD>\"}"
    ```

1. From outside the pod, update the REC credential secret.

    1. Save the existing username to a text file .
        ```bash
        echo -n "<current_username>" > username 
        ```

    1. Save the new password to a text file.
        ```bash
        echo -n "<new_password>" > password
        ```

    1. Update the REC credential secret.
        ```bash
        kubectl create secret generic <cluster_secret_name> \
          --from-file=./username \
          --from-file=./password --dry-run \
          -o yaml
        kubectl apply -f 
        ```

1. Wait five minutes for all the components to read the new password from the updated secret. If you proceed to the next step too soon, the account could get locked.

1. Access a pod running a Redis Enterprise cluster again.

    ```bash
    kubectl exec -it <rec-resource-name>-0 bash
    ```

 1. Remove the previous password to ensure only the new one applies.

    ```sh
    REC_USER="`cat /opt/redislabs/credentials/username`"; \
    REC_PASSWORD="`cat /opt/redislabs/credentials/password`"; \
    curl -k --request DELETE \ 
      --url https://localhost:9443/v1/users/password \
      -u "$REC_USER:$REC_PASSWORD" \
      --header 'Content-Type: application/json' \
      --data "{\"username\":\"$REC_USER\", \
      \"old_password\":\"<OLD PASSWORD\"}"
    ```

    {{<note>}} The username for the K8s secret is the email displayed on the Redis Enterprise admin console. {{</note>}}

### Change both the REC username and password

1. [Connect to the admin console]({{<relref "/kubernetes/re-clusters/connect-to-admin-console.md">}})

1. [Add another admin user]({{<relref "/rs/security/access-control/manage-users/add-users">}}) and choose a new password.

1. Specify the new username in the `username` field of your REC custom resource spec.

1. Update the REC credential secret:

    1. Save the existing username to a text file.

        ```bash
        echo -n "<current_username>" > username
        ```

    1. Save the new password to a text file.

        ```bash
        echo -n "<new_password>" > password
        ```

    1. Update the REC credential secret.

        ```bash
        kubectl create secret generic <cluster_secret_name> \
          --from-file=./username \
          --from-file=./password --dry-run \
          -o yaml
        kubectl apply -f 
        ```

1. Wait five minutes for all the components to read the new password from the updated secret. If you proceed to the next step too soon, the account could get locked.

1. Delete the previous admin user from the cluster.

  {{<note>}}
The operator may log errors in the time between updating the username in the REC spec and the secret update.
  {{</note>}}

### Update the credentials secret in Vault

If you store your secrets with Hashicorp Vault, update the secret for the REC credentials with the following key-value pairs:

```sh
username:<desired_username>, password:<desired_password>
```

For more information about Vault integration with the Redis Enterprise Cluster see [Integrating the Redis Enterprise operator with Hashicorp Vault](https://github.com/RedisLabs/redis-enterprise-k8s-docs/tree/65eba63a6aac69455a691652218e28b0873e4de3/vault#integrating-the-redis-enterprise-operator-with-hashicorp-vault).