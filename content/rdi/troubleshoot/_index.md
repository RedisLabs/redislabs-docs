---
Title: Troubleshooting guide
linkTitle: Troubleshooting
description: Describes how to use resolve common Redis Data integration problems.
weight: 50
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

This document contains some practical things to do in order to diagnose common problems during installation and runtime of Redis Data Integration.

## Problems During Installation

### Problems with Pip

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

### Problems with `create` Command

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

## Problems Running Debezium

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
  - You can start it later using `docker start <DEBEZIUM_CONTAINER_NAME>`. If You want the container to be attached to the terminal, run it with `--attach`.
