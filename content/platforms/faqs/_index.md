---
Title: FAQs
description:
weight: 100
alwaysopen: false
categories: ["Platforms"]
---
Here are some frequently asked questions about Redis Enterprise on integration platforms.

## RS on Kubernetes

{{%expand "What is an Operator?" %}}
An Operator is a [Kubernetes custom controller]( https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources#custom-controllers) which extends the native K8s API. Please refer to the article [Redis Enterprise K8s Operator-based deployments – Overview]({{< relref "/platforms/kubernetes/kubernetes-with-operator.md" >}}).
{{% /expand%}}

{{%expand "Does Redis Enterprise Operator support multiple clusters per namespace?" %}}
The Redis Enterprise Operator may only deploy a single Redis Enterprise Cluster per namespace. Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand%}}

{{%expand "Do I need to deploy a Redis Enterprise Operator per namespace?" %}}
Yes, one Operator per namespace, each managing a single Redis Enterprise Cluster.

Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand%}}

{{%expand "How can I see the CRDs (Custom Resource Definitions) created for my cluster?" %}}
Run the following:

```src
kubectl get rec
kubectl describe rec my-cluster-name
```

{{% /expand%}}

{{%expand "How can I change the cluster admin user password?" %}}
The cluster admin user password is created by the Operator during the deployment of the Redis Enterprise cluster and is stored in a Kubernetes secret.

{{% warning %}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
{{% /warning %}}

If you must use a different admin password, create an additional user with admin privileges and configure with the new password.

{{% /expand%}}

{{%expand "How is using Redis Enterprise Operator superior to using Helm Charts?" %}}
While Helm Charts help automate multi-resource deployments, they do not provide the lifecycle management and lack many of the benefits provided by the Operator:

- Operators are a K8s standards while Helm is a proprietary tool
    - Using Operators means the better packaging for different k8s deployments and distributions as Helm is not supported in a straightforward way everywhere
- Operators allow full control over the Redis Enterprise Cluster lifecycle
    - We’ve experienced difficulties managing state and lifecycle of the application through Helm as it essentially only allows to determine the resources being deployed, which is a problem when upgrading and evolve the Redis Enterprise Cluster settings
- Operators support advanced flows which would otherwise require using an additional 3rd party
{{% /expand%}}

{{%expand "How to connect to the Redis Enterprise Cluster UI?" %}}
Create a port forwarding rule to expose the cluster UI port. For example, when the default port 8443 is used, run:

```src
kubectl port-forward –namespace <namespace> service/<name>-cluster-ui 8443:8443
```

Connect to the UI by pointing your browser to `https://localhost:8443`
{{% /expand%}}

{{%expand "How should I size Redis Enterprise Cluster nodes?" %}}
For nodes hosting the Redis Enterprise Cluster statefulSet pods, please follow the guidelines provided for Redis Enterprise in the [hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

For additional information please also refer to [Kubernetes Operator Deployment – Persistent Volumes]({{< relref "/platforms/kubernetes/kubernetes-persistent-volumes.md" >}}).
{{% /expand%}}

{{%expand "How to retrieve the username/password for a Redis Enterprise Cluster?" %}}
The Redis Enterprise Cluster stores the username/password of the UI in a K8s secret.

To retrieve, first, find the secret by retrieving secrets and locating one of type Opaque with a name identical or containing your Redis Enterprise Cluster name.

For example, run:

```src
kubectl get secrets
```

A possible response may look like this:

| NAME | TYPE | DATA | AGE |
|------|------|------|-----|
| redis-enterprise-cluster | Opaque | 2 | 5d |

To retrieve the secret run:

```src
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

```src
echo "Q2h5N1BBY28=" | base64 –-decode
```

{{% warning %}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
{{% /warning %}}

{{% /expand%}}

{{%expand "How to retrieve the username/password for a Redis Enterprise Cluster through the OpenShift Console?" %}}
To retrieve your password, navigate to the OpenShift management console, select your project name, go to Resources->Secrets->your_cluster_name

Retrieve your password by selecting “Reveal Secret.”
![openshift-password-retrieval]( /images/rs/openshift-password-retrieval.png )

{{% warning %}}
Do not change the default admin user password in the Redis Enterprise web UI.
Changing the admin password impacts the proper operation of the K8s deployment.
{{% /warning %}}

{{% /expand%}}

{{%expand "What capabilities, privileges and permissions are defined by the Security Context Constraint (SCC) yaml and the Pod Security Policy (PSP) yaml?" %}}

The scc.yaml file is defined like this:

```yaml
kind: SecurityContextConstraints

apiVersion: v1

metadata:

name: redis-enterprise-scc

allowPrivilegedContainer: false

allowedCapabilities:

- SYS_RESOURCE

runAsUser:

type: RunAsAny

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
  allowPrivilegeEscalation: true
  allowedCapabilities:
    - SYS_RESOURCE
    - NET_RAW
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

The RLEC SCC definitions are only applied to the project namespace when you apply them to the namespace specific Service Account as described in the [OpenShift Getting Started Guide]({{< relref "/platforms/openshift/_index.md#step-3-prepare-your-yaml-files" >}}).

RLEC PSP definitions are controlled with role-based access control (RBAC).
A cluster role allowing the RLEC PSP is granted to the redis-enterprise-operator service account
and allows that account to create pods with the PSP shown above.
{{% /expand%}}

{{%expand "How do I apply a Redis Enterprise license with a Kubernetes secret?" %}}
A Redis Enterprise Cluster Kubernetes Operator deployment will have an Opaque Secret with the same name as the `cluster-name`. Running:

```src
$ kubectl get secret redis-enterprise -o yaml
```

Will produce a response like this for a cluster without a license applied:

```yaml
apiVersion: v1
data:
  license: ""
  password: ZVZWcUYxd2E=
  username: YWRtaW5AZXhhbXBsZS5jb20=
kind: Secret
metadata:
  creationTimestamp: "2019-07-25T07:14:50Z"
  labels:
    app: redis-enterprise
    redis.io/cluster: redis-enterprise
  name: redis-enterprise
  namespace: default
  ownerReferences:
  - apiVersion: app.redislabs.com/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: RedisEnterpriseCluster
    name: redis-enterprise
    uid: e2b349ce-aeab-11e9-80c8-31045af0004c
  resourceVersion: "23175356"
  selfLink: /api/v1/namespaces/default/secrets/redis-enterprise
  uid: e499c8b2-aeab-11e9-80c8-31045af0004c
type: Opaque
```

You can apply a licnese key received from Redis Labs by encoding it in base64 and patching the `cluster-name` Secret to place the encoded license in the license field.

Here's one way of accomplishing this:
1. Take the license key that is provided in the following form and paste it in a file we'll call license.key:

```src
----- LICENSE START -----
AMBAXiuGiMvKOnKAuuZSBVB3uR06mhsSrUWPNYFJbEcJVY00ULo+v+GRro8d
IYNEhpu9IB5fpbdBzO67HGHlhglHGLhgLHKGytYTbKUvoRSA5VVoyZhvHemz
PIGEwbCLtmSTQBnQs1re9hI2KhuznGtkmPkxEonteXmWwk8v3xVFtvo7wzIR
la9pzk7e3KYE2pBxzWfuS+7BN<MUOyuo89NBVVdX97PweZ4zM4DVUn/q/gM0
LWHW9W/DK7IPYpZDZTS0is2RURbYL7/WBSmoQCNEHhUI4RHiNUjKlkr4Pr5Q
6XjIFVYtxUbniYd2uGGzg3d22DnwzexQGaYBjMHB+g==
----- LICENSE END -----
```

1. Base64 encode and remove white spaces:

```src
cat license.key | base64 | tr -d " \t\n\r"
LS0tLS0gTElDRU5TRSBTVEFSVCAtLS0tLQpBTUJBWGl1R2lNdktPbktBdXVaU0JWQjN1UjA2bWhzU3JVV1BOWUZKYkVjSlZZMDBVTG8rditHUnJvOGQKSVlORWhwdTlJQjVmcGJkQnpPNjdIR0hsaGdsSEdMaGdMSEtHeXRZVGJLVXZvUlNBNVZWb3laaHZIZW16ClBJR0V3YkNMdG1TVFFCblFzMXJlOWhJMktodXpuR3RrbVBreEVvbnRlWG1Xd2s4djN4VkZ0dm83d3pJUgpsYTlwems3ZTNLWUUycEJ4eldmdVMrN0JOPE1VT3l1bzg5TkJWVmRYOTdQd2VaNHpNNERWVW4vcS9nTTAKTFdIVzlXL0RLN0lQWXBaRFpUUzBpczJSVVJiWUw3L1dCU21vUUNORUhoVUk0UkhpTlVqS2xrcjRQcjVRCjZYaklGVll0eFVibmlZZDJ1R0d6ZzNkMjJEbnd6ZXhRR2FZQmpNSEIrZz09Ci0tLS0tIExJQ0VOU0UgRU5EIC0tLS0tIAo=
```

1. Create a patch yaml file we'll call license.yaml and paste the license key in the license field under `data:` like this:

```src
data:
  license: LS0tLS0gTElDRU5TRSBTVEFSVCAtLS0tLQpBTUJBWGl1R2lNdktPbktBdXVaU0JWQjN1UjA2bWhzU3JVV1BOWUZKYkVjSlZZMDBVTG8rditHUnJvOGQKSVlORWhwdTlJQjVmcGJkQnpPNjdIR0hsaGdsSEdMaGdMSEtHeXRZVGJLVXZvUlNBNVZWb3laaHZIZW16ClBJR0V3YkNMdG1TVFFCblFzMXJlOWhJMktodXpuR3RrbVBreEVvbnRlWG1Xd2s4djN4VkZ0dm83d3pJUgpsYTlwems3ZTNLWUUycEJ4eldmdVMrN0JOPE1VT3l1bzg5TkJWVmRYOTdQd2VaNHpNNERWVW4vcS9nTTAKTFdIVzlXL0RLN0lQWXBaRFpUUzBpczJSVVJiWUw3L1dCU21vUUNORUhoVUk0UkhpTlVqS2xrcjRQcjVRCjZYaklGVll0eFVibmlZZDJ1R0d6ZzNkMjJEbnd6ZXhRR2FZQmpNSEIrZz09Ci0tLS0tIExJQ0VOU0UgRU5EIC0tLS0tIAo=
```

1. Patch the Secret like this:

```src
kubectl patch secret redis-enterprise --type merge --patch "$(cat license.yaml)"
secret/redis-enterprise patched
```

The same process can be followed for updating an expired license.

For more information see [Cluster License Keys documentation]({{< relref "/rs/administering/cluster-operations/settings/license-keys.md" >}})
{{% /expand%}}
