---
Title: Manage Redis Enterprise Cluster (REC) credentials
description: 
weight: 93
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/manage_REC_credentials/
---
The Redis Enterprise Software on Kubernetes uses a custom resource called RedisEnterpriseCluster(REC) to create a Redis Enterprise cluster. At the time of creation, it generates random credentials to be used by the operator to perform operations on the cluster via the APIs. The credentials are saved in a Kubernetes (K8s) secret. Tje secret name defaults to the name of the cluster.

## Access the Redis Enterprise cluster

The credentials can be used to access the cluster UI or the API. Connectivity must be configured to the cluster pods using an appropriate service (or port forwarding).

To inspect the random  username and password created by the operator during creation:
```
$ kubectl get secret rec -o jsonpath='{.data}'
map[password:MVUyTjd1Mm0= username:ZGVtb0ByZWRpc2xhYnMuY29t]
$ echo MVUyTjd1Mm0= | base64 --decode
```

## Change the Redis Enterprise cluster credentials

