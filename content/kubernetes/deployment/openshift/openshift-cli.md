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

## Prerequisites

1. An [OpenShift cluster installed](https://docs.openshift.com/container-platform/4.8/installing/index.html) at version 4.6 or higher, with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
1. The [kubectl package installed](https://kubernetes.io/docs/tasks/tools/install-kubectl/) at version 1.9 or higher
1. The [OpenShift cli installed](https://docs.openshift.com/container-platform/4.8/cli_reference/openshift_cli/getting-started-cli.html)



1. Create a new project.

    ``` oc new-project <project-name> ```

    To verify that you are using the newly created project, run:

        ```sh
        oc project <your project name>
         ```

1. Get deployment files by cloning the `redis-enterprise-k8s-docs` repository.

```sh
git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
```

## Step 3: Prepare your yaml files
 
1. Apply the file `scc.yaml` file.

 The scc ([Security Context Constraint](https://docs.openshift.com/container-platform/4.8/authentication/managing-security-context-constraints.html)) yaml defines security context constraints for the cluster for our project. We strongly recommend that you **not** change anything in this yaml file.


```sh
oc apply -f openshift/scc.yaml
```

    You should receive the following response:

    ```sh
    securitycontextconstraints.security.openshift.io “redis-enterprise-scc” configured
    ```

1. Provide the operator permissions for the pods.

    ```sh
    oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:<project-name>
    ```

    You can see the name of your project with `oc project`.

1. Deploy the OpenShift operator bundle.
    
    {{< warning >}}
    Changes to the `openshift.bundle.yaml` file can cause unexpected results.
    {{< /warning >}}

    ```sh
    oc apply -f openshift.bundle.yaml
    ```

1. Verify that your redis-enterprise-operator deployment is running, run:

    ```sh
    oc get deployment
    ```

    A typical response will look like this:

        ```sh
        NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
        redis-enterprise-operator   1/1     1            1           0m36s
        ```

1. Apply the RedisEnterpriseCluster resource file ([rec_rhel.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/rec_rhel.yaml)). You can rename the file to `your_cluster_name.yaml`, but it is not required.

    You can edit this yaml file for your requirements, but you can use the sample provided for testing, developement and quick start deployments. Here are the main fields you to review and edit:

## Step 4: Create your Cluster

After you set up the your_cluster_name yaml:

1. Apply it to create your Redis Enterprise Cluster:

    ```sh
    oc apply -f your_cluster_name.yaml
    ```
    
    Your Redis Enterprise Cluster (REC) will be ready shortly, typically within a few minutes.

1. Check the cluster status.

    ```sh
    kubectl get pod
    ```

    You should receive a response similar to the following:

    | NAME                             | READY | STATUS  | RESTARTS | AGE |
    | -------------------------------- | ----- | ------- | -------- | --- |
    | rec-name-0              | 2/2   | Running | 0        | 1m  |
    | rec-name-1              | 2/2   | Running | 0        | 1m  |
    | rec-name-2              | 2/2   | Running | 0        | 1m  |
    | rec-name-controller-x-x | 1/1   | Running | 0        | 1m  |
    | Redis-enterprise-operator-x-x    | 1/1   | Running | 0        | 5m  |

## Configure the admission controller

1. Check that the secret has been created.
   The operator creates a Kubernetes secret for the admission controller during deployment.  
      ```
      kubectl get secret admission-tls
      ```
    
          The response will be similar to this:
          ```
          NAME            TYPE     DATA   AGE
          admission-tls   Opaque   2      2m43s
          ```

## Create a Redis Enterprise database (REDB) custom resource.

1. Open a browser window and navigate to the Redis Enterprise admin console at: `localhost:8443`

    ![getting-started-kubernetes-openshift-image5]( /images/rs/getting-started-kubernetes-openshift-image5.png )

1. To get your password from the OpenShift management console, go `Workloads > Secrets > your_cluster_name`, select your project name, and select **Reveal Secret**.

    {{< warning >}}
Do not change the default admin user password in the Redis Enterprise admin console.
Changing the admin password can cause unextpected results in your K8s deployment.
    {{< /warning >}}

    ![getting-started-kubernetes-openshift-image3]( /images/rs/getting-started-kubernetes-openshift-image3.png )



![getting-started-kubernetes-openshift-image6]( /images/rs/getting-started-kubernetes-openshift-image6.png )
