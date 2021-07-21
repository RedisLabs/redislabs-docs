---
Title: Manage Redis Enterprise cluster (REC) credentials
description: 
weight: 93
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/manage_REC_credentials/
---
The Redis Enterprise Software on Kubernetes uses a custom resource called RedisEnterpriseCluster to create a Redis Enterprise cluster(REC). At the time of creation, it generates random credentials to be used by the operator to perform operations on the Redis Enterprise cluster via the APIs. The credentials are saved in a Kubernetes (K8s) secret. The secret name defaults to the name of the cluster.

## Access the Redis Enterprise cluster

The credentials can be used to access the cluster UI or the API. Connectivity must be configured to the cluster pods using an appropriate service (or port forwarding).

To inspect the random  username and password created by the operator during creation:
```
$ kubectl get secret rec -o jsonpath='{.data}'
map[password:MVUyTjd1Mm0= username:ZGVtb0ByZWRpc2xhYnMuY29t]
$ echo MVUyTjd1Mm0= | base64 --decodexc
```
**What is the output of the echo command?**

## Change the Redis Enterprise cluster credentials

### Replace the cluster password

1. Retrieve and take note of the current password (see above)
1. Use `kubectl exec` to access the console of a pod running a Redis Enterprise cluster.
    ```
    kubectl exec -it <rec-resource-name>-0 bash
    ```

1. From the pod console, add the new password


### Replace the cluster password and username