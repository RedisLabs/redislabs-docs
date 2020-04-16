---
Title: Installing via the OperatorHub
description: OpenShift 4.x provides the OperatorHub where you can install the
 Redis Enterprise Operator from the administrator user interface.
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases:
---
The OperatorHub is a feature of OpenShift 4.x that enables browsing a catalog
of open-source and vendor provided operators. The operators available in the
catalog can easily be installed via a few simple steps through the OpenShift
administrative interface.

The Redis Enterprise Operator can be installed into a single project (namespace)
as follows:

## Step 1: Login

1. Log in to your OpenShift account as a super admin.
1. If you don't current have a project available for deployment, navigate to **Projects**
   in the left navigation and selet **Create Project**.

    ![K8S Operator Hub - create a project]( /images/rs/k8s-operatorhub-install-create-project.png )

    In the dialog, create the enter the project name (namespace) and other
    optional metadata and select **Create**.

    Otherwise, navigate to your project to enable this as the default.

## Step 2: Navigate to database operators

1. On the left navigation, select **Catalog**,
2. Select **OperatorHub** under **Catalog**.
3. Select **Database** in the *OperatorHub* view once it displays. This catalog
   may take a few moments to display.
4. Make sure you have selected your project at the top following the "*Project:*" label.


![K8S Operator Hub - Navigate the catalog to databases]( /images/rs/k8s-operatorhub-install-navigate-catalog.png )

## Step 3: Find and select install

Scroll through the various database operators and select the Redis Enterprise Operator.

![K8S Operator Hub - select the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-select-operator.png )

Then select the **Install** button.

![K8S Operator Hub - select the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-click-install.png )

## Step 4: Create the operator subscription

When using the *OperatorHub*, a deployed operator is maintained by [OpenShift's Operator
Lifecycle Management](https://docs.openshift.com/container-platform/4.3/operators/olm-adding-operators-to-cluster.html#olm-installing-from-operatorhub-using-web-console_olm-adding-operators-to-a-cluster). For the Redis Enterprise
operator, the subscription that provides this is only for a single project
(namespace). You cannot select "All namespaces on the cluster".

You should change the "*Approval Strategy*"" from subscription from "*Automatic*" to
"*Manual*" for production systems. This will guarantee the operator is only
upgraded by approval. This will allow upgrades only during maintenance periods
so you can control any possible downtime due to upgrades to operator-managed clusters.

Click on **Subscribe** button to start the subscription for your project.

![K8S Operator Hub - subscribe to the Redis Enterprise Operator]( /images/rs/k8s-operatorhub-install-subscribe.png )

Once you have done so, the subscription should be shown. After a few moments,
it will update with the installation status. If you selected "*Manual*", you should
see a "*requires approval*" link.

![K8S Operator Hub - subscribed but install requires approval]( /images/rs/k8s-operatorhub-install-subscribed.png )

## Step 5: Preview and approve install plan

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

## Step 6: Return to the operator

You can navigate from the install plan to the operator by selecting the
"*redis-enterprise-operator-cert*" link at the top.

![K8S Operator Hub - navigate back]( /images/rs/k8s-operatorhub-install-navigate-back.png )

After selected the operator, the view will show the installed version and
catalog source along with other information. The link to the installed version
will take to you to a view where you can find more information about the
current version and create databases. The catalog source link will allow
you to view the subscription.

![K8S Operator Hub - installed version and source]( /images/rs/k8s-operatorhub-install-csv-sources.png )

## After installing

One you have installed the Redis Enterprise operator into a project you can:

- navigate to the installed version and use the **Create New** button to create a
  new cluster in your namespace.
- view the operators in your project by clicking on **Installed Operators**
  under **Catalog** in the left navigation.
- view your operator subscriptions by clicking on **Operator Management** under
  **Catalog** in the left navigation.

One easy way to create a Redis Enterprise cluster is to:

1. Select on **Installed Operators** under **Catalog** in the left navigation.
1. Find the **Redis Enterprise Operator** listing for your project.
1. Select on **RedisEnterpriseCluster** under "*Provided APIS*" for that listing.
1. Select **Create Redis Enterprise Cluster** to create a cluster.
1. The CRD for the cluster will be presented with a variety of defaults.
   Edit the definition as appropriate and select the **Create** button to deploy
   the cluster.
