---
Title: Enable internode encryption
linkTitle: Internode encryption
description: Enable encryption for communication between REC nodes in your K8s cluster. 
weight: 99
categories: ["Platforms"]
aliases: [
    /platforms/kubernetes/tasks/internode-encryption.md, 
    /platforms/kubernetes/tasks/internode-encryption/,
    /platforms/kubernetes/security/internode-encryption.md, 
    /platforms/kubernetes/security/internode-encryption/,
    /kubernetes/security/internode-encryption.md,
    /kubernetes/security/internode-encryption/
]
---

Internode encryption provides added security by encrypting communication between nodes in your Redis Enterprise cluster (REC).

Enable internode encryption in the `spec` section of your REC custom resource file.

```yaml
spec:
    dataInternodeEncryption: true
```

This change will apply to all databases created in the REC. You can override the cluster-wide setting for individual databases.

Edit your Redis Enterprise database (REDB) custom resource file to disable internode encryption for only that database.

```yaml
spec: 
    dataInternodeEncryption: false
```

To learn more about internode encryption, see [Internode encryption for Redis Enterprise Software]({{<relref "rs/security/internode-encryption.md">}}).
