---
Title: Debezium Server deployment guide
linkTitle: Debezium Server deployment
description: Describes how to deploy Debezium Server using a container management service, such as Docker or Podman.
weight: 60
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

## Containerized Deployment

You can use either [docker](https://www.docker.com/) or [podman](https://podman.io/) container management engines.

- Change directory to your `Redis Data Integration` configuration folder created by the [scaffold command]({{<relref "/rdi/reference/redis-di/scaffold">}}).

- Verify that you've configured `debezium/application.properties` file based on these [instructions]({{<relref "/rdi/#install-the-debezium-server">}}).

- Run:

  - For `Docker`:

    ```bash
    docker run -it --name debezium --network host \ 
       --privileged -v $PWD/debezium:/debezium/conf \
       debezium/server:{{ site.debezium_server_version }}
    ```

  - For `Podman`:

    ```bash
    sudo podman run -it --rm --name debezium --network=host --privileged -v $PWD/debezium:/debezium/conf debezium/server:{{ site.debezium_server_version }}
    ```

### Custom Timezone

GMT timezone is used in debezium container by default. In order to use another timezone, specify it by setting the `TZ` environment variable when running the container, for example:

- For `Docker`:

  ```bash
  docker run -it --name debezium -e TZ=Europe/London --network host --privileged -v $PWD/debezium:/debezium/conf debezium/server:{{ site.debezium_server_version }}
  ```

- For `Podman`:

  ```bash
  sudo podman run -it --rm --name debezium -e TZ=Europe/London --network=host --privileged -v $PWD/debezium:/debezium/conf debezium/server:{{ site.debezium_server_version }}
  ```

### Oracle

If you are using `Oracle` as your source DB, please note that Debezium Server does **not** include the Oracle JDBC driver.
As result, it will fail with an error. You should follow these steps to add the JDBC driver and restart Debezium Server:

- Download artifacts:
  ```bash
  mkdir oracle
  wget -P oracle https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc8/21.1.0.0/ojdbc8-21.1.0.0.jar
  ```
- Copy to container:

  - For `Docker`:

    ```bash
    docker cp oracle/. debezium:/debezium/lib
    docker start debezium
    ```

  - For `Podman`:

    ```bash
    sudo podman cp oracle/. debezium:/debezium/lib
    sudo podman start debezium
    ```

## Non Containerized Deployment

- Install [Java 11](https://www.oracle.com/java/technologies/downloads/#java11) or [Java 17](https://www.oracle.com/java/technologies/downloads/#java17).
- Download Debezium Server {{ site.debezium_server_version }} from [here](https://repo1.maven.org/maven2/io/debezium/debezium-server-dist/{{ site.debezium_server_version }}/debezium-server-dist-{{ site.debezium_server_version }}.tar.gz).
- Unpack Debezium Server:

  ```bash
  tar xvfz debezium-server-dist-{{ site.debezium_server_version }}.tar.gz
  ```

- Copy the scaffolded `application.properties` file (created by the [scaffold command]({{<relref "/rdi/reference/redis-di/scaffold">}}) to the extracted `debezium-server/conf` directory. Verify that you've configured this file based on these [instructions]({{<relref "/rdi/#install-the-debezium-server">}}).

- If you are using `Oracle` as your source DB, please note that Debezium Server does **not** include the Oracle JDBC driver. You should download it and locate under `debezium-server/lib` directory:

  ```bash
  cd debezium-server/lib
  wget https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc8/21.1.0.0/ojdbc8-21.1.0.0.jar
  ```

- Start Debezium Server from `debezium-server` directory:
  ```bash
  ./run.sh
  ```
