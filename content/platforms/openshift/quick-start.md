---
Title: Quick Start for Kubernetes and OpenShift
description: A quick introduction to the steps necessary to get a Redis Enterprise
  cluster installed in your OpenShift Kubernetes cluster
weight: 5
alwaysopen: false
categories: ["Platforms"]
aliases:
---
The deployment of Redis Enterprise clusters is managed with the Redis Enterprise operator that you deploy in the namespace for your project.
To create a database that your application
workloads can use:

1. Install the Redis Enterprise operator.

1. Create a Redis Enterprise CRD to describe your desired cluster.

1. The operator reads this cluster description and deploys the various components on your K8s cluster.

1. Once running, use the Redis Enterprise cluster to create a database.

1. The operator automatically exposes the new database as a K8s service.

We currently support OpenShift 3.x and 4.x clusters but the process for deployment is different for each.

## For OpenShift 3.x

To [create a database on an OpenShift 3.x cluster]({{< relref "getting-started-cli.md" >}}) you need:

1. An [OpenShift 3.x cluster installed](https://docs.openshift.com/container-platform/3.11/welcome/index.html) with at least three nodes that each meet the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. The [OpenShift cli installed](https://docs.openshift.com/online/starter/cli_reference/openshift_cli/getting-started-cli.html#cli-installing-cli_cli-developer-commands)

## For OpenShift 4.x

To [create a database on an OpenShift 4.x cluster]({{< relref "getting-started-operatorhub.md" >}}) you need the [OpenShift 4.x cluster installed](https://docs.openshift.com/container-platform/4.3/welcome/index.html) with at least three nodes that each meet the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).
