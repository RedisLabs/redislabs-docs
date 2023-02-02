---
Title: Deploy Redis Enterprise with OpenShift OperatorHub
linkTitle: OpenShift OperatorHub
description: OpenShift provides the OperatorHub where you can install the
 Redis Enterprise operator from the administrator user interface. Alternatively,
 can install the operator and cluster with the CLI.
weight: 10
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

You can deploy Redis Enterprise for Kubernetes with the OpenShift CLI or the OperatorHub. The OperatorHub provides a web console interface where you can install operators maintained by the Operator Lifecycle Manager (OLM). For details on the OperatorHub, see the [OpenShift documentation](https://docs.openshift.com/container-platform/4.11/operators/index.html).


## Prepare the cluster

### SCC

## Install the Redis Enterprise operator


1. From the OpenShift web console, select **Operators**->**OperatorHub**

2. Search for "Redis Enterprise" in the search dialog and select the 
    add screen shot

3. On the **Install Operator** page, 
    a. specify namespace
        can't do all namespaces The Redis Enterprise subscription is only for a single project. You cannot select **All namespaces on the cluster**.
    b. update channel
        specify version, see supported distros
    c. approval strategy
        We recommend you change the Approval Strategy to **Manual** for production systems, so that the operator is only upgraded by approval.

4. Select **Install**

5. Approve the Install Plan

6. View the subscription status in **Operators**->**Installed Operators**

## Create Redis Enterprise custom resources

From the Installed Operators>Operator details, you'll see "provided APIs" for the RedisEnterpriseCluster and RedisEnterpriseDatabase. You can select "Create instance" to create custom resources from the OperatorHub interface. 

You can use the YAML view to create a resource as you would in the CLI, or use the form view to specify configuration and the OperatorHub will generate the YAML file for you. 

For more information on creating and maintaining Redis Enterprise custom resources, see "clusters section" and REDB section. 

---------------------------------------------------------------


## Preparing the cluster

The Redis Enterprise node pods must run with certain privileges that are set in
OpenShift using a [Security Context Constraint](https://docs.openshift.com/container-platform/4.4/authentication/managing-security-context-constraints.html#security-context-constraints-about_configuring-internal-oauth)
that grants the pod various rights, such as the ability to change system limits or run as a particular user.
At minimum, the security context constraint for the operator
[(scc.yaml)](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/scc.yaml)
must be installed into the cluster as it is used by the OperatorHub installer. Without
this constraint installed, the operator cannot create Redis Enterprise clusters.

The security context constraint for the operator needs to be **installed only once** and **must not be deleted**.

The constraint [scc.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/scc.yaml)
can be downloaded and installed by a cluster administrator with the commands:

```sh
curl -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/scc.yaml
oc apply -f scc.yaml
```

After the constraint is installed, the OperatorHub automatically uses the constraint for
Redis Enterprise node pods.

{{< note >}}
**Known Limitation** - The automatic use of the security constraint is limited. The
Redis Enterprise must be named `rec` for the constraint to be used automatically. This
limitation may be removed in the future. **We recommended that you use the cluster name `rec` when deploying with
the OperatorHub.**

If you require a different name, you must grant the SCC to the project
namespace (e.g., `my-project`) as in OpenShift 3.x:

```sh
oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:my-project
```

{{< /note >}}

