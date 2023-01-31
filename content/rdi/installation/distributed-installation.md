---
Title: Distributed installation configuration
linkTitle: Distributed installation
description: Explains different distribution topologies and environments supported by Redis Data Integration.
weight: 20
alwaysopen: false
categories: ["redis-di"]
aliases: 
---
Redis Data Integration (RDI) supports and can be used in a variety of configuration environments.  

You can:

- Run `redis-di` on a [separate host](#separate-utility).
- Run Debezium Server separately from the [source database](#remote-source).
- Run Debezium Server separately from the [RDI instance](#remote-target).
- Store your RDI instance on a [different cluster](#separate-clusters) than your target database.

Here, you learn how to configure Debezium Server and RDI for ones of these environments.

## Run redis-di on a separate host {#separate-utility}

The `redis-di` utility is typically used by the Redis Data Integration administrator.  As a best practice, you should run the utility from a device different from the one hosting the cluster and the one hosting Debezium Server.

To do so:

- Copy the `application.properties` file to the host where the Debezium Server is running.
- Run the `docker` command while changing the [volume argument](https://docs.docker.com/engine/reference/commandline/run/) (`-v`) accordingly:

**Docker**

```bash
docker run -it --name debezium --network host \
    --privileged -v <PROPERTIES>:/debezium/conf debezium/server
```

Where `<PROPERTIES>` is a placeholder containing the absolute path to the [`application.properties`]({{<relref "rdi/reference/debezium/">}}) file.  

**Podman**

```bash
sudo podman run -it --rm --name debezium --network=host \
    --privileged -v <PROPERTIES>:/debezium/conf debezium/server
```

Where `<PROPERTIES>` is a placeholder containing the absolute path to the [`application.properties`]({{<relref "rdi/reference/debezium/">}}) file.  

When using Oracle as your source database, you may need install the [Oracle JBDC driver]({{<relref "rdi/installation/debezium-server-deployment#oracle">}}) separately.  (Debezium Server does not install this for you.)

## Run remotely from the source database {#remote-source}

While it is technically possible to run the [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html) on the same host as the source database, we  recommend against doing so:

- The database host often needs all available resources to process queries and otherwise support the source database.
- Database owners are not often allowed to install client applications on a database host server.

In these and and similar cases, it's necessary to install Debezium Server (and RDI) on separate hosts.

To run Debezium Server on a different host from the one containing the source database, update `application.properties` to point to the address of the source database host.

```properties
debezium.source.database.hostname=<SOURCE_HOST>
```

Where `<SOURCE_HOST>` is a placeholder containing either the IP address or the fully qualified domain name of the source database host.  

## Run remotely from Redis Data Integration {#remote-target}

To run Debezium Server separately from devices hosting the target database cluster and its nodes, update the `sink` section of `application.properties` to specify the location of the Redis Data Integration database instance.

```properties
debezium.sink.redis.address=<RDI_ENDPOINT>:<RDI_PORT>
```

Where:
> - `<RDI_ENDPOINT>` is the fully qualified domain of the RDI database instance endpoint
> - `<RDI_PORT>` is the port address of the RDI endpoint.  

## Store databases on separate clusters {#separate-clusters}

Redis Data Integration requires the [RedisGears module]({{<relref "rdi/installation/install-redisgears">}}).  

If you don't want to install this module on the server hosting your target database or you want to keep things separate for other reasons, update the RDI [configuration file]({{<relref "rdi/installation/install-redisgears">}}) (`config.yaml`) to specify the connection details of the target database.

```yaml
connections:
  # Redis target DB connection details
  target:
    host: <TARGET_HOST>
    port: <TARGET_PORT>
    password: <TARGET_PASSWORD>
```
Where:
> - `<TARGET_HOST>` is the fully qualified domain of the target database
> - `<TARGET_PORT>` is the port used to connect to the target database.  
> - `<TARGET_PASSWORD>` is the password authorizing the connection (when required).  