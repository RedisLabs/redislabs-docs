---
Title: FAQs
description:
weight: 100
alwaysopen: false
categories: ["Platforms"]
---
Here are some frequently asked questions about Redis Enterprise on integration platforms.

## RS on Kubernetes

{{< expand-control >}}
{{% expand "What is an Operator?" %}}
An Operator is a [Kubernetes custom controller]( https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources#custom-controllers) which extends the native K8s API. Please refer to the article [Redis Enterprise K8s Operator-based deployments – Overview]({{< relref "/platforms/kubernetes/kubernetes-with-operator.md" >}}).
{{% /expand %}}

{{% expand "Does Redis Enterprise Operator support multiple clusters per namespace?" %}}
The Redis Enterprise Operator may only deploy a single Redis Enterprise Cluster per namespace. Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand %}}

{{% expand "Do I need to deploy a Redis Enterprise Operator per namespace?" %}}
Yes, one Operator per namespace, each managing a single Redis Enterprise Cluster.

Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand %}}

{{% expand "How can I see the CRDs (Custom Resource Definitions) created for my cluster?" %}}
Run the following:

```sh
kubectl get rec
kubectl describe rec my-cluster-name
```

{{% /expand %}}

{{% expand "How can I change the cluster admin user password?" %}}
The cluster admin user password is created by the Operator during the deployment of the Redis Enterprise cluster and is stored in a Kubernetes secret.

{{< warning >}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
{{< /warning >}}

If you must use a different admin password, create an additional user with admin privileges and configure with the new password.

{{% /expand %}}

{{% expand "How is using Redis Enterprise Operator superior to using Helm Charts?" %}}
While Helm Charts help automate multi-resource deployments, they do not provide the lifecycle management and lack many of the benefits provided by the Operator:

- Operators are a K8s standards while Helm is a proprietary tool
    - Using Operators means the better packaging for different Kubernetes deployments and distributions as Helm is not supported in a straightforward way everywhere
- Operators allow full control over the Redis Enterprise Cluster lifecycle
    - We’ve experienced difficulties managing state and lifecycle of the application through Helm as it essentially only allows to determine the resources being deployed, which is a problem when upgrading and evolve the Redis Enterprise Cluster settings
- Operators support advanced flows which would otherwise require using an additional 3rd party
{{% /expand %}}

{{% expand "How to connect to the Redis Enterprise Cluster UI?" %}}
Create a port forwarding rule to expose the cluster UI port. For example, when the default port 8443 is used, run:

```sh
kubectl port-forward –namespace <namespace> service/<name>-cluster-ui 8443:8443
```

Connect to the UI by pointing your browser to `https://localhost:8443`
{{% /expand %}}

{{% expand "How should I size Redis Enterprise Cluster nodes?" %}}
For nodes hosting the Redis Enterprise Cluster statefulSet pods, please follow the guidelines provided for Redis Enterprise in the [hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

For additional information please also refer to [Kubernetes Operator Deployment – Persistent Volumes]({{< relref "/platforms/kubernetes/kubernetes-persistent-volumes.md" >}}).
{{% /expand %}}

{{% expand "How to retrieve the username/password for a Redis Enterprise Cluster?" %}}
The Redis Enterprise Cluster stores the username/password of the UI in a K8s secret.

To retrieve, first, find the secret by retrieving secrets and locating one of type Opaque with a name identical or containing your Redis Enterprise Cluster name.

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

{{< warning >}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
{{< /warning >}}

{{% /expand %}}

{{% expand "How to retrieve the username/password for a Redis Enterprise Cluster through the OpenShift Console?" %}}
To retrieve your password, navigate to the OpenShift management console, select your project name, go to Resources->Secrets->your_cluster_name

Retrieve your password by selecting “Reveal Secret.”
![openshift-password-retrieval]( /images/rs/openshift-password-retrieval.png )

{{< warning >}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
{{< /warning >}}

{{% /expand %}}

{{% expand "What capabilities, privileges and permissions are defined by the Security Context Constraint (SCC) yaml and the Pod Security Policy (PSP) yaml?" %}}

The scc.yaml file is defined like this:

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

The psp.yaml file is defined like this:

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

The SYS_RESOURCE capability is required by the Redis Labs Enterprise Cluster (RLEC) container so that RLEC can set correct OOM scores to its processes inside the container.
Also, some of the RLEC services must be able to increase default resource limits, especially the number of open file descriptors.

While the RLEC container runs as user 1001, there are no limits currently set on users and user groups in the default scc.yaml file. The psp.yaml example defines the specific uid.

The RLEC SCC definitions are only applied to the project namespace when you apply them to the namespace specific Service Account as described in the [OpenShift Getting Started Guide]({{< relref "/platforms/openshift/getting-started-cli#step-3-prepare-your-yaml-files" >}}).

RLEC PSP definitions are controlled with role-based access control (RBAC).
A cluster role allowing the RLEC PSP is granted to the redis-enterprise-operator service account
and allows that account to create pods with the PSP shown above.

{{< note >}}
- Removing NET_RAW blocks 'ping' from being used on the solution containers.
- These changes were made as of release 5.4.6-1183 to better align the deployment with container and Kubernetes security best practices:
    - The NET_RAW capability requirement in PSP was removed.
    - The allowPrivilegeEscalation is set to 'false' by default.
{{< /note >}}

{{% /expand %}}

{{< /expand-control >}}
