---
Title: Redis Enterprise Software on Kubernetes deployment with VMWare Tanzu Kubernetes Grid Integrated Edition (formerly Pivotal PKS)
linkTitle: VMWare Tanzu Kubernetes Grid Integrated Edition
description: This section provides the steps required to set up a Redis Enterprise cluster with the Kubernetes Operator on VMWare Tanzu Kubernetes Grid Integrated Edition (formerly Pivotal PKS).
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /rs/getting-started/getting-started-kubernetes/k8s-pks/,
    /platforms/kubernetes/getting-started/tanzu/,
    /platforms/kubernetes/getting-started/tanzu._index.md,
    /platforms/kubernetes/deployment/tanzu/,
    /platforms/kubernetes/deployment/tanzu/_index.md,
]
---
These are the steps required to set up a Redis Enterprise cluster with the Kubernetes Operator on VMWare Tanzu Kubernetes Grid Integrated Edition (formerly Pivotal PKS).

Prerequisites:

- A [PKS environment installed](https://docs.pivotal.io/runtimes/pks/1-4/installing.html) on PCF version 2.4.6 or above and PKS version 1.3.3 or above.
- A [PKS cluster](https://docs.pivotal.io/runtimes/pks/1-4/create-cluster.html#create) with at least three nodes, each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}) in the case of a development environment. For production use-cases and large-scale POCs, use hardware recommendations for production environments. <!--- Reference a future article that will cover k8s cluster node requirements that include provisions for Services Rigger, Operator and cluster nodes -->
- The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.8 or higher.
- The [PKS cli installed](https://docs.pivotal.io/runtimes/pks/1-4/installing-pks-cli.html).

## Step 1: Login and prepare your PKS environment and PKS cluster

1. Log in to PKS and your PKS cluster:

    ```sh
    pks login -a PKS-API -u USERNAME -k
    ```

1. Find the cluster you created by listing the available clusters:

    ```sh
    pks clusters
    ```

    Example of a response:

    ```sh
    Name      Plan Name  UUID                                  Status     Action
    cluster1  dev        d8g7s9g9-789a-789a-879a-ad8f798s7dfs  succeeded  CREATE
    cluster2  prod       s7f9sadf-sfd9-as8d-45af-a9s8d7f3niuy  succeeded  CREATE
    ```

1. Change the context to your target cluster:

    ```sh
    pks get-credentials CLUSTER-NAME
    ```

    Example of a response:

    ```sh
    Fetching credentials for cluster pks-re-cluster
    Context set for cluster pks-re-cluster.

    You can now switch between clusters by using:
    $kubectl config use-context <cluster-name>
    ```

1. Confirm you can access your cluster using the Kubernetes CLI:

    ```sh
    kubectl cluster-info
    ```

    Example of a response:

    ```sh
    Kubernetes master is running at http...
    ```

    {{< note >}}
While you can use the Kubernetes default namespace, it is a best practice to use a separate namespace if you are sharing the cluster with others.
The operator deployment deploys and runs one Redis Enterprise cluster in one Kubernetes namespace.
In order to run multiple Redis Enterprise clusters, deploy each one in its own namespace.
    {{< /note >}}

1. Create a namespace for your deployment:

    1. Review the current namespaces:

        ```sh
        kubectl get namespaces
        ```

        Example of a response:

        ```sh
        NAME          STATUS   AGE
        default       Active   14d
        kube-public   Active   14d
        kube-system   Active   14d
        pks-system    Active   14d
        ```

    1. Create a new namespace with a unique name:

        ```sh
        kubectl create namespace redis-enterprise
        ```

        Example of a response:

        ```sh
        namespace/redis-enterprise created
        ```

    1. Switch context to operate within the newly created namespace:

        ```sh
        kubectl config set-context --current --namespace=redis-enterprise
        ```

        Example of a response:

        ```sh
        Context "pks-re-cluster" modified.
        ```

<!---```
 $ kubectl current-context
 ```
 Example of a response:
 ```

 Context "pks-re-cluster" modified.
 ```
-->

## Step 2: Get and prepare deployment files

1. Clone this repository, which contains the deployment files:

    ```sh
    git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
    ```

    Example of a response:

    ```sh
    Cloning into 'redis-enterprise-k8s-docs'...
    remote: Enumerating objects: 37, done.
    remote: Counting objects: 100% (37/37), done.
    remote: Compressing objects: 100% (30/30), done.
    remote: Total 168 (delta 19), reused 9 (delta 7), pack-reused 131
    Receiving objects: 100% (168/168), 45.32 KiB | 7.55 MiB/s, done.
    Resolving deltas: 100% (94/94), done.
    ```

1. Edit the yaml files for your specific deployment, if necessary:

    - [bundle.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/bundle.yaml) - The bundle file includes several declarations:
        - `rbac` (Role-Based Access Control) defines who can access specified resources. The Operator application requires these definitions to deploy and manage the entire Redis Enterprise deployment (all cluster resources within a namespace). These include declaration of rules, role and role binding.
        - `crd` creates a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) for your Redis Enterprise cluster resource. This provides another API resource to be handled by the k8s API server and managed by the operator we will deploy next.
        - `operator` creates the operator deployment that is responsible for managing the k8s deployment and lifecycle of a Redis Enterprise cluster. Among many other responsibilities, it creates a [stateful set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) that runs the Redis Enterprise nodes, as pods. The yaml contains the latest image tag representing the latest Operator version available.

        This yaml file is commonly not necessary to edit.

        1. To apply this yaml file, run:

            ```sh
            kubectl apply -f bundle.yaml
            ```

            After the yaml is applied you receive the response:

            ```sh
            role.rbac.authorization.k8s.io/redis-enterprise-operator created
            serviceaccount/redis-enterprise-operator created
            rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
            customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com configured
            deployment.apps/redis-enterprise-operator created
            ```

        1. Verify that your redis-enterprise-operator deployment is running:

            ```sh
            kubectl get deployment -l name=redis-enterprise-operator
            ```

            A typical response looks like:

            ```sh
            NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
            redis-enterprise-operator   1/1     1            1           0m36s
            ```

        1. Create a storage class. The Redis Enterprise cluster deployment dynamically provisions Persistent Volume Claims (PVCs) for use with cluster persistent storage needs. In order to create dynamic PVCs, the Kubernetes cluster must have a storage class defined. Determine whether a storage class is defined on your PKS cluster:

            ```sh
            kubectl get storageclasses
            ```

            Since PKS does not automatically provision storage classes, and if you, or the cluster administrator, did not provision storage classes then the response will be:

            ```sh
            No resources found.
            ```

            To create a storage class, determine the type of IaS your PKS cluster is running on and consult the table in the [Kubernetes Storage Classes article](https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner) to determine which provisioner to use.

            Two examples of yaml files you can use for popular IaS providers are:

            - AWS - *gp2.yaml*

            ```sh
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

            ```sh
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

        1. Create the appropriate yaml file for your IaS and apply it:

            ```sh
            kubectl apply -f <your-storage-class.yaml>
            ```

            [More information about persistent storage in Operator deployment.](https://docs.redislabs.com/latest/platforms/kubernetes/kubernetes-persistent-volumes/)

        {{< note >}}
You can omit the reclaimPolicy declaration in the yaml file, in case of error, for testing and development environments.
For production environments you must retain the Persistent Volume Claims (PVCs) when cluster persistent is used, in order to enable recovery.
        {{< /note >}}

        You will use the storage class name you have just created in the next step, editing the Redis Enterprise cluster (REC) yaml.

    - [rec_crd.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/crds/v1/rec_crd.yaml) - Defines the configuration of the newly created resource: Redis Enterprise cluster.
        This yaml could be renamed your_pks_cluster.yaml to keep things tidy, but this isn’t a mandatory step. This yaml **must** be edited, however, to reflect the specific configurations of your cluster. Here are the only fields you **must** review before you apply the REC yaml:

        - `name` - “your_cluster_name” (e.g. “re-cluster”). You can keep the default name or choose your own
        in the `spec:` section.
        - `nodes` - The number of nodes in the cluster, 3 by default (In order to evaluate cluster functionality, must be an uneven number of at least 3 or greater—[here’s why](https://redislabs.com/redis-enterprise/technology/highly-available-redis/))

        <!-- - uiServiceType: service_type
        Service type value can be either ClusterIP or LoadBalancer. This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/). The default is ClusterIP.need to spin off to its own article, no need to provide too many options; rather, remove barriers to adoption--->

        - `username` - <your_email_address> - use an accessible email if evaluating alerting or use the default or any other properly formatted address. If not specified the default username is demo@redislabs.com

        <!--- - persistentSpec: enabled: \<false/true\>
        Check your Redis Software nodes’ enabled/disabled flag for [persistency](https://redislabs.com/redis-features/persistence). The default is “false.”
        we now default to using persistence -->

        - `storageClassName` - Your storage class name from the previous step.
        - `redisEnterpriseNodeResources` - The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node. You can use the default or set your own. If your cluster is resource constrained, the minimum workable limits for basic testing are 2 CPU and 3GB. For development and production, see the [minimum hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).
            - limits – specifies the max resources for a Redis node
            - requests – specifies the minimum resources for a Redis node
        - `enforceIPv4: true` - Add this line under `spec:` at the same indentation (2 spaces) as 'nodes'. This indicates to the REC deployment to not attempt to bind to IPv6, which is currently not supported on PKS clusters.
        - `redisEnterpriseImageSpec` - This configuration controls the Redis Enterprise version used, and where it is fetched from. The GitHub repository yaml contains the latest image tag from [DockerHub](https://hub.docker.com/r/redislabs/redis/). If omitted, the Operator will default to the compatible image version and pull it from DockerHub. This configuration should stay as-is in most circumstances, unless the image used is pulled from a private repository.

        Here is an example of the edited REC yaml file:

        ```sh
        apiVersion: "app.redislabs.com/v1"
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
             versionTag:       5.4.10-22
        ```

## Step 3: Create your cluster

1. Once you have `your_pks_cluster.yaml` file set, you need to apply it to create your Redis Enterprise cluster:

    ```sh
    $ kubectl apply -f your_cluster_name.yaml
    ```

    A typical response looks like:

    ```sh
    redisenterprisecluster.app.redislabs.com/rec-pks created
    ```

1. To track the creation of the cluster nodes, track the creation of the StatefulSet, which will be names the same as the cluster name you provided in the `your_pks_cluster.yaml` file. In the example above it is `rec-pks`:

    ```sh
    kubectl rollout status sts/rec-pks
    ```

    A typical response looks like:

    ```sh
    Waiting for 3 pods to be ready...
    Waiting for 2 pods to be ready...
    Waiting for 1 pods to be ready...
    statefulset rolling update complete 3 pods at revision rec-pks-808w0973...
    ```

1. Verify `rec` creation was successful:

    ```sh
    kubectl get rec
    ```

    A typical response looks like:

    ```sh
    NAME      AGE
    rec-pks   7m
    ```

1. Verify all the pods and deployments are available and running:

    ```sh
    kubectl get all
    ```

    A typical response looks like:

    ```sh
    NAME                                            READY   STATUS    RESTARTS   AGE
    pod/rec-pks-0                                   1/1     Running   0          16m
    pod/rec-pks-1                                   1/1     Running   0          14m
    pod/rec-pks-2                                   1/1     Running   0          13m
    pod/rec-pks-services-rigger-585cbf5ff-5f2z5     1/1     Running   0          16m
    pod/redis-enterprise-operator-954b6c68c-bgwpr   1/1     Running   0          18m

    NAME                 TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                      AGE
    service/rec-pks      ClusterIP      None             <none>          9443/TCP,8001/TCP,8070/TCP   16m
    service/rec-pks-ui   ClusterIP      10.100.200.101   <none>          8443:31459/TCP               16m

    NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/rec-pks-services-rigger     1/1     1            1           16m
    deployment.apps/redis-enterprise-operator   1/1     1            1           18m

    NAME                                                  DESIRED   CURRENT   READY   AGE
    replicaset.apps/rec-pks-services-rigger-585f5bcff     1         1         1       16m
    replicaset.apps/redis-enterprise-operator-9546cb68c   1         1         1       18m

    NAME                       READY   AGE
    statefulset.apps/rec-pks   3/3     16m
    ```

## Step 4: Create a database

In order to create your database, you will log in to the Redis Enterprise UI.

1. First, determine you administrator password. It is stored in an opaque k8s secret named after the REC name. In this example:

    ```sh
    kubectl get secret/rec-pks -o yaml
    ```

    A typical response will include the following lines:

    ```sh
    apiVersion: v1
    data:
      license: ""
      password: ZGdlaWw3Cg==
      username: YWRtaW5AcmVkaXNsYWJzLmNvbQ==
    kind: Secret
    ```

1. Decode the password:

    ```sh
    echo 'ZGdlaWw3Cg==' | base64 --decode
    ```

    A typical response will include the following lines:

    ```sh
    dgeil7
    ```

1. There are two primary options for accessing the admin console:
    1. If your PKS cluster has a load balancer service setup with a public IP you have access to or otherwise a routable IP address from your machine:
        - Determine that IP address:

            ```sh
            kubectl get service/rec-pks-ui
            ```

            A typical response will include the following lines:

            ```sh
            service/rec-pks-ui   LoadBalancer   10.100.200.101   53.128.131.29   8443:31459/TCP               16m
            ```

        - Enter the IP address followed by port number 8443 into your browser address bar: `https://53.128.131.29:8443`

    1. If your PKS cluster does not have a routable IP address from your machine:

        - Setup port forwarding for port 8443 to one of you cluster pods:

            ```sh
            kubectl port-forward rec-pks-0 8443
            ```

            A typical response will include the following lines:

            ```sh
            Forwarding from 127.0.0.1:8443 -> 8443
            Forwarding from [::1]:8443 -> 8443
            ```

        - Use `localhost` followed by port number 8443 in your browser address bar: `https://localhost:8443`

1. Log in to the admin console with the username defined in your REC yaml and the password.

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. Follow the [instructions to create your database](http://localhost:1313/rs/administering/creating-database/#creating-a-new-redis-database).

    For example:

    1. In **databases**, click ![Add](/images/rs/icon_add.png#no-click "Add").

        If you do not have any databases on the node, you are prompted to create a database.

        <!-- {{</* embed-md "create-db.md" */>}} -->

    1. Click **Next** to create a single-region deployment on RAM.

        ![getstarted-newdatabase](/images/rs/getstarted-newdatabase.png)

    1. Enter the mandatory details of the new {{< field "db_type" >}}:

        - **Name** - enter `pks-test` or another database name.
        - **Memory limit** - use the default 0.10GB or whatever value within the available memory.
        - **Password** -enter a password and record it for the next steps.
        - Click **Activate**.

    1. Test the database connectivity test using Telnet:

        1. Find the Kubernetes services automatically created for your Redis Enterprise database:

            ```sh
            kubectl get service -l app=redis-enterprise-bdb
            ```

            A typical response will list all database services in the cluster, for example:

            ```sh
            NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
            pks-test            ClusterIP   10.100.200.52   <none>        14771/TCP   22m
            pks-test-headless   ClusterIP   None            <none>        14771/TCP   22m
            ```

        1. Set up port forwarding for the database port to one of your database services:

            ```sh
            kubectl port-forward service/pks-test 14771
            ```

            A typical response will list all database services in the cluster, for example:

            ```sh
            Forwarding from 127.0.0.1:14771 -> 14771
            Forwarding from [::1]:14771 -> 14771
            ```  

        1. Connect to your database via Telnet and test some basic Redis commands with the database password:

            ```sh
            $ telnet 127.0.0.1 14771

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

To remove the Redis Enterprise cluster from your PKS deployment:

1. [Delete]({{< relref "/rs/administering/database-operations/deleting-database.md" >}}) any databases you created.

1. Delete the REC custom resource. This removes the pods on the cluster nodes and all related services and deployments, except for the Operator deployment itself.

    ```sh
    kubectl delete rec rec-pks
    ```

    A typical response looks like:

    ```sh
    redisenterprisecluster.app.redislabs.com "rec-pks" deleted
    ```

1. Delete the Operator deployment:

    ```sh
    kubectl delete deployment -l name=redis-enterprise-operator
    ```

    A typical response looks like:

    ```sh
    deployment.extensions "redis-enterprise-operator" deleted
    ```

1. Verify that all resources have been removed:

    ```sh
    kubectl get all
    ```

    A typical response looks like:

    ```sh
    No resources found.
    ```

1. Delete the namespace you've created in step 1-5:

    ```sh
    kubectl delete namespace redis-enterprise
    ```

    A typical response looks like:

    ```sh
    namespace "redis-enterprise" deleted.
    ```

1. Optionally, switch to the default namespace:

    ```sh
    kubectl config set-context --current --namespace default
    ```
