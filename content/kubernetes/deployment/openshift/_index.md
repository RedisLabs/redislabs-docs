---
Title: Deploy Redis Enterprise Software on Kubernetes with OpenShift
linkTitle: OpenShift
description: A quick introduction to the steps necessary to get a Redis Enterprise
  cluster installed in your OpenShift Kubernetes cluster
weight: 11
alwaysopen: false
categories: ["Platforms"]
aliases: [
  /platforms/openshift/quick-start/,
  /platforms/kubernetes/getting-started/openshift/,
  /platforms/kubernetes/getting-started/openshift/_index.md,
  /platforms/kubernetes/getting-started/openshift/quick-start/, 
  /platforms/kubernetes/getting-started/openshift/quick-start.md,
  /rs/getting-started/getting-started-kubernetes/k8s-openshift/,
  /platforms/openshift/,
  /platforms/kubernetes/getting-started/openshift/getting-started-openshift-crdb/,
  /platforms/kubernetes/getting-started/openshift/getting-started-openshift-crdb.md,
  /platforms/openshift/getting-started-openshift-crdb/,
  /platforms/openshift/getting-started-openshift-crdb.md,
  /platforms/kubernetes/getting-started/openshift/_index.md,
  /platforms/kubernetes/getting-started/openshift/_index/, 
  /platforms/kubernetes/deployment/openshift/_index.md,
  /platforms/kubernetes/deployment/openshift/_index.md,
  /kubernetes/deployment/openshift/_index.md,
  /kubernetes/deployment/openshift/_index/,

]
---
The deployment of Redis Enterprise clusters is managed with the Redis Enterprise operator that you deploy in the namespace for your project.
To create a database that your application
workloads can use:

1. Install the Redis Enterprise operator.

1. Create a Redis Enterprise CRD to describe your desired cluster.

1. The operator reads this cluster description and deploys the various components on your K8s cluster.

1. Once running, use the Redis Enterprise cluster to create a database.

1. The operator automatically exposes the new database as a K8s service.

## For OpenShift via the OperatorHub

To [create a database on an OpenShift 4.x cluster via the OperatorHub]({{< relref "openshift-operatorhub.md" >}}) you only need the [OpenShift 4.x cluster installed](https://docs.openshift.com/container-platform/4.3/welcome/index.html) with at least three nodes that each meet the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

## For OpenShift via the CLI

To [create a database on an OpenShift cluster via the CLI]({{< relref "openshift-cli.md" >}}) you need:

1. An [OpenShift cluster installed](https://docs.openshift.com/container-platform/4.3/welcome/index.html) with at least three nodes that each meet the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. The [OpenShift cli installed](https://docs.openshift.com/container-platform/4.2/cli_reference/openshift_cli/getting-started-cli.html)
