---
Title: Install RedisGears 
linkTitle: Install
description:
weight: 60
alwaysopen: false
categories: ["Modules"]
---
Before you can use RedisGears, you have to install the RedisGears module on your Redis Enterprise cluster.

## Minimum requirements

- Redis Enterprise 6.0.12 or later
- The [cluster is setup]({{< relref "/rs/administering/new-cluster-setup.md" >}}) and all of the nodes are joined to the cluster

## Install RedisGears

If your cluster uses Redis Enterprise v6.0.12 or later and has internet access, you only need to download the RedisGears package. It automatically fetches dependencies like the Python and JVM plugins during online installation.

Offline installation requires you to manually upload dependencies to the master node.

### Install RedisGears and dependencies

1. Download the **RedisGears** package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

    {{<note>}}
For offline installation of RedisGears v1.2 and later, you also need to download the **RedisGears Dependencies** packages for both Python and Java.
    {{</note>}}

1. Upload the RedisGears package to a node in the cluster.

1. For offline installation only, copy the dependencies to the following directory on the master node: `$modulesdatadir/rg/<version_integer>/deps/`
    ```sh
    $ cp redisgears-jvm.Linux-ubuntu18.04-x86_64.1.2.2.tgz $modulesdatadir/rg/10201/deps/
    ```

    {{<note>}}
Skip this step unless your cluster does not have internet access. 
    {{</note>}}

1. Add RedisGears to the cluster with a [`POST` request to the `/v2/modules` REST API endpoint]({{<relref "/rs/references/rest-api/requests/modules#post-module-v2">}}):

    ```sh
    $ curl -k -u "<user>:<password>" -F "module=@/tmp/redisgears.linux-centos7-x64.1.2.1.zip" https://localhost:9443/v2/modules
    ```

After the install is complete, RedisGears will appear in the list of available modules on the **settings** and **create database** pages of the Redis Enterprise admin console.

### Enable RedisGears for a database

After installation, create a new database and enable RedisGears:

- [With Python]({{<relref "/modules/redisgears/python/install">}})

- [With the JVM]({{<relref "/modules/redisgears/jvm/install">}})

## Install the write-behind recipe

The Write-Behind recipe comes with two types of dependencies:

- Drivers to connect to the backend database
- Python libraries for the RedisGears Functions

In most cases all of these can be provisioned to RedisGears before the Functions are uploaded.
However, root access for the driver on the host is required in some cases, for example with Oracle drivers.

### Install Oracle driver (optional)

If you want to do write-behind with an Oracle database:

1. [Download the Oracle driver](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html).
1. On each RS node in the cluster, follow the installation instructions on the download page for the Oracle driver.

### Import requirements

1. Install [Python 3](https://www.python.org/downloads/).
1. To install the [gears-cli](https://pypi.org/project/gears-cli/), run: `pip install gears-cli`
1. Download [rgsync offline package](https://redislabs.com/download-center/modules/).
1. Import the requirements:

    ```sh
    # gears-cli import-requirements \
        --host HOST [ --port PORT ] --password PASSWORD \
        --requirements-path rgsync-99.99.99.linux-bionic-x64.zip
    ```

    {{< note >}}
You can be more efficient and import only the requirements you need, but rgync is always required and can be combined with one or more of these packages according to your backend database:

- redisgears-requirement-v1-snowflake-sqlalchemy-linux-\<os>-x64.zip
- redisgears-requirement-v1-PyMySQL-linux-\<os>-x64.zip
- redisgears-requirement-v1-cx-Oracle-linux-\<os>-x64.zip
- redisgears-requirement-v1-cassandra-driver-linux-\<os>-x64.zip

This list can be different or more extensive in newer versions.
The `module.json` file in the module package lists the dependencies for the module.

    {{< /note >}}

1. From the CLI of a node or of a client that is connected to the database, check that the requirements were imported successfully with: `redis-cli RG.PYDUMPREQS`

    To connect to the database from a client, run: `redis-cli -h <FQDN_of_node> -p <host> [-a <password>]`

    This command returns a list of all available requirements.

### Register the functions

The following is a RedisGears recipe that shows how to use the Write Behind pattern to map data from Redis Hashes to MySQL tables.
The recipe maps all Redis Hashes with the prefix `person:<id>` to the MySQL table persons, with `<id>` being the primary key and mapped to the person_id column.
Similarly, it maps all Hashes with the prefix `car:<id>` to the cars table.

```sh
from rgsync import RGWriteBehind
from rgsync.Connectors import MySqlConnector, MySqlConnection

'''
Create MySQL connection object
'''
connection = MySqlConnection('demouser', 'Password123!', 'localhost:3306/test')

'''
Create MySQL persons connector
persons - MySQL table to put the data
person_id - primary key
'''
personConnector = MySqlConnector(connection, 'persons', 'person_id')

personsMappings = {
	'first_name':'first',
	'last_name':'last',
	'age':'age'
}

RGWriteBehind(GB, keysPrefix='person', mappings=personsMappings, connector=personConnector, name='PersonsWriteBehind', version='99.99.99')

'''
Create MySQL car connector
cars - MySQL table to put the data
car_id - primary key
'''
carConnector = MySqlConnector(connection, 'cars', 'car_id')

carsMappings = {
	'id':'id',
	'color':'color'
}

RGWriteBehind(GB, keysPrefix='cars', mappings=carsMappings, connector=carConnector, name='CarsWriteBehind', version='99.99.99')
```

Go to the [rgsync website](https://pypi.org/project/rgsync/) to get the replication options and the configuration options for the database and mapping.

1. Create a python file with the configuration mapping according to your specific needs.
1. Run gears-cli with your custom file:

    ```sh
    gears-cli run --host <host> --port <post> --password <password> <yourfile>.py
    ```
