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

To learn more designing a multi-namespace Redis Enterprise cluster, see [flexible deployment options]({{<relref "/kubernetes/deployment/deployment-options.md">}}).

## Prerequisites

- A running [Redis Enterprise cluster (REC)]({{<relref "/kubernetes/deployment/quick-start.md">}})
- List of [namespaces the REC will manage]({{<relref "/kubernetes/deployment/deployment-options.md">}})

## Create role and role binding for managed namespaces

Both the operator and the RedisEnterpriseCluster (REC) resource need access to each namespace the REC will manage. For each managed namespace, create a `role.yaml` and `role_binding.yaml` file within the managed namespace, as shown in the examples below.

Replace `<REC_Namespace>` with the namespace the REC resides in.
Replace `<Service_Account_Name>` with the your own value (by default this is the REC name).

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
  namespace: <REC_Namespace>
- kind: ServiceAccount
  name: redis-enterprise-admission
  namespace: <REC_Namespace>
- kind: ServiceAccount
  name: <Service_Account_Name>
  namespace: <REC_Namespace>
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

There are two ways to update the operator configmap to specify which namespaces to manage:

{{<note>}}
If the REC is configured to watch a namespace without setting the role and role binding permissions, or a namespace that's not created yet, the operator will fail and halt normal operations.
{{</note>}}

### Method 1: Namespace label (recommended)

1. Create the `cluster_role_binding.yaml` and `cluster_role.yaml` files to add the namespace of the operator. Replace the `<REC_Namespace>` with the namespace the Redis Enterprise cluster (REC) resides in.

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
  namespace: <REC_Namespace>
roleRef:
  kind: ClusterRole
  name: redis-enterprise-operator
  apiGroup: rbac.authorization.k8s.io
```

1. Apply the files:

  ```sh
  kubectl apply -f cluster_role.yaml
  kubectl apply -f cluster_role_binding.yaml 
  ```

1. Patch the configmap to identify the managed namespaces.

 - Replace `<REC_Namespace>` with the REC namespace.
 - Replace `<NAMESPACE_LABEL>` with your desired namespace label.

  ```sh
   kubectl patch configmap/operator-environment-config \
  -n <REC_Namespace> \
  --type merge \
  -p '{"data": {"REDB_NAMESPACES_LABEL": "<NAMESPACE_LABEL>"}}'
  ```

1. Label the managed namespace with the same label.

 - replace `<REC_Namespace>` with the REC namespace

  ```sh
  kubectl label namespace <REC_Namespace> <NAMESPACE_LABEL>=<ANY_VALUE>
  ```

{{<note>}}
The operator restarts when it detects a namespace label has been added or removed. 
{{</note>}}

### Method 2: Explicit namespace list

Patch the `operator-environment-configmap` in the REC namespace with a new environment variable (`REDB_NAMESPACES`).

```sh
kubectl patch configmap/operator-environment-config \ 
-n <REC_Namespace> \
--type merge \
-p `{"data":{"REDB_NAMESPACES": "<comma,separated,list,of,namespaces,to,watch"}}`
```

{{<warning>}}
Only configure the operator to watch a namespace once the namespace is created and configured with the role/role_binding as explained above. If configured to watch a namespace without setting those permissions or a namespace that is not created yet, the operator will fail and not perform normal operations.
{{</warning>}}

Note that this configmap can be created manually before deploying the RedisEnterpriseCluster, or the operator will automatically create it once a Redis Enterprise cluster (REC) is deployed.





