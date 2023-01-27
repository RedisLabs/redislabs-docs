---
Title: Deploy with Kubernetes
linkTitle: Kubernetes deployment
description: Explains how to run Redis Data Integration in a Kubernetes environment
weight: 30
alwaysopen: false
categories: ["redis-di"]
headerRange: "[2]"
aliases: 
---

When running Redis Data Integration in a [Kubernetes](https://kubernetes.io/) environment, we recommend creating a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) and adding the Redis Data Integration CLI as a pod in the cluster.

Throughout the document, the snippets make use of OpenShift's `oc` tool. All examples can be replaced with `kubectl` when working in a non-OpenShift environment.

## Prerequisites

- An existing Redis Enterprise cluster version >= 6.2.
- [RedisGears](https://redis.com/modules/redis-gears/) >= {{ site.redis_gears_min_version }} installed on the cluster. In case it's missing, follow [this guide](install-redis-gears.md) to install.
- A target Redis DB (can be added after installation).

## Install Redis Data Integration CLI

There are two options for installing the Redis Data Integration CLI in an Kubernetes environment:

- [Install Redis Data Integration CLI locally](#install-redis-data-integration-cli-locally)

- [Install Redis Data Integration CLI as a pod in Kubernetes cluster](#install-redis-data-integration-cli-on-kubernetes-cluster)

### Install Redis Data Integration CLI Locally

To install Redis Data Integration CLI locally, follow these steps:

- [Download Redis Data Integration CLI](../index.md#download-redis-data-integration-cli)
- [Install Redis Data Integration CLI](../index.md#install-redis-data-integration-cli)

## Create a New Redis Data Integration Instance

- Run:

  ```bash
  oc port-forward service/rec 9443:9443
  ```

  \*If the Redis Enterprise Cluster service is not named `rec` (the default), make sure to forward to the correct service name.

- Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

  ```bash
  redis-di create --cluster-host localhost --no-configure
  ```

- Next we need to run the command `port-forward` command to be able to connect to Redis Data Integration inside the Kubernetes cluster:

  ```bash
  oc port-forward <REDIS_DI_SERVICE_NAME> <REDIS_DI_PORT>:<REDIS_DI_PORT>
  ```

  Replace the values for the port-forward with the service name and port of the Redis Data Integration BDB that was created using the `create` command.

- Configure Redis Data Integration:

  ```bash
  redis-di configure
  ```

  You should get a message - "Successfully configured redis-di instance on port <REDIS_DI_PORT>"

The `create` command will create a BDB named `redis-di-1` in your cluster. You will need to use a privileged Redis Enterprise user that has the permissions to create a BDB and to register Gears recipes, to run it.

## Create Configuration File for Redis Data Integration

Run `redis-di scaffold <NAME> --db-type <{{ site.db_types }}>`.
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

Run `redis-di deploy` command to deploy the configuration in the `config.yaml` file to the remote Redis Data Integration instance.

For `config.yaml` reference [see complete settings](../reference/config-yaml-reference.md).

## Validate the Deploy

Run `redis-di status` to check the status of the installation.

## Install Redis Data Integration CLI on Kubernetes Cluster

### Create ConfigMap for Redis Data Integration

Edit the following to point to the correct Redis Target database settings:

```bash
cat << EOF > /tmp/redis-di-configmap.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-di-config
data:
  config.yaml: |
    connections:
      # Redis target DB connection details
      target:
        host: <REDIS_TARGET_DB_SERVICE_NAME>
        port: <REDIS_TARGET_DB_PORT>
        #password: <REDIS_TARGET_DB_PASSWORD>
        # In case of target DB password stored in a secret and mounted as an env variable
        # available to the Redis Enterprise Cluster pod
        #password: \${env:redis-target-password}
EOF
oc apply -f /tmp/redis-di-configmap.yml
```

For config.yaml reference [see complete settings](../reference/config-yaml-reference.md).

### Add CLI Pod

```bash
cat << EOF > /tmp/redis-di-cli-pod.yml
apiVersion: v1
kind: Pod
metadata:
  name: redis-di-cli
  labels:
    app: redis-di-cli
spec:
  containers:
    - name: redis-di-cli
      image: docker.io/redislabs/redis-di-cli
      volumeMounts:
      - name: config-volume
        mountPath: /app
  volumes:
    - name: config-volume
      configMap:
        name: redis-di-config
EOF
oc apply -f /tmp/redis-di-cli-pod.yml
```

To run the CLI commands, use:

```bash
oc exec -it pod/redis-di-cli -- redis-di
```

### Create new Redis Data Integration Instance

Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

```bash
oc exec -it pod/redis-di-cli -- redis-di create
```

The `create` command will create a BDB named `redis-di-1` in your cluster. You will need to use a privileged Redis Enterprise user that has the permissions to create a BDB and to register Gears recipes, to run it.

### Deploy Configuration

Run `deploy` command to deploy the configuration in the ConfigMap to the remote redis-di instance:

```bash
oc exec -it pod/redis-di-cli -- redis-di deploy
```

### Validate the Installation

Run `oc exec -it pod/redis-di-cli -- redis-di status` to check the status of the installation.

> Note that it is OK to see the warning of "No streams found" since we have not yet set up a Debezium source connector. We will do this in the next step.

## Install the Debezium Server

### Create a ConfigMap for Debezium Server

Create the following configmap. Replace the values for the debezium.sink with the service name and credentials of the Redis Data Integration BDB that was created using the `create` command. Note: make sure to reference the Service name that was created by the service rigger.

```bash
cat << EOF > /tmp/debezium-server-configmap.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: debezium-config
data:
  application.properties: |
    debezium.sink.type=redis
    debezium.sink.redis.address=<REDIS_DI_SERVICE_NAME>:<REDIS_DI_PORT>
    debezium.sink.redis.password=<REDIS_DI_PASSWORD>

    debezium.source.connector.class=io.debezium.connector.postgresql.PostgresConnector
    debezium.source.database.hostname=example-postgres
    debezium.source.database.port=5432
    debezium.source.database.user=postgres
    debezium.source.database.password=postgres
    debezium.source.database.dbname=postgres
    debezium.source.database.server.name=inventory
    debezium.source.include.schema.changes=false
    debezium.source.tombstones.on.delete=false
    debezium.source.offset.flush.interval.ms=1000
    debezium.source.include.schema.changes=false
    debezium.source.tombstones.on.delete=false
    debezium.source.database.history=io.debezium.server.redis.RedisDatabaseHistory
    debezium.source.offset.storage=io.debezium.server.redis.RedisOffsetBackingStore

    debezium.transforms=AddPrefix
    debezium.transforms.AddPrefix.type=org.apache.kafka.connect.transforms.RegexRouter
    debezium.transforms.AddPrefix.regex=.*
    debezium.transforms.AddPrefix.replacement=data:$0

    quarkus.log.level=INFO
    quarkus.log.console.json=false
    quarkus.http.port=8088
EOF
oc apply -f /tmp/debezium-server-configmap.yml
```

For a full list of configuration options and classname of each connector see the [Debezium documentation](https://debezium.io/documentation/reference/stable/connectors/)

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
oc apply -f /tmp/debezium-server-pod.yml
```

### Optional - Set Up an Example Database

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
oc apply -f /tmp/example-postgres.yml
```
