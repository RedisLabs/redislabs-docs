---
Title: Installing via the CLI
description: Command-Line Interface (CLI) tools can be used to install the Redis Enterprise Operator for
 OpenShift 3.x deployments or for automation purposes.
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases:
---
These are the steps required to set up a Redis Enterprise Software
Cluster with OpenShift.

Prerequisites:

1. An [OpenShift cluster installed (3.x or 4.x)](https://docs.openshift.com/container-platform/3.11/welcome/index.html) with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. The [OpenShift cli installed](https://docs.openshift.com/online/starter/cli_reference/openshift_cli/getting-started-cli.html#cli-installing-cli_cli-developer-commands)

All the various files and examples for installing and using the operator are
located on [GitHub project RedisLabs/redis-enterprise-k8s-docs](https://github.com/RedisLabs/redis-enterprise-k8s-docs)

Specifically, when defining clusters you may also download and edit one of the
files in the [example folder.](https://github.com/RedisLabs/redis-enterprise-k8s-docs/tree/master/examples)  



## Step 1: Login

1. Log in to your OpenShift account as a super admin.
1. If you don't current have a project available for deployment, navigate to **Projects**
   in the left navigation and selet **Create Project**.

    ![K8S manual install - create a project]( /images/rs/k8s-operatorhub-install-create-project.png )

    In the dialog, create the enter the project name (namespace) and other
    optional metadata and select **Create**.

    Otherwise, navigate to your project to enable this as the default.

1. Click on your login account (e.g., "*kube:admin*" in upper right corner) and then select **Copy Login Command**.


    ![K8S manual install - copy login]( /images/rs/k8s-operatorhub-install-copy-login.png )

1. Copy and paste the *login* command into your shell. The command should look something like this:

    ```sh
    oc login https://your-cluster.acme.com –token=your$login$token
    ```

1. Next, verify that you are using the selected project by:

    ```sh
    oc project
    ```

    If not, you can change projects by:

    ```sh
    oc project {projectname}
    ```

    where `{projectname}` is the name of your newly created or existing project
    you are using.

    This will shift to your project rather than the default project. You can
    verify the current project with the `oc project` command without a project
    name.

## Step 2: Select the version

You need to ensure you are using correct version of the operator and defintions. The version tags
can be found by checking the [releases on Github](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases)
or via the GitHub API.

The the latest release can be set via `curl` using the following:
```sh
VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep "tag_name" | sed -E 's/.*"([^"]+)".*/\1/'`
```

Note: The remainder of the commands in this procedure will use the version you
set above. You should ensure you set this environment variable to the version
you desire.

## Step 3: Bind the Security Context Constraint to your project

The scc.yaml ([Security Context Constraint](https://docs.openshift.com/container-platform/3.11/welcome/index.html)) defines the cluster’s security context constraints that are applied to the project. We strongly recommend **not** changing anything in this yaml file.

1. Retrieve the [scc.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/scc.yaml) file
   for the version you are installing:

    ```sh
    curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/openshift/scc.yaml
    ```

2. Apply the file:

    ```sh
    oc apply -f scc.yaml
    ```

    You should receive the following response:

    ```sh
    securitycontextconstraints.security.openshift.io “redis-enterprise-scc” configured
    ```

3. Now you need to bind the scc to your project by typing:

    ```sh
    oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:your_project_name
    ```

    You can retrieve the project name by running the `oc project` command

## Step 4: Install the Redis Enterprise operator into your project

The Redis Enterprise operator is bundled into a single file that includes several declarations:

- *RBAC (Role-Based Access Control)* defines who can access which resources. The Operator application requires these definitions to deploy and manage the entire Redis Enterprise deployment (all cluster resources within a namespace). These include declaration of rules, role and rolebinding.
- *CRD declaration*, creating a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) for your Redis Enterprise Cluster resource. This provides another API resource to be handled by the k8s API server and managed by the operator we will deploy next
- *operator deployment declaration*, creates the operator deployment, which is responsible for managing the k8s deployment and lifecycle of a Redis Enterprise Cluster. Among many other responsibilities, it creates a [stateful set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) that runs the Redis Enterprise nodes, as pods. The yaml  contains the latest image tag representing the latest Operator version available.

You can install the operator into your namespace by:

1. Retrieve the [openshift.bundle.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift.bundle.yaml) file
   for the version you are installing:

    ```sh
    curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/openshift.bundle.yaml
    ```


1. You should apply the `openshift.bundle.yaml` without changes. To apply it:

    ```sh
    kubectl apply -f openshift.bundle.yaml
    ```

    You should receive the following response:

    ```sh
    role.rbac.authorization.k8s.io/redis-enterprise-operator created
    serviceaccount/redis-enterprise-operator created
    rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
    customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
    deployment.apps/redis-enterprise-operator created
    ```
2. Now, verify that your redis-enterprise-operator deployment is running:

    ```sh
    kubectl get deployment -l name=redis-enterprise-operator
    ```

    A typical response will look like this:

    ```sh
    NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
    redis-enterprise-operator   1/1     1            1           0m36s
    ```

## Step 4: (OPTIONAL) Apply the Server Broker RBAC

If you’re deploying a service broker, also apply the [sb_rbac.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/sb_rbac.yaml) file. This Service Broker Role-Based Access Control yaml defines the access permissions of the Redis Enterprise Service Broker. We strongly recommend **not** changing anything in this yaml file.

1. Retrieve the [sb_rbac.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/sb_rbac.yaml) file
   for the version you are installing:

    ```sh
    curl --silent -O https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/$VERSION/openshift/sb_rbac.yaml
    ```
2. To apply it, run:

    ```sh
    kubectl apply -f sb_rbac.yaml
    ```

    You should receive the following response:

    ```sh
    clusterrole.rbac.authorization.k8s.io/redis-enterprise-operator-sb configured
    clusterrolebinding.rbac.authorization.k8s.io/redis-enterprise-operator configured
    ```
