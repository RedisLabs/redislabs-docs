---
Title: Benchmark a Redis on Flash Enabled Database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis on Flash (RoF) on Redis Enterprise Software (RS) enables you to
use more cost-effective Flash memory as a RAM extension for your
database. But what does the performance look like as compared to an
all-RAM RS database? The two simple scenarios on this page illustrate
what performance testing and results you can achieve with the RS trial
version as it is free to download and test against. If you would like
assistance with your evaluation or need to test a larger cluster, we'd
be happy to help.

Note: memtier_benchmark is included with Redis Enterprise Software in
/opt/redislabs/bin/, but if you are benchmarking something other than
RS, [memtier_benchmark is avialable on
GitHub](https://github.com/RedisLabs/memtier_benchmark).

## Benchmark and Performance Test Considerations

This page focuses on how to configure a Redis Enterprise Software
cluster with the trial version and use memtier_benchmark to evaluate
the performance of a Redis on Flash enabled database in the following
scenarios:

- Without replication: Four master shards
- With replication: Two master and two slave shards

While it concentrates on RoF, much of this scenario could be applied
without using that feature of RS.

The Redis Enterprise Software trial version allows you to use up to four
Redis shards with multiple combinations of databases, such as:

- Four databases with one master shard each
- Two highly available databases with replication, whereby each one
    has one master shard and one slave shard
- One non-replicated clustered database with four master shards
- One highly available and clustered database with two master shards
    and two slave shards

## Test Environment and RS Cluster Setup

For the test environment, there are three required tasks:

1. Create a three-node RS cluster
1. Preparing the flash memory
1. Setup the load generation tool

### Creating a three-node RS cluster

For this performance test, you will need at least a three-node RS
cluster. All tests in the example scenarios on this page are performed
on AWS using the following setup:

- 2 x i3.2xlarge (8 vCPU, 61 GiB RAM, up to 10GBit, 1.9TB NMVe SSD) --
    will be used for serving RoF data
- 1 x m4.large - will be used as a quorum node

For specific information and step-by-step guides on how to install RS
and set up a cluster, go to the Quick Setup section or the Install and
Upgrade section.

In the scenarios, we are using a quorum node in the cluster simply to
keep costs down on AWS instance usage, but still keep the minimum three
nodes in the cluster that Redis Enterprise Software needs in case
something happens. The quorum node can be on a less powerful instance
type (m4.large) as it will not have shards on it or take traffic.

The key part of using the i3.2xlarge that is required for Redis on Flash
is the use of NVMe SSDs. Those SSDs are what RoF will combine with RAM
to host the database on. So if you are going to do this in another
environment (e.g. on-premise), you need to have NVMe SSDs to see the
performance benefits of RoF.

## Preparing the Flash Memory

The flash memory that is attached to the i3.2xlarge instances in AWS
needs to be prepared and formatted by using the
/opt/redislabs/sbin/prepare_flash.sh once RS is installed on a node.

## Setting up the load generation tool

The memtier_benchmark load generator tool, which is part of the RS
installation package, will be used to generate the load on the RoF
databases. In order to utilize this tool, you should install RS on a
dedicated instance that is not part of the RS cluster, but should run on
the same region/zone/subnet of your cluster. It is recommended to use a
relatively powerful instance to avoid bottlenecks at the load generation
tool itself.

For these tests, an AWS c4.8xlarge instance type was selected for load
generation.Database Configuration Parameters

## Database Configuration Parameters

### Create a _Redis DB Flash_ test database

You can use the RS Web UI for creating a test database. It is
recommended that you use a separate database for each test case. The
following table summarizes how to configure the databases for the two
test cases, 'with replication' and 'without replication':

|  **Parameter** | **With replication** | **Without replication** | **Description** |
|  ------ | ------ | ------ | ------ |
|  Name | test-1 | test-2 | The name of the test database |
|  Memory limit | 100 GB | 100 GB | The memory limit refers to RAM+Flash. It is enforced on the aggregated usage across all the shards of the database, including master and slave shards. |
|  RAM limit | 0.3 | 0.3 | RoF always keeps the Redis keys and Redis dictionary in RAM. In addition, there should be enough additional RAM for storing hot values. For the purpose of these tests 30% RAM was calculated as an optimal value. |
|  Replication | Enabled | Disabled | A database with no replication has only master shards; a database with replication has master and slave shards. |
|  Data persistence | None | None | No data persistence should be configured for these tests. |
|  Database clustering | Enabled | Enabled | A clustered database consists of multiple shards. |
|  Number of (master) shards | 2 | 4 | In this configuration shards will be distributed as follows:<br/>* With replication: one master shard and one slave shard on each node<br/>* Without replication: two master shards on each node |
|  Other parameters | Default | Default | Please keep the default values for the other configuration parameters. |

## Data Population

### Populate the benchmark dataset

The memtier_benchmark load generation tool is used for populating the
database. Here is an example of how to populate N items, each of them
500 Bytes in size:

```src
$ memtier_benchmark -s $DB_HOST -p $DB_PORT --hide-histogram
--key-maximum=$N -n allkeys -d 500 --key-pattern=P:P --ratio=1:0
```

Note: please remember to run memtier_benchmark on your dedicated load
generation instance!

Please use the following parameters for populating your test database:

|  **Parameter** | **Description** |
|  ------ | ------ |
|  Database host<br/>(-s) | The fully qualified name of the endpoint or the IP, according to what is shown in your RS configuration screen for your test database |
|  Database port<br/>(-p) | The endpoint port, as shown in you RS configuration screen |
|  Number of items<br/>(–key-maximum) | With replication: 75 Million<br/>Without replication: 150 Million |
|  Item size<br/>(-d) | 500 Bytes |

## Centralize around the median of the keyspace

In the case of a highly available clustered database with 75 million
items, we run the below memtier_benchmark command. This will result in
about 20.5 million items being in RAM. You can validate this by looking
at the 'Values in RAM' metric on the 'metrics' page of your database in
the RS Web UI.

### With replication

```src
$ memtier_benchmark  -s $DB_HOST -p $DB_PORT --hide-histogram
--key-minimum=27250000 --key-maximum=47750000 -n allkeys
--key-pattern=P:P --ratio=0:1
```

When running the test without replication enabled and 150 million items,
the following centralization command must be executed to generate 41
million items in RAM:

### Without replication

```src
$ memtier_benchmark  -s $DB_HOST -p $DB_PORT --hide-histogram
--key-minimum=54500000 --key-maximum=95500000 -n allkeys
--key-pattern=P:P --ratio=0:1
```

## Test Runs

### Generate load

Execute the following memtier_benchmark commands to test RoF with an
85% RAM Hit Ratio. It is recommended that you do a dry run and double
check the RAM Hit Ratio on the 'metrics' screen in the RS UI, before
writing down the test results.

#### With replication

```src
$ memtier_benchmark -s $DB_HOST -p $DB_PORT --pipeline=11 -c 20 -t 1
-d 500 --key-maximum=75000000 --key-pattern=G:G --key-stddev=5125000
--ratio=1:1 --distinct-client-seed --randomize --test-time=600
--run-count=1 --out-file=test.out
```

Here is the command for 150 million items:

#### Without replication

```src
$ memtier_benchmark -s $DB_HOST -p $DB_PORT --pipeline=24 -c 20 -t 1
-d 500 --key-maximum=150000000 --key-pattern=G:G --key-stddev=10250000
--ratio=1:1 --distinct-client-seed --randomize --test-time=600
--run-count=1 --out-file=test.out
```

Important test parameters are:

|  **Parameter** | **Description** |
|------------|-----------------|
|  Access pattern (--key-pattern) and standard deviation (--key-stddev) | Controls the RAM Hit ratio after the centralization process has been performed |
|  Number of threads\ | Controls how many connections are opened to the database, whereby the number of connections is the number of threads multiplied by the number of connections per thread (-t) and number of clients per thread (-c) |
|  Number of threads\ | Pipelining allows you to send multiple requests without waiting for each individual response (-t) and number of clients per thread (-c) |
|  Number of threads\ | A value of 1:1 means that you have the same number of write operations as read operations (-t) and number of clients per thread (-c) |

## Test Results

### Monitor the test results

You can either monitor the results with the RS Web UI (on the 'metrics'
tab of your database) or by using the memtier_benchmark output. Please
note that the memtier_benchmark results include the network latency
(i.e. between the load generator instance and the cluster instances),
whereas the latency metrics shown in the RS Web UI don't include network
latency.

### Expected results

Based on the test setup discussed in previous sections, you should be
able to see an average throughput of around 160,000 ops/sec when testing
without replication (i.e. 4 master shards), and around 115,000 ops/sec
when testing with enabled replication (i.e. 2 master and 2 slave
shards); in both cases the average latency should be sub-millisecond.
