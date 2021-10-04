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
  - Routing for external access with an [ingress controller]({{<relref "/platforms/kubernetes/redb/set-up-ingress-controller.md">}}) or routes (for OpenShift only)
  - A working [Redis Enterprise cluster (REC)]({{<relref "/platforms/kubernetes/reference/cluster-options.md">}}) with a unique name
  - Enough memory resources available for the database (see [hardware requirements]({{<relref "/rs/administering/designing-production/hardware-requirements.md">}}))

## Document required parameters

- Database name `<db-name>`:
  - Format: string
  - Example value: `myaadb`
  - How you get it: you choose

You'll need the following information for each participating Redis Enterprise cluster (REC):

- REC hostname `<rec-hostname>`:
  - Description: ?
  - Format: `<rec-name>.<namespace>.svc.cluster.local`
  - Example value: `rec01.ns01.svc.cluster.local`
  - How to get it: ?
- API hostname `<api-hostname>`:
  - Description: Hostname used to access the Redis Enterprise cluster API from outside the K8s cluster.
  - Format: string
  - Example value: `api.abc.cde.redisdemo.com`
  - How to get it: you choose
- Ingress suffix `<ingress-suffix>`:
  - Description: Combined with database name to create the Active-Active database hostname.
  - Format: string
  - Example value: `-fgh.ijk.redisdemo.com`
  - How to get it: you choose
- REC admin credentials `<username> <password>`:
  - Description: ?
  - Example value: username: `user@redisdemo.com`, password: `something`
  - How to get them:
    ```bash
    kubectl get secret <rec-name> \
      -o jsonpath='{.data.username}' | base64 --decode
    kubectl get secret <rec-name> \
      -o jsonpath='{.data.password}' | base64 --decode
    ```
- Replication endpoint:
  - Description: ?
  - Format: `<db-name><ingress-suffix>:443`
  - Example value: `myaadb-fgh.ijk.redisdemo.com:443`
- Replication hostname:
  - Description: ?
  - Format: `<db-name><ingress-suffix>`
  - Example value: `myaadb-fgh.ijk.redisdemo.com`

## Add `activeActive` section to the REC resource file

From inside your K8s cluster, edit your Redis Enterprise cluster (REC) resource to add the following to the `spec` section. Do this for each participating cluster.

 The operator uses the API URL (`apiIngressUrl`) to create an ingress to the Redis Enterprise cluster's API; this only happens once per cluster. Every time a new Active-Active database instance is created on this cluster, the operator creates a new ingress route to the database with the ingress suffix (`dbIngressSuffix`). The hostname for each new database will be in the format `<db-name><ingress-suffix>`.

### Using ingress controller

1. If your cluster uses an [ingress controller]({{<relref "content/platforms/kubernetes/redb/set-up-ingress-controller.md">}}), add the following to the `spec` section.

    ```yaml
    activeActive:
      apiIngressUrl: <api-hostname>
      dbIngressSuffix: <ingress-suffix>
        ingressAnnotations:
        kubernetes.io/ingress.class: <nginx | haproxy>
        <nginx | haproxy>.ingress.kubernetes.io/backend-protocol: HTTPS
        <nginx | haproxy>.ingress.kubernetes.io/ssl-passthrough: "true"  
      method: ingress
    ```

1. After the changes are saved and applied, you can verify a new ingress was created for the API.

    ```bash
    $ kubectl get ingress
    NAME   HOSTS                            ADDRESS                                 PORTS   AGE
    rec01  api.abc.cde.redisdemo.com  225161f845b278-111450635.us.cloud.com   80      24h
    ```

1. Verify you can access the API from outside the K8s cluster. 

```
????API call???
```

<see comments> If the API call fails, create a DNS alias that resolves your API hostname (`<api-hostname>`) to the IP address for the ingress controller's LoadBalancer.

### Using OpenShift routes

1. If your cluster uses OpenShift routes, add the following to the `spec` section.

      ```yaml
      activeActive:
        apiIngressUrl: <api-hostname>
        dbIngressSuffix: <ingress-suffix>
        method: openShiftRoute
      ```

    For OpenShift, your ingress suffix should include the suffix generated by OpenShift for your routes. The OpenShift route suffix is typically in the format `apps.<openshift-name>.<domain>.com`.

1. After the changes are saved and applied, you can verify a new route was created for the API.

    ```bash
    $ oc get route
    NAME    HOST/PORT                       PATH    SERVICES  PORT  TERMINATION   WILDCARD
    rec01   api-openshift.apps.abc.redisdemo.com rec01   api             passthrough   None
    ```

1. Verify API hostname works??????

## Create an Active-Active database with `crdb-cli`

The `crdb-cli` command can be run from any Redis Enterprise pod hosted on any participating K8s cluster. You'll need the values for the [required parameters]({{<relref "platforms/kubernetes/redb/create-aa-database.md#document-required-parameters" >}}) for each Redis Enterprise cluster.

```bash
crdb-cli crdb create 
  --name <db-name> \
  --memory-size <mem-size> \
  --encryption yes \
  --instance fqdn=<rec01-hostname>,url=<rec01-api-hostname>,username=<rec01-username>,password=<rec01-password>,replication_endpoint=<rec01-replication-endpoint>,replication_tls-sni=<rec01-replication-hostname> \
  --instance fqdn=<rec02-hostname>,url=<rec02-api-hostname>,username=<rec02-username>,password=<rec02-password>,replication_endpoint=<rec02-replication-endpoint>,replication_tls-sni=<rec02-replication-hostname>
```

See the [`crdb-cli` reference]({{<relref "/rs/references/crdb-cli-reference.md">}}) for more options.

## Test your database??
