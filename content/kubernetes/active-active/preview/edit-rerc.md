---
Title: Edit Redis Enterprise remote clusters
linkTitle: Edit RERC
description: Edit the configuration details of an existing RERC with Redis Enterprise for Kubernetes.
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/preview/edit-rerc

}
---

define RERC and link to creation steps

## Edit RERC

Use the `kubectl patch rerc rerc1 --type merge --patch` command to patch the local RERC custom resource with your changes. For a full list of available fields, see the RERC API reference.

The following example edits the `dbFqdnSuffix` field for the RERC named `rerc1`.

```sh
kubectl patch rerc rerc1 --type merge --patch \
'{"spec":{"dbFqdnSuffix": "-example2-cluster-rec1-ns1.redis.com"}}'
```

## Update RERC secret

