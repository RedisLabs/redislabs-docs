---
Title: Managing databases in Kubernetes
description: The database controller provides the ability to create, manage,
  and use databases via a database custom resource.
weight: 35
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/concepts/kubernetes/k8s-operator-based-deployments
---
A database is created with a custom resource just like a cluster.
The database controller in the Redis Enterprise operator:

- Discovers the custom resource
- Makes sure that it is created on the referenced cluster
- Maintains parity between its specification and the database within the Redis Enterprise cluster

The custom resource defines the size and other facets of the desired database.
For example, a 1GB database can simply be created on the `rec` cluster with the resource:

```yaml
kind: RedisEnterpriseDatabase
metadata:
  name: smalldb
spec:
  memory: 1GB
  redisEnterpriseCluster:
    name: rec
```

The cluster is referenced by name in the `redisEnterpriseCluster` and must exist in the same namespace.
Then, the database is created when you apply the resource file (for example, `smalldb.yaml`):

```sh
kubectl apply -f smalldb.yaml
```

The database controller recognizes the new custom resource and validates the specification.
If the database specification is valid, the controller creates the database on the specified Redis Enterprise cluster.
The database is exposed with the same service mechanisms by the service rigger for the Redis Enterprise cluster.

## Database Lifecycle

### Creating databases

To create a database with the database controller:

1. Create a file called db.yaml that contains your database custom resource:

    ```YAML
    kind: RedisEnterpriseDatabase
    metadata:
      name: mydb
    spec:
      memory: 1GB
      redisEnterpriseCluster:
        name: rec
    ```

1. Apply the file to your namespace that contains your cluster and the operator:

    ```sh
    kubectl apply -f db.yaml
    ```

1. Check the status of your database:

    ```sh
    kubectl get redb/mydb -o yaml
    ```

    When the status is `active`, the database is ready to use.

{{% note %}}
The `jq` tool is useful for checking the status of the database using the JSON output:

```sh
kubectl get redb/mydb -o json | jq .status.status
```

This command returns only the status value.
{{% /note %}}


### Modifying databases

The custom resource defines the properties of the database.
To change the database, you can edit your original specification and apply the change or use `kubectl edit`.

To modify the database:

1. Edit the definition:

    ```sh
    kubectl edit redb/mydb
    ```

1. Change the specification (only properties in `spec` section) and save the changes.

1. Monitor the status to see when the changes take effect:

    ```sh
    kubectl get redb/mydb -o yaml
    ```

    When the status is `active`, the database is ready for use.

### Deleting databases

The database exists as long as the custom resource exists.
If you delete the custom resource, the database controller deletes the database.
The database controller removes the database from the cluster and its services.

To delete a database, run:

```sh
kubectl delete redb/mydb
```

## Connecting to Database

After the database controller creates a database, the services for accessing the database are created in the same namespace.
Connection information for the database is stored in a secret.
The name of that secret is stored in the specification or in the database custom resource.

This secret contains:

- The database port (port)
- The database service name (service_name)
- The database password for authenticating (password)

The database controller maintains these connection values in the secret.
An application can use this secret in a variety of ways.
A simple way is to map them to environment variables in a deployment pod.

For example, we can add the connection parameters as environment variables to deploy a guestbook demonstration application and have it connect to our database:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: guestbook
spec:
  replicas: 1
  selector:
    matchLabels:
      app: guestbook
      name: guestbook
  template:
    metadata:
      labels:
        app: guestbook
        name: guestbook
    spec:
      containers:
        - name: guestbook
          image: roeyredislabs/guestbook:latest
          imagePullPolicy: Always
          env:
          - name: REDIS_PORT
            valueFrom:
              secretKeyRef:
                name: redb-mydb
                key: port
          - name: REDIS_HOST
            valueFrom:
              secretKeyRef:
                name: redb-mydb
                key: service_name
          - name: REDIS_PASSWORD
            valueFrom:
              secretKeyRef:
                name: redb-mydb
                key: password
          ports:
            - name: guestbook
              containerPort: 80

```

Then, we can forward the application pod (the name is specific to your deployment):

```sh
kubectl port-forward guestbook-667fcbf6f6-gztjv 8080:80
```

Browse to `http://localhost:8080/` to view the demonstration.


## Options for Databases

The database options are specified in the `spec` section of the database custom resource.
These options include options that you can change and options that are created by the controller for applications or developers, for example database connection information stored in a secret.

### `databaseSecretName`

A string containing the name of a secret that contains the desired database password

The default value is the database name (metadata.name) with "redb-" as a prefix.

To create this secret, run:

```sh
 kubectl create secret generic mydb --from-literal=password=<password>
 ```

In the database custom resource, the value is secret name, for example `mydb`:

 ```yaml
 databaseSecretName: mydb
 ```

When the database is created, the secret is updated to include the port and service name for the database.

### `enforceClientAuthentication`

A boolean that indicates whether client authentication should be enforced (default: `true`)

### `evictionPolicy`

An [eviction policy](https://docs.redislabs.com/latest/rs/administering/database-operations/eviction-policy/) (default: `volitile-lru`)

### `memorySize`

The amount of memory to allocate that is at least 100MB, for example: 1GB, 250MB

### `persistence`

The [database persistence](https://docs.redislabs.com/latest/rs/concepts/data-access/persistence/) to setting

The value is a keyword with the values:

| Value | Description |
| ----- | ----------- |
| disabled | Data is not persisted (default) |
| AofEverySecond | Data is synced to disk every second |
| AofAlways | Data is synced to disk with every write. |
| SnapshotEveryHour | A snapshot of the database is created every hour |
| SnapshotEvery6Hour | A snapshot of the database is created every 6 hours. |
| SnapshotEvery12Hour | A snapshot of the database is created every 12 hours. |

### `rackAware`

A boolean that indicates whether the database is [rack-zone aware](https://docs.redislabs.com/latest/rs/concepts/high-availability/rack-zone-awareness/) (default: `false`)

### `redisEnterpriseCluster`

The name of the cluster to create the database on.

The value has a single `name` property.
For example, to refer to the `rec` cluster:

```YAML
redisEnterpriseCluster:
   name: rec
```

### `replication`

A boolean that indicates whether in-memory database replication is enabled (default: `false`)

When enabled, the database has a replica shard for every master.

### `sharedCount`

The number of database shards (default: `1`)

### `tlsMode`

Controls SSL authentication and encryption for connections to the database

| Value | Description |
| ----- | ----------- |
| disabled | no incoming connection to the Database uses SSL (default) |
| enabled | all incoming connections to the Database must use SSL. |
| replica_ssl | databases that replicate from this database must use SSL. |
