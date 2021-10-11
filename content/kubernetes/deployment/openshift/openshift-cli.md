---
Title: Redis Enterprise Software on Kubernetes deployment with OpenShift CLI tools
linkTitle: OpenShift CLI
description: The operator and cluster can be installed via CLI tools
  OpenShift
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /rs/getting-started/getting-started-kubernetes/k8s-openshift/, 
    /platforms/openshift/getting-started-cli/,
    /platforms/kubernetes/getting-started/openshift/openshift-cli/,
    /platforms/kubernetes/getting-started/openshift/openshift-cli.md,
    /platforms/kubernetes/deployment/openshift/openshift-cli/,
    /platforms/kubernetes/deployment/openshift/openshift-cli/,
    content/kubernetes/deployment/openshift/openshift-cli.md,
    /kubernetes/deployment/openshift/openshift-cli.md,
    /kubernetes/deployment/openshift/openshift-cli/,

]
---
These are the steps required to set up a Redis Enterprise Software
cluster with OpenShift.

Prerequisites:

1. An [OpenShift cluster installed](https://docs.openshift.com/container-platform/4.8/installing/index.html) at version 4.6 or higher, with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. The [OpenShift cli installed](https://docs.openshift.com/container-platform/4.8/cli_reference/openshift_cli/getting-started-cli.html)

## Step 1: Login

1. Log in to your OpenShift account as a super admin so that you have access to all the default projects.
1. Create a new project, fill in the name and other details for the project, and click **Create**.

    ![getting-started-kubernetes-openshift-image1]( /images/rs/getting-started-kubernetes-openshift-image1.png )

1. Click on **admin** (upper right corner) and then **Copy Login**.

    ![getting-started-kubernetes-openshift-image4]( /images/rs/getting-started-kubernetes-openshift-image4.png )

1. Paste the `login` command into your shell, for example:

    ```sh
    oc login https://your-cluster.acme.com –token=your$login$token
    ```

1. To verify that you are using the newly created project, run:

    ```sh
    oc project <your project name>
    ```

This shifts to your project rather than the default project. You can confirm that you are in the correct project with `oc project`.

## Step 2: Get deployment files

Clone Kubernetes docs repository to get the deployment files:

```sh
git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
```

<!--
{{< note >}}
For RHEL images, please use the redis-enterprise-cluter_rhel.yaml and operator_rhel.yaml files.
{{< /note >}}
-->

## Step 3: Prepare your yaml files

Let’s look at each yaml file to see what requires editing:

- [scc.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/scc.yaml)

    The scc ([Security Context Constraint](https://docs.openshift.com/container-platform/4.8/authentication/managing-security-context-constraints.html)) yaml defines security context constraints for the cluster for our project. We strongly recommend that you **not** change anything in this yaml file.

    1. Apply the file:

        ```sh
        oc apply -f redis-enterprise-k8s-docs/openshift/scc.yaml
        ```

        You should receive the following response:

        ```sh
        securitycontextconstraints.security.openshift.io “redis-enterprise-scc” configured
        ```

    1. To bind the scc to your project, run:

        ```sh
        oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:your_project_name
        ```

        You can see the name of your project with `oc project`.

- [openshift.bundle.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift.bundle.yaml) -

    The bundle file includes several declarations:

    - rbac (Role-Based Access Control) defines who can access which resources. The Operator application requires these definitions to deploy and manage the entire Redis Enterprise deployment (all cluster resources within a namespace). These include declaration of rules, role and rolebinding.
    - crd declaration creates a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) for your Redis Enterprise Cluster resource. This provides another API resource that the k8s API server can use and the operator can manage in other deployments.
    - operator deployment declaration creates the operator deployment that is responsible for managing the k8s deployment and lifecycle of a Redis Enterprise Cluster. Among many other responsibilities, it creates a [stateful set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) that runs the Redis Enterprise nodes as pods. The yaml contains the latest image tag representing the latest Operator version available.

    {{< warning >}}
Changes to this file can cause unexpected results.
    {{< /warning >}}

    1. Apply the yaml file with:

        ```sh
        kubectl apply -f openshift.bundle.yaml
        ```

        The command returns a confirmation response such as:

        ```sh
        role.rbac.authorization.k8s.io/redis-enterprise-operator created
        serviceaccount/redis-enterprise-operator created
        rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created
        customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redis.com configured
        deployment.apps/redis-enterprise-operator created
        ```

    1. To verify that your redis-enterprise-operator deployment is running, run:

        ```sh
        kubectl get deployment -l name=redis-enterprise-operator
        ```

        A typical response will look like this:

        ```sh
        NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
        redis-enterprise-operator   1/1     1            1           0m36s
        ```

<!--
[rbac.yaml](https://raw.githubuser.com/RedisLabs/redis-enterprise-k8s-docs/master/rbac.yaml)

The rbac (Role-Based Access Control) yaml defines who can access which resources. We need this to allow our Operator application to deploy and manage the entire Redis Enterprise deployment (all cluster resources within a namespace). Therefore, we strongly recommend **not** changing anything in this yaml file. To apply it, type:

```sh
kubectl apply -f rbac.yaml
```

You should receive the following response:

`role.rbac.authorization.k8s.io/redis-enterprise-operator created
serviceaccount/redis-enterprise-operator created
rolebinding.rbac.authorization.k8s.io/redis-enterprise-operator created`
-->
<!---
- [sb_rbac.yaml](https://raw.githubuser.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/sb_rbac.yaml)

    If you deploy a service broker, also apply the sb_rbac.yaml file. The sb_rbac (Service Broker Role-Based Access Control) yaml defines the access permissions of the Redis Enterprise Service Broker.

    {{< warning >}}
Changes to this file can cause unexpected results.
    {{< /warning >}}

    - Apply the yaml file with:

    ```sh
    kubectl apply -f sb_rbac.yaml
    ```

    The command returns a confirmation response such as:

    ```sh
    clusterrole.rbac.authorization.k8s.io/redis-enterprise-operator-sb configured
    clusterrolebinding.rbac.authorization.k8s.io/redis-enterprise-operator configured
    ```
--->
<!--
- [crd.yaml](https://raw.githubuser.com/RedisLabs/redis-enterprise-k8s-docs/master/crd.yaml)

The next step applies crd.yaml, creating a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) for your Redis Enterprise Cluster resource. This provides another API resource to be handled by the k8s API server and managed by the operator we will deploy next. We strongly recommend **not** changing anything in this yaml file.

To apply it, run:

```sh
kubectl apply -f crd.yaml
```

You should receive the following response:

`customresourcedefinition.apiextensions.k8s.io/redisenterpriseclusters.app.redislabs.com     configured`

- [operator.yaml](https://raw.githubuser.com/RedisLabs/redis-enterprise-k8s-docs/master/operator.yaml)

Applying this yaml creates the operator deployment, which is responsible for managing the k8s deployment and lifecycle of a Redis Enterprise Cluster. Among many other responsibilities, it creates a [stateful set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) that runs the Redis Enterprise nodes (as pods).

Always make sure you have the latest [operator.yaml](https://raw.githubuser.com/RedisLabs/redis-enterprise-k8s-docs/master/operator.yaml). Alternatively, you can edit the following tag:
image:redislabs/operator:tag

To apply the operator.yaml, run:

```sh
kubectl apply -f operator.yaml
```

You should receive the following response:

`deployment.apps/redis-enterprise-operator created`

Now, run `kubectl get deployment` and verify that your redis-enterprise-operator deployment is running. A Typical response will look like this:

![getting-started-kubernetes-openshift-image2]( /images/rs/getting-started-kubernetes-openshift-image2.png )

- [redis-enterprise-cluster.yaml](https://raw.githubuser.com/RedisLabs/redis-enterprise-k8s-docs/master/redis-enterprise-cluster.yaml)
-->

- The [rec_rhel.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/rec_rhel.yaml) defines the configuration of the newly created resource: Redis Enterprise Cluster. You can rename the file to `your_cluster_name.yaml`, but it is not required.

    You can edit this yaml file for your requirements, but you can use the sample provided for testing, developement and quick start deployments. Here are the main fields you to review and edit:

    - name: “your_cluster_name” - For example “demo-cluster”
    - nodes: number_of_nodes_in_the_cluster - Must be an [uneven number of 3 or more](https://redis.com/redis-enterprise/technology/highly-available-redis/)
    - uiServiceType: service_type - Service type value can be either `ClusterIP` or `LoadBalancer`. This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/). The default is `ClusterIP`.

    - storageClassName: “gp2“ - This specifies the [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) used for the persistent disks in your nodes. For example, AWS uses “gp2” as a default, GKE uses “standard”, and Azure uses "default".

    - redisEnterpriseNodeResources: The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node.
    - limits – Specifies the maximum resources for a Redis node.
    - requests – Specifies the minimum resources for a Redis node.

        For example:

        ```sh
        limits
        cpu: “4000m”
        memory: 4Gi
        requests

        cpu: “4000m”
        memory: 4Gi
        ```

        The default is 4 cores (4000m) and 4GB (4Gi).

        {{< note >}}
[Resource limits should equal requests](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/topics.md#resource-limits-and-quotas).
        {{< /note >}}

        ```sh
        persistentSpec:
        storageClassName: “gp2“
        ```

    - redisEnterpriseImageSpec: This configuration controls the Redis Enterprise version used, and where it is fetched from. This is an optional field. The Operator automatically uses the matching RHEL image version for the release.

        ```sh
        imagePullPolicy: IfNotPresent
        repository: redislabs/redis
        versionTag: 6.0.20-97
        ```

        The version tag must be as it appears on your repository, such as on [DockerHub](https://hub.docker.com/r/redislabs/redis/).

## Step 4: Create your Cluster

After you set up the your_cluster_name yaml:

1. Apply it to create your Redis Enterprise Cluster:

    ```sh
    kubectl apply -f your_cluster_name.yaml
    ```

1. Run `kubectl get rec` and verify that creation succeeded. (`rec` is a shortcut for “RedisEnterpriseClusters”).

    The command returns a confirmation response such as:

    ```sh
    NAME AGE

    Your_cluster_name 17s
    ```

Your Cluster will be ready shortly, typically within a few minutes.

To check the cluster status, run:

```sh
kubectl get pod
```

You should receive a response similar to the following:

| NAME                             | READY | STATUS  | RESTARTS | AGE |
| -------------------------------- | ----- | ------- | -------- | --- |
| your_cluster_name-0              | 2/2   | Running | 0        | 1m  |
| your_cluster_name-1              | 2/2   | Running | 0        | 1m  |
| your_cluster_name-2              | 2/2   | Running | 0        | 1m  |
| your_cluster_name-controller-x-x | 1/1   | Running | 0        | 1m  |
| Redis-enterprise-operator-x-x    | 1/1   | Running | 0        | 5m  |

Next, create your databases.

## Step 5: Create a database

To create your database:

1. Apply port forwarding to your Cluster:

    ```sh
    kubectl port-forward your_cluster_name-0 8443:8443
    ```

    {{< note >}}
- your_cluster_name-0 is one of your cluster pods. Consider running the port-forward command in the background.
- The Openshift UI provides tools for creating additional routing options, including external routes. These are covered in [RedHat Openshift documentation](https://docs.openshift.com/container-platform/4.8/networking/ingress-operator.html).
    {{< /note >}}

    Next, create your database.

1. Open a browser window and navigate to the Redis Enterprise admin console at: `localhost:8443`

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. To get your password from the OpenShift management console, go `Resources > Secrets > your_cluster_name`, select your project name, and select **Reveal Secret**.

    {{< warning >}}
Do not change the default admin user password in the Redis Enterprise admin console.
Changing the admin password can cause unextpected results in your K8s deployment.
    {{< /warning >}}

    ![getting-started-kubernetes-openshift-image3]( /images/rs/getting-started-kubernetes-openshift-image3.png )

1. Continue with the [instructions to create your database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

{{< note >}}
To conduct the Ping test through Telnet, you can create a new route to the new database port as described above for the UI port. After you create your database, go to the Openshift management console, select your project name, and go to `Applications > Services`. Two new services are shown that represent the database along with their IP and port information, similar to the screenshot below.
{{< /note >}}

![getting-started-kubernetes-openshift-image6]( /images/rs/getting-started-kubernetes-openshift-image6.png )
