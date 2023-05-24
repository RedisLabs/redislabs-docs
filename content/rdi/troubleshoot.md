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

Problems with [pip](https://pypi.org/project/pip/) installation can occur due to the following reasons:

- **Wrong Python 3 version**

  In many Linux distributions, the Python 3 version is still 3.6.\*. You can check this by running: `python --version`.

- **More than one Python 3 installed**

  To solve this problem, create a Python virtual environment (venv) specifying
  the path to the right Python 3 installation for example `<PATH>/python3.8 -m venv <VENV-NAME>`. If you are not sure about the path run `which python3` and copy the path pointing to a Python installation with a version greater than `3.6`.

- **Outdated pip version**

  Some old pip versions can have problems with the wheel filename. It is best to update pip as well. In you `venv` run `pip install --upgrade pip`.

- **Old RDI CLI libraries from previous installations**

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
  Alternatively, run the CLI within the Kubernetes cluster as described in [Running on Kubernetes]({{<relref "/rdi/installation/install-k8s">}}).

## Problems running Debezium

Set the log level to `DEBUG` to get more detailed activity that would be useful in diagnosing unexpected behavior.

In `application.properties` configuration file, change/add:

```properties
quarkus.log.level=DEBUG
```

The most common problems with running Debezium Server are:

- **Debezium failing to reach the configuration file**

  The error message for this one is not clear and typically Debezium reports it couldn't find the first element in the configuration file. Usually it implies that there is no `application.properties` file in `$PWD/debezium`. Make sure you run the `docker run` command from the right directory.

- **Debezium failing to reach the source database**

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

- **Handling Debezium container crash**

  The Debezium Server is stateless. In case it crashed, you can always remove it safely and run a new one using a fixed `application.properties` file:

  - Check the status of Debezium Server container:

    run `docker ps -a` to show all existing containers on the host.

  - If there is a Debezium Server container that has exited, you can remove it using `docker rm -f <DEBEZIUM_CONTAINER_ID>`.

- **Stopping and starting Debezium Server**

  In case you want to fix something in the Debezium Server configuration and Debezium Server is still running:

  - Use `docker stop <DEBEZIUM_CONTAINER_NAME>`.
  - You can start it later using `docker start <DEBEZIUM_CONTAINER_NAME>`. If You want the container to be attached to the terminal, run it with `--attach`.

## Getting Debezium Server logs

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

### Non-containerized deployment

The Debezium log files will be created in the directory set for the property `<quarkus.log.file.path>`.

#### Example

```properties
quarkus.log.file.path=/home/debezium-server/logs/debezium.log
quarkus.log.file.rotation.max-file-size=100M
quarkus.log.file.rotation.file-suffix=.yyyy-MM-dd.gz
quarkus.log.file.rotation.max-backup-index=3
quarkus.log.file.rotation.rotate-on-boot=true
```

With this configuration: 

* A `debezium.log` file is created in the directory `/home/debezium-server/logs/`.
* When the log file size reaches 100M it is renamed to `debezium.log.2023-01-22.1.gz`, and a new log file, `debezium.log`, is created.
* If the size of the log file reaches 100M and there are already 3 backup log files, the first backup file, `debezium.log.2023-01-22.1.gz`, is deleted.
* At any point in time, only 3 backup log files exist: `debezium.log.2023-01-22.1.gz`, `debezium.log.2023-01-22.2.gz`, `debezium.log.2023-01-22.3.gz`, and an active log file, `debezium.log`.
