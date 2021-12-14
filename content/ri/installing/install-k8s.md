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

The example below is a RedisInsight deployment file with one [replica](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment) and [ephemeral storage](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir). The following sections will show you how to add an accompanying service]({{<relref "/ri/installing/install-k8s.md#create-a-redisinsight-service">}}) or [persistent storage](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

Make sure to substitute your own values into your deployment file. Go to [kubernetes.io](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) for more information on deployments.

{{<note>}}If you have a service named `redisinsight` that exposes the deployment, it may cause environment variable conflicts with the RedisInsight software. You can manually override the service environnement variables (as seen in this example) or change the service name (as seen in the service example below).{{</note>}}

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

Apply the file to create the RedisInsight deployment.

   ```sh
   kubectl apply -f redisinsight.yaml
   ```

## Create a RedisInsight service

1. To expose your deployment, add a RedisInsight [service](https://kubernetes.io/docs/concepts/services-networking/service/) to your `redisinsight.yaml` file.

    {{<warning>}} Avoid naming your service `redisinsight`; this will create conflicts with environment variables in the RedisInsight application (`REDISINSIGHT_HOST` and `REDISINSIGHT_PORT`). {{</warning>}}

    ```yaml
    ---
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

## Create a persistent volume claim

For a deployment with persistent writeable volumes, add a [`PersistentVolumeClaim`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) to your `redisinsight.yaml` file. A few changes to the deployment are also necessary. The example below creates a persistent volume created from a volume claim template.

1. Make the following updates to your deployment spec:

    a. Set the strategy (`spec.strategy.type`) to [`Recreate`](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#recreate-deployment). This will avoid multiple pods trying to use the same volume.

      ```yaml
        strategy:
          type: Recreate
      ```
  
    b. In the `.template.spec.volumes` section, replace the `emptyDir` volume the name of your persistent volume claim.
  
      ```yaml
            volumes:
                - name: db
                  persistentVolumeClaim:
                    claimName: redisinsight-pv-claim
      ```

    c. Add a [security context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#configure-volume-permission-and-ownership-change-policy-for-pods) to the deployment pod template (`.template.spec`).

      ```yaml
            securityContext:
              runAsUser: 1000
              runAsGroup: 3000
              fsGroup: 2000
      ```

<!---
    c. Add an  init container (`spec.initContainers`) to configure write access to the container.

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
--->

2. Add the following [persistent volume claim](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#configure-volume-permission-and-ownership-change-policy-for-pods) to your deployment file (`redisinsight.yaml`).

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
      storageClassName: <your-preferred-storage-class>
    ```

3. Create the RedisInsight deployment and persistent volume claim.

    ```sh
    kubectl apply -f redisinsight.yaml
    ```

## Access RedisInsight

Once the deployment and service are successfully applied and complete (this may take a few minutes), access RedisInsight. You can do this in several ways:

- Use port forwarding and open your browser to <http://localhost:8001>.

    ```sh
    kubectl port-forward deployment/redisinsight 8001
    ```

- Use the `<external-ip>` of the service you created.

    ```sh
    $ kubectl get svc redisinsight-service
    NAME                   CLUSTER-IP       EXTERNAL-IP      PORT(S)         AGE
    redisinsight-service   <cluster-ip>     <external-ip>    80:32143/TCP    1m
    ```

- If you are using [minikube](https://minikube.sigs.k8s.io/docs/), you can run `minikube list` and access RedisInsight at `http://<minikube-ip>:<minikube-service-port>`.

    ```sh
    minikube list

   |-------------|----------------------|--------------|---------------------------------------------|
   |  NAMESPACE  |         NAME         | TARGET PORT  |           URL                               |
   |-------------|----------------------|--------------|---------------------------------------------|
   | default     | kubernetes           | No node port |                                             |
   | default     | redisinsight-service |           80 | http://<minikube-ip>:<minikubeservice-port> |
   | kube-system | kube-dns             | No node port |                                             |
   |-------------|----------------------|--------------|---------------------------------------------|
   ```
