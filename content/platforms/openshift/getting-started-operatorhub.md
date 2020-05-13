---
Title: Getting Started for 4.x and the OperatorHub
description: OpenShift 4.x provides the OperatorHub where you can install the
 Redis Enterprise Operator from the administrator user interface.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases:
---
The OperatorHub is a feature of OpenShift 4.x that enables browsing a catalog
of open-source and vendor-provided operators. The operators available in the
catalog can easily be installed using a few simple steps through the OpenShift
administrative interface.

You can install the operator using the Command-Line Interface (CLI), but the
OperatorHub is an easy way to help you to manage the operator and apply
upgrades. It also provides an easy way to create clusters.

The overall process is:

1. Install the operator using the OperatorHub.
2. Create clusters with a Custom Resource Definition (CRD) from the Operator view
   in the OperatorHub.
3. Create databases in Redis Enterprise.

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

{{% note %}}
**Known Limitation** - The automatic use of the security constraint is limited. The
Redis Enterprise must be named `rec` for the constraint to be used automatically. This
limitation may be removed in the future. **We recommended that you use the cluster name `rec` when deploying with
the OperatorHub.**

If you require a different name, you must grant the SCC to the project
namespace (e.g., `my-project`) as in OpenShift 3.x:

```sh
oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:my-project
```

{{% /note %}}

## Install the Operator

The Redis Enterprise Operator can be installed into a single project (namespace)
as follows:

### Step 1: Log in

The operator is deployed into a project namespace. As such, you just need an
account with sufficient access to your project or the ability to create a new
project.

1. Log in to your OpenShift account.
1. If you don't current have a project available for deployment, navigate to **Projects**
   in the left navigation and selet **Create Project**.

    ![K8S Operator Hub - create a project]( /images/rs/k8s-operatorhub-install-create-project.png )

    In the dialog, create the enter the project name (namespace) and other
    optional metadata and select **Create**.

    Otherwise, navigate to your project to enable this as the default.

### Step 2: Navigate to database operators


1. On the left navigation, select **Catalog**,
2. Select **OperatorHub** under **Catalog**.
3. Once the *OperatorHub* view displays there will be a list of categories on
   the left and a list of operators on the right. You can search for
   "Redis Enterprise" in the search dialog just below the
   list of categories or select **Database** in the *OperatorHub*
4. Make sure you have selected your project at the top following the "*Project:*" label.


![K8S Operator Hub - Navigate the catalog to databases]( /images/rs/k8s-operatorhub-install-navigate-catalog.png )

### Step 3: Find and select install

Either search for "Redis Enterprise" or scroll through the various database operators and select the Redis Enterprise Operator.

![K8S Operator Hub - select the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-select-operator.png )

Then select the **Install** button.

![K8S Operator Hub - select the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-click-install.png )

### Step 4: Create the operator subscription

When using the *OperatorHub*, a deployed operator is maintained by [OpenShift's Operator
Lifecycle Management](https://docs.openshift.com/container-platform/4.3/operators/olm-adding-operators-to-cluster.html#olm-installing-from-operatorhub-using-web-console_olm-adding-operators-to-a-cluster). For the Redis Enterprise
operator, the subscription that provides this is only for a single project
(namespace). You cannot select "All namespaces on the cluster".

{{% note %}}

You should change the "*Approval Strategy*"" from subscription from "*Automatic*" to
"*Manual*" for production systems. This will guarantee the operator is only
upgraded by approval. This will allow upgrades only during maintenance periods
so you can control any possible downtime due to upgrades to operator-managed clusters.
{{% /note %}}

Click on **Subscribe** button to start the subscription for your project.

![K8S Operator Hub - subscribe to the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-subscribe.png )

Once you have done so, the subscription should be shown. After a few moments,
it will update with the installation status. If you selected "*Manual*", you should
see a "*requires approval*" link.

![K8S Operator Hub - subscribed but install requires approval]( /images/rs/k8s-operatorhub-install-subscribed.png )

### Step 5: Preview and approve install plan

Clicking on the "*requires approval*" link will bring you to a view of the install
plan that requires approval. Select the **Preview Install Plan** button to preview
the install plan.

![K8S Operator Hub - preview install plan]( /images/rs/k8s-operatorhub-install-preview-install-plan.png )

This will change the view to show an **Approve** and **Deny** button. Below these
buttons the view will have changed to enumerate the various resources being
installed into your namespace. Select the **Approve** button to install the
operator.

![K8S Operator Hub - preview install plan]( /images/rs/k8s-operatorhub-install-approve-install-plan.png )

After the approval, the choice dialog will disappear and the status of the
resources installed will be updated.

### Step 6: Return to the operator

You can navigate from the install plan to the operator by selecting the
"*redis-enterprise-operator-cert*" link at the top.

![K8S Operator Hub - navigate back]( /images/rs/k8s-operatorhub-install-navigate-back.png )

After selected the operator, the view will show the installed version and
catalog source along with other information. The link to the installed version
will take to you to a view where you can find more information about the
current version and create clusters. The catalog source link will allow
you to view the subscription.

![K8S Operator Hub - installed version and source]( /images/rs/k8s-operatorhub-install-csv-sources.png )

### After installing

One you have installed the Redis Enterprise operator into a project you can:

- navigate to the installed version and use the **Create New** button to create a
  new cluster in your namespace.
- view the operators in your project by clicking on **Installed Operators**
  under **Catalog** in the left navigation.
- view your operator subscriptions by clicking on **Operator Management** under
  **Catalog** in the left navigation.

## Create a Redis Enterprise Cluster

Creating a cluster is very easy with the operator via the **Installed Operators**
option in the management interface.

### Step 1: Navigate to the installed operator

1. Select on **Installed Operators** under **Catalog** in the left navigation.

    ![K8S - installed operators]( /images/rs/k8s-installed-operators.png )

1. Find the **Redis Enterprise Operator** listing for your project.

    ![K8S - installed rec operator]( /images/rs/k8s-installed-rec-operator.png )

### Step 2: Access the operator API

1. Select on **RedisEnterpriseCluster** under "*Provided APIS*" for that listing.
1. Select **Create Redis Enterprise Cluster** to create a cluster.

    ![K8S - create rec via operator]( /images/rs/k8s-operator-rec-create.png )

### Step 3: Configure and create your cluster

1. Once selected, you are presented with the CRD for a Redis Enterprise cluster
   in YAML format. You should verify you are creating the CRD in the correct
   project namespace. This is located above the text edit and indicated within
   the YAML located after `namespace` field:

    ![K8S - create rec via operator]( /images/rs/k8s-operator-rec-create-yaml.png )

    Edit the YAML definition as appropriate. See [**Options for clusters**]({{< relref "cluster-options.md">}})
    section for more information.

    {{% note %}}

The name of the cluster must be "rec" for deployments from within the OLM. For more information, see the `name:` field description in [**Options for clusters**]({{< relref "cluster-options.md">}})

    {{% /note %}}

1. Select the **Create** button to create and deploy the cluster. You should
   see the name of your cluster listed.

    ![K8S - created rec via operator]( /images/rs/k8s-operator-rec-after-create.png )

    and clicking on the name will show the more details of the cluster:

    ![K8S - created rec via operator details]( /images/rs/k8s-operator-rec-after-create-details.png )


## Create a Database

### Step 1: Access the Redis Enterprise UI

In order to create your database, we will log in to the Redis Enterprise UI. When
the cluster is created, a login is generated using the `username` specified
in the cluster CRD (e.g., `demo@redislabs.com`) and a password generated by
the operator. The generated password is stored in a Kubernetes secret. You must
retrieve this password value as part of this procedure.

1. Navigate to **Secrets** under **Workloads** in the left navigation:

    ![K8S - navigate to secrets]( /images/rs/k8s-openshift-4-secrets.png)

1. Locate your secret by your cluster name used in the CRD and click on the name
   to view the details.

    ![K8S - navigate to cluster secret]( /images/rs/k8s-rec-secret.png)

1. Scroll to the **Data** section to reveal the username and password.

    ![K8S - navigate to cluster secret]( /images/rs/k8s-rec-secret-data.png)

    Use the "copy to clipboard" icon button or **Reveal Values** to save the
    login information for later use.

1. Click on **Pods** under **Workloads** (in the same section as **Secrets**) and
   you will see the pods associated with the cluster. These will all be suffixed
   with a number starting at "0" (e.g., rec-0). Each of these pods has an
   instance of the Redis Enterprise UI running within it on port 8843.

1. Use `kubectl` to forward the port of one of these pods to your local machine:

    ```sh
    kubectl port-forward rec-0 8443:8443
    ```

    where `rec-0` is replaced with of the pods associated with your Redis Entperise
    cluster.

    {{% note %}}
- rec-0 is one of your cluster pods. You may consider running the port-forward command in the background.
- The Openshift UI provides tools for creating additional routing options, including external routes. These are covered in [RedHat Openshift documentation](https://docs.openshift.com/container-platform/4.3/dev_guide/routes.html).
    {{% /note %}}

1. Open a browser window and navigate to localhost:8443 to display the Redis Enterprise UI:

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. Use the username and password retrieved in (3) to log in to your cluster.

### Step 2: Create your database

Once you are logged into your Redis Enterprise cluster, creating a database is
exactly the same as any other deployment. Follow the [instructions to create your database]({{< relref "/rs/administering/database-operations/creating-database.md" >}}). Once created, the operator will discover the database and
create additional Kubernetes services for application workload access to the
database.

![K8s - create database]( /images/rs/k8s-create-database.png )

### Step 3: Inspect your database services

Once you have created your database via Redis Enterprise, the operator will
detect the change and create Kubernetes services that expose the database. The
databases are named according to the database name. For example, if you
called your database "`test`", kubectl will show these services:

```sh
% kubectl get services
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
rec             ClusterIP   None             <none>        9443/TCP,8001/TCP,8070/TCP   43m
rec-ui          ClusterIP   172.30.16.113    <none>        8443/TCP                     43m
test            ClusterIP   172.30.212.143   <none>        13818/TCP                    20s
test-headless   ClusterIP   None             <none>        13818/TCP                    20s
```

The operator creates two services, which in this example are called "`test`" and "`test-headless`".
The service suffixed with "-headless" is a [Kubernetes headless service](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services) and does not provide load balancing.
