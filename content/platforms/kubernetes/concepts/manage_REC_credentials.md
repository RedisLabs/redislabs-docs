---
Title: Manage Redis Enterprise cluster (REC) credentials
linkTitle: Manage REC credentials
weight: 93
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/manage_REC_credentials/
---
The Redis Enterprise Software on Kubernetes uses a custom resource called RedisEnterpriseCluster to create a Redis Enterprise cluster (REC). At the time of creation, it generates random credentials the operator will use to perform operations on the Redis Enterprise cluster via the APIs. The credentials are saved in a Kubernetes (K8s) [secret](https://kubernetes.io/docs/concepts/configuration/secret/). The secret name defaults to the name of the cluster.

{{<note>}}
This procedure is only supported for operator versions 6.0.20-12 and above.
{{</note>}}

## Retrieve the current username and password

The credentials can be used to access the Redis Enterprise cluster UI or the API. Connectivity must be configured to the REC [pods](https://kubernetes.io/docs/concepts/workloads/pods/) using an appropriate service (or port forwarding).

1. To inspect the random username and password created by the operator during creation, use the `kubectl get secret` command.

    ```bash
    $ kubectl get secret rec -o jsonpath='{.data}'
    map[password:MVUyTjd1Mm0= username:ZGVtb0ByZWRpc2xhYnMuY29t]
    ```

    The output will be the encoded password and username (the values above are examples).

1. To decode the encoded password and username, use `echo` command and the password from the previous step.

    ```bash
    echo MVUyTjd1Mm0= | base64 --decodexc
    ```

    This outputs the password and username in plain text. In this example, the plain text password is `12345678` and the username is `demo@redislabs.com`.

Note there are other methods to decode secrets.

## Change the Redis Enterprise cluster credentials

### Replace the REC password

1. Retrieve and take note of the current password (see above)
1. Access the console of a [pod](https://kubernetes.io/docs/concepts/workloads/pods/) running a Redis Enterprise cluster.

    ```bash
    kubectl exec -it <rec-resource-name>-0 bash
    ```

1. From the pod console, add the new password for the existing user.
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

1. From outside the node pod, update the REC credential secret:

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

1. Access the console of a pod running a Redis Enterprise cluster again.

    ```bash
    kubectl exec -it <rec-resource-name>-0 bash
    ```

 1. From within the pod, remove the previous password to ensure only the new one applies.
    ```bash
    REC_USER="`cat /opt/redislabs/credentials/username`"; \ REC_PASSWORD="`cat /opt/redislabs/credentials/password`"; \
    curl -k --request POST \
      --url https://localhost:9443/v1/users/password \
      -u "$REC_USER:$REC_PASSWORD" \
      --header 'Content-Type: application/json' \
      --data "{\"username\":\"$REC_USER\", \
      \"old_password\":\"$REC_PASSWORD\", \
      \"new_password\":\"<NEW PASSWORD>\"}"
    ```

### Replace the REC username and password

1. Sign in to the Redis Enterprise cluster console.
1. [Add another admin user]({{< relref "rs/security/admin-console-security/user-security#configuring-users-with-roles" >}}) and choose a password.
1. Set the new username in the REC spec username field.
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

1. Delete the previous admin user from the Redis Enterprise cluster console.

{{<note>}}
The operator may log errors in the time between updating the username in the REC spec and the secret update.
{{</note>}}
