---
Title: rladmin cluster
linkTitle: cluster
description: Manage cluster.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases: 
---

`rladmin cluster` manages cluster configuration and administration. Most `rladmin cluster` commands are only for clusters that are already configured, while a few others are only for new clusters that have not been configured.

## Commands for configured clusters

| Command | Description |
| - | - |
| [`cluster certificate`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/certificate">}}) | Sets the cluster certificate |
| [`cluster config`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}}) | Updates configuration for the cluster |
| [`cluster reset_password`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/reset_password">}}) | Changes the password for a given email |
| `cluster stats_archiver` | Enables/disables stats archiving |
| [`cluster debug_info`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/debug_info">}}) | Creates a support package |
| `cluster running_actions` | Lists all active tasks |

## Commands for non-configured clusters

| Command | Description |
| - | - |
| [`cluster create`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/create">}}) | Creates a new cluster |
| [`cluster join`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/join">}}) | Adds a node to an existing cluster |
| [`cluster recover`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/recover">}}) | Recovers a cluster from a backup file |