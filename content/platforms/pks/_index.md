---
Title: Getting Started with PKS (Pivotal Container Service)
description:
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/getting-started/getting-started-kubernetes/k8s-pks/
---
These are the steps required to set up a Redis Enterprise Cluster with Kubernetes Operator on PKS (Pivotal Container Service).

Prerequisites:

- A [PKS environment installed](https://docs.pivotal.io/runtimes/pks/1-4/installing.html)
  on Pivotal Platform (formerly Pivotal Cloud Foundry - PCF) 2.4.6 or above, and PKS version 1.3.3 or above.
- A [PKS cluster](https://docs.pivotal.io/runtimes/pks/1-4/create-cluster.html#create)
  with at least three nodes that each meet the [minimum system requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
  according to your development or production environment. <!-- Reference a future article that will cover k8s cluster node requirements that include provisions for Services Rigger, Operator and cluster nodes -->
- The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.8 or higher
- The [PKS cli installed](https://docs.pivotal.io/runtimes/pks/1-4/installing-pks-cli.html)

## Step 1: Login and prepare your PKS environment and PKS cluster

1. Login to PKS and into your PKS cluster:

    ```src
    pks login -a PKS-API -u USERNAME -k
    ```

1. Find the cluster you created by listing the available clusters:

    ```src
    pks clusters
    ```

    Example of a response:

    ```src
    Name      Plan Name  UUID                                  Status     Action   
    cluster1  dev        d8g7s9g9-789a-789a-879a-ad8f798s7dfs  succeeded  CREATE   
    cluster2  prod       s7f9sadf-sfd9-as8d-45af-a9s8d7f3niuy  succeeded  CREATE   
    ```

1. Change the context to your target cluster:

    ```src
    pks get-credentials CLUSTER-NAME
    ```

    Example of a response:

    ```src
    Fetching credentials for cluster pks-re-cluster
    Context set for cluster pks-re-cluster.

    You can now switch between clusters by using:
    $kubectl config use-context <cluster-name>
    ```

1. Confirm you can access your cluster using the Kubernetes CLI:

    ```src
    kubectl cluster-info
    ```

    Example of a response:

    ```src
    Kubernetes master is running at http...
    ```

    Next, create a namespace where the Redis Enterprise Cluster will be deployed.
    If you are sharing the cluster with others,
    we recommend that you use a separate namespace instead of the Kubernetes default namespace.

    {{% note %}}
The Operator deployment deploys and runs one Redis Enterprise Cluster in one Kubernetes namespace.
In order to run multiple Redis Enterprise Clusters, deploy each one in its own namespace.
    {{% /note %}}

1. Create a namespace for your deployment:

    1. Review the current namespaces:

        ```src
        kubectl get namespaces
        ```

        Example of a response:

        ```src
        NAME          STATUS   AGE
        default       Active   14d
        kube-public   Active   14d
        kube-system   Active   14d
        pks-system    Active   14d
        ```

    1. Create a new namespace using a unique name:

        ```src
        kubectl create namespace redis-enterprise
        ```

        Example of a response:

        ```src
        namespace/redis-enterprise created
        ```

    1. Switch context to operate within the newly created namespace:

        ```src
        kubectl config set-context --current --namespace=redis-enterprise
        ```

        Example of a response:

        ```src
        Context "pks-re-cluster" modified.
        ```

        <!--
        ```
        kubectl current-context
        ```
        Example of a response:

        ```
        Context "pks-re-cluster" modified.
        ```
        -->

## Step 2: Get and prepare deployment files

1. Clone the repository that contains the deployment files:

    ```src
    git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
    ```

    Example of a response:

    ```src
    Cloning into 'redis-enterprise-k8s-docs'...
    remote: Enumerating objects: 37, done.
    remote: Counting objects: 100% (37/37), done.
    remote: Compressing objects: 100% (30/30), done.
    remote: Total 168 (delta 19), reused 9 (delta 7), pack-reused 131
    Receiving objects: 100% (168/168), 45.32 KiB | 7.55 MiB/s, done.
    Resolving deltas: 100% (94/94), done.
    ```

    Let’s look at each yaml file to understand what it does and edit it for your specific deployment, if necessary:

    - [rbac.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/rbac.yaml) -
        The rbac (Role-Based Access Control) yaml defines who can access which resources.
        The Operator application requires these definitions to deploy and manage the entire Redis Enterprise deployment (all cluster resources within a namespace).
        This yaml should be applied as-is, without changes. To apply it:

        ```src
        kubectl apply -f rbac.yaml
        ```

        You should receive the following response:

        ```src
        role.rbac.authorization.k8s.io/redis-enterprise-operator created
        serviceaccount/redis-enterprise-operator created
        rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
        ```

    - [crd.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/crd.yaml) -
    The crd.yaml creates a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions)
    for your Redis Enterprise Cluster resource.
    This provides another API resource to be handled by the Kubernetes API server and managed by the operator.
    This yaml does not require any changes.

        To apply it:

        ```src
        kubectl apply -f crd.yaml
        ```

        You should receive the following response:

        ```src
        customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
        ```

    - [operator.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/operator.yaml) -
        The operator yaml file creates the operator deployment that is responsible for managing the k8s deployment and lifecycle of a Redis Enterprise Cluster.
        Among many other responsibilities, it creates a [stateful set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) that runs the Redis Enterprise nodes, as pods.
        The yaml in the GitHub repository that you cloned contains the latest image tag representing the latest Operator version available.
        This yaml does not require any changes under most circumstances.

        To apply it:

        ```src
        kubectl apply -f operator.yaml
        ```

        You should receive the following response:

        ```src
        deployment.apps/redis-enterprise-operator created
        ```

1. Now, verify that your redis-enterprise-operator deployment is running:

    ```src
    kubectl get deployment -l name=redis-enterprise-operator
    ```

    A typical response will look like this:

    ```src
    NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
    redis-enterprise-operator   1/1     1            1           0m36s
    ```

1. Next, we'll create a storage class. The Redis Enterprise Cluster deployment dynamically provisions Persistent Volume Claims (PVCs) for use with cluster persistent storage needs.
   In order to create dynamic PVCs, the Kubernetes cluster must have a storage class defined.
   Determine whether a storage class is defined on your PKS cluster:

    ```src
    kubectl get storageclasses
    ```

    Since PKS does not automatically provision storage classes, and if you, or the cluster administrator, did not provision storage classes then the response will be:

    ```src
    No resources found.
    ```

    In order to create a storage class, determine the type of IaS your PKS cluster is running on, and consult the table in the [Kubernetes Storage Classes article](https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner) to determine which provisioner to use. Below, please find two examples of yaml files you can use for popular IaS providers:

    - AWS - *gp2.yaml*

      ```src
      apiVersion: storage.k8s.io/v1
      kind: StorageClass
      metadata:
        name: gp2
      mountOptions:
        - debug
      parameters:
        type: gp2
      provisioner: kubernetes.io/aws-ebs
      reclaimPolicy: Retain
      ```

    - GCP - *standard.yaml*

      ```src
      apiVersion: storage.k8s.io/v1
      kind: StorageClass
      metadata:
        name: standard
      mountOptions:
        - debug
      parameters:
        type: pd-standard
      provisioner: kubernetes.io/gce-pd
      reclaimPolicy: Retain
      ```

1. Create the appropriate yaml file to you IaS and apply it:

    ```src
    kubectl apply -f <your-storage-class.yaml>
    ```

    [More information about persistent storage in Operator deployment.](https://docs.redislabs.com/latest/platforms/kubernetes/kubernetes-persistent-volumes/)

    {{% note %}}
You can ommit the reclaimPolicy declaration in the yaml file, in case of error, for testing and development environments.
For production environments, make sure that Persistent Volume Claims (PVCs) are retained when cluster persistent is used in order to enable recovery.
    {{% /note %}}

    You will use the storage class name you have just created in the next step, editing the Redis Enterprise Cluster (REC) yaml.

    [redis-enterprise-cluster.yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/redis-enterprise-cluster.yaml) - Defines the configuration of the newly created resource: Redis Enterprise Cluster. This yaml could be renamed your_pks_cluster.yaml to keep things tidy, but this isn’t a mandatory step. This yaml **must** be edited, however, to reflect the specific configurations of your Cluster.

    Here are the only fields you **must** review before you apply the REC yaml:

    - `name`: “your_cluster_name” (e.g. “re-cluster”). You can keep the default name or choose your own.
    - `nodes`: The number of nodes in the cluster, 3 by default (In order to evaluate cluster functionality, must be an uneven number of at least 3 or greater—[here’s why](https://redislabs.com/redis-enterprise/technology/highly-available-redis/))

    - uiServiceType: service_type
    Service type value can be either ClusterIP or LoadBalancer. This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/). The default is ClusterIP.

    - `username`: \<your_email@your_domain.your_suffix\> - use an accessible email if evaluating alerting or use the default or any other properly formatted address.

    - persistentSpec: enabled: \<false/true\>
    Check your Redis Software nodes’ enabled/disabled flag for [persistency](https://redislabs.com/redis-features/persistence). The default is “false.”

    - `storageClassName:` Your storage class name from the previous step
    - `redisEnterpriseNodeResources:` The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node. You can use the default or set your own. If your cluster is resource constraint, the minimum workable limits for basic testing are 2 CPU and 3Gb. For development and production, please use the guidelines in the [Hardware Requirements article]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
        - limits – specifies the max resources for a Redis node
        - requests – specifies the minimum resources for a Redis node
    - `enforceIPv4: true` - Add this line under `spec:` at the same indentation (2 spaces) as 'nodes'. This indicates to the REC deployment to not attempt to bind to IPv6, which is currently not supported on PKS clusters.
    - `redisEnterpriseImageSpec`: This configuration controls the Redis Enterprise version used, and where it is fetched from. The GitHub repository yaml contains the latest image tag from [DockerHub](https://hub.docker.com/r/redislabs/redis/). If omitted, the Operator will default to the compatible image version and pull it from DockerHub. This configuration should stay as-is in most circumstances, unless the image used is pulled from a private repository. <!--- Ben - again, need to preserve indentation, within the block code --->

    Here is an example of the edited REC yaml file:

    ```src
    apiVersion: "app.redislabs.com/v1alpha1"
    kind: "RedisEnterpriseCluster"
     metadata:
       name: "rec-pks"
     spec:
       enforceIPv4: true
       nodes: 3
       persistentSpec:
         enabled: true
         storageClassName: "standard" # ! edit according to infrastructure
       uiServiceType: LoadBalancer
       username: "demo@redislabs.com"
       redisEnterpriseNodeResources:
         limits:
           cpu: "2000m"
           memory: 3Gi
         requests:
           cpu: "2000m"
           memory: 3Gi
       redisEnterpriseImageSpec:
         imagePullPolicy:  IfNotPresent
         repository:       redislabs/redis
         versionTag:       5.4.2-27
    ```

## Step 4: Create your Cluster

1. Once you have `your_pks_cluster.yaml` file set, you need to apply it to create your Redis Enterprise Cluster:

    ```src
    kubectl apply -f your_cluster_name.yaml
    ```

    A typical response will look like this:

    ```src
    redisenterprisecluster.app.redislabs.com/rec-pks created
    ```

1. To track the creation of the cluster nodes, track the creation of the StatefulSet, which will be names the same as the cluster name you've provided in the `your_pks_cluster.yaml` file. In the example above it is `rec-pks`:

    ```src
    kubectl rollout status sts/rec-pks
    ```

    A typical response will look like this:

    ```src
    Waiting for 3 pods to be ready...
    Waiting for 2 pods to be ready...
    Waiting for 1 pods to be ready...
    statefulset rolling update complete 3 pods at revision rec-pks-808w0973...
    ```

1. Verify `rec` creation was successful:

    ```src
    kubectl get rec
    ```

    A typical response will look like this:

    ```src
    NAME      AGE
    rec-pks   7m
    ```

1. Verify all the pods and deployments are available and running:

    ```src
    kubectl get all
    ```

    A typical response will look like this:

    ```src

    NAME                                            READY   STATUS    RESTARTS   AGE
    pod/rec-pks-0                                   1/1     Running   0          16m
    pod/rec-pks-1                                   1/1     Running   0          14m
    pod/rec-pks-2                                   1/1     Running   0          13m
    pod/rec-pks-services-rigger-585cbf5ff-5f2z5     1/1     Running   0          16m
    pod/redis-enterprise-operator-954b6c68c-bgwpr   1/1     Running   0          18m

    NAME                 TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                      AGE
    service/rec-pks      ClusterIP      None             <none>          9443/TCP,8001/TCP,8070/TCP   16m
    service/rec-pks-ui   LoadBalancer   10.100.200.101   53.128.131.29   8443:31459/TCP               16m

    NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/rec-pks-services-rigger     1/1     1            1           16m
    deployment.apps/redis-enterprise-operator   1/1     1            1           18m

    NAME                                                  DESIRED   CURRENT   READY   AGE
    replicaset.apps/rec-pks-services-rigger-585f5bcff     1         1         1       16m
    replicaset.apps/redis-enterprise-operator-9546cb68c   1         1         1       18m

    NAME                       READY   AGE
    statefulset.apps/rec-pks   3/3     16m
    ```

## Step 5: Create a database

In order to create your database, you will log in to the Redis Enterprise UI.

1. First, determine you administrator password. It is stored in an opaque k8s secret named after the REC name. In this example:

    ```src
    kubectl get secret/rec-pks -o yaml
    ```

    A typical response will include the following lines:

    ```src

    apiVersion: v1
    data:
        license: ""
        password: ZGdlaWw3Cg==
        username: YWRtaW5AcmVkaXNsYWJzLmNvbQ==
    kind: Secret
    ```

1. Decode the password:

    ```src
    echo 'ZGdlaWw3Cg==' | base64 --decode
    ```

    A typical response will include the following lines:

    ```src
    dgeil7
    ```

1. There are two primary options for accessing the Web UI
    - If your PKS cluster has loadbalancer service setup with a public IP you have access to or otherwise a routable IP address from your machine:

        1. Determine that IP address:

            ```src
            kubectl get service/rec-pks-ui
            ```

            A typical response will include the following lines:

            ```src
            service/rec-pks-ui   LoadBalancer   10.100.200.101   53.128.131.29   8443:31459/TCP               16m
            ```

        1. Enter the IP address followed by port number 8443 into your browser address bar: `https://53.128.131.29:8443`

    - If your PKS cluster does not have a routable IP address from your machine:
        1. Setup port forwarding for port 8443 to one of you cluster pods:

            ```src
            kubectl port-forward rec-pks-0 8443
            ```

            A typical response will include the following lines:

            ```src
            Forwarding from 127.0.0.1:8443 -> 8443
            Forwarding from [::1]:8443 -> 8443
            ```

        1. Use `localhost` followed by port number 8443 in your browser address bar: `https://localhost:8443`

            {{% warning %}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
            {{% /warning %}}

1. Login to the Web UI by using the username defined in your REC yaml and the password you've previously decoded.

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. Follow the [instructions in the UI to create your database](http://localhost:1313/rs/administering/database-operations/creating-database/#creating-a-new-redis-database).
    For example, a basic setup would follow these steps:
    1. In **databases**, click ![Add](/images/rs/icon_add.png#no-click "Add").

        If you do not have any databases on the node, you are prompted to create a database.

        <!-- {{</* embed-md "create-db.md" */>}} -->

    1. Click **Next** to create a single-region deployment on RAM.

        ![new_databases](/images/rs/new_databases.png)

    1. Enter the mandatory details of the new {{< field "db_type" >}}:

        - **Name** - enter `pks-test` or another database name.
        - **Memory limit** - use the default 0.10GB or whatever value within the available memory.
        - **Password** -enter a password and record it for the next steps.
        - Click **Activate**.

1. We will now conduct a simple database connectivity test using Telnet.
    1. Find the Kubernetes services automatically created for your Redis Enterprise database

        ```src
        kubectl get service -l app=redis-enterprise-bdb
        ```

        A typical response will list all database services in the cluster, for example:

        ```src
        NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
        pks-test            ClusterIP   10.100.200.52   <none>        14771/TCP   22m
        pks-test-headless   ClusterIP   None            <none>        14771/TCP   22m
        ```

    1. Setup port forwarding for the database port to one of you database services

        ```src
        kubectl port-forward service/pks-test 14771
        ```

        A typical response will list all database services in the cluster, for example:

        ```src
        Forwarding from 127.0.0.1:14771 -> 14771
        Forwarding from [::1]:14771 -> 14771
        ```

    1. Connect to your database via Telnet with the database password you've recorded earlier with the *AUTH* command and test some basic Redis commands, as shown below:

        ```src
        telnet 127.0.0.1 14771
        ```

        ```src
        Connected to localhost.
        Escape character is '^]'.
        auth cdef2843d3e0
        +OK
        ping
        +PONG
        get *
        $-1
        set foo bar
        +OK
        get foo
        $3
        bar
        ^]
        telnet> ^C
        $
        ```  

## Step 5: Cleaning up

To remove the Redis Enterprise Cluster from your PKS deployment:

1. [Delete any databases]({{< relref "/rs/administering/database-operations/deleting-database.md" >}}).
1. Delete the REC custom resource. This will remove the cluster nodes' pods and all related services and deployments, except for the Operator deployment itself.

    ```src
    kubectl delete rec rec-pks

    ```
    A typical response will look like this:

    ```src
    redisenterprisecluster.app.redislabs.com "rec-pks" deleted
    ```

1. Delete the Operator deployment:

    ```src
    kubectl delete deployment -l name=redis-enterprise-operator
    ```

    A typical response will look like this:

    ```src
    deployment.extensions "redis-enterprise-operator" deleted
    ```

1. Verify that all resources have been removed:

    ```src
    kubectl get all
    ```

    A typical response will look like this:

    ```src
    No resources found.
    ```

1. Delete the namespace you've created in step 1-5:

    ```src
    kubectl delete namespace redis-enterprise
    ```

    A typical response will look like this:

    ```src
    namespace "redis-enterprise" deleted.
    ```

1. Optionally, switch to the default namespace:

    ```src
    kubectl config set-context --current --namespace default
    ```
