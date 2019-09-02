---
Title: Cluster Recovery in Kubernetes
description: 
weight: 40
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/concepts/kubernetes/cluster-recovery
---

## Cluster Recovery
If the cluster losses a majority of its nodes (e.g. from nodes crashing or network split), the cluster will not responde. Recovering the cluster requires performing the following steps:

1. Edit the rec resource, and set the clusterRecovery flag to true, for example by running

> kubectl patch rec <cluster-name> --type merge --patch '{"spec":{"clusterRecovery":true}}'

2. Wait for the cluster to recover, i.e. wait for all the pods to reach a Running status. Tip, to see the progress of the cluster run:

> watch kubectl get pod

3. Recover the data by running the following command from within any cluster pod

> rladmin recover all 

### Notes:

1. For cluster recovery to work, we must be using persistent disks, otherwise there is no way to recvoer the cluster.

2. If you want to restore a cluster from any ccs other than pod-0, you must copy the rdb file to pod-0 and recover from there.

3. If you are using sentinel, you must restart the sentinel_service on the master by logging into the maste pod and running:

> supervisorctl restart sentinel_service