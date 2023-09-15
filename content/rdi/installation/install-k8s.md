---
Title: Running on Kubernetes
linkTitle: Running on Kubernetes
description: Learn about running RDI on Kubernetes
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

When running Redis Data Integration in a [Kubernetes](https://kubernetes.io/) environment, we recommend creating a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) and adding the RDI CLI as a pod in the cluster.

Throughout the document, the snippets make use of the Kubernetes `kubectl` tool. All examples can be replaced with `oc` when working in an OpenShift environment.

## Prerequisites

- An existing Redis Enterprise cluster version >= 6.2.18
- [RedisGears](https://redis.com/modules/redis-gears/) {{<param rdi_redis_gears_current_version>}} installed on the cluster. In case it's missing, see [Install RedisGears for Redis Data Integration]({{<relref "/rdi/installation/install-redis-gears.md">}}) to install.
- A target Redis DB (can be added after installation).

> Note: The RedisGears binaries to install must match the base OS of Redis Enterprise containers. In case of [Rancher](https://www.rancher.com/), Redis Enterprise container base OS is Ubuntu 18.04. Use the following command to install RedisGears:

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu18.04-x86_64.1.2.6-withdeps.zip -o /tmp/redis-gears.zip
```

In case the wrong RedisGears binaries had been installed, use the following commands to fix it:

```bash
# Start port forwarding to the Redis Enterprise Cluster API
kubectl port-forward service/rec 9443:9443

# Find the uid of the RedisGears module
# Note: skip piping to the jq if it is not installed
curl -k -v -u "user:pwd" https://localhost:9443/v1/modules | jq '.[] | {module_name,uid,semantic_version}'

# Put the RedisGears module uid instead of <uid>
curl -k -s -u "user:pwd" -X DELETE https://localhost:9443/v2/modules/<uid>

# Install the correct version of the RedisGears module
curl -k -s -u "user:pwd" -F "module=@/tmp/redis-gears.zip" https://localhost:9443/v2/modules

# Check the version of the newly installed module
curl -k -v -u "user:pwd" https://localhost:9443/v1/modules | jq '.[] | {module_name,uid,semantic_version}'
```

## Install RDI CLI

There are two options for installing the RDI CLI in an Kubernetes environment:

- Install [RDI CLI]({{<relref "/rdi/installation/install-rdi-cli.md">}}) locally (**recommended**)

- [Install RDI CLI as a pod in Kubernetes cluster](#install-rdi-cli-on-kubernetes-cluster)

## Create a new RDI database

- Run:

  ```bash
  kubectl port-forward service/rec 9443:9443
  ```

  \*If the Redis Enterprise Cluster service is not named `rec` (the default), make sure to forward to the correct service name.

- Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

  ```bash
  redis-di create --cluster-host localhost --no-configure
  ```

- Next we need to run the command `port-forward` command to be able to connect to Redis Data Integration inside the Kubernetes cluster:

  ```bash
  kubectl port-forward service/<REDIS_DI_SERVICE_NAME> <REDIS_DI_PORT>:<REDIS_DI_PORT>
  ```

  Replace the values for the port-forward with the service name and port of the Redis Data Integration BDB that was created using the `create` command.

- Configure Redis Data Integration:

  ```bash
  redis-di configure
  ```

  You should get a message - "Successfully configured redis-di instance on port <REDIS_DI_PORT>"

The `create` command will create a BDB named `redis-di-1` in your cluster. You will need to use a privileged Redis Enterprise user that has the permissions to create a BDB and to register Gears recipes, to run it.

## Create configuration file for Redis Data Integration

Run `redis-di scaffold --db-type <{{param  rdi_db_types}}> --dir <PATH_TO_DIR>`.
Edit the file `config.yaml` which is located under the directory <NAME> to point to the correct Redis Target database settings:

```yaml
connections:
  # Redis target DB connection details
  target:
    host: <REDIS_TARGET_DB_SERVICE_NAME>
    port: <REDIS_TARGET_DB_PORT>
    #password: <REDIS_TARGET_DB_PASSWORD>
    # In case of target DB password stored in a secret and mounted as an env variable
    # available to the Redis Enterprise Cluster pod
    #password: ${env:redis-target-password}
```

Run `redis-di deploy` command to deploy the configuration in the `config.yaml` file to the remote RDI database.

For more information, see [`config.yaml` reference]({{<relref "/rdi/reference/config-yaml-reference">}}).

### Validate the deploy

Run `redis-di status` to check the status of the installation.

## Install RDI CLI on Kubernetes Cluster

### Add CLI deployment

```bash
cat << EOF > /tmp/redis-di-cli-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-di-cli
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis-di-cli
  template:
    metadata:
      labels:
        app: redis-di-cli
    spec:
      containers:
        - name: redis-di-cli
          image: docker.io/redislabs/redis-di-cli:latest
          volumeMounts:
          - name: config-volume
            mountPath: /app
          - name: jobs-volume
            mountPath: /app/jobs
      volumes:
        - name: config-volume
          configMap:
            name: redis-di-config
            optional: true
        - name: jobs-volume
          configMap:
            name: redis-di-jobs
            optional: true
EOF
kubectl apply -f /tmp/redis-di-cli-deployment.yml           
```

After creation of the deployment, the RDI CLI will be available as a pod in the cluster. It can be scaled down to 0 replicas when not in use or during maintenance. Use the following commands to scale down/up the deployment:

```bash
kubectl scale deployment.apps/redis-di-cli --replicas=0
kubectl scale deployment.apps/redis-di-cli --replicas=1
```

> Note: Before scaling down the deployment it is recommended to save the redis-di context for future use. To do this, run the following command:
>
> ```bash
> cat /root/.redis-di
> ```
>
> Copy the output of the command and save it in a local file. To use the context in the future, simply create the file `/root/.redis-di` and paste the content saved before. This is useful when the RDI CLI deployment is scaled up or upgraded to a new image.

To run the CLI commands, first look up the pod name:

```bash
kubectl get pods --selector=app=redis-di-cli
```

Then run the following command to get the list of available commands (make sure to replace the pod name with the correct one):

```bash
kubectl exec -it pod/redis-di-cli-<id> -- redis-di
# e.g. kubectl exec -it pod/redis-di-cli-68b4cfbfc4-7c6sm -- redis-di
```

### Create configuration file for Redis Data Integration

- Run the following command to create the configuration file for Redis Data Integration:

  ```bash
  kubectl exec -it pod/redis-di-cli-<id> -- redis-di scaffold --db-type <{{param  rdi_db_types}}> --preview config.yaml > config.yaml
  ```

- Edit the file `config.yaml` to point to the correct Redis Target database settings.

> For config.yaml reference [see complete settings](../reference/config-yaml-reference.md).

### Create ConfigMap for Redis Data Integration

Run the following command to create the ConfigMap for Redis Data Integration:

```bash
kubectl create configmap redis-di-config --from-file=config.yaml
```

### Create new RDI database

Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

```bash
kubectl exec -it pod/redis-di-cli-<id> -- redis-di create
```

The `create` command will create a BDB named `redis-di-1` in your cluster. You will need to use a privileged Redis Enterprise user that has the permissions to create a BDB and to register Gears recipes, to run it.

### Deploy configuration

Run `deploy` command to deploy the configuration in the ConfigMap to the remote redis-di instance:

```bash
kubectl exec -it pod/redis-di-cli-<id> -- redis-di deploy
```

> Read more about deploying data transformation jobs when the RDI CLI is deployed as a Kubernetes pod [here](../data-transformation-pipeline.md#deploy-configuration).

### Validate the installation

Run `kubectl exec -it pod/redis-di-cli-<id> -- redis-di status` to check the status of the installation.

> Note that it is OK to see the warning of "No streams found" since we have not yet set up a Debezium source connector. We will do this in the next step.

## Install the Debezium Server

### Create configuration file for Redis Data Integration

- Run the following command to create the configuration file for Debezium Server:

  ```bash
  kubectl exec -it pod/redis-di-cli-<id> -- redis-di scaffold --db-type <{{param  rdi_db_types}}> --preview debezium/application.properties > application.properties
  ```

- Edit the file `application.properties` and replace the values for the debezium.sink with the service name and credentials of the Redis Data Integration BDB that was created using the `create` command.
  > Note: make sure to reference the Service name that was created by the service rigger.

> For a full list of configuration options and classname of each connector see the [Debezium documentation](https://debezium.io/documentation/reference/stable/connectors/)

### Create a ConfigMap for Debezium Server

Run the following command to create the ConfigMap for Debezium Server:

```bash
kubectl create configmap debezium-config --from-file=application.properties
```

### Create the Debezium Server Pod

```bash
cat << EOF > /tmp/debezium-server-pod.yml
apiVersion: v1
kind: Pod
metadata:
  name: debezium-server
  labels:
    app: debezium-server
spec:
  containers:
    - name: debezium-server
      image: docker.io/debezium/server
      livenessProbe:
        httpGet:
            path: /q/health/live
            port: 8088
      readinessProbe:
        httpGet:
            path: /q/health/ready
            port: 8088
      volumeMounts:
      - name: config-volume
        mountPath: /debezium/conf
  volumes:
    - name: config-volume
      configMap:
        name: debezium-config
EOF
kubectl apply -f /tmp/debezium-server-pod.yml
```

### Optional: Set up an example database

The Debezium project has created preconfigured example databases for many relational database.

To set up a Postgres example database:

```bash
cat << EOF > /tmp/example-postgres.yml
apiVersion: v1
kind: Pod
metadata:
  name: example-postgres
  labels:
    app: postgres
spec:
  containers:
    - name: example-postgres
      image: docker.io/debezium/example-postgres
      ports:
      - containerPort: 5432
      env:
      - name: POSTGRES_USER
        value: "postgres"
      - name: POSTGRES_PASSWORD
        value: "postgres"

---

apiVersion: v1
kind: Service
metadata:
  name: example-postgres
  labels:
    app: postgres
spec:
  type: NodePort
  ports:
  - port: 5432
  selector:
    app: postgres
EOF
kubectl apply -f /tmp/example-postgres.yml
```
