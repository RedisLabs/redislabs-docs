---
Title: Quick Start
description: A quick introduction to the steps necessary to get a Redis Enterprise
  cluster installed in your OpenShift Kubernetes cluster
weight: 5
alwaysopen: false
categories: ["Platforms"]
aliases:
---

The deployment of Redis Enterprise clusters is managed via the Redis Enterprise
operator that you deploy in your project's namespace. The
process by which you get to a functioning database usable by application
workloads is:

1. Install the Redis Enterprise operator.

2. Create a Redis Enterprise CRD to describe your desired cluster.

3. The operator will read this cluster description and deploy the various components
   on your K8s cluster.

4. Once running, use the Redis Enterprise cluster to create a database.

5. The operator will automatically expose the newly created database as a K8s service.

We currently support OpenShift 3.x and 4.x clusters but the process for
deployment is different. Follow the guide for your specific version of OpenShift
to deploy Redis Enterprise and create a database.


## For OpenShift 3.x

If you are running an OpenShift 3.x cluster, you will need:

1. An [OpenShift 3.x cluster installed](https://docs.openshift.com/container-platform/3.11/welcome/index.html) with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})).
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. The [OpenShift cli installed](https://docs.openshift.com/online/starter/cli_reference/openshift_cli/getting-started-cli.html#cli-installing-cli_cli-developer-commands)

Follow the ["Getting Started for 3.x and CLI tools"]({{< relref "getting-started-cli.md" >}}) guide.

## For OpenShift 4.x

If you are running an OpenShift 4.x cluster, you will just need the [OpenShift 4.x cluster installed](https://docs.openshift.com/container-platform/4.3/welcome/index.html) with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})). Then follow the ["Getting Started for 4.x and the OperatorHub"]({{< relref "getting-started-cli.md" >}}) guide.
