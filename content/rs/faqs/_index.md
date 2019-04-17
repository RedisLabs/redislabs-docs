---
Title: FAQs
description: 
weight: 70
alwaysopen: false
categories: ["RS"]
---
Here are some frequently asked questions about Redis Enterprise Software.

## Features and Terminology

<!-- Also in RC -->
{{% expand "What exactly is Redis Enterprise?" %}}
{{< embed-md "what-is-redis-enterprise.md"  >}}
{{% /expand %}}

{{%expand "Are you fully compatible with open source Redis?" %}}
{{< embed-md "compatible-with-oss.md"  >}}
{{% /expand %}}

{{%expand "Can I keep my data safe and always available?" %}}
Redis Enterprise Software offers a comprehensive suite of
high-availability provisions, including in-memory replication,
persistent storage, and backups.
{{% /expand%}}

{{%expand "What do you mean by the term Shard?" %}}
A shard is any type of provisioned Redis instance, such as a master
copy, slave copy, database shard that is part of a clustered database,
etc.
{{% /expand%}}

{{%expand "What client can I use to connect to the databases in Redis Enterprise?" %}}
Redis Enterprise works with all existing standard clients; it does not require you to use any special clients.
{{% /expand%}}

{{%expand "What am I allowed to do with the trial version?" %}}
You can use, experience and administer the full capabilities of Redis
Enterprise Software (RS), but you may not deploy it in a production
environment. In addition, the trial version allows a maximum of four
shards and is limited to thirty (30) days of use after initial
installation on the first server in the cluster. After the thirty day
trial, the cluster will shift to read-only status. The free version does
not provide the same support options as the paid version. Finally, no
SLA is provided with the trial version. To continue operation of the
cluster with full capabilities, you must purchase a [subscription
cluster key from Redis Labs](https://redislabs.com/pricing).
{{% /expand%}}

{{%expand "What are the Redis Enterprise Software (RS) payment schedule and terms?" %}}
Contact us at <sales@redislabs.com> to learn about RS pricing.
{{% /expand%}}

{{%expand "What client can I use to connect to the databases in Redis Enterprise Software?" %}}
Redis Enterprise Software (RS) works with any standard Redis client.
Use your existing Redis client and code, as they work directly against a
RS cluster. You point your existing standard Redis client and code
connection string at the RS cluster, then scale on the RS cluster as
you need.
{{% /expand%}}

## Technical Capabilities

<!-- Also in RC -->
{{%expand "How many Redis databases can I create and manage?" %}}
{{< embed-md "how-many-databases-software.md"  >}}
{{% /expand%}}

{{%expand "What happens when my database fills up?" %}}
As explained in the open source [Redis FAQ](http://redis.io/topics/faq),
under "What happens if Redis runs out of memory?":

<blockquote>...[you] can use the "maxmemory" option in the config file to put a
limit to the memory Redis can use. If this limit is reached Redis will
start to reply with an error to write commands (but will continue to
accept read-only commands), or you can configure it to evict keys when
the max memory limit is reached in the case you are using Redis for
caching.</blockquote>

You can set the **maxmemory** value of each Redis Enterprise Software database in
the management UI using the **Memory limit** property, as well as
configure an eviction policy by setting it to any of the standard Redis
behaviors, without interrupting database operations.
{{% /expand%}}

## RS on Kubernetes

{{%expand "What is an Operator?" %}}
An Operator is a [Kubernetes custom controller]( https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources#custom-controllers) which extends the native K8s API. Please refer to the article [Redis Enterprise K8s Operator-based deployments – Overview]({{< relref "/rs/concepts/kubernetes-architecture/k8s-operator-based-deployments.md" >}}).
{{% /expand%}}

{{%expand "Does Redis Enterprise Operator support multiple clusters per namespace?" %}}
The Redis Enterprise Operator may only deploy a single Redis Enterprise Cluster per namespace. Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand%}}

{{%expand "Do I need to deploy a Redis Enterprise Operator per namespace?" %}}
Yes, one Operator per namespace, each managing a single Redis Enterprise Cluster.

Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand%}}

{{%expand "How Can I see the CRDs (Custom Resource Definitions) created for my cluster?" %}}
Run the following:

```src
kubectl get rec
kubectl describe rec my-cluster-name
```
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
$ kubectl port-forward –namespace <namespace> service/<name>-cluster-ui 8443:8443
```
Connect to the UI by pointing your browser to `https://localhost:8443`
{{% /expand%}}

{{%expand "How should I size Redis Enterprise Cluster nodes?" %}}
For nodes hosting the Redis Enterprise Cluster statefulSet pods, please follow the guidelines provided for Redis Enterprise in the [hardware requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}).

For additional information please also refer to [Kubernetes Operator Deployment – Persistent Volumes]({{< relref "/rs/administering/kubernetes/kubernetes-operator-deployment-persistent-volumes.md" >}}).
{{% /expand%}}

{{%expand "How to retrieve the username/password for a Redis Enterprise Cluster?" %}}
The Redis Enterprise Cluster stores the username/password of the UI in a K8s secret.

To retrieve, first, find the secret by retrieving secrets and locating one of type Opaque with a name identical or containing your Redis Enterprise Cluster name.

For example, run:

```src
$ kubectl get secrets
```
A possible response may look like this:

| NAME | TYPE | DATA | AGE |
|------|------|------|-----|
| redis-enterprise-cluster | Opaque | 2 | 5d |

To retrieve the secret run:

```src
$ kubectl get secret redis-enterprise-cluster -o yaml
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
   $ echo "Q2h5N1BBY28=" | base64 –-decode
```

{{% /expand%}}

{{%expand "How to retrieve the username/password for a Redis Enterprise Cluster through the OpenShift Console?" %}}
To retrieve your password, navigate to the OpenShift management console, select your project name, go to Resources->Secrets->your_cluster_name

Retrieve your password by selecting “Reveal Secret.”
![openshift-password-retrieval]( /images/rs/openshift-password-retrieval.png )
{{% /expand%}}

{{%expand "What capabilities, privileges and permissions are defined by the Security Context Constraint (SCC) yaml?" %}}

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

The SYS_RESOURCE capability is required by the Redis Labs Enterprise Cluster (RLEC) container so that RLEC can set correct OOM scores to its processes inside the container.
Also, some of the RLEC services must be able to increase default resource limits, especially the number of open file descriptors.

While the RLEC container runs as user 1001, there are no limits currently set on users and user groups in the default scc.yaml file.

The RLEC SCC definitions are only applied to the project namespace when you apply them to the namespace specific Service Account as described in the [OpenShift Getting Started Guide]({{< relref "/rs/getting-started/k8s-openshift.md#step-3-prepare-your-yaml-files" >}}).

{{% /expand%}}
