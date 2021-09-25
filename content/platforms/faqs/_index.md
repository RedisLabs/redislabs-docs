---
Title: Redis Enterprise on Kubernetes FAQs
linkTitle: FAQs
description:
weight: 100
alwaysopen: false
categories: ["Platforms"]
---
Here are some frequently asked questions about Redis Enterprise on integration platforms.

## What is an Operator?

An operator is a [Kubernetes custom controller](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources#custom-controllers) which extends the native K8s API. Refer to the article [Redis Enterprise K8s Operator-based deployments – Overview]({{< relref "/platforms/kubernetes/concepts/operator.md" >}}).

## Does Redis Enterprise operator support multiple RECs per namespace?

The Redis Enterprise operator may only deploy a single Redis Enterprise cluster (REC) per [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/). Each REC can run multiple databases while maintaining high capacity and performance.

## Do I need to deploy a Redis Enterprise operator per namespace?

Yes, one operator per namespace, each managing a single Redis Enterprise cluster.
Each REC can run multiple databases while maintaining high capacity and performance.

## How can I see the custom resource definitions (CRDs) created for my Redis Enterprise cluster?

Run the following:

```sh
kubectl get rec
kubectl describe rec <my-cluster-name>
```

## How can I change the Redis Enterprise cluster admin user password?

The cluster admin user password is created by the operator during the deployment of the Redis Enterprise cluster (REC) and is stored in a Kubernetes [secret](https://kubernetes.io/docs/concepts/configuration/secret/).

See [Manage REC credentials]({{< relref "/platforms/kubernetes/security/manage_REC_credentials">}}) for instructions on changing the admin password.

## How is using Redis Enterprise operator superior to using Helm charts?

While [Helm charts](https://helm.sh/docs/topics/charts/) help automate multi-resource deployments, they do not provide the lifecycle management and lack many of the benefits provided by the operator:

- Operators are a K8s standard, while Helm is a proprietary tool
    - Using operators means better packaging for different Kubernetes deployments and distributions, as Helm is not supported in a straightforward way everywhere
- Operators allow full control over the Redis Enterprise cluster lifecycle
    - We’ve experienced difficulties managing the state and lifecycle of the application through Helm, as it essentially only allows to determine the resources being deployed, which is a problem when upgrading and evolve the Redis Enterprise Cluster settings
- Operators support advanced flows which would otherwise require using an additional third party product

## How to connect to the Redis Enterprise cluster user interface

Create a [port forwarding](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#port-forward) rule to expose the cluster user interface (UI) port. For example, when the default port 8443 is used, run:

```sh
kubectl port-forward –namespace <namespace> service/<name>-cluster-ui 8443:8443
```

Connect to the UI by pointing your browser to `https://localhost:8443`

## How should I size Redis Enterprise cluster nodes?

For nodes hosting the Redis Enterprise cluster [statefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) [pods](https://kubernetes.io/docs/concepts/workloads/pods/), follow the guidelines provided for Redis Enterprise in the [hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

For additional information please also refer to [Kubernetes operator deployment – persistent volumes]({{< relref "/platforms/kubernetes/memory/persistent-volumes.md" >}}).

## How to retrieve the username/password for a Redis Enterprise Cluster?

The Redis Enterprise cluster stores the username/password of the UI in a K8s [secret](https://kubernetes.io/docs/concepts/configuration/secret/).

Find the secret by retrieving secrets and locating one of type [Opaque](https://kubernetes.io/docs/concepts/workloads/pods/) with a name identical or containing your Redis Enterprise cluster name.

For example, run:

```sh
kubectl get secrets
```

A possible response may look like this:

| NAME | TYPE | DATA | AGE |
|------|------|------|-----|
| redis-enterprise-cluster | Opaque | 2 | 5d |

To retrieve the secret run:

```sh
kubectl get secret redis-enterprise-cluster -o yaml
```

A possible response may look like this:

```yaml
apiVersion: v1
data:
  password: Q2h5N1BBY28=
  username: cmVkaXNsYWJzLnNi
kind: Secret
metadata:
  creationTimestamp: 2018-09-03T14:06:39Z
  labels:
   app: redis-enterprise
   redis.io/cluster: test
 name: redis-enterprise-cluster
 namespace: redis
 ownerReferences:
 – apiVersion: app.redislabs.com/v1alpha1
   blockOwnerDeletion: true
   controller: true
   kind: RedisEnterpriseCluster
   name: test
   uid: 8b247469-c715-11e8-a5d5-0a778671fc2e
 resourceVersion: “911969”
 selfLink: /api/v1/namespaces/redis/secrets/redis-enterprise-cluster
 uid: 8c4ff52e-c715-11e8-80f5-02cc4fca9682
type: Opaque
```

Next, decode, for example, the password field. Run:

```sh
echo "Q2h5N1BBY28=" | base64 –-decode
```


## How to retrieve the username/password for a Redis Enterprise Cluster through the OpenShift Console?

To retrieve your password, navigate to the OpenShift management console, select your project name, go to Resources->Secrets->your_cluster_name

Retrieve your password by selecting “Reveal Secret.”
![openshift-password-retrieval]( /images/rs/openshift-password-retrieval.png )


## What capabilities, privileges and permissions are defined by the Security Context Constraint (SCC) yaml and the Pod Security Policy (PSP) yaml?

The `scc.yaml` file is defined like this:

```yaml
kind: SecurityContextConstraints
apiVersion: security.openshift.io/v1
metadata:
  name: redis-enterprise-scc
allowPrivilegedContainer: false
allowedCapabilities:
  - SYS_RESOURCE
runAsUser:
  type: MustRunAs
  uid: 1001
FSGroup:
  type: MustRunAs
  ranges: 1001,1001
seLinuxContext:
  type: RunAsAny
```

([latest version on GitHub](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/scc.yaml))

The `psp.yaml` file is defined like this:

```yaml
apiVersion: extensions/v1beta1
kind: PodSecurityPolicy
metadata:
  name: redis-enterprise-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  allowedCapabilities:
    - SYS_RESOURCE
  runAsUser:
    rule: MustRunAsNonRoot
  fsGroup:
    rule: MustRunAs
    ranges:
    - min: 1001
      max: 1001
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  volumes:
    - '*'
```

([latest version on GitHub](https://raw.githubusercontent.com/RedisLabs/redis-enterprise-k8s-docs/master/psp.yaml))

The SYS_RESOURCE capability is required by the Redis Enterprise cluster (REC) container so that REC can set correct out of memory (OOM) scores to its processes inside the container.
Also, some of the REC services must be able to increase default resource limits, especially the number of open file descriptors.

While the REC container runs as user 1001, there are no limits currently set on users and user groups in the default scc.yaml file. The psp.yaml example defines the specific uid.

The REC SCC definitions are only applied to the project namespace when you apply them to the namespace specific Service Account as described in the [OpenShift CLI deployment article]({{< relref "/platforms/kubernetes/deployment/openshift/openshift-cli" >}}).

REC PSP definitions are controlled with role-based access control (RBAC).
A cluster role allowing the REC PSP is granted to the redis-enterprise-operator service account
and allows that account to create pods with the PSP shown above.

{{< note >}}
- Removing NET_RAW blocks 'ping' from being used on the solution containers.
- These changes were made as of release 5.4.6-1183 to better align the deployment with container and Kubernetes security best practices:
    - The NET_RAW capability requirement in PSP was removed.
    - The allowPrivilegeEscalation is set to 'false' by default.
{{< /note >}}
