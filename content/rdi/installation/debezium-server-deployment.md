---
Title: Deploy Debezium Server
linkTitle: Deploy Debezium Server
description: Learn how to deploy Debezium Server
weight: 60
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

## Containerized deployment

You can use either [Docker](https://www.docker.com/) or [Podman](https://podman.io/) container management engines.

> This guide uses Docker to illustrate the required commands. If you are using Podman, simply replace `docker` with `podman` below.

- Change directory to your `Redis Data Integration` configuration folder created by the [scaffold command]({{<relref "/rdi/quickstart/ingest-guide#scaffold-configuration-files">}}).
- Verify that you've configured `debezium/application.properties` file based on these [instructions]({{<relref "/rdi/quickstart/ingest-guide#install-the-debezium-server">}}).
- Run:

  ```bash
  docker run -d --rm --name debezium -v $PWD/debezium:/debezium/conf debezium/server:{{ site.debezium_server_version }}
  ```

- Check the Debezium Server log:

  ```bash
  docker logs debezium --follow
  ```
  
### Custom timezone

The UTC timezone is used in the Debezium Server container by default. In order to use another timezone, specify it by setting the `TZ` environment variable when running the container, for example:

```bash
docker run -d --rm --name debezium -e TZ=Europe/London -v $PWD/debezium:/debezium/conf debezium/server:{{ site.debezium_server_version }}
```

### SELinux

If your Linux machine has SELinux enabled in `enforced` mode (default for Red Hat Enterprise Linux), you need to configure the SELinux label for the bind mount volume by adding `:Z` at the end of the mount directive:

```bash
-v $PWD/debezium:/debezium/conf:Z
```

### Network configuration

The examples in this document assume that the default Docker bridge network is used. Depending on your network topology, you may need to add the `--network` option, either for a user-defined bridge or for the host network, for example:

```bash
--network=host
```

### Oracle

If you are using `Oracle` as your source DB, please note that Debezium Server does **not** include the Oracle JDBC driver.
As result, it will fail with an error. You should follow these steps to add the JDBC driver and restart Debezium Server:

- Download the driver:
  ```bash
  wget -P oracle https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc8/21.1.0.0/ojdbc8-21.1.0.0.jar
  ```

- Bind mount the driver into the container:

  ```bash
  docker run -d --rm --name debezium -v $PWD/oracle/ojdbc8-21.1.0.0.jar:/debezium/lib/ojdbc8-21.1.0.0.jar -v $PWD/debezium:/debezium/conf debezium/server:{{ site.debezium_server_version }}
  ```

### Running Docker as a non-root user

We recommend running Docker as a non-root user. To allow this, follow these steps:

- If group `docker` doesn't exist in `/etc/group`:

  ```bash
  sudo groupadd docker
  ```

- Add the current user to group `docker`: 

  ```
  sudo usermod -aG docker $USER
  ```

- Restart the terminal session so the changes take effect

> For added security, the Debezium Server container can be run in a rootless [Docker](https://docs.docker.com/engine/security/rootless/) or [Podman](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode) environment.

## Non-containerized deployment

- Install [Java 11](https://www.oracle.com/java/technologies/downloads/#java11) or [Java 17](https://www.oracle.com/java/technologies/downloads/#java17).
- Download Debezium Server {{ site.debezium_server_version }} from [here](https://repo1.maven.org/maven2/io/debezium/debezium-server-dist/{{ site.debezium_server_version }}/debezium-server-dist-{{ site.debezium_server_version }}.tar.gz).
- Unpack Debezium Server:

  ```bash
  tar xvfz debezium-server-dist-{{ site.debezium_server_version }}.tar.gz
  ```

- Copy the scaffolded `application.properties` file (created by the [scaffold command]({{<relref "/rdi/quickstart/ingest-guide#scaffold-configuration-files">}}) to the extracted `debezium-server/conf` directory. Verify that you've configured this file based on these [instructions]({{<relref "/rdi/quickstart/ingest-guide#install-the-debezium-server">}}).

- If you are using `Oracle` as your source DB, please note that Debezium Server does **not** include the Oracle JDBC driver. You should download it and locate under `debezium-server/lib` directory:

  ```bash
  cd debezium-server/lib
  wget https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc8/21.1.0.0/ojdbc8-21.1.0.0.jar
  ```

- Start Debezium Server from `debezium-server` directory:
  ```bash
  ./run.sh
  ```
