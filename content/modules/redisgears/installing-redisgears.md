---
Title: Install RedisGears 
description:
weight: 60
alwaysopen: false
categories: ["Modules"]
---
Before you can use RedisGears, you have to install the RedisGears module on your RS cluster.

## Minimum requirements

- Redis Enterprise 6.0.0 or later
- The [cluster is setup]({{< relref "/rs/administering/new-cluster-setup.md" >}}) and all of the nodes are joined to the cluster

## Installing RedisGears

### Step 1: Install RedisGears dependencies

{{< note >}}
This step is required for Redis Enterprise Software 6.0.8 and below only.
For RS 6.0.12 and above, the dependencies are installed automatically when [you install with the `/v2/modules` endpoint]({{< relref "/modules/add-module-to-cluster.md#adding-a-module-using-the-rest-api" >}}).
{{< /note >}}

On each node in the Redis Enterprise cluster:

1. [Download](https://redislabs.com/download-center/modules/) the RedisGears Module - Dependencies Package from the Redis Enterprise Software section of the Downloads page.
1. Copy the dependencies package to a node in your cluster.
1. Run these commands as root:

    ```sh
    # source /etc/opt/redislabs/redislabs_env_config.sh
    # mkdir -p $modulesdatadir/rg/<version_integer>/deps/
    # tar -xvf /<path>/redisgears-dependencies.linux-bionic-x64.<version>.tgz -C $modulesdatadir/rg/<version_integer>/deps
    # chown -R $osuser $modulesdatadir/rg
    ```

{{< note >}}
- `<version>` - The version number in the format `x.y.z`.
- `<version_integer>` - The version number in integer format `xxyyzz` (`xyyzz` if `x` < 10). You can calculate this number using the formula `10000*x + 100*y + z`.
- You must also run these commands on new nodes before you join them to an existing cluster.
{{< /note >}}

### Step 2: Install the RedisGears module

1. [Download](https://redislabs.com/download-center/modules/) the RedisGears Module.
1. In the RS admin console, [add the RedisGears module]({{< relref "/modules/add-module-to-cluster.md" >}}) to the cluster.

### Step 3: Create a database and verify the installation

1. Create a Redis Enterprise database [with the RedisGears module enabled]({{< relref "/modules/add-module-to-database.md" >}}).
1. From the CLI of a node in the cluster, check that the database was created successfully and shards are running with: `rladmin status`
1. From the CLI of a node or of a client that is connected to the database, check that RedisGears is running correctly with: `redis-cli RG.PYEXECUTE "GearsBuilder().run()"`

    To connect to the database from a client, run: `redis-cli -h <FQDN_of_node> -p <host> [-a <password>]`

## Install the write-behind recipe

The Write-Behind recipe comes with two types of dependencies:

- Drivers to connect to the backend database
- Python libraries for the RedisGears Functions

In most cases all of these can be provisioned to RedisGears before the Functions are uploaded.
However, root access for the driver on the host is required in some cases, for example with Oracle drivers.

### Step 1: Install Oracle driver (optional)

If you want to do write-behind with an Oracle database:

1. [Download the Oracle driver](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html).
1. On each RS node in the cluster, follow the installation instructions on the download page for the Oracle driver.

### Step 2: Import requirements

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

### Step 3: Register the functions

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
