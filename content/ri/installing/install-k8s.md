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
This is an easy way to use RedisInsight with a [Redis Enterprise K8s deployment](https://github.com/RedisLabs/redis-enterprise-k8s-docs).

## Create the RedisInsight deployment and service

Below is an annotated YAML file that will create a RedisInsight
deployment and a service in a k8s cluster.

1. Create a new file redisinsight.yaml with the content below

```yaml
# RedisInsight service with name 'redisinsight-service'
apiVersion: v1
kind: Service
metadata:
  name: redisinsight-service       # name should not be 'redisinsight'
                                   # since the service creates
                                   # environment variables that
                                   # conflicts with redisinsight
                                   # application's environment
                                   # variables `REDISINSIGHT_HOST` and
                                   # `REDISINSIGHT_PORT`
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 8001
  selector:
    app: redisinsight
---
# RedisInsight deployment with name 'redisinsight'
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
        image: redislabs/redisinsight:1.7.0 #repo/image
        imagePullPolicy: IfNotPresent #Always pull image
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

2. Create the RedisInsight deployment and service

```sh
kubectl apply -f redisinsight.yaml
```

3. Once the deployment and service are successfully applied and complete, access RedisInsight. This can be accomplished by listing the using the `<external-ip>` of the service we created to reach redisinsight.

```sh
$ kubectl get svc redisinsight-service
NAME                   CLUSTER-IP       EXTERNAL-IP      PORT(S)         AGE
redisinsight-service   <cluster-ip>     <external-ip>    80:32143/TCP    1m
```

4. If you are using minikube, run `minikube list` to list the service and access RedisInsight at `http://<minikube-ip>:<minikube-service-port>`.
```
$ minikube list
|-------------|----------------------|--------------|---------------------------------------------|
|  NAMESPACE  |         NAME         | TARGET PORT  |           URL                               |
|-------------|----------------------|--------------|---------------------------------------------|
| default     | kubernetes           | No node port |                                             |
| default     | redisinsight-service |           80 | http://<minikube-ip>:<minikubeservice-port> |
| kube-system | kube-dns             | No node port |                                             |
|-------------|----------------------|--------------|---------------------------------------------|
```

## Create the RedisInsight deployment without a service.

Below is an annotated YAML file that will create a RedisInsight
deployment in a K8s cluster.

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
        image: redislabs/redisinsight:1.7.0 #repo/image
        imagePullPolicy: IfNotPresent #Always pull image
        env:
          # If there's a service named 'redisinsight' that exposes the
          # deployment, we manually set `REDISINSIGHT_HOST` and
          # `REDISINSIGHT_PORT` to override the service environment
          # variables.
          - name: REDISINSIGHT_HOST
            value: "0.0.0.0"
          - name: REDISINSIGHT_PORT
            value: "8001"
        volumeMounts:
        - name: db #Pod volumes to mount into the container's filesystem. Cannot be updated.
          mountPath: /db
        ports:
        - containerPort: 8001 #exposed conainer port and protocol
          protocol: TCP
        livenessProbe:
           httpGet:
              path : /healthcheck/ # exposed RI endpoint for healthcheck
              port: 8001 # exposed container port
           initialDelaySeconds: 5 # number of seconds to wait after the container starts to perform liveness probe
           periodSeconds: 5 # period in seconds after which liveness probe is performed
           failureThreshold: 1 # number of liveness probe failures after which container restarts
      volumes:
      - name: db
        emptyDir: {} # node-ephemeral volume https://kubernetes.io/docs/concepts/storage/volumes/#emptydir
```

2. Create the RedisInsight deployment

```sh
kubectl apply -f redisinsight.yaml
```

{{< note >}}
If the deployment will be exposed by a service whose name is 'redisinsight', set `REDISINSIGHT_HOST` and `REDISINSIGHT_PORT` environment variables to override the environment variables created by the service.
{{< /note >}}

3. Once the deployment has been successfully applied and the deployment complete, access RedisInsight. This can be accomplished by exposing the deployment as a K8s Service or by using port forwarding, as in the example below:

```sh
kubectl port-forward deployment/redisinsight 8001
```

Open your browser and point to <http://localhost:8001>
