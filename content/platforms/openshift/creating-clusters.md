---
Title: Creating Clusters and Databases
description: One the operator is installed, there are a variety of methods for
  installing a cluster via the CLI tools or directly through the OpenShift
  administration user interface. In both cases, the options for configuring a
  cluster within a CRD request are the same.
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/getting-started/getting-started-kubernetes/k8s-openshift/
---

## Prerequisites:

1. An [OpenShift cluster installed (3.x or 4.x)](https://docs.openshift.com/container-platform/3.11/welcome/index.html) with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. You have logged into your OpenShift account and kubectl has access to your cluster namespace for your project.

## Describing clusters

Various examples are available in the [GitHub project RedisLabs/redis-enterprise-k8s-docs](https://github.com/RedisLabs/redis-enterprise-k8s-docs). The examples may have version specific definitions. You should select the version
you desire by examining the [releases](https://github.com/RedisLabs/redis-enterprise-k8s-docs/releases).

You can retrieve the examples by:

1. Set the version. The latest release can be set via `curl` using the following:
    ```sh
    VERSION=`curl --silent https://api.github.com/repos/RedisLabs/redis-enterprise-k8s-docs/releases/latest | grep "tag_name" | sed -E 's/.*"([^"]+)".*/\1/'`
    ```

2. Clone the specific version:

    ```sh
    git clone --branch $VERSION https://github.com/RedisLabs/redis-enterprise-k8s-docs.git
    ```
The `crds` folder contains a number of examples that can be used as a starting point
for describing cluster deployments.

## Create a cluster via kubectl

### Step 1: Prepare your YAML files

A cluster is defined by a single CRD that defines the Redis Enterprise Cluster. The example [redis-enterprise-cluster_rhel yaml](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/openshift/redis-enterprise-cluster_rhel.yaml) is a starting point which
can be edited to specify your desired deployment.

Make a copy of this file (e.g. your_cluster_name.yaml) and modify it as needed
for your required use case. However, the
example provided can be used for test/dev and quick start purposes.

The main fields you may review and edit are:

 - `name`: “*your_cluster_name*”
 - `nodes`: *nnn*

    This [must be an odd number](https://redislabs.com/redis-enterprise/technology/highly-available-redis/) of at least 3 or greater.
 - `uiServiceType`: *service_type*

     The *service_type* must be either `ClusterIP` or `LoadBalancer`. This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/). The default is `ClusterIP`.

 - `storageClassName`: “*class_name*“

     The *class_name* specifies the [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) used for your nodes’ persistent disks. For example, AWS uses “gp2” as a default, GKE uses “standard” and Azure uses "default").

 - `redisEnterpriseNodeResources`:

     The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node.
 - `limits`:

     The max resources for a Redis node (similar to pod limits).

     For example:
     ```yaml
     limits:
       cpu: “4000m”
       memory: 4Gi
     ```

     The default (if unspecified) is 4 cores (4000m) and 4GB (4Gi).

 - `requests`:

     The minimum resources for a Redis node (similar to pod requests).

     For example:

     ```yaml
     requests:
       cpu: “4000m”
       memory: 4Gi
     ```

     The default (if unspecified) is 4 cores (4000m) and 4GB (4Gi).

     {{% note %}}
Resource limits should equal requests ([Learn why](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/topics.md#guaranteed-quality-of-service)).
     {{% /note %}}

 - `serviceBrokerSpec`:

     Enables and controls the service broker. The service broker is disabled by default.

     ```yaml
       enabled: true|false
       persistentSpec:
          storageClassName: "*class_name*"
     ```

 - `redisEnterpriseImageSpec`:

     This configuration controls the Redis Enterprise version used, and where it is fetched from. This is an optional field. The Operator will automatically use the matching RHEL image version for the release.

     The value is structured as follows with the [policy values from OpenShift](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/builds_and_image_streams.html#image-pull-policy):

     ```
     imagePullPolicy: IfNotPresent
     Repository: redislabs/redis
     versionTag: 5.2.10-22
     ```

     The version tag is as it appears on your repository (e.g., on [DockerHub](https://hub.docker.com/r/redislabs/redis/)).

### Step 2: Create your cluster

Once you have finished editing `your_cluster_name.yaml`, you need to apply it to create your Redis Enterprise Cluster:

```sh
kubectl apply -f your_cluster_name.yaml
```

Verify that creation was successful by getting the resource via kubectl (rec is a shortcut for “RedisEnterpriseClusters”):

```sh
kubectl get rec
```

You should receive a response similar to the following:

```src
NAME AGE

Your_cluster_name 17s
```

Your Cluster will be ready shortly, typically within a few minutes.

To check the cluster status, type the following:

```sh
kubectl get pod
```

You should receive a response similar to the following:

```text
NAME                                READY   STATUS    RESTARTS   AGE
your_cluster_name-0                 2/2     Running   0          1m
your_cluster_name-1                 2/2     Running   0          1m
your_cluster_name-2                 2/2     Running   0          1m
your_cluster_name-controller-x-x    1/1     Running   0          1m
Redis-enterprise-operator-x-x       1/1     Running   0          4h39m
```

Once all the pods are running you are ready to login to your cluster and
create databases.

## Accessing the UI

In order to create your database, you will need to log in to the
Redis Enterprise UI. This requires access to the Redis Enterprise running
in your namespace.

1. Use `kubectl` to forward the UI port for your Cluster:

    ```sh
    kubectl port-forward your_cluster_name-0 8443:8443
    ```

    {{% note %}}
- your_cluster_name-0 is one of your cluster pods. You may consider running the port-forward command in the background.
- The Openshift UI provides tools for creating additional routing options, including external routes. These are covered in [RedHat Openshift documentation](https://docs.openshift.com/container-platform/3.11/dev_guide/routes.html).
    {{% /note %}}

1. Open a browser window and navigate to localhost:8443

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. To retrieve your password, navigate to the OpenShift management console, select your project name, go to *Resources-\>Secrets-\>your_cluster_name* and reveal your password by selecting **Reveal Secret**.

    {{% warning %}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
    {{% /warning %}}

    ![getting-started-kubernetes-openshift-image3]( /images/rs/getting-started-kubernetes-openshift-image3.png )
1. The secret is your password to your cluster. Use the value to log in to your cluster.

## Create a database

Once you have access to the Redis Enterprise UI, the [process for creating
a database]({{< relref "/rs/administering/database-operations/creating-database.md" >}}) is the same
as other Redis Enterprise deployments.

When a database is created, the operator will create a new service in your namespace
that applications can access.

## Ping Test
In order to conduct the Ping test through Telnet, you can create a new route to the newly created database port in the same way as described above for the UI port. After you create your database, go to the Openshift management console, select your project name and go to Applications-\>Services. You will see two newly created services representing the database along with their IP and port information, similar to the screenshot below.

![getting-started-kubernetes-openshift-image6]( /images/rs/getting-started-kubernetes-openshift-image6.png )
