---
Title: Troubleshoot and resolve common problems
linkTitle: Troubleshooting
description: Resolve common Redis Data integration problems
weight: 50
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Learn how to diagnose common problems during installation and runtime of Redis Data Integration.

## Problems during installation

### Problems with pip

We have seen problems with using the [pip](https://pypi.org/project/pip/) installation due to the following reasons:

- **Wrong Python 3 Version**

  In many Linux distros the Python 3 version is still 3.6.\*. You can check this by running: `python --version`.

- **More than one Python 3 Installed**

  To solve this problem, create a Python virtual environment (venv) specifying
  the path to the right Python 3 installation for example `<PATH>/python3.8 -m venv <VENV-NAME>`. If you are not sure about the path run `which python3` and copy the path pointing to a Python installation with a version greater than `3.6`.

- **Outdated Pip Version**

  Some old pip versions will have problems with the wheel filename. It is best to update pip as well. In you `venv` run `pip install --upgrade pip`.

- **Old RDI CLI Libraries from Previous Installations**

  Sometimes RDI CLI libraries or its dependencies are already installed and they need an upgrade to get the latest version:

  ```bash
  # outputs the list of installed packages
  pip freeze > requirements.txt

  # updates all packages
  pip install -r requirements.txt --upgrade
  ```

### Problems with `create` command

The following problems can occur when running the `create` command:

- **No network access to Redis Enterprise API**
  - Verify your CLI host can indeed resolve the DNS entry you use (if applicable) `dig <HOSTNAME>`.
  - Verify you have access to the specified ip:port `telnet <IP ADDRESS OF SERVER PC> <PORT>`.
- **Using a Redis Enterprise user with the wrong role**

  User must have roles of either `DB Member`, `Cluster Member` or `Admin`.

- **Trying to connect to the Redis Data Integration DB without an Ingress Controller path**

  When running Redis Enterprise on Kubernetes, each Redis DB has a service that is created only after the DB had been created. In order to connect with the CLI from outside of Kubernetes and configure the Redis Data Integration DB, you need an `Ingress` resource for your Redis Data Integration database and `Ingress Controller` running on the Kubernetes cluster.

  A Kubernetes `Service` and `Ingress` are mutually exclusive. So if your database has a `Service` you should remove it and add an `Ingress` resource. Read [Kubernetes docs](https://kubernetes.io/docs/concepts/services-networking/ingress/) for more information.
  **Alternatively, Just run the CLI withing the Kubernetes cluster as described [here](../installation/install-k8s.md).**

## Problems running Debezium

Set the log level to `DEBUG` to get more detailed activity that would be useful in diagnosing unexpected behavior.

In `application.properties` configuration file, change/add:

```properties
quarkus.log.level=DEBUG
```

The most common problems with running Debezium Server are either:

- **Debezium Failing to Reach the Configuration File**

  The error message for this one is not clear and typically Debezium reports it couldn't find the first element in the configuration file. Usually it implies that there is no `application.properties` file in `$PWD/debezium`. Make sure you run the `docker run` command from the right directory.

- **Debezium Failing to Reach the Source Database**

  The error message is not obvious again. It will typically report a problem reading the binary log of the source database. There are several potential reasons here:

  - The database is configured not to get external connections - consult the specific Debezium database documentation:
    - [MySQL/MariaDB](https://debezium.io/documentation/reference/stable/connectors/mysql.html#setting-up-mysql)
    - [Oracle](https://debezium.io/documentation/reference/stable/connectors/oracle.html#setting-up-oracle)
    - [PostgreSQL](https://debezium.io/documentation/reference/stable/connectors/postgresql.html#setting-up-postgresql)
    - [SQL Server](https://debezium.io/documentation/reference/stable/connectors/sqlserver.html#setting-up-sqlserver)
  - There is a local firewall on the Debezium/Database host or a firewall rule on the subnet. Because you can not run `telnet <DB_HOST> <DB_PORT>` from the Debezium container, run it from the host. Check the following links to learn how to open different databases to external connection:
    - [MySQL/MariaDB](https://www.digitalocean.com/community/tutorials/how-to-allow-remote-access-to-mysql)
    - [Oracle](https://docs.oracle.com/cd/E17781_01/server.112/e18804/network.htm#ADMQS156)
    - [PostgreSQL](https://tecadmin.net/postgresql-allow-remote-connections/)
    - [SQL Server](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-remote-access-server-configuration-option?view=sql-server-ver16)

- **Handling Debezium Container Crash**

  The Debezium Server is stateless. In case it crashed, you can always remove it safely and run a new one using a fixed `application.properties` file:

  - Check the status of Debezium Server container:

    run `docker ps -a` to show all existing containers on the host.

  - If there is a Debezium Server container that has exited, you can remove it using `docker rm -f <DEBEZIUM_CONTAINER_ID>`.

- **Stopping and Starting Debezium Server**

  In case you want to fix something in the Debezium Server configuration and Debezium Server is still running:

  - Use `docker stop <DEBEZIUM_CONTAINER_NAME>`.
  - You can start it later using `docker start <DEBEZIUM_CONTAINER_NAME>`. If you want the container to be attached to the terminal, run it with `--attach`.

## Getting Debezium server logs

### Containerized deployment

- To follow the Debezium Server log output, run:

  ```bash
  docker logs <DEBEZIUM_CONTAINER_NAME> --follow
  ```

- To get the last <COUNT\> lines of the Debezium Server log, run:

  ```bash
  docker logs <DEBEZIUM_CONTAINER_NAME> -n <COUNT>
  ```

- To get the log messages generated after a given timestamp, run:

  ```bash
  docker logs <DEBEZIUM_CONTAINER_NAME> --since <TIMESTAMP>
  ```

- To get the log messages issued before a given timestamp, run:

  ```bash
  docker logs <DEBEZIUM_CONTAINER_NAME> --until <TIMESTAMP>
  ```

> Note: For the format of the <TIMESTAMP\> argument, please refer to [docker logs documentation](https://docs.docker.com/engine/reference/commandline/logs/).

#### Examples

- Get the log messages generated after `2023-01-23T10:10:27Z`:

  ```bash
  docker logs --since 2023-01-23T10:10:27Z <DEBEZIUM_CONTAINER_NAME>
  ```

- Get the log messages generated before
  `2023-01-23T12:55:37Z`:

  ```bash
  docker logs --until  2023-01-23T12:55:37Z <DEBEZIUM_CONTAINER_NAME>
  ```

- Get the log messages generated in the last `50` minutes:

  ```bash
  docker logs --since=50m <DEBEZIUM_CONTAINER_NAME>
  ```

### Redirecting output to a file

If you want to save the log output in a file, add `| tee <LOG_FILE_PATH>` to the docker logs command, as in this example:

```bash
docker logs <DEBEZIUM_CONTAINER_NAME> -n 10 | tee /home/debezium-server/logs/debezium.log
```

> The last 10 lines of the Debezium Server log will be redirected to the stdout and to the file `/home/debezium-server/logs/debezium.log`.

## Problems with processing change events from Debezium

If change events are rejected by RDI, or if records aren't transformed as expected, you can run the [`redis-di trace`]({{<relref "/rdi/reference/cli/redis-di-trace">}}) command to find more details. The command puts RDI in `trace` mode for a specified time (default 20 seconds) and/or a maximum number of traced change records per shard. Detailed information about change events is displayed on standard output.

The example below walks through the typical output structure for a change event:

```shell
employee:EmployeeId:302 2023-02-02 14:48:56.483 (+0ms) event performed in source database
employee:EmployeeId:302 2023-02-02 14:48:56.686 (+203ms) event received by collector
```

This is the notification of a change event record received by a stream in the RDI database. It records the elapsed time from when the change event occurred in the source database to when the change event record was received by the Debezium Server connector, in this example 203ms.

The event data received is a collector record with the following structure:

```shell
{'key': '{
    "schema": {
        "type": "struct",
        "fields": [
           ... 
        ],
        "optional": false,
        "name": "chinook.public.Employee.Key"
    },
    "payload": {
        "EmployeeId": 302
    }
}', 'value': '{
    "schema": {
        "type": "struct",
        "fields": [
           ...
        ],
        "optional": false,
        "name": "chinook.public.Employee.Envelope",
        "version": 1
    },
    "payload": {
        "before": null,
        "after": {
            "EmployeeId": 302,
            "LastName": "Bunter",
            "FirstName": "William",
            ...
        },
        "source": {
            "version": "2.1.1.Final",
            "connector": "postgresql",
            "name": "chinook",
            "ts_ms": 1675343987658,
            "snapshot": "false",
            "db": "chinook",
            "sequence": "[\\"171530259376\\",\\"171597365344\\"]",
            "schema": "public",
            "table": "Employee",
            "txId": 37801,
            "lsn": 171597365344,
            "xmin": null
        },
        "op": "c",
        "ts_ms": 1675338367446,
        "transaction": null
    }
}'
```

For a detailed explanation of change event records, please see the Debezium documentation, for example for [PostgreSQL](https://debezium.io/documentation/reference/stable/connectors/postgresql.html#postgresql-events).

Next, the event is received by the RDI transformation pipeline:

```shell
employee:EmployeeId:302 2023-02-02 14:48:57.220 (+737ms) received c event in stream data:chinook.public.Employee
```

In this example, the total elapsed time is 737ms.

If a transformation job applies to this record, there will be a notification:

```shell
For employee:EmployeeId:302 found transformation job: employee
```

If there is no transformation job, the message is:

```shell
INFO - employee:EmployeeId:302 could not find any transformation Job for event, using default transformation
```

The data record is shown before and after transformation:

```shell
employee:EmployeeId:302 Before transformation:
{
  "EmployeeId": 302,
  "LastName": "Bunter",
  "FirstName": "William",
  ...
}
employee:EmployeeId:302 After transformation:
{
  "EmployeeId": 302,
  "last_name": "Bunter",
  "first_name": "William",
  ...
}
```

Finally, the command executed in the Redis target database is logged and the change record statistics are displayed:

```shell
employee:EmployeeId:302 Executed: JSON.SET "employee:EmployeeId:302" "$" "{\"EmployeeId\":302,\"last_name\":\"Bunter\",\"first_name\":\"William\",...}"
employee:EmployeeId:302 Results: []
employee:EmployeeId:302 -1 event processing completed
"Change record stats:", "total", 1, "latency_min", 203, "latency_avg", 203, "latency_max", 203"
```

The trace session ends with `Done`.
