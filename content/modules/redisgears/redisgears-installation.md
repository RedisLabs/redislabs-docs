---
Title: RedisGears Installation
description:
weight: 50
alwaysopen: false
draft: true
categories: ["Modules"]
---

This guide describes the RedisGears installation process for Redis Enterprise deplyoments. If you're running Redis Cloud, RedisGears will already be installed for you. If you're running open source Redis, see the open source installation guide.

## RedisGears on Redis Enterprise

* For **air-gapped** installations, you'll need **Redis Enterprise 5.4.14-19 or later**.
* For **non-air-gapped** installations, **Redis Enterprise 6.0.0 or later** is required.

### Step 1: Download and Install Redis Enterprise Cluster

First, [download and install Redis Enterprise](https://docs.redislabs.com/latest/rs/installing-upgrading/).

Next, ensure that the cluster is bootstrapped and that all nodes have joined the cluster.
If the environment is air-gapped, you must select one of the cluster nodes as the controlling node for RedisGears.

### Step 2: Install the RedisGears Dependencies

#### Non-Air-Gapped Installation

You don't need to explicitly install any dependencies for non-air-gapped deployments of Redis Enterprise.

When your environment has access to the Internet, Redis Enterprise will download any dependencies at module upload time, and it will distribute those dependencies to all nodes in the cluster.  When new nodes join the cluster, Redis Enterprise will ensure that the dependencies are available on the new nodes.

**Note**: For Redis Enterprise K8s and Docker-based deployments, be sure you're using the correct RedisGears build. By default, Redis Enterprise K8s pods and Docker containers are built for Ubuntu 18.04.4 LTS, but we also support RHEL 7. We provide [RedisGears binaries for Ubuntu 18.04.4 LTS (Bionic Beaver)](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-centos7-x64.0.9.0.zip) and [RedisGears binaries for RHEL7](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-centos7-x64.0.9.0.zip).

#### Air-Gapped Installation

**Note**: Every time you add a new node to your Redis Enterprise cluster, you will need to execute these steps prior to bootstrapping the node.

##### Install the RedisGears Offline Package

On each node in your Redis Enterprise cluster:

1. Download the [RedisGears Module Offline Package](http://redismodules.s3.amazonaws.com/lab/16-gears-offline/redis-gears-centos7-rs5.4-offline.0.9.0.tar.gz)

1. Extract the RedisGears Module Offline Package:
```sh
# tar -xzf /path/to/redis-gears-centos7-rs5.4-offline.0.9.0.tar.gz -C /
# /opt/gears-recipe/rs/setup-nodes.sh
```

##### Install the RedisGears Module

1. Download the RedisGears Module itself.

1. Using the RS UI, [upload the RedisGears module](https://docs.redislabs.com/latest/modules/create-database-rs/).

Alternative
When you downloaded the RedisGears Module - Offline Package package you can execute the following on the Controlling Node (as root):

```sh
/opt/gears-recipe/rs/setup-node1.sh
```

##### Create a Database & Verify Installation

Now that you've installed RedisGears, you'll want to create a database and verify that it works.

1. Create a Redis Enterprise database with the RedisGears module.

1. Run `rladmin status` to verify that the database was created successfully and that shards are running.

1. Connect to the databse using the `redis-cli`, and run the following:

```sh
127.0.0.1:6379> RG.PYEXECUTE "GearsBuilder().run()"
```

## Installing the RedisGears Write-Behind Recipe

If you want to use [write-behind caching]({{< relref "/modules/redisgears/write-behind.md" >}}), then you'll to install the RGSync RedisGears recipe.

The RGSync Write-Behind recipe includes with two types of dependencies:

1. Drivers to connect to the backing database.
1. Python libraries for the RedisGears functions.

In most cases, these driver and libraries will be provisioned when you upload the recipe. However, you'll need root access to install certain backing database drivers (this is true of the Oracle drivers, for example).

### Non-Air-Gapped Recipe Installation

Follow this step to install drivers (e.g. Oracle) and Python libraries for the Write-Behind recipe.

First download Write Behind Dependencies - Offline Package for your backend database onto each cluster node.

Then, for each Redis Enterprise node:

1. Run the following (as root):
```sh
tar -xzf /path/to/write-behind-centos7-rs5.4-oracle-offline.0.1.0.tar.gz -C /
    /opt/write-behind-recipe/oracle/setup-nodes.sh
```

### Air-Gapped Recipe Installation

Follow this step to install drivers (e.g. Oracle) and Python libraries for the Write-Behind recipe.

First download Write Behind Dependencies - Offline Package for your backend database onto each cluster node.

1. Run the following as root on every Redis Enterprise node:
```sh
tar -xzf /path/to/write-behind-centos7-rs5.4-oracle-offline.0.1.0.tar.gz -C /
    /opt/write-behind-recipe/oracle/setup-nodes.sh
```

1. Run the following as root on the controlling Redis Enterprise node:
```sh
/opt/write-behind-recipe/rs/setup-node1.sh
```

## Configuring and Enabling the RedisGears Write-Behind Recipe

First, download the latest RGsync Write Behind Recipe.

**Note**: For air-gapped deployments, the set of python dependencies is pre-bundled with the write-behind recipe package.

A recipe defines a basic mapping from hashes to tables.  In the most cases, you'll simply need to update this mapping according to the structure of your Redis hashes and the tables you want to keep them in sync with.

To learn more about this, see the article on write-behind, or see the notes in the [RGSync repository](https://github.com/RedisGears/rgsync).

Install the RedisGears Functions

### Non-Air-Gapped Installation

From the client side:

1. Install Git, Python (2 or 3) and pip install redis
1. Download the [Redis Gears invocation script](https://raw.githubusercontent.com/RedisGears/RedisGears/master/recipes/gears.py).
1. Update your custom write behind recipe (say, write-behind.py). This will include your backing database connection strings and Redis-Backing-Database data mappings.
1. Register your custom write-behind script like so:
```sh
python gears.py --host HOST [ --port PORT ] --password PASSWORD \
    write-behind.py \
    REQUIREMENTS git+https://github.com/RedisGears/rgsync.git cx-oracle
```

### Air-Gapped Installation

On the Controlling Node (as root), execute the following, with ID set to a Redis database DB:ID (if there’s only one database in the cluster, you can omit the ID expression):

```sh
ID=<DB:ID> /opt/write-behind-recipe/oracle/start-write-behind
```

Next, do the following:

1. Install Git, Python (2 or 3) and pip install redis
1. Download the [Redis Gears invocation script](https://raw.githubusercontent.com/RedisGears/RedisGears/master/recipes/gears.py).
1. Update your custom write behind recipe (say, write-behind.py). This will include your backing database connection strings and Redis-Backing-Database data mappings.
1. Register your custom write-behind script like so:

```sh
python gears.py --host HOST [ --port PORT ] --password PASSWORD \
    write-behind.py \
    REQUIREMENTS \
    /opt/write-behind-recipe/packages/cx_Oracle-7.3.0-cp37-cp37m-manylinux1_x86_64.whl \
    /opt/write-behind-recipe/packages/SQLAlchemy-1.3.15-cp37-cp37m-linux_x86_64.whl \
    /opt/write-behind-recipe/packages/rgsync-0.1-py3-none-any.whl
```

## Artifacts for Download

### RedisGears Module

* [RedisGears for Centos/RHEL 7](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-centos7-x64.0.9.0.zip)
* [RedisGears for Ubuntu 18.04.4 LTS](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-bionic-x64.0.9.0.zip)


### Write Behind Recipe

* [RGSync Write-Behind Recipe](https://github.com/RedisGears/rgsync/archive/v0.2.0.tar.gz)

### Offline Packages (For Air-Gapped Deployments)

#### Redis Gears Module and Dependencies

* [RedisGears module (from S3)](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-centos7-x64.0.9.0.zip)
* [RedisGears module dependencies (from S3)](http://redismodules.s3.amazonaws.com/redisgears/redisgears-dependencies.linux-centos7-x64.0.9.0.tgz)
* Installation scripts

#### Write-Behind Dependencies

##### Oracle

* [RedisGears Oracle Write-Behind Dependencies](http://redismodules.s3.amazonaws.com/lab/16-gears-offline/redis-gears-centos7-rs5.4-offline.tar.gz)
* [Oracle native drivers](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html) and [related packages](http://mirror.centos.org/centos/7/os/x86_64/Packages/libaio-0.3.109-13.el7.x86_64.rpm)
* Python dependencies: [SQLAlchemy](https://files.pythonhosted.org/packages/8c/30/4134e726dd5ed13728ff814fa91fc01c447ad8700504653fe99d91fdd34b/SQLAlchemy-1.3.15.tar.gz), [Oracle Python driver](https://files.pythonhosted.org/packages/c9/ba/0fb63d616c2856016c13615ac43209b1909b7dbd8c5c461a79922e276678/cx_Oracle-7.3.0-cp37-cp37m-manylinux1_x86_64.whl)
* [rgsync-0.1.0.tar.gz](https://github.com/RedisGears/rgsync/archive/v0.1.0.tar.gz) from the [Github RGSync repo](https://github.com/RedisGears/rgsync)
* Installation Scripts

##### Cassandra

* [RedisGears Cassandra Write-Behind Dependencies](http://redismodules.s3.amazonaws.com/lab/16-gears-offline/write-behind-rs5.4-cassandra-offline.0.1.0.tar.gz)
* Python dependencies: [Cassandra Python driver](https://files.pythonhosted.org/packages/c0/e5/d8c87fd08f28a750eb4169f882fc3c797ee22700bc1f3449e6419959bb92/cassandra_driver-3.22.0-cp37-cp37m-win_amd64.whl)
* [rgsync-0.1.0.tar.gz](https://github.com/RedisGears/rgsync/archive/v0.1.0.tar.gz) from the [Github RGSync repo](https://github.com/RedisGears/rgsync)
rgsync-0.1.0.tar.gz from Github
* Installation Scripts
