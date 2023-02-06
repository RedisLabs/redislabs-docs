---
Title: Deploy Redis Enterprise with OpenShift OperatorHub
linkTitle: OpenShift OperatorHub
description: OpenShift provides the OperatorHub where you can install the Redis Enterprise operator from the administrator user interface.
weight: 70
alwaysopen: false
categories: ["Platforms"]
aliases: [
        /platforms/openshift/getting-started-operatorhub/,
    /platforms/kubernetes/getting-started/openshift/openshift-operatorhub/,
    /platforms/kubernetes/getting-started/openshift/openshift-operatorhub.md,
    /platforms/kubernetes/deployment/openshift/openshift-operatorhub/,
    /platforms/kubernetes/deployment/openshift/openshift-operatorhub.md,
    /kubernetes/deployment/openshift/openshift-operatorhub.md,
    /kubernetes/deployment/openshift/openshift-operatorhub/

]
---

Redis Enterprise for Kubernetes can be deployed and administered entirely from the OpenShift command-line interface (CLI). For those who prefer a user interface (UI), OpenShift also provides the OperatorHub, a web console interface where you can install operators and create custom resources.

For details on the OperatorHub, see the [OpenShift documentation](https://docs.openshift.com/container-platform/4.11/operators/index.html).

## Prepare the cluster

The Redis Enterprise pods must run in OpenShift with privileges set in a [Security Context Constraint](https://docs.openshift.com/container-platform/4.4/authentication/managing-security-context-constraints.html#security-context-constraints-about_configuring-internal-oauth). This grants the pod various rights, such as the ability to change system limits or run as a particular user.

{{<warning>}}
The security context constraint for the operator
([scc.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/scc.yaml)) must be installed before the operator can create any clusters.
{{</warning>}}

The SCC only needs to be installed once but must not be deleted.

1. Select the project you'll be using or create a new project.

1. Download [`scc.yaml`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/scc.yaml).

1. Apply the file to install the security context constraint.

  ```sh
  oc apply -f scc.yaml
  ```

After the install, the OperatorHub automatically uses the constraint for Redis Enterprise node pods.

{{< note >}}
**Known Limitation** - The automatic use of the security constraint is limited. The
Redis Enterprise must be named `rec` for the constraint to be used automatically.  **We recommend you use the cluster name `rec` when deploying with
the OperatorHub.**

If you require a different name, you must grant the SCC to the project
namespace (e.g., `my-project`) as in OpenShift 3.x:

```sh
oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:my-project
```
{{< /note >}}

## Install the Redis Enterprise operator

1. Select **Operators**->**OperatorHub**.

1. Search for "Redis Enterprise" in the search dialog and select the **Redis Enterprise Operator provided by Redis** marked as **Certified**.
  {{<note>}}
  Custom catalogs are not supported.
  {{</note>}}

1. On the **Install Operator** page, specify the namespace for the operator.

    Only one namespace per operator is supported.

1. Update the **channel** with the version you're installing.

    For more information about specific versions, see the [release notes]({{<relref "/kubernetes/release-notes/">}}).

1. Choose an approval strategy.

    We recommend **Manual** for production systems to ensure the operator is only upgraded by approval.

1. Select **Install** and approve the install plan.

You can monitor the subscription status in **Operators**->**Installed Operators**.

## Create Redis Enterprise custom resources

The **Installed Operators**->**Operator details** page shows the provided APIs: **RedisEnterpriseCluster** and **RedisEnterpriseDatabase**. You can select **Create instance** to create custom resources using the OperatorHub interface.

Use the YAML view to create a custom resource file or let OperatorHub generate the YAML file for you by specifying your configuration options in the form view.

For more information on creating and maintaining Redis Enterprise custom resources, see [Redis Enterprise clusters (REC)]({{<relref "/kubernetes/re-clusters/">}}) and [Redis Enterprise databases (REDB)]({{<relref "/kubernetes/re-databases/">}}).
