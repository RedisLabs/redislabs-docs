---
Title: Benchmark a Redis on Flash Enabled Database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/memtier-benchmark/
---
Redis on Flash (RoF) on Redis Enterprise Software (RS) lets you use more cost-effective Flash memory as a RAM extension for your database.
But what does the performance look like as compared to an all-RAM RS database?

The simple scenarios on this page show you how you can get performance results with the free RS trial version.
If you would like assistance with your evaluation or need to test a larger cluster, we'd be happy to help.

{{< note >}}
memtier_benchmark is included with Redis Enterprise Software in /opt/redislabs/bin/.
To benchmark another database provider, you can get [memtier_benchmark on GitHub](https://github.com/RedisLabs/memtier_benchmark).
{{< /note >}}

## Benchmark and performance test considerations

For our testing, let's configure a Redis Enterprise Software cluster with the trial version
and use memtier_benchmark to evaluate the performance of a Redis on Flash enabled database in these scenarios:

- Without replication: 4 master shards
- With replication: 2 master and 2 slave shards

While it concentrates on RoF, you can also use these steps to evaluate RS without RoF.

The Redis Enterprise Software trial version lets you use up to 4 Redis shards with multiple combinations of databases, such as:

- 4 databases with 1 master shard each
- 2 highly available databases with replication, where each database has 1 master shard and 1 slave shard
- 1 non-replicated clustered database with 4 master shards
- 1 highly available and clustered database with 2 master shards and 2 slave shards

## Test environment and RS cluster setup

For the test environment, you must:

1. Create a three-node RS cluster.
1. Prepare the flash memory.
1. Set up the load generation tool.

### Creating a three-node RS cluster {#creating-a-threenode-rs-cluster}

For this performance test, you need at least a three-node RS cluster.
You can run all of these tests on Amazon AWS with these hosts:

- 2 x i3.2xlarge (8 vCPU, 61 GiB RAM, up to 10GBit, 1.9TB NMVe SSD) - Used for serving RoF data
- 1 x m4.large - Used as a quorum node

For instructions on how to install RS and set up a cluster, go to either:

- [Quick Setup]({{< relref "/rs/getting-started/_index.md" >}}) for a test installation
- [Install and Upgrade]({{< relref "/rs/installing-upgrading/_index.md" >}}) for a production installation

For the tests we use a quorum node in the cluster to keep costs down on AWS EC2 instance usage,
but still keep the minimum 3 nodes in the cluster that RS needs in case a node fails.
The quorum node can be on a less powerful instance type (m4.large) as it does not have shards on it or take traffic.

The main reason to use a i3.2xlarge instance is to use NVMe SSDs.
Those SSDs are what RoF combines with RAM to host the database on.
If you run these tests in another environment (such as on-premise),
you must use NVMe SSDs to see the performance benefits of RoF.

## Preparing the flash memory

After you install RS on the nodes,
the flash memory attached to the i3.2xlarge instances must be prepared and formatted with the `/opt/redislabs/sbin/prepare_flash.sh` script.

## Setting up the load generation tool

The memtier_benchmark load generator tool generates the load on the RoF databases.
To use this tool, install RS on a dedicated instance that is not part of the RS cluster
but is in the same region/zone/subnet of your cluster.
We recommend that you use a relatively powerful instance to avoid bottlenecks at the load generation tool itself.

For these tests, the load generation host uses a c4.8xlarge instance type.

## Database configuration parameters

### Create a Redis on Flash test database

You can use the RS admin console to create a test database.
We recommend that you use a separate database for each test case with these requirements:

|  **Parameter** | **With replication** | **Without replication** | **Description** |
|  ------ | ------ | ------ | ------ |
|  Name | test-1 | test-2 | The name of the test database |
|  Memory limit | 100 GB | 100 GB | The memory limit refers to RAM+Flash, aggregated across all the shards of the database, including master and slave shards. |
|  RAM limit | 0.3 | 0.3 | RoF always keeps the Redis keys and Redis dictionary in RAM and additional RAM is required for storing hot values. For the purpose of these tests 30% RAM was calculated as an optimal value. |
|  Replication | Enabled | Disabled | A database with no replication has only master shards. A database with replication has master and slave shards. |
|  Data persistence | None | None | No data persistence is needed for these tests. |
|  Database clustering | Enabled | Enabled | A clustered database consists of multiple shards. |
|  Number of (master) shards | 2 | 4 | Shards are distributed as follows:<br/>- With replication: 1 master shard and 1 slave shard on each node<br/>- Without replication: 2 master shards on each node |
|  Other parameters | Default | Default | Keep the default values for the other configuration parameters. |

## Data population

### Populate the benchmark dataset

The memtier_benchmark load generation tool populates the database.
To populate the database with N items of 500 Bytes each in size, on the load generation instance run:

```sh
$ memtier_benchmark -s $DB_HOST -p $DB_PORT --hide-histogram
--key-maximum=$N -n allkeys -d 500 --key-pattern=P:P --ratio=1:0
```

Set up a test database with these values:

|  **Parameter** | **Description** |
|  ------ | ------ |
|  Database host<br/>(-s) | The fully qualified name of the endpoint or the IP shown in the RS database configuration |
|  Database port<br/>(-p) | The endpoint port shown in you RS database configuration |
|  Number of items<br/>(–key-maximum) | With replication: 75 Million<br/>Without replication: 150 Million |
|  Item size<br/>(-d) | 500 Bytes |

## Centralize the keyspace

### With replication

To create about 20.5 million items in RAM for your highly available clustered database with 75 million items, run:

```sh
$ memtier_benchmark  -s $DB_HOST -p $DB_PORT --hide-histogram
--key-minimum=27250000 --key-maximum=47750000 -n allkeys
--key-pattern=P:P --ratio=0:1
```

You can see the **Values in RAM** metric on the **metrics** page of your database in the RS admin console to validate the test.

### Without replication

To create 41 million items in RAM without replication enabled and 150 million items, run:

```sh
$ memtier_benchmark  -s $DB_HOST -p $DB_PORT --hide-histogram
--key-minimum=54500000 --key-maximum=95500000 -n allkeys
--key-pattern=P:P --ratio=0:1
```

## Test runs

### Generate load

#### With replication

We recommend that you do a dry run and double check the RAM Hit Ratio on the **metrics** screen in the RS admin console before you write down the test results.

To test RoF with an 85% RAM Hit Ratio, run:

```sh
$ memtier_benchmark -s $DB_HOST -p $DB_PORT --pipeline=11 -c 20 -t 1
-d 500 --key-maximum=75000000 --key-pattern=G:G --key-stddev=5125000
--ratio=1:1 --distinct-client-seed --randomize --test-time=600
--run-count=1 --out-file=test.out
```

#### Without replication

Here is the command for 150 million items:

```sh
$ memtier_benchmark -s $DB_HOST -p $DB_PORT --pipeline=24 -c 20 -t 1
-d 500 --key-maximum=150000000 --key-pattern=G:G --key-stddev=10250000
--ratio=1:1 --distinct-client-seed --randomize --test-time=600
--run-count=1 --out-file=test.out
```

Where:

|  **Parameter** | **Description** |
|------------|-----------------|
|  Access pattern (--key-pattern) and standard deviation (--key-stddev) | Controls the RAM Hit ratio after the centralization process is complete |
|  Number of threads (-t and -c)\ | Controls how many connections are opened to the database, whereby the number of connections is the number of threads multiplied by the number of connections per thread (-t) and number of clients per thread (-c) |
|  Pipelining (--pipeline)\ | Pipelining allows you to send multiple requests without waiting for each individual response (-t) and number of clients per thread (-c) |
|  Read\write ratio (--ratio)\ | A value of 1:1 means that you have the same number of write operations as read operations (-t) and number of clients per thread (-c) |

## Test results

### Monitor the test results

You can either monitor the results in the **metrics** tab of the RS admin console or with the memtier_benchmark output.
The memtier_benchmark results include the network latency between the load generator instance and the cluster instances.
The metrics shown in the RS admin console do not include network latency.

### Expected results

You should expect to see an average throughput of:

- Around 160,000 ops/sec when testing without replication (i.e. 4 master shards)
- Around 115,000 ops/sec when testing with enabled replication (i.e. 2 master and 2 slave shards)

In both cases the average latency should be sub-millisecond.
