---
Title: Managing databases in Kubernetes
description: The database controller provides the ability to create, manage,
  and use databases via a database custom resource.
weight: 35
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/concepts/kubernetes/k8s-operator-based-deployments
---

## Overview

A database is created via a custom resource just like a cluster. The
Redis Enterprise operator database controller will discover the custom resource,
ensure its creation on the referenced cluster, and maintain parity between
its specification and the database within the Redis Enterprise cluster.

The custom resource defines the size and other facets of the desired database. For example,
a 1GB database can simply be created on the `rec` cluster by the follow resource:

```yaml
kind: RedisEnterpriseDatabase
metadata:
  name: smalldb
spec:
  memory: 1GB
  redisEnterpriseCluster:
    name: rec
```

The cluster is referenced by name in the `redisEnterpriseCluster` and must exist
in the same namespace.

The database can then be created by simply apply the resource file (e.g., `smalldb.yaml`):

```sh
kubectl apply -f smalldb.yaml
```

The database controller will recognize the new custom resource and validate the
specification. If the database specification is valid, the controller will
create the database on the specified Redis Enterprise cluster. Once
created, the database will be exposed via the same service mechanisms by
the service rigger for the Redis Enterprise cluster.

## Database lifecycle

### Creating databases

A database is created by creating a database custom resource in the same
namespace as your cluster. For example:

1. Create a file called db.yaml containing your database custom resource:

    ```YAML
    kind: RedisEnterpriseDatabase
    metadata:
      name: mydb
    spec:
      memory: 1GB
      redisEnterpriseCluster:
        name: rec
    ```

1. Apply the file to your namespace containing your cluster and the operator:

    ```sh
    kubectl apply -f db.yaml
    ```

1. Check for the status of your database:

    ```sh
    kubectl get redb/mydb -o yaml
    ```

    Once the status is `active`, the database is ready for use.

{{% note %}}
The `jq` tool is a useful tool for checking the status via the json output:

```sh
kubectl get redb/mydb -o json | jq .status.status
```

which will output the status value from all the JSON returned.

{{% /note %}}


### Modifying databases

A database is modified by changing the custom resource for the database. You
can simply edit your original specification and apply the change or use
kubectl edit:

1. Edit the definition:

    ```sh
    kubectl edit redb/mydb
    ```

2. Modify the specification (only properties in `spec` section) and save the changes.

3. Monitor the status to see when the changes become effective:

    ```sh
    kubectl get redb/mydb -o yaml
    ```

    Once the status is `active`, the database is again ready for use.

### Deleting databases

A database is deleted by deleting the custom resource for the database. The
database controller will remove the database from the cluster and the various
services will also be removed:

```sh
kubectl delete redb/mydb
```


## Connecting to database

Once a database is created via the database controller, the service are
created in the same namespace that can be used to access the database.
Connection information for the database is stored in a secret. The name of
that secret is stored specification or was specified as part of the
database custom resource.

This secret contains:

 * the database port (port)
 * the database service name (service_name)
 * the database password for authenticating (password)

The database controller maintains these connection values in the secret. An
application can use this secret in a variety of ways. A simple way is to map
them to environment variables in a deployment pod.

For example, we can setup a test pod to access a database `redb/mydb`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: database-client
spec:
  containers:
    - name: test-container
      image: redis
      command: [ "sleep" ]
      args: [ "300" ]
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
      - name: REDIS_AUTH
        valueFrom:
          secretKeyRef:
            name: redb-mydb
            key: password

```

Then we can connect to our database via exec:

```sh
kubectl exec -it database-client -- /bin/bash -c "redis-cli -h \$REDIS_HOST -p \$REDIS_PORT -a \$REDIS_AUTH"
```


## Options for databases

A database has some number of options that are allowed to be specified via the
the `spec` section of the database custom resource. Some of these options are
allowed to be changed by the user. Other options are created by the controller
and can be consumed by using applications or developers (e.g., database
connection information stored in a secret).

### `databaseSecretName`

A string containing the name of a secret that contains the desired database
password. If this is omitted, it will default to the database name
(metadata.name) prefixed with "redb-".

This secret can be created by:

```sh
 kubectl create secret generic mydb --from-literal=password=dbpasswd
 ```

 where "`dbpasswd`" is replaced by the desired password. In the database custom
 resource, the value is secret name (i.e., `mydb`):

 ```yaml
 databaseSecretName: mydb
 ```

 When the database is created, the secret will be updated to include the
 port and service name for the database.

### `enforceClientAuthentication`

A boolean indicating whether client authentication should be enforced. The
default is `true`.

### `evictionPolicy`

An eviction policy (see ["Eviction policies"](https://docs.redislabs.com/latest/rs/administering/database-operations/eviction-policy/)), defaults to `volitile-lru`.

### `memorySize`

The size of memory to allocate required with a minimum value of 100MB. Values
should be specified as 1GB, 250MB, etc.

### `persistence`

The database persistence to use (see ["Database Persistence with Redis Enterprise Software"](https://docs.redislabs.com/latest/rs/concepts/data-access/persistence/)).

The value is a keyword with the following values:

| Value | Description |
| ----- | ----------- |
| disabled | Data is not persisted (default) |
| AofEverySecond | Data is synced to disk every second |
| AofAlways | Data is synced to disk with every write. |
| SnapshotEveryHour | A snapshot of the database is created every hour |
| SnapshotEvery6Hour | A snapshot of the database is created every 6 hours. |
| SnapshotEvery12Hour | A snapshot of the database is created every 12 hours. |

### `rackAware`

A boolean indicating whether the database should be rack aware (see ["Rack-zone awareness in Redis Enterprise Software"](https://docs.redislabs.com/latest/rs/concepts/high-availability/rack-zone-awareness/)). The default is `false`.

### `redisEnterpriseCluster`

A reference to the cluster on which the database should exist. The value has a single
`name` property. For example, to refer to the `rec` cluster:

```YAML
redisEnterpriseCluster:
   name: rec
```

### `replication`

A boolean indicating whether in-memory database replication should be enabled. When enabled,
the database will have a replica shard for every master. The default is `false`.

### `sharedCount`

The number of database server shards, defaults to 1.

### `tlsMode`

Controls whether to require SSL authenticated and encrypted connections to the database.

| Value | Description |
| ----- | ----------- |
| disabled | no incoming connection to the Database should use SSL (default) |
| enabled | all incoming connections to the Database must use SSL. |
| replica_ssl | databases that replicate from this one need to use SSL. |
