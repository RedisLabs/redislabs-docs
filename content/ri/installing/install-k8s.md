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

[Redis Enterprise Software for Kubernetes]({{<relref "/kubernetes/_index.md">}}) databases can be connected to a RedisInsight desktop client the same way as any other database. However, you can also install RedisInsight directly on your Kubernetes cluster with a deployment. You can also add an accompanying load balancer service, persistent storage, or both.

This deployment can be created with or without a load balancer service. To add persistent storage, create a PersistentVolumeClaim.

## Create a RedisInsight deployment

The example below is a RedisInsight deployment file without a persistent volume claim or accompanying service. You'll need to configure the following sections:

- **`metadata`:** Configure the deployment name (`metadata.name`) and label (`labels.app`).
- **`spec.replicas`:** Set the number replicas to 1. 
- **`..selector`:** The selector label (matchLabels.app`) determines which pods the deployment will manage. This must to match the pod template label (`spec.template.metadata.labels.app`).
- **`...template`:** Add a label to your pod template (`template.metadata.labels.app`). 
- **`...template.spec.volumes`:** Add an ephemeral storage volume to your pod template with an [`emptyDir` volume](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir).
- **`...template.spec.containers`**: Set the container name, image, and image pull policy for the pod template. The container name must be unique and compatible with your DNS labels.
- **`...containers.env`**: If you have a service named `redisinsight` to expose the deployment, you can manually override the service environnement variables.
- **`...containers.volumeMounts`:** Specify which pod volumes will mount into the container filesystem. Set `volumeMounts.name` to the same value as `spec.volumes.name`. 
- **`...containers.ports`:** Set the container's exposed port (`containerPort`) as `8001` and the protocol (`containerPort.protocol`) as `TCP`.
- **`...ports.livenessProbe`:** You can create a liveness probe to perform health checks on your container. Configure the exposed endpoint (`path`) and port (`port`) for your health checks. The liveness probe will run a number of seconds after container creation (`initialDelaySeconds`), run health checks regularly (`periodSeconds`), and restart the container after a certain amount of failures(`failureThreshold`).


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redisinsight
  labels:
    app: redisinsight 
spec:
  replicas: 1 
  selector:
    matchLabels:
      app: redisinsight 
  template: 
    metadata:
      labels:
        app: redisinsight 
    spec:
      volumes:
      - name: db
        emptyDir: {} 
      containers:
      - name:  redisinsight 
        image: redislabs/redisinsight:latest 
        imagePullPolicy: IfNotPresent 
        env:
          - name: REDISINSIGHT_HOST
            value: "0.0.0.0"
          - name: REDISINSIGHT_PORT
            value: "8001"
        volumeMounts:
        - name: db 
          mountPath: /db
        ports:
        - containerPort: 8001 
          protocol: TCP
        livenessProbe:
           httpGet:
              path : /healthcheck/ 
              port: 8001 
           initialDelaySeconds: 5 
           periodSeconds: 5 
           failureThreshold: 1
```

## Add a RedisInsight service

1. To expose your deployment, add a RedisInsight service to your `redisinsight.yaml` file.

    {{<warning>}} Avoid naming your service `redisinsight`; this will create conflicts environment variables in the RedisInsight application (`REDISINSIGHT_HOST` and `REDISINSIGHT_PORT`). {{</warning>}}

  ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: redisinsight-service     
    spec:
      type: LoadBalancer
      ports:
        - port: 80
          targetPort: 8001
      selector:
        app: redisinsight
  ```

1. Apply the file to create the RedisInsight deployment and service.

  ```sh
  kubectl apply -f redisinsight.yaml
  ```

1. Once the deployment and service are successfully applied and complete, access RedisInsight. You use the `<external-ip>` of the service you created to reach RedisInsight.

  ```sh
  $ kubectl get svc redisinsight-service
  NAME                   CLUSTER-IP       EXTERNAL-IP      PORT(S)         AGE
  redisinsight-service   <cluster-ip>     <external-ip>    80:32143/TCP    1m
  ```

## Create a `PersistentVolumeClaim`

For a deployment with persistent writeable volumes, you'll need to add a `PersistentVolumeClaim` to your `redisinsight.yaml` file. A few changes to the deployment are also necessary. The example below creates a persistent volume created from a volume claim template.

1. Make the following updates to your deployment spec:

  1. Set the replica strategy (spec.replicas.strategy) `Recreate`. This will avoid multiple pods trying to use the same volume.

    ```yaml
    strategy:
    type: Recreate
    ```
  
  1. In the `template.spec.volumes` section, replace the `emptyDir` volume with your persistent volume claim.
  
    ```yaml
    volumes:
        - name: db
          persistentVolumeClaim:
            claimName: redisinsight-pv-claim
    ```
  
  1. Add an  init container (`spec.initContainers`) to configure write access to the container.

    ```yaml
      initContainers:
        - name: init
          image: busybox
          command:
            - /bin/sh
            - '-c'
            - |
              chown -R 1001 /db
          resources: {}
          volumeMounts:
            - name: db
              mountPath: /db
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
    ```

1. Add the following persistent volume claim to your deployment file (`redisinsight.yaml`).

```yaml
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: redisinsight-pv-claim
  labels:
    app: redisinsight
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
  storageClassName: default
```

## Create a RedisInsight deployment and service

## More info

Below is an annotated YAML file that will create a RedisInsight
deployment and a service in a k8s cluster.

1. Create a new file redisinsight.yaml with the content below



2. Create the RedisInsight deployment and service

```sh
kubectl apply -f redisinsight.yaml
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





1. Create a new file `redisinsight.yaml` with the content below.

```yaml
# RedisInsight service with name 'redisinsight-service'

---

---


2. Create the RedisInsight deployment and service.

```sh
kubectl apply -f redisinsight.yaml
```

## Create the RedisInsight deployment without a service

Below is an annotated YAML file that will create a RedisInsight
deployment in a K8s cluster.

1. Create a new file redisinsight.yaml with the content below



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
