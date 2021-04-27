---
Title: Benchmarking Redis Enterprise
description:
weight: 50
alwaysopen: false
categories: ["RS"]
---
If you need to do a quick performance benchmark of Redis Enterprise, we
have a tool just for this; memtier_benchmark.

Prerequisites:

- Redis Enterprise Software installed
- A cluster configured
- A database created

If you need a quick setup for the prerequisites, please [go
here]({{< relref "/rs/getting-started/_index.md" >}}).

It is recommended to run memtier_benchmark on a separate node that is
not part of the cluster being tested. If you run it on a node of the
cluster, be mindful that it affects the performance of both the
cluster and memtier_benchmark.

```sh
/opt/redislabs/bin/memtier_benchmark -s $DB_HOST -p $DB_PORT -a $DB_PASSWORD -t 4 -R --ratio=1:1
```

This command instructs memtier_benchmark to connect to your Redis
Enterprise database and generates a load doing the following:

- A 50/50 Set to Get ratio
- Each object has random data in the value

## Populate a database with testing data

If you need to populate a database with some test data for a proof of
concept, or failover testing, etc. here is an example for you.

```sh
/opt/redislabs/bin/memtier_benchmark -s $DB_HOST -p $DB_PORT -a $DB_PASSWORD -R -n allkeys -d 500 --key-pattern=P:P --ratio=1:0
```

This command instructs memtier_benchmark to connect to your Redis
Enterprise database and generates a load doing the following:

- Write objects only, no reads
- A 500 byte object
- Each object has random data in the value
- Each key has a random pattern, then a colon, followed by a
    random pattern.

Run this command until it fills up your database to where you want it
for testing. The easiest way to check is on the database metrics page.

![memtier_metrics_page](/images/rs/memtier_metrics_page.png)

Another use for memtier_benchmark is to populate a database with data
for failure testing.
