---
Title: Manage Redis Enterprise databases on Kubernetes
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

See [Options for Redis Enterprise databases]({{< relref "content/platforms/kubernetes/reference/db-options.md" >}}) for additional database options and configuration.
