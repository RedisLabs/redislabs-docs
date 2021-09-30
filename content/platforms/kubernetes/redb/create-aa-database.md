---

Title: Create Active-active databases on Kubernetes
linkTitle: Create Active-Active databases
description: This section how to set up an active-active Redis Enterprise database on Kubernetes using the Redis operator.  
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: [ 
    /platforms/kubernetes/redb/create-aa-database/,
    /platforms/kubernetes/redb/create-aa-database.md,
]
---
Redis Enterprise [Active-Active]({{<relref "/rs/administering/designing-production/active-active.md">}}) databases provide read and write access to the same data set from different geographical locations, as well as disaster recovery. To learn more, see .

## Prerequisites

Before creating Active-Active databases you'll need the following:

- Two or more working Kubernetes clusters that have:
  - The [`kubectl`](https://kubernetes.io/docs/reference/kubectl/overview/) CLI tool installed
  - Routing for external access with an [ingress controller]({{<relref "/platforms/kubernetes/redb/set-up-ingress-controller.md">}}) or OpenShift routes
  - A working [Redis Enterprise cluster (REC)]({{<relref "/platforms/kubernetes/reference/cluster-options.md">}}) with a unique name
  - Enough memory resources available for the database (see [hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md">}}))

## Document required parameters

You'll need the following information for each participating Redis Enterprise cluster:

- Database name:
  - Format: string
  - Example value: `myaadb`
  - How to get it: you choose your database name
- REC hostname:
  - API parameter name: `name`
  - Format: `<rec-name>.<namespace>.svc.cluster.local`
  - Example value: `rec01.rec01.svc.cluster.local`
  - How to get it:
    ```bash
    curl -u <user>:<password> https://<rec_api>/v1/cluster /
      | jq '.name'
    ```
- API URL:
  - API parameter name: `url`
  - Format: `https://<apiIngressUrl>`
  - Example value: `https://api-openshift.apps.abc-ocp.cs.redisdemo.com`
  - How to get it:
    ```bash
    oc get rec -o json /
      | jq '.items[].spec.activeActive.apiIngressUrl'
    ```
- REC admin credentials:
  - API parameter name: `credentials`
  - Format:
  - Example value: username: `user@redisdemo.com`, password: `something`
  - How to get it:
    ```bash
    kubectl get secret <rec-name> /
      -o jsonpath='{.data.username}' | base64 --decode
    kubectl get secret <rec-name> /
      -o jsonpath='{.data.password}' | base64 --decode
    ```
- Replication endpoint:
  - API parameter name: `replication_endpoint`
  - Format: `<dbname><dbIngressSuffix>:443`
  - Example value: `myaadb-xy-cluster.apps.abc-ocp.cs.redisdemo.com:443`
  - How to get it:
    ```bash
    oc get rec -o json /
      | jq '.items[].spec.activeActive.dbIngressSuffix'
    ```
- Replication hostname:
  - API parameter name: `replication_tls_sni`
  - Format: `<dbname><dbIngressSuffix>`
  - Example value: `myaadb-xy-cluster.apps.abc-ocp.cs.redisdemo.com`
  - How to get it:
    ```bash
    oc get rec -o json /
      | jq '.items[].spec.activeActive.dbIngressSuffix'
    ```

## Add support for Active-Active to the REC resources

## Create the Active-Active database

### via crdb-cli

### via API

## Test your database
