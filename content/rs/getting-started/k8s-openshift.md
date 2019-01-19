---
Title: Getting Started with Kubernetes and OpenShift
description: 
weight: 50
alwaysopen: false
categories: ["RS"]
---
These are the steps required to set up a Redis Enterprise Software
Cluster with OpenShift.

Prerequisites:

1. An [OpenShift cluster installed](https://docs.openshift.com/enterprise/3.0/install_config/install/quick_install.html) with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.8 or higher
1. The [OpenShift cli installed](https://www.rubix.nl/blogs/how-install-and-run-openshift-origin-your-mac-os-x)

## Step 1: Login

- Log in to your OpenShift account as a super admin (so you have access to all the default projects).
- Create a new project, fill in the name and other details for the project and hit “Create.”  
  
  ![](https://redislabs.com/wp-content/uploads/2018/09/getting-started-kubernetes-openshift-image1.png)

- Click on “admin” (upper right corner) and then “Copy Login.”  

  ![](https://redislabs.com/wp-content/uploads/2018/09/getting-started-kubernetes-openshift-image4.png)

- Paste the *login* command into your shell; it should look something like this:

  oc login https://your-cluster.acme.com –token=your$login$token  

- Next, verify that you are using the newly created project. Type:

```src 
 $ oc login https://your-cluster.acme.com –token=your$login$token  
```

This will shift to your project rather than the default project (you can verify the project you’re currently using with the *oc project* command).

## Step 2: Get deployment files

- Clone this repository, which contains the deployment files:
```src
 $ git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
```
*Note: For RHEL images, please use the redis-enterprise-cluter_rhel.yaml and operator_rhel.yaml files.*

Specifically for the redis-enterprise-cluster yaml file, you may also download and edit one of the following examples: [simple](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/examples/simple.yaml), [persistent](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/examples/persistent.yaml), [service broker](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/examples/with_service_broker.yaml), [service broker RHEL](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/examples/with_service_broker_rhel.yaml) (for RHEL images) or use the one provided in the repository.

## Step 3: Prepare your yaml files

Let’s look at each yaml file to see what requires editing:

- [scc.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/scc.yaml)

The scc ([Security Context Constraint](https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html)) yaml defines the cluster’s security context constraints, which we will apply to our project later on. We strongly recommend **not** changing anything in this yaml file.

Apply the file:
```src
 $ oc apply -f scc.yaml  
```
You should receive the following response:

  `securitycontextconstraints.security.openshift.io “redis-enterprise-scc” configured`  

Now you need to bind the scc to your project by typing:
```src
 $ oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:your_project_name  
```
(If you do not remember your project name, run “oc project”)

- [rbac.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/rbac.yaml)

The rbac (Role-Based Access Control) yaml defines who can access which resources. We need this to allow our Operator application to deploy and manage the entire Redis Enterprise deployment (all cluster resources within a namespace). Therefore, we strongly recommend **not** changing anything in this yaml file. To apply it, type:
```src
 $ kubectl apply -f rbac.yaml  
```
You should receive the following response:

  `role.rbac.authorization.k8s.io/redis-enterprise-operator created
  serviceaccount/redis-enterprise-operator created  
  rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created`

- [sb_rbac.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/sb_rbac.yaml)

If you’re deploying a service broker, also apply the sb_rbac.yaml file. The sb_rbac (Service Broker Role-Based Access Control) yaml defines the access permissions of the Redis Enterprise Service Broker. 

We strongly recommend **not** changing anything in this yaml file.

To apply it, run:
```src
 $ kubectl apply -f sb_rbac.yaml  
```
You should receive the following response:

  `clusterrole.rbac.authorization.k8s.io/redis-enterprise-operator-sb configured
  clusterrolebinding.rbac.authorization.k8s.io/redis-enterprise-operator configured`

- [crd.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/crd.yaml)

The next step applies crd.yaml, creating a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) for your Redis Enterprise Cluster resource. This provides another API resource to be handled by the k8s API server and managed by the operator we will deploy next. We strongly recommend **not** changing anything in this yaml file.

To apply it, run:
```src
 $ kubectl apply -f crd.yaml  
```
You should receive the following response:

  `customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com     configured`

- [operator.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/operator.yaml)

Applying this yaml creates the operator deployment, which is responsible for managing the k8s deployment and lifecycle of a Redis Enterprise Cluster. Among many other responsibilities, it creates a [stateful set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) that runs the Redis Enterprise nodes (as pods).

Always make sure you have the latest [operator.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/operator.yaml). Alternatively, you can edit the following tag:
image:redislabs/operator:tag

To apply the operator.yaml, run:
```src
 $ kubectl apply -f operator.yaml
```
You should receive the following response:

  `deployment.apps/redis-enterprise-operator created`

Now, run kubectl get deployment and verify that your redis-enterprise-operator deployment is running. A Typical response will look like this:

![](https://redislabs.com/wp-content/uploads/2018/09/getting-started-kubernetes-openshift-image2.png)

- [redis-enterprise-cluster.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/redis-enterprise-cluster.yaml)

The mycluster yaml defines the configuration of the newly created resource: Redis Enterprise Cluster. This yaml could be renamed your_cluster_name.yaml to keep things tidy, but this isn’t a mandatory step.

This yaml **must** be edited, however, to reflect the specific configurations of your Cluster. Here are the main fields you should review and edit:

- name: “your_cluster_name” (e.g. “demo-cluster”)
- nodes: number_of_nodes_in_the_cluster (Must be an uneven number of at least 3 or greater—[here’s why](https://redislabs.com/redis-enterprise/technology/highly-available-redis/))
- uiServiceType: service_type

Service type value can be either ClusterIP or LoadBalancer. This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/). The default is ClusterIP.

- username: \<your_email@your_domain.your_suffix\>

persistentSpec:

enabled: \<false/true\>

Check your Redis Software nodes’ enabled/disabled flag for [persistency](https://redislabs.com/redis-features/persistence). The default is “false.”

- storageClassName: “<span style="color: #ff0000;">gp2</span>“

This specifies the [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) used for your nodes’ persistent disks. This is **mandatory** when persistence is enabled (for example, AWS uses “gp2” as a default and GKE uses “pd-standard” as a default).

- redisEnterpriseNodeResources: The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node.
- limits – specifies the max resources for a Redis node
- requests – specifies the minimum resources for a Redis node

For example:

  limits  
  cpu: “2000m”  
  memory: 4Gi  
  requests

  cpu: “2000m”  
  memory: 4Gi

The default (if unspecified) is 2 cores (2000m) and 4GB (4Gi).

- serviceBrokerSpec –
- enabled: \<false/true\>

This specifies [persistence](https://redislabs.com/redis-features/persistence) for the Service Broker with an “enabled/disabled” flag. The default is “false.”

  persistentSpec:  
  storageClassName: “gp2“

- redisEnterpriseImageSpec: This configuration controls the Redis Enterprise version used, and where it is fetched from. We always recommend running the current GA version.

[imagePullPolicy](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/builds_and_image_streams.html#image-pull-policy):
IfNotPresent 
Repository: redislabs/redis 
versionTag: 5.2.0-14–  

The version tag, as it appears on your repository (e.g. on [DockerHub](https://hub.docker.com/r/redislabs/redis/)).

This is an optional configuration. If omitted, it will default to the latest version.

## Step 4: Create your Cluster

Once you have your_cluster_name yaml set, you need to apply it to create your Redis Enterprise Cluster:
```src
 $ kubectl apply -f your_cluster_name.yaml
```
Run kubectl get rec and verify that creation was successful (rec is a shortcut for “RedisEnterpriseClusters”).

You should receive a response similar to the following:

`NAME AGE`
  
  `Your_cluster_name 17s`

Your Cluster will be ready shortly—typically within a few minutes.

To check the cluster status, type the following:
```src
 $ kubectl get pod
```
You should receive a response similar to the following:

|                                    |       |         |          |     |
| ---------------------------------- | ----- | ------- | -------- | --- |
| NAME                               | READY | STATUS  | RESTARTS | AGE |
| your_cluster_name-0              | 1/1   | Running | 0        | 1m  |
| your_cluster_name-1              | 1/1   | Running | 0        | 1m  |
| your_cluster_name-2              | 1/1   | Running | 0        | 1m  |
| your_cluster_name-controller-x-x | 1/1   | Running | 0        | 1m  |
| Redis-enterprise-operator-x-x      | 1/1   | Running | 0        | 5m  |

Next, create your databases.

## Step 5: Create a database

In order to create your database, we will log in to the Redis Enterprise UI.

- First, apply port forwarding to your Cluster:
```src
 $ kubectl port-forward your_cluster_name-0 8443:8443
```
*Note: your_cluster_name-0 is one of your cluster pods. You may consider running the port-forward command in the background.*

*Note: The Openshift UI provides tools for creating additional routing options, including external routes. These are covered in RedHat Openshift documentation.](https://docs.openshift.com/container-platform/3.9/architecture/networking/routes.html#route-types)*

Next, create your database.

- Open a browser window and navigate to localhost:8443

  ![](https://redislabs.com/wp-content/uploads/2018/09/getting-started-kubernetes-openshift-image5.png)

- In order to retrieve your password, navigate to the OpenShift management console, select your project name, go to    Resources-\>Secrets-\>your_cluster_name
- Retrieve your password by selecting “Reveal Secret.”  
  
  ![](https://redislabs.com/wp-content/uploads/2018/09/getting-started-kubernetes-openshift-image3.png)
  
- Follow the interface’s [instructions to create your database]({{< relref "/rs/administering/database-operations/creating-database.md" >}}).

*Note: In order to conduct the Ping test through Telnet, you can create a new route to the newly created database port in the same way as described above for the UI port. After you create your database, go to the Openshift management console, select your project name and go to Applications-\>Services. You will see two newly created services representing the database along with their IP and port information, similar to the screenshot below.*

![](https://redislabs.com/wp-content/uploads/2018/09/getting-started-kubernetes-openshift-image6.png)
