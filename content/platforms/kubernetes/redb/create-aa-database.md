---

Title: Create Active-active databases on Kubernetes
linkTitle: Create Active-Active databases
description: This section how to set up an active-active Redis Enterprise database on Kubernetes using the Redis Enterprise Software operator.  
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: [ 
    /platforms/kubernetes/redb/create-aa-database/,
    /platforms/kubernetes/redb/create-aa-database.md,
]
---
On Kubernetes, Redis Enterprise [Active-Active]({{<relref "/rs/administering/designing-production/active-active.md">}}) databases provide read and write access to the same data set from different Kubernetes clusters. For more general information about Active-Active, see the [Redis Enterprise Software docs]({{<relref "/rs/administering/designing-production/active-active.md">}}).

## Prerequisites

Before creating Active-Active databases you'll need the following:

- Two or more working Kubernetes clusters that have:
  - The [`kubectl`](https://kubernetes.io/docs/reference/kubectl/overview/) CLI tool installed
  - Routing for external access with an [ingress controller]({{<relref "/platforms/kubernetes/redb/set-up-ingress-controller.md">}}) or OpenShift routes
  - A working [Redis Enterprise cluster (REC)]({{<relref "/platforms/kubernetes/reference/cluster-options.md">}}) with a unique name
  - Enough memory resources available for the database (see [hardware requirements]({{<relref "/rs/administering/designing-production/hardware-requirements.md">}}))

## Document required parameters

You'll need the following information for each participating Redis Enterprise cluster (REC):

- Database name `<db-name>`:
  - Format: string
  - Example value: `myaadb`
- REC hostname (FQDN) `<rec-hostname>`:
  - API parameter name: `name`
  - Format: `<rec-name>.<namespace>.svc.cluster.local`
  - Example value: `rec01.rec01.svc.cluster.local`
- Ingress suffix `<ingress-suffix>`:
  - Format: string
  - Example value: `-docs.rec-docs.redisdemo.com`
- API URL `<api-url>`:
  - API parameter name: `url`
  - Format: `api<ingress-suffix>`
  - Example value: `api-docs.rec-docs.redisdemo.com`
- REC admin credentials `<username> <password>`:
  - API parameter name: `credentials`
  - Example value: username: `user@redisdemo.com`, password: `something`
  - How to get them:
    ```bash
    kubectl get secret <rec-name> \
      -o jsonpath='{.data.username}' | base64 --decode
    kubectl get secret <rec-name> \
      -o jsonpath='{.data.password}' | base64 --decode
    ```
- Replication endpoint:
  - API parameter name: `replication_endpoint`
  - Format: `<db-name><ingress-suffix>:443`
  - Example value: `myaadb-docs.rec-docs.redisdemo.com:443`
- Replication hostname:
  - API parameter name: `replication_tls_sni`
  - Format: `<db-name><ingress-suffix>`
  - Example value: `myaadb-docs.rec-docs.redisdemo.com`

## Add `activeActive` section to the REC resource file

From inside your K8s cluster, use `kubectl edit <rec-resource>.yaml` to add the following the the `spec` section of your REC resource. Do this for each participating cluster.

If your cluster uses an [ingress controller]({{<relref "content/platforms/kubernetes/redb/set-up-ingress-controller.md">}}):

  ```yaml
  activeActive:
    apiIngressUrl: api<ingress-suffix>
    dbIngressSuffix: <ingress-suffix>
      ingressAnnotations:
      kubernetes.io/ingress.class: <nginx | haproxy>
      <nginx | haproxy>.ingress.kubernetes.io/backend-protocol: HTTPS
      <nginx | haproxy>.ingress.kubernetes.io/ssl-passthrough: "true"  
    method: ingress
  ```

  After the changes are saved and applied, you can verify a new ingress was created for the API.

  ```bash
  $ kubectl get ingress
  NAME   HOSTS                            ADDRESS                                 PORTS   AGE
  rec01  api-docs.rec-docs.redisdemo.com  225161f845b278-111450635.us.cloud.com   80      24h
  ```

If your cluster uses OpenShift routes:

  ```yaml
  activeActive:
    apiIngressUrl: api<ingress-suffix>
    dbIngressSuffix: <ingress-suffix>
    method: openShiftRoute
  ```

After the changes are saved and applied, you can verify a new route was created for the API.
```bash
$ oc get route
NAME    HOST/PORT                       PATH    SERVICES  PORT  TERMINATION   WILDCARD
rec01   api-docs.rec-docs.redisdemo.com rec01   api             passthrough   None
```

The operator uses the API URL (`apiIngressUrl`) to create an ingress to the Redis Enterprise cluster's API; this only happens once per cluster. Every time a new active-active database instance is created on this cluster, the operator create a new ingress route to the database with the ingress suffix (`dbIngressSuffix`). The hostname for each new database will be in the format `<db-name><ingress-suffix>`.

## Resolve hostnames

Next, create a DNS alias that resolves your chosen database hostname (`<db-name><ingress-suffix>`) and your API URL (`api<ingress-suffix>`) to the IP address for the ingress controller's LoadBalancer. Do this for each participating Redis Enterprise cluster.

To find the IP for the LoadBalancer:

  ```bash
  kubectl get svc <haproxy-ingress | ingress-ngnix-controller> \
    -n  <ingress-ctrl-namespace>
  ```

## Create an Active-Active database with `crdb-cli`

The `crdb-cli` command can be run from any Redis Enterprise pod hosted on any participating K8s cluster. You'll need the values for the [required parameters]({{<relref "platforms/kubernetes/redb/create-aa-database.md#document-required-parameters" >}}) for each Redis Enterprise cluster.

```bash
crdb-cli crdb create 
  --name <db-name> \
  --memory-size <mem-size> \
  --encryption yes \
  --instance fqdn=<rec01-hostname>,url=<rec01-api-url>,username=<rec01-username>,password=<rec01-password>,replication_endpoint=<rec01-replication-endpoint>,replication_tls-sni=<rec01-replication-hostname> \
  --instance fqdn=<rec02-hostname>,url=<rec02-api-url>,username=<rec02-username>,password=<rec02-password>,replication_endpoint=<rec02-replication-endpoint>,replication_tls-sni=<rec02-replication-hostname>
```

## Test your database
