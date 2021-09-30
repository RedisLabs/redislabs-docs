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
With Active-Active databases provide read and write access to the same data set from different geographical locations, as well as disaster recovery. To learn more, see [Active-Active geo-distributed Redis]({{<relref "/rs/administering/designing-production/active-active.md">}}).

# Prerequisites

Before creating Active-Active databases you'll need the following:

- Two or more working Kubernetes clusters that have:
  - The [`kubectl`](https://kubernetes.io/docs/reference/kubectl/overview/) CLI tool installed
  - Routing for external access with an [ingress controller]({{<relref "/platforms/kubernetes/redb/set-up-ingress-controller.md">}}) or OpenShift routes
  - A working [Redis Enterprise cluster (REC)]({{<relref "/platforms/kubernetes/reference/cluster-options.md">}}) with a different name from the others
  - Enough memory resources available for the size of the database (see [hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md">}}) for more info)
- [Admin role credentials]({{<relref "/platforms/kubernetes/security/manage_REC_credentials.md">}}) to both RECs 

# Document required parameters

# Add support for Active-Active to the REC resources

# Create the Active-Active database

## via crdb-cli

## via API

