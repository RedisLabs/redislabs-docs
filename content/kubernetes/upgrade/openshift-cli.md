---
Title: Upgrade Redis Enterprise with OpenShift CLI
linkTitle: OpenShift CLI
description: This task describes how to upgrade a Redis Enterprise cluster via OpenShift CLI.
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases: []
---

Redis implements rolling updates for software upgrades in Kubernetes deployments. The upgrade process consists of two steps:

  1. [Upgrade the Redis Enterprise operator](#upgrade-the-operator)
  2. [Upgrade the Redis Enterprise cluster (REC)](#upgrade-the-redisenterprisecluster-rec)

## Before upgrading

1. Check [Supported Kubernetes distributions]({{<relref "/kubernetes/reference/supported_k8s_distributions">}}) to make sure your Kubernetes distribution is supported.

2. Use `kubectl get rec` and verify the `LICENSE STATE` is valid on your REC before you start the upgrade process.

3. Verify you are upgrading from Redis Enterprise operator version 6.2.10-45 or later. If you are not, you must upgrade to 6.2.10-45 before upgrading to versions 6.2.18 or later.

4. When upgrading existing clusters running on RHEL7-based images, make sure to select a RHEL7-based image for the new version. See [release notes]({{<relref "/kubernetes/release-notes/">}}) for more info.

5. If you want to migrate from RHEL7-based images to RHEL8-based images, you'll need to upgrade to version 7.2.4-2 with a RHEL7-based image, then you'll be able to migrate to a RHEL8-based image when upgrading to 7.2.4-**TBD**.

### OpenShift clusters running 6.2.12 or earlier

Version 6.4.2-6 includes a new SCC (`redis-enterprise-scc-v2`) that you need to bind to your service account before upgrading. OpenShift clusters running version 6.2.12 or earlier upgrading to version 6.2.18 or later might get stuck if you skip this step. See [reapply SCC](#reapply-the-scc) for details.

## Upgrade the operator

### Reapply the SCC

If you are using OpenShift, you will also need to manually reapply the [security context constraints](https://docs.openshift.com/container-platform/4.8/authentication/managing-security-context-constraints.html) file ([`scc.yaml`]({{<relref "/kubernetes/deployment/openshift/openshift-cli#deploy-the-operator" >}})) and bind it to your service account.

```sh
oc apply -f openshift/scc.yaml
```

```sh
oc adm policy add-scc-to-user redis-enterprise-scc-v2 \ system:serviceaccount:<my-project>:<rec-name>
```

If you are upgrading from operator version 6.4.2-6 or before, see the ["after upgrading"](#after-upgrading) section to delete the old SCC and role binding after all clusters are running 6.4.2-6 or later.

## Upgrade the RedisEnterpriseCluster (REC)



## After upgrading

For OpenShift users, operator version 6.4.2-6 introduced a new SCC (`redis-enterprise-scc-v2`). If any of your OpenShift RedisEnterpriseClusters are running versions earlier than 6.2.4-6, you need to keep both the new and old versions of the SCC.

If all of your clusters have been upgraded to operator version 6.4.2-6 or later, you can delete the old version of the SCC (`redis-enterprise-scc`) and remove the binding to your service account.

1. Delete the old version of the SCC

   ```sh
   oc delete scc redis-enterprise-scc
   ```

   The output should look similar to the following:

   ```sh
   securitycontextconstraints.security.openshift.io "redis-enterprise-scc" deleted
   ```

1. Remove the binding to your service account.

   ```sh
   oc adm policy remove-scc-from-user redis-enterprise-scc system:serviceaccount:<my-project>:<rec-name>
   ```
