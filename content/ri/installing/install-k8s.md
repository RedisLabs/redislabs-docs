---
Title: Installing RedisInsight on Kubernetes
date: 2018-06-05 03:49:29 +0530
weight: 40
categories: ["RI"]
path: install/k8s/
nextStep:
    Title: Activating RedisInsight
    href: /docs/install/activating/
aliases: /ri/install/install-k8s/
---
In this walkthrough, we will install RedisInsight on [Kubernetes](https://kubernetes.io/). 
This is an easy way to use RedisInsight with a [Redis Enteprise K8s deployment](https://github.com/RedisLabs/redis-enterprise-k8s-docs).

## Create the RedisInsight deployment

Below is an annotated yaml that will create a RedisInsight deployment in a K8s cluster.

1. Create a new file redisinsight.yaml with the content below

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redisinsight #deployment name
  labels:
    app: redisinsight #deployment label
spec:
  replicas: 1 #a single replica pod
  selector:
    matchLabels:
      app: redisinsight #which pods is the deployment managing, as defined by the pod template
  template: #pod template
    metadata:
      labels:
        app: redisinsight #label for pod/s
    spec:
      containers:
      - name:  redisinsight #Container name (DNS_LABEL, unique)
        image: redislabs/redisinsight #repo/image
        imagePullPolicy: Always #Always pull image
        volumeMounts:
        - name: db #Pod volumes to mount into the container's filesystem. Cannot be updated.
          mountPath: /db
        ports:
        - containerPort: 8001 #exposed conainer port and protocol
          protocol: TCP
      volumes:
      - name: db
        emptyDir: {} # node-ephemeral volume https://kubernetes.io/docs/concepts/storage/volumes/#emptydir
```

1. Create the RedisInsight deployment

```src
kubectl apply -f redisinsight.yaml
```

1. Once the deployment has been successfully applied and the deployment complete, access RedisInsight. This can be accomplished by exposing the deployment as a K8s Service or by using port forwarding, as in the example below:

```src
kubectl port-forward deployment/redisinsight 8001
```

Open your browser and point to http://localhost:8001
