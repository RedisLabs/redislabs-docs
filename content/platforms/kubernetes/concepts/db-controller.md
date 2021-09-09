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
## Redis Enterprise database (REDB) lifecycle

A Redis Enterprise database (REDB) is created with a custom resource file. The custom resource defines the size, name, and other specifications for the REDB. The database is created when you apply the custom resource file.

The database controller in the Redis Enterprise operator:

- Discovers the custom resource
- Makes sure that it is created in the same namespace as the Redis Enterprise cluster (REC)
- Maintains consistency between the custom resource and the REDB

The database controller recognizes the new custom resource and validates the specification.
If valid, the controller combines the values specified in
the custom resource with default values to create a full specification. It then uses this full specification to create the
database on the specified Redis Enterprise cluster (REC).

Once the database is created, it is exposed with the same service mechanisms by the service rigger for the Redis Enterprise cluster.
If the database custom resource is deleted, the database and its services is deleted from the cluster.

### Create a database

Your Redis Enterprise database custom resource must be of the 'kind': 'RedisEnterpriseDatabase' and have values for 'name' and 'memorySize'. All other values are optional and will be defaults if not specified.

1. Create a file (in this example mydb.yaml) that contains your database custom resource.

    ```YAML
    kind: RedisEnterpriseDatabase
    metadata:
      name: mydb
    spec:
      memorySize: 1GB
    ```

    To create a REDB in a different namespace from your REC, you need to specify the cluster with `redisEnterpriseCluster` in the 'spec:' section of your RedisEnterpriseDatabase custom resource.
        ```
          redisEnterpriseCluster:
            name: rec
        ```

1. Apply the file in the namespace you want your database to be in.

    ```sh
    kubectl apply -f mydb.yaml
    ```

1. Check the status of your database.

    ```sh
    kubectl get redb mydb -o jsonpath="{.status.status}"
    ```

    When the status is `active`, the database is ready to use.

### Modify a database

The custom resource defines the properties of the database.
To change the database, you can edit your original specification and apply the change or use `kubectl edit`.

To modify the database:

1. Edit the definition:

    ```sh
    kubectl edit redb mydb
    ```

1. Change the specification (only properties in `spec` section) and save the changes.  
    For more details, see [RedisEnterpriseDatabaseSpec](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_database_api.md#redisenterprisedatabasespec) or [Options for Redis Enterprise databases]({{< relref "content/platforms/kubernetes/reference/db-options.md" >}}). 

1. Monitor the status to see when the changes take effect:

    ```sh
    kubectl get redb mydb -o jsonpath="{.status.status}"
    ```

    When the status is `active`, the database is ready for use.

### Delete a database

The database exists as long as the custom resource exists.
If you delete the custom resource, the database controller deletes the database.
The database controller removes the database and it's services from the cluster.

To delete a database, run:

```sh
kubectl delete redb mydb
```

## Connect to a database

After the database controller creates a database, the services for accessing the database are created in the same namespace. By default there are two services, one 'ClusterIP' service and one 'headless' service.  
Connection information for the database is stored in a Kubernetes [secret](https://kubernetes.io/docs/concepts/configuration/secret/) maintained by the database controller. This secret contains:

- The database port ('port')
- The database service name ('service_name')
- The database password for authenticating ('password')

The name of that secret is stored in the database custom resource.

1. Retrieve the secret name.

    ```sh
    kubectl get redb mydb -o jsonpath="{.spec.databaseSecretName}"
    ```

      The database secret name usually takes the form of 'redb-<database_name>', so in our example it will be 'redb-mydb'.

1. Retrieve the secret.

    ```sh
    kubectl get secret redb-mydb -o yaml
    ```

      Look in the 'data' section for the encoded password, port, and service name.

    ```yaml
    apiVersion: v1
    data:
      password: asdfghjkl=
      port: lkjhgf=
      service_name: zxcvbnmlkjhjgfdsa==
    kind: Secret
    metadata:
    ...
    ```

1. Decode the password, port, and service name.

    ```sh
    echo asdfghjkl= | base64 --decode
    echo lkjhgf= | base64 --decode
    echo zxcvbnmlkjhjgfdsa== | base64 --decode
    ```

1. Retrieve and decode the password.

    ```sh
    kubectl get secret redb-mydb -o jasonpath="{data.password}" | base64 --decode
    ```

1. Retrieve and decode the port number.

    ```sh
    kubectl get secret redb-mydb -o jasonpath="{data.port}" | base64 --decode
    ```

1. Retrieve and decode the service_name.

    ```sh
    kubectl get secret redb-mydb -o jasonpath="{data.service_name}" | base64 --decode
    ```

1. From a pod within your cluster, use `redis-cli` to connect to your database.

    ```sh
    redis-cli -h <service_name> -p <port>
    ```

1. Enter the password you retrieved from the secret.

    ```sh
    auth <password>
    ```

    You are now connected to your database!
