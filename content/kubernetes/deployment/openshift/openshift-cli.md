---
Title: Deployment with OpenShift CLI for Redis Enterprise Software on Kubernetes
linkTitle: OpenShift CLI
description: The Redis Enterprise operator and cluster can be installed via CLI tools
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

- [OpenShift cluster](https://docs.openshift.com/container-platform/4.8/installing/index.html) installed at version 4.6 or higher, with at least three nodes (each meeting the [minimum requirements for a development installation]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}))
- [kubectl tool](https://kubernetes.io/docs/tasks/tools/install-kubectl/)  installed at version 1.9 or higher
- [OpenShift CLI](https://docs.openshift.com/container-platform/4.8/cli_reference/openshift_cli/getting-started-cli.html) installed

## Deploy the operator

1. Create a new project.

    ```bash
    oc new-project <your-project-name> 
    ```

1. Verify that you are using the newly created project, run:

    ```bash
    oc project <your-project-name>
    ```

1. Get deployment files by cloning the `redis-enterprise-k8s-docs` repository.

    ```bash
    git clone https://github.com/RedisLabs/redis-enterprise-k8s-docs
    ```

1. Apply the file `scc.yaml` file.

     The scc ([Security Context Constraint](https://docs.openshift.com/container-platform/4.8/authentication/managing-security-context-constraints.html)) yaml defines security context constraints for the cluster for our project. We strongly recommend that you **not** change anything in this yaml file.

    ```bash
    oc apply -f openshift/scc.yaml
    ```

    You should receive the following response:

    ```bash
    oc adm policy add-scc-to-group redis-enterprise-scc  system:serviceaccounts:<project-name>
    ```

    You can see the name of your project with `oc project`.

1. Deploy the OpenShift operator bundle.

    {{< warning >}}Changes to the `openshift.bundle.yaml` file can cause unexpected results.{{< /warning >}}

    ```bash
    oc apply -f openshift.bundle.yaml
    ```

1. Verify that your redis-enterprise-operator deployment is running, run:

    ```bash
    oc get deployment
    ```

    A typical response will look like this:

    ```bash
    NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
    redis-enterprise-operator   1/1     1            1           0m36s
    ```

## Create your Redis Enterprise cluster (REC) custom resource

1. Apply the `RedisEnterpriseCluster` resource file ([rec_rhel.yaml](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/openshift/rec_rhel.yaml)).

    You can rename the file to `<your_cluster_name>.yaml`, but it is not required (the examples below will use `<rec_rhel>.yaml`). [Options for Redis Enterprise clusters]({{<relref "/kubernetes/reference/cluster-options.md">}}) has more info about the REC custom resource, or see the [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md) for a full list of options.

1. Apply the custom resource file to create your Redis Enterprise cluster.

    ```bash
    oc apply -f <rec_rhel>.yaml
    ```

    The operator typically creates the REC within a few minutes.

1. Check the cluster status

    ```bash
    kubectl get pod
    ```

    You should receive a response similar to the following:
    
    ```bash
    | NAME                             | READY | STATUS  | RESTARTS | AGE |
    | -------------------------------- | ----- | ------- | -------- | --- |
    | rec-name-0              | 2/2   | Running | 0        | 1m  |
    | rec-name-1              | 2/2   | Running | 0        | 1m  |
    | rec-name-2              | 2/2   | Running | 0        | 1m  |
    | rec-name-controller-x-x | 1/1   | Running | 0        | 1m  |
    | Redis-enterprise-operator-x-x    | 1/1   | Running | 0        | 5m  |
    ```

## Configure the admission controller

1. Check that the secret has been created.
   The operator creates a Kubernetes secret for the admission controller during deployment.

      ```bash
      kubectl get secret admission-tls
      ```

    The response will be similar to this:

    ```bash
    NAME            TYPE     DATA   AGE
    admission-tls   Opaque   2      2m43s
    ```

1. Save the automatically generated certificate to a local environment variable.

    ```bash
    CERT=`kubectl get secret admission-tls -o jsonpath='{.data.cert}'`
    ```

1. Create a patch file for the Kubernetes webhook.

    ```bash
    sed 's/NAMESPACE_OF_SERVICE_ACCOUNT/demo/g' admission/webhook.yaml | kubectl create -f -

    cat > modified-webhook.yaml <<EOF
    webhooks:
    - name: redb.admission.redislabs
      clientConfig:
        caBundle: $CERT
      admissionReviewVersions: ["v1beta1"]
    EOF
    ```

1. Patch the validating webhook with the certificate. 

    ```sh
    kubectl patch ValidatingWebhookConfiguration redb-admission --patch "$(cat modified-webhook.yaml)"
    ```

### Limit the webhook to relevant namespaces

If not limited, the webhook will intercept requests from all namespaces. If you have several REC objects in your Kubernetes cluster, you need to limit the webhook to the relevant namespaces. If you aren't using multiple namespaces, you can skip this step.

1. View your namespace YAML file to verify your namespace is labeled and the label is unique to this namespace (see example below).

    ```bash
    apiVersion: v1
    kind: Namespace
    metadata:
      labels:
        namespace-name: staging
    name: staging
    ```

1. Patch the webhook spec with the `namespaceSelector` field. 
    ```bash
    cat > modified-webhook.yaml <<EOF
    webhooks:
    - name: redb.admission.redislabs
      namespaceSelector:
        matchLabels:
          namespace-name: staging
    EOF

    ```

1. Apply the patch.

    ```bash
    kubectl patch ValidatingWebhookConfiguration redb-admission --patch "$(cat modified-webhook.yaml)"
    ```

### Verify the admission controller installation

1. Apply an invalid resource (provided below).

    This should force the admission controller to reject it. If it applies successfully, the admission controller is not installed correctly.

      ```bash
      $ kubectl apply -f - << EOF
      apiVersion: app.redislabs.com/v1alpha1
      kind: RedisEnterpriseDatabase
      metadata:
        name: redis-enterprise-database
      spec:
       evictionPolicy: illegal
      EOF
      ```


    You should see an error that the admission controller webhook `redb.admission.redislabs`.
  
    ```bash
    Error from server: error when creating "STDIN": admission webhook "redb.admission.redislabs" denied the request: eviction_policy: u'illegal' is not one of [u'volatile-lru', u'volatile-ttl', u'volatile-random', u'allkeys-lru', u'allkeys-random', u'noeviction', u'volatile-lfu', u'allkeys-lfu']
    ```

## Create a Redis Enterprise database (REDB) custom resource

The operator uses the instructions in the REDB custom resources to manage databases on the Redis enterprise cluster.

1. Create a `RedisEnterpriseDatabase` custom resource.

    We've provided an example below that will create a database for testing purposes. For production databases, see documentation for [creating a database]({{<relref "/kubernetes/re-databases/db-controller.md#create-a-database" >}}) and [database options]({[<relref "/kubernetes/reference/db-options.md">]}).

    Example:
      ```bash
      cat << EOF > /tmp/redis-enterprise-database.yml
      apiVersion: app.redislabs.com/v1alpha1
      kind: RedisEnterpriseDatabase
      metadata:
        name: redis-enterprise-database
      spec:
        memorySize: 100MB
      EOF
      ```

1. Apply the newly created REDB resource

    ```bash
    oc apply -f /tmp/redis-enterprise-database.yml
    ```

## More info

- [Options for Redis Enterprise clusters (REC)]({{<relref "/kubernetes/reference/cluster-options.md">}})
- [Redis Enterprise cluster API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md)
- [Options for Redis Enterprise databases (REDB)]({{<relref "/kubernetes/reference/db-options.md">}})
- [Redis Enterprise database API](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_database_api.md)

