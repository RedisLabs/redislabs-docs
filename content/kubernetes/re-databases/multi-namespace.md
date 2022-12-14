---
Title: Manage databases in multiple namespaces
linktitle: Manage multiple namespaces
description: Redis Enterprise for Kubernetes allows you to deploy to multiple namespaces within your Kubernetes cluster. This article shows you how to configure your Redis Enterprise cluster to connect to databases in multiple namespaces
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-databases/multi-namespace.md,
    /kubernetes/re-databases/multi-namespace/,
]

---

A single Redis Enterprise cluster (REC) can manage multiple Redis Enterprise database objects (REDB) in multiple namespaces within the same Kubernetes cluster.

## Create role and role binding for managed namespaces

Both the operator and the RedisEnterpriseCluster (REC) resource need access to each namespace the REC will manage. For each managed namespace, create a `role.yaml` and `role_binding.yaml` file within the managed namespace, as shown in the examples below.
Replace `<NAMESPACE_OF_SERVICE_ACCOUNT>` with the namespace the REC resides in.
Replace `<NAME_OF_REC_SERVICE_ACCOUNT>` with the your own value (by default this is the REC name).

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: redb-role
  labels:
    app: redis-enterprise
rules:
  - apiGroups:
      - app.redislabs.com
    resources: ["redisenterpriseclusters", "redisenterpriseclusters/status", "redisenterpriseclusters/finalizers",
                "redisenterprisedatabases", "redisenterprisedatabases/status", "redisenterprisedatabases/finalizers"]
    verbs: ["delete", "deletecollection", "get", "list", "patch", "create", "update", "watch"]
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["update", "get", "read", "list", "listallnamespaces", "watch", "watchlist",
            "watchlistallnamespaces", "create","patch","replace","delete","deletecollection"]
  - apiGroups: [""]
    resources: ["endpoints"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create"]
  - apiGroups: [""]
    resources: ["services"]
    verbs: ["get", "watch", "list", "update", "patch", "create", "delete"]
```

```yaml
 kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: redb-role
  labels:
    app: redis-enterprise
subjects:
- kind: ServiceAccount
  name: redis-enterprise-operator
  namespace: <NAMESPACE_OF_SERVICE_ACCOUNT>
- kind: ServiceAccount
  name: redis-enterprise-admission
  namespace: <NAMESPACE_OF_SERVICE_ACCOUNT>
- kind: ServiceAccount
  name: <NAME_OF_REC_SERVICE_ACCOUNT>
  namespace: <NAMESPACE_OF_SERVICE_ACCOUNT>
roleRef:
  kind: Role
  name: redb-role
  apiGroup: rbac.authorization.k8s.io
```

Apply the files:

```sh
kubectl apply -f role.yaml
kubectl apply -f role_binding.yaml
```

## Update Redis Enterprise operator configmap

### Method 1: Explicit namespace list

Only configure the operator to watch a namespace once the namespace is created and configured with the role/role_binding as explained above. If configured to watch a namespace without setting those permissions or a namespace that is not created yet, the operator will fail and not perform normal operations.

Note that this configmap can be created manually before deploying the RedisEnterpriseCluster, or the operator will automatically create it once a RedisEnterpriseCluster is deployed.


### Method 2: Namespace label

Edit the `cluster_role_binding.yaml` and `cluster_role.yaml` files to add the namespace of the operator. Replace the `<NAMESPACE_OF_SERVICE_ACCOUNT>` with the namespace the Redis Enterprise cluster (REC) resides in.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: redis-enterprise-operator
rules:
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["list", "watch"]
```

```yaml
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: redis-enterprise-operator
subjects:
- kind: ServiceAccount
  name: redis-enterprise-operator
  namespace: <NAMESPACE_OF_SERVICE_ACCOUNT>
roleRef:
  kind: ClusterRole
  name: redis-enterprise-operator
  apiGroup: rbac.authorization.k8s.io
```



