---
Title: Getting Started with the OperatorHub on OpenShift 4.x
description: OpenShift 4.x provides the OperatorHub where you can install the
 Redis Enterprise Operator from the administrator user interface. Alternatively,
 can install the operator and cluster with the CLI.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/openshift/getting-started-operatorhub/
---
The OperatorHub is a feature of OpenShift 4.x that enables browsing a catalog
of open-source and vendor-provided operators.
You can install operators from the operator catalog in the OpenShift administrative interface with a few simple steps.

You can install the operator via the Command-Line Interface (CLI), but the
OperatorHub is an easy way to help you to manage the operator and apply
upgrades. It also provides an easy way to create clusters.

The operator installation process is:

1. Install the operator from the OperatorHub.
1. Use a Custom Resource Definition (CRD) to create clusters from the Operator view
   in the OperatorHub.
1. Create databases in Redis Enterprise.

Now the databases are exposed as Kubernetes services accessible by other
application workloads in your K8s cluster.

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

## Install the Operator

This procedure shows how you can install the Redis Enterprise Operator into a single project or namespace.

### Step 1: Log in

The operator is deployed into a project. As such, you need an
account with access to your project or the ability to create a new project.

1. Log in to your OpenShift account.
1. Either navigate to your project to set it as the default, or go to **Projects** and select **Create Project**.

    ![K8S Operator Hub - create a project]( /images/rs/k8s-operatorhub-install-create-project.png )

    In the dialog, enter the project name with the optional metadata and select **Create**.

### Step 2: Navigate to database operators

1. In the left menu, go to **Catalog > OperatorHub**.
1. In the OperatorHub view, you see a list of categories on the left and a list of operators on the right.
    You can search for "Redis Enterprise" in the search dialog below the list of categories
    or select **Database** in the OperatorHub.
1. Make sure that your project is shown in the "*Project:*" label at the top of the page.

![K8S Operator Hub - Navigate the catalog to databases]( /images/rs/k8s-operatorhub-install-navigate-catalog.png )

### Step 3: Find and select install

1. Either search for "Redis Enterprise" or scroll through the various database operators and select the Redis Enterprise Operator.

    ![K8S Operator Hub - select the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-select-operator.png )

1. Then select the **Install** button.

    ![K8S Operator Hub - select the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-click-install.png )

### Step 4: Create the operator subscription

When you use the OperatorHub, a deployed operator is maintained by the [OpenShift Operator
Lifecycle Management](https://docs.openshift.com/container-platform/4.3/operators/olm-adding-operators-to-cluster.html#olm-installing-from-operatorhub-using-web-console_olm-adding-operators-to-a-cluster).
The Redis Enterprise subscription that provides this is only for a single project. You cannot select **All namespaces on the cluster**.

{{< note >}}
We recommend that you change the Approval Strategy of the subscription from **Automatic** to **Manual** for production systems so that the operator is only upgraded by approval.
Then you can upgrade during maintenance periods to limit downtime due to upgrades to operator-managed clusters.
{{< /note >}}

- Click **Subscribe** to start the subscription for your project.

    ![K8S Operator Hub - subscribe to the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-subscribe.png )

    The subscription is shown and the installation status is updated soon after.
    If you selected Manual approvals, the **requires approval** link is shown.

    ![K8S Operator Hub - subscribed but install requires approval]( /images/rs/k8s-operatorhub-install-subscribed.png )

### Step 5: Preview and approve install plan

1. Click **requires approval** to see the install plan that requires approval.
1. Click **Preview Install Plan** to preview the install plan.

    ![K8S Operator Hub - preview install plan]( /images/rs/k8s-operatorhub-install-preview-install-plan.png )

    The install plan shows the resources to be installed into your namespace.

1. Select the **Approve** button to install the operator.

    ![K8S Operator Hub - preview install plan]( /images/rs/k8s-operatorhub-install-approve-install-plan.png )

After the approval, the status of the resources installed is updated.

### Step 6: Return to the operator

1. Click **redis-enterprise-operator-cert** to select the operator.

    ![K8S Operator Hub - navigate back]( /images/rs/k8s-operatorhub-install-navigate-back.png )

    The installed version and catalog source are shown along with other information.

    - Click on the installed version for information about the current version and create clusters.
    - Click on the catalog source to see the subscription.

1. Click on the installed version to see more information about the current version and create clusters.
1. Click on The catalog source to view the subscription.

    ![K8S Operator Hub - installed version and source]( /images/rs/k8s-operatorhub-install-csv-sources.png )

### Next steps

After you install the Redis Enterprise operator into a project you can:

- Navigate to the installed version and use the **Create New** button to create a
  new cluster in your namespace.
- Click on **Catalog > Installed Operators** in the left menu to view the operators in your project.
- Click on **Catalog > Operator Management** to view your operator subscriptions.

## Create a Redis Enterprise cluster

You can easily create a cluster with the operator in **Installed Operators**.

### Step 1: Navigate to the installed operator

1. Click on **Catalog > Installed Operators**.

    ![K8S - installed operators]( /images/rs/k8s-installed-operators.png )

1. Find the **Redis Enterprise Operator** listing for your project.

    ![K8S - installed rec operator]( /images/rs/k8s-installed-rec-operator.png )

### Step 2: Access the operator API

1. Under **Provided APIS** for that listing, select **RedisEnterpriseCluster**.
1. Select **Create Redis Enterprise Cluster** to create a cluster.

    ![K8S - create rec via operator]( /images/rs/k8s-operator-rec-create.png )

The CRD for a Redis Enterprise cluster in YAML format is shown.

### Step 3: Configure and create your cluster

1. Verify that you are creating the CRD in the correct project namespace.
    You can see this above the text edit and shown in the YAML located after `namespace` field:

    ![K8S - create rec via operator]( /images/rs/k8s-operator-rec-create-yaml.png )

1. Edit [the YAML definition]({{< relref "cluster-options.md">}}).

    {{< note >}}
The name of the cluster must be "rec" for deployments from within the OLM. For more information, see the `name:` field description in [**Options for clusters**]({{< relref "cluster-options.md">}}).
    {{< /note >}}

1. Click **Create** to create and deploy the cluster.

    ![K8S - created rec via operator]( /images/rs/k8s-operator-rec-after-create.png )

    The name of your cluster is shown in the list and you click on the cluster name to see more details about the cluster.

    ![K8S - created rec via operator details]( /images/rs/k8s-operator-rec-after-create-details.png )

## Create a database

### Step 1: Access the Redis Enterprise UI

When the cluster is created, a login is generated using the `username` specified
in the cluster CRD (e.g., `demo@redislabs.com`) and a password is generated by
the operator. The generated password is stored in a Kubernetes secret.

1. Go to **Workloads > Secrets** in the left menu:

    ![K8S - navigate to secrets]( /images/rs/k8s-openshift-4-secrets.png)

1. Find the cluster name used in the CRD and click on the name to see your secret.

    ![K8S - navigate to cluster secret]( /images/rs/k8s-rec-secret.png)

1. Scroll to the **Data** section to find the username and password.

    ![K8S - navigate to cluster secret]( /images/rs/k8s-rec-secret-data.png)

1. Click copy to clipboard or **Reveal Values** to save the login information for later use.

1. Go to **Workloads > Pods** to see the pods associated with the cluster.
    These all have a number starting at "0" (e.g., rec-0) at the end of the name.
    Each of these pods has an instance of the Redis Enterprise UI running in it on port 8843.

1. To forward the port of one of these pods to your local machine, run:

    ```sh
    kubectl port-forward rec-0 8443:8443
    ```

    Where `rec-0` is replaced with of the pods associated with your Redis Entperise cluster.

    {{< note >}}
- `rec-0` is one of your cluster pods. Consider running the port-forward command in the background.
- The Openshift UI provides tools for creating additional routing options, including external routes.
    {{< /note >}}

1. In a browser, go to `localhost:8443` to open the Redis Enterprise admin console:

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. Enter the username and password to log in to your cluster.

### Step 2: Create your database

Continue with the [instructions to create your database]({{< relref "/rs/administering/creating-databases/_index.md" >}}). After you create a database, the operator discovers the database and
creates additional Kubernetes services for application workload access to the
database.

![K8s - create database]( /images/rs/k8s-create-database.png )

### Step 3: Inspect your database services

After you create your database in the Redis Enterprise admin console, the operator
detects the change and creates Kubernetes services that expose the database. The
databases are named according to the database name. For example, if you
called your database "`test`", kubectl shows these services:

```sh
% kubectl get services
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
rec             ClusterIP   None             <none>        9443/TCP,8001/TCP,8070/TCP   43m
rec-ui          ClusterIP   172.30.16.113    <none>        8443/TCP                     43m
test            ClusterIP   172.30.212.143   <none>        13818/TCP                    20s
test-headless   ClusterIP   None             <none>        13818/TCP                    20s
```

The operator creates two services, shown here as "`test`" and "`test-headless`".
The service with the "-headless" suffix is a [Kubernetes headless service](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services) and does not provide load balancing.
