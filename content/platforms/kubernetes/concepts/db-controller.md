---
Title: Managing Redis Enterprise databases on Kubernetes
linkTitle: Manage databases
description: This section describes how the database controller provides the ability to create, manage,
  and use databases via a database custom resource.
weight: 100
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/db-controller/
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
  memorySize: 1GB
  redisEnterpriseCluster:
    name: rec
```

The cluster is referenced by name in the `redisEnterpriseCluster` and must exist in the same namespace.
Then, the database is created when you apply the resource file (for example, `smalldb.yaml`):

```sh
kubectl apply -f smalldb.yaml
```

The database controller recognizes the new custom resource and validates the specification.
If the database specification is valid, the controller combines the values specified in
the custom resource with default values and uses the full specification to create the
database on the specified Redis Enterprise cluster.
This lets a user specify the minimum desired state.

Once the database is created, it is exposed with the same service mechanisms by the service rigger for the Redis Enterprise cluster.
If the database custom resource is deleted, the database is deleted from the cluster and its services are also deleted.

## Database lifecycle

### Creating databases

To create a database with the database controller:

1. Create a file called db.yaml that contains your database custom resource:

    ```YAML
    kind: RedisEnterpriseDatabase
    metadata:
      name: mydb
    spec:
      memorySize: 1GB
      redisEnterpriseCluster:
        name: rec
    ```

1. Apply the file to your namespace that contains your cluster and the operator:

    ```sh
    kubectl apply -f db.yaml
    ```

1. Check the status of your database:

    ```sh
    kubectl get redb/mydb -o jsonpath="{.status.status}"
    ```

    When the status is `active`, the database is ready to use.

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
    kubectl get redb/mydb -o jsonpath="{.status.status}"
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

## Connecting to databases

After the database controller creates a database, the services for accessing the database are created in the same namespace.
Connection information for the database is stored in a secret.
The name of that secret is stored in the database custom resource
 and can be retrieved (e.g., for redb/mydb) by :

```sh
kubectl get redb/mydb -o jsonpath="{.spec.databaseSecretName}"
```

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


## Options for databases

The database options are specified in the `spec` section of the database custom resource.
These options include options that you can change and options that are created by the controller for applications or developers. For example, the database connection information is stored in a secret.

### `databaseSecretName`

A string containing the name of a secret that contains the desired database password.

If you do not specify a secret name, a secret is created for you with the name
constructed from the database name (`metadata.name`) with "`redb-`" as a prefix.

If you specify a secret name, you must create the secret before you create the
database resource.

To create your own database password in the secret, run:

```sh
 kubectl create secret generic mydb --from-literal=password=<password>
 ```

where \<password> is your desired password in plain text.

In the database custom resource, the value is just secret name. In this example,
the name is `mydb`:

 ```yaml
 databaseSecretName: mydb
 ```

When the database is created, the secret is updated to include the port and service name for the database
but the password does not change. If you did not create the secret, it is
also updated with the generated database password.

### `enforceClientAuthentication`

A boolean that indicates whether [client authentication]({{< relref "/rs/security/tls-ssl.md">}}) should be enforced (default: `true`).

### `evictionPolicy`

An [eviction policy]({{< relref "/rs/administering/database-operations/eviction-policy.md">}}) (default: `volitile-lru`)

### `memorySize`

The amount of memory to allocate that is at least 100MB. Values are an integer
suffixed with a unit. For example, values like 1GB, 250MB, etc.

### `persistence`

The value for the [database persistence]({{< relref "/rs/concepts/data-access/persistence.md">}}) setting.

The value is a keyword with the values:

| Value | Description |
| ----- | ----------- |
| disabled | Data is not persisted (default) |
| aofEverySecond | Data is synced to disk every second |
| aofAlways | Data is synced to disk with every write. |
| snapshotEvery1Hour | A snapshot of the database is created every hour |
| snapshotEvery6Hour | A snapshot of the database is created every 6 hours. |
| snapshotEvery12Hour | A snapshot of the database is created every 12 hours. |

### `rackAware`

A boolean that indicates whether the database is [rack-zone aware]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md">}}) (default: the cluster setting)

### `redisEnterpriseCluster`

The name of the cluster to create the database on.

The value has a single `name` property.
For example, to refer to the `rec` cluster:

```YAML
redisEnterpriseCluster:
   name: rec
```

### `replication`

A boolean that indicates whether in-memory [database replication]({{< relref "/rs/concepts/high-availability/replication.md">}}) is enabled (default: `false`).

When enabled, the database has a replica shard for every master.

### `shardCount`

The number of [database shards]({{< relref "/rs/concepts/high-availability/clustering.md">}}) (default: `1`).

### `tlsMode`

Controls SSL [authentication and encryption]({{< relref "/rs/security/tls-ssl.md">}}) for connections to the database.

| Value | Description |
| ----- | ----------- |
| disabled | no incoming connection to the Database uses SSL (default) |
| enabled | all incoming connections to the Database must use SSL. |
| replica_ssl | databases that replicate from this database must use SSL. |
