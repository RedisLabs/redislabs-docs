---
Title: Install and set up
linkTitle: Install and set up
description: Shows how to install Redis Data Integration CLI and use it to create a new Redis Data Integration instance.
weight: 20
alwaysopen: false
categories: ["Connect"]
aliases: /connect/install/
         /connect/install.md
---

Redis Data Integration helps connect traditional relational database systems (RDBMS) to Redis Enterprise.  It does this by ingesting (_importing_) row-based data into a target Redis database.

{{<note>}}The features described here are currently in preview.  Behavior may change before general availability.  We recommend against using preview features in production environments.{{</note>}}

The Redis Data Integration command-line interface (CLI) helps you set up a new Redis Data Integration instance and configure the connections between your source data and Redis Enterprise.

The Redis Data Integration CLI requires network access to the Redis Enterprise cluster API; it uses port 9443 by default.

## Install Redis Data Integration CLI

Redis Data Integration provides a command-line interface (CLI) called `redis-di` to install and manage Redis Data integration.  The `redis-di` utility requires Python 3.7 or later.  

If your operating system relies on a different version of Python, we recommend installing the latest version of Python and using [virtual environments](https://docs.python.org/3/library/venv.html) to manage Python.

Specific steps vary according to your operating system and environment.  The general process is:

1.  Install or update to [Python 3.7 or later](https://www.python.org/downloads/)

1.  Set up and activate a new virtual environment for Redis Data Integration:

    ``` console
    python3 -m venv venv
    source venv/bin/activate
    ```

1.  Download the latest installation file for your operating system.

    Setup files are available at: 

    ``` console 
    https://qa-onprem.s3.amazonaws.com/redis-di/latest/
    ```
    
    The following operating systems are supported:

    | Operating system | Installation filename |
    |---|---|
    | Ubuntu v20.04 | [`redis-di-ubuntu20.04-latest.tar.gz`](https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-ubuntu20.04-latest.tar.gz) |
    | Ubuntu v18.04 | [`redis-di-ubuntu18.04-latest.tar.gz`](https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-ubuntu18.04-latest.tar.gz) |
    | Red Hat Enterprise Linux 8 (RHEL8) | [`redis-di-rhel8-latest.tar.gz`](https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-rhel8-latest.tar.gz) |
    | Red Hat Enterprise Linux 7 (RHEL7) |  [`redis-di-rhel7-latest.tar.gz`](https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-rhel7-latest.tar.gz) |

    Download your file to a local directory:

    ``` console
    wget <filename> -0 /tmp/redis-di.tar.gz
    ```
    
1.  Install Redis Data Integration CLI:

    ``` console
    pip3 install /tmp/redis-di.tar.gz
    ```

## Set up a Redis Data Integration instance

Once Redis Data Integration CLI is installed, you can use it to create a new Redis Data Integration instance.  Here's how:

1.  Verify prerequisites

    To set up a new Redis Data Integration instance, you need:

    - A Redis Enterprise cluster, v6.2 or later

    - [RedisGears](https://docs.redis.com/latest/modules/redisgears/) v1.2.4 or later must be installed on the cluster.

    - A target Redis database, which can be added after setting up Redis Connect

1.  Use Redis Data Integration CLI to create a new Redis Data Integration instance on your Redis Enterprise cluster:

    ``` console
    redis-di create
    ```

    This creates a database named `redis-di` in your cluster
    
    Your user account needs permission to create databases and to register RedisGears recipes

1.  Use the `scaffold` command to create the configuration files for your Redis Data Integration instance

    ``` console
    redis-di scaffold <PROJECT_NAME>
    ```

    This creates a directory in the current location; this directory contains the following files:

    ```bash
    ├── debezium
    │   └── application.properties
    └── config.yaml
    ```

1.  Update the configuration files

    1.  The Redis Data Integration configuration file (`config.yaml`) defines the connection between your source data and your Redis database 

        In `config.yaml`, update `connections.target` and other details to reflect your environment.  
    
        {{%expand "Sample configuration with comments"%}}
``` yaml
connections:
  # Redis target DB connection details
  target:
    host: <REDIS_TARGET_DB_HOST>
    port: <REDIS_TARGET_DB_PORT>
    password: <REDIS_TARGET_DB_PASSWORD>
    # In case of secured password
    #password: ${secrets:target-password}

    # TLS
    # Private key file to authenticate with
    key: /path/to/key
    # Client certificate file to authenticate with
    cert: /path/to/cert
    # CA certificate file to verify with
    cacert: /path/to/cacert
applier:
  # Interval (in seconds) on which to perform retry on failure (default: 5)
  on_failed_retry_interval: <RETRY_INTERVAL_IN_SEC>
  # The batch size on which data will be written to target (default: 100)
  batch: <BATCH_SIZE>
  # Interval (in ms) in which data will be written to target even if batch size was not reached (default: 100)
  duration: <DURATION_IN_MS>
```
        {{%/expand%}}
    
    1.  The Debezium Server configuration file (`application.properties`) configures the Debezium server for your instance  
    
        For help, see [Install Debezium Server](#install-debezium-server).

1.  Deploy Redis Data Integration configuration

    The `deploy` command deploys a Redis Data Integration configuration to your Redis database instance:

    ``` console
    redis-di deploy
    ```

    The Redis Data Integration configuration file is saved (_persisted_) to the cluster, which helps configure new shards and recover in the event of shard or node failure.

1.  Verify the install

    Use the `status` command to verify Redis Data Integration status.

    ``` console
    redis-di status
    ```

    You should receive a response similar to the following example:

    {{%expand "Example status response"%}}
``` console
Status of redis-di instance on localhost:12001

Target DB:
 host: localhost
 port: 12006

Streams:
WARNING - No streams found, check that your source is up and configured properly.

Applier:
 Version: 1.0.5b25

 Totals:
  Triggered: 0
  Success: 0
  Aborted: 0
  Failures: 0

 Performance statistics per batch (batch size: 100):
  Last run duration (ms): 0
  Average run duration (ms): 0
  Last estimated lag (ms): 0
  Average estimated lag (ms): 0
```
    {{%/expand%}}

    If you receive a `No streams found` error, make sure that the Debezium server is properly set up and connected to your source database.
    
    For help, see [Install Debezium Server](#install-debezium-server).

## Install Debezium Server

The following steps provide a high level overview to the Debezium setup process.  For a detailed look, see the [Debezium docs](https://debezium.io/documentation/).

1.  _(Optional)_ Set up an example database

    The Debezium project includes preconfigured examples for many relational databases.

    To set up a Postgres example database:

    ```bash
    docker run -it --name example-postgres 
       -e POSTGRES_USER=postgres 
       -e POSTGRES_PASSWORD=postgres 
       -p 5432:5432 debezium/example-postgres
    ```

1.  Configure Debezium Server application properties

    In your project directory, update the `debezium/application.properties` file to reflect your source database.

    The following example configures a Postgres database.
    {{%expand "Example Postgres database"%}}

``` console
debezium.sink.type=redis
debezium.sink.redis.address=localhost:12001
#debezium.sink.redis.password=<REDIS_CONNECT_PASSWORD>

debezium.source.connector.class=io.debezium.connector.postgresql.PostgresConnector
debezium.source.database.hostname=localhost
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
debezium.source.database.history.redis.address=${debezium.sink.redis.address}
#debezium.source.database.history.redis.password=${debezium.sink.redis.password}

debezium.transforms=AddPrefix
debezium.transforms.AddPrefix.type=org.apache.kafka.connect.transforms.RegexRouter
debezium.transforms.AddPrefix.regex=.*
debezium.transforms.AddPrefix.replacement=data:$0

quarkus.log.level=INFO
quarkus.log.console.json=false
```
    {{%/expand%}}

    For details about configuration options and classes for each connector, see the [Debezium connector reference](https://debezium.io/documentation/reference/stable/connectors/)

1.  Run Debezium Server

    From your Redis Data Integration configuration folder, run:

    - Docker

    ```bash
    docker run -it \
       --name debezium \
       --network host  \
       -v $PWD/debezium:/debezium/conf debezium/server
    ```

    - Podman

    ```bash
    sudo podman run -it --rm \
       --name debezium --network=host --privileged \
       -v $PWD/debezium:/debezium/conf debezium/server
    ```

## Resolve Debezium Oracle errors

If you are using Oracle as your source database, be aware that Debezium Server does _not_ include the Oracle Debezium Connector or the related JDBC driver.

As a result, Debezium fails with an error.  If this happens:

1.  Add the connector and the JDBC driver
2.  Restart Debezium Server

The following example shows one way to do this:

``` bash
mkdir oracle
DEBEZIUM_VERSION="1.9.2.Final" # change to the latest Debezium version
wget -P oracle https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc8/21.1.0.0/ojdbc8-21.1.0.0.jar https://repo1.maven.org/maven2/io/debezium/debezium-connector-oracle/${DEBEZIUM_VERSION}/debezium-connector-oracle-${DEBEZIUM_VERSION}.jar
docker cp oracle/. debezium:/debezium/lib
docker start debezium
```
