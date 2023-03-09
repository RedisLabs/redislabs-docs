---
Title: Manage databases in multiple namespaces
linktitle: Manage multiple namespaces
description: Redis Enterprise for Kubernetes allows you to deploy to multiple namespaces within your Kubernetes cluster. This article shows you how to configure your Redis Enterprise cluster to connect to databases in multiple namespaces
weight: 17
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-clusters/multi-namespace.md,
    /kubernetes/re-databases/multi-namespace/,
]

---

Multiple Redis Enterprise database resources (REDBs) can be associated with a single Redis Enterprise cluster resource (REC) even if they reside in different namespaces.

To learn more about designing a multi-namespace Redis Enterprise cluster, see [flexible deployment options]({{<relref "/kubernetes/deployment/deployment-options.md">}}).

## Prerequisites

Before configuring a multi-namespace deployment, you must have a running [Redis Enterprise cluster (REC)]({{<relref "/kubernetes/deployment/quick-start.md">}}). See more information in the [deployment]({{<relref "/kubernetes/deployment/">}}) section. 

## Create role and role binding for managed namespaces

Both the operator and the RedisEnterpriseCluster (REC) resource need access to each namespace the REC will manage. For each managed namespace, create a `role.yaml` and `role_binding.yaml` file within the managed namespace, as shown in the examples below.

Replace `<rec-namespace>` with the namespace the REC resides in.
Replace `<service-account-name>` with your own value (defaults to the REC name).

`role.yaml` example: 

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

`role_binding.yaml` example:

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
  namespace: <rec-namespace>
- kind: ServiceAccount
  name: <service-account-name>
  namespace: <rec-namespace>
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

## Update Redis Enterprise operator ConfigMap

Patch the `operator-environment-config` in the REC namespace with a new environment variable (`REDB_NAMESPACES`).

```sh
kubectl patch ConfigMap/operator-environment-config \ 
-n <rec-namespace> \
--type merge \
-p `{"data":{"REDB_NAMESPACES": "<comma,separated,list,of,namespaces,to,watch"}}`
```

{{<warning>}}
Only configure the operator to watch a namespace after the namespace is created and configured with the role/role_binding as explained above. If configured to watch a namespace without setting those permissions or a namespace that is not created yet, the operator will fail and not perform normal operations.
{{</warning>}}
