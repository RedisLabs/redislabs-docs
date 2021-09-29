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

Before creating Active-Active databases you'll need the following configured on two or more Kubernetes clusters:

- Redis Enterprise cluster (REC) that:
    - can be managed by `kubectl`
    - has a different name from other RECs used for this database
    - has enough memory resources available for the size of the database
- REC admin role credentials to both RECs
- Routing for external access with an ingress controller or OpenShift routes

# Document required parameters

# Add support for Active-Active to the REC resources

# Create the Active-Active database

## via crdb-cli

## via API

