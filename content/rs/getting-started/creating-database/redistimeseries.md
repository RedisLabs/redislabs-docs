---
Title: RedisTimeSeries Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
RedisTimeSeries is a Redis Module adding a Time Series data structure to Redis.

## Features

- Query by start time and end-time
- Query by labels sets
- Aggregated queries (Min, Max, Avg, Sum, Range, Count, First, Last) for any time bucket
- Configurable max retention period
- Compaction/Roll-ups - automatically updated aggregated timeseries
- labels index - each key has labels which will allows query by labels

## Using with other tools metrics tools

In the [RedisTimeSeries](https://github.com/RedisTimeSeries) organization you can
find projects that help you integrate RedisTimeSeries with other tools, including:

1. Prometheus - [Adapter for Prometheus](https://github.com/RedisTimeSeries/prometheus-redistimeseries-adapter) to use RedisTimeSeries as backend db.
1. StatsD, Graphite exports using graphiGote protocol.
1. Grafana - using SimpleJson datasource.

## Memory model

A time series is a linked list of memory chunks.
Each chunk has a predefined size of samples.
Each sample is a tuple of the time and the value of 128 bits,
64 bits for the timestamp and 64 bits for the value.

## Setup

You can either get RedisTimeSeries setup in a Docker container or on your own machine.

### Docker

To quickly try out RedisTimeSeries, launch an instance using docker:

```sh
docker run -p 6379:6379 -it --rm redislabs/redistimeseries
```

### Build and Run it yourself

You can also build and run RedisTimeSeries on your own machine.

#### Requirements

- build-essential
- The RedisTimeSeries repository: `git clone https://github.com/RedisTimeSeries/RedisTimeSeries.git`

#### Build

```bash
cd RedisTimeSeries
git submodule init
git submodule update
cd src
make all
```

#### Run

In your redis-server run: `loadmodule redistimeseries.so`

For more information about modules, go to the [redis official documentation](https://redis.io/topics/modules-intro).

#### Create a new database that uses the Module

1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the RedisTimeSeries module.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Show advanced options** and put **12544** for the port.
1. Click the **Activate** button

## Give it a try

After you setup RedisTimeSeries, you can interact with it using redis-cli.

Here we'll create a time series representing sensor temperature measurements.
After you create the time series, you can send temperature measurements.
Then you can query the data for a time range on some aggregation rule.

### With `redis-cli`

```sh
$ redis-cli
127.0.0.1:6379> TS.CREATE temperature RETENTION 60 LABELS sensor_id 2 area_id 32
OK
127.0.0.1:6379> TS.ADD temperature:3:11 1548149181 30
OK
127.0.0.1:6379> TS.ADD temperature:3:11 1548149191 42
OK
127.0.0.1:6379>  TS.RANGE temperature:3:11 1548149180 1548149210 AGGREGATION avg 5
1) 1) (integer) 1548149180
   2) "30"
2) 1) (integer) 1548149190
   2) "42"
```

### Client libraries

Some languages have client libraries that provide support for RedisTimeSeries commands:

| Project | Language | License | Author | URL |
| ------- | -------- | ------- | ------ | --- |
| JRedisTimeSeries | Java | BSD-3 | [RedisLabs](https://redislabs.com/) | [Github](https://github.com/RedisTimeSeries/JRedisTimeSeries/) |
| redistimeseries-go | Go | Apache-2 | [RedisLabs](https://redislabs.com/) | [Github](https://github.com/RedisTimeSeries/redistimeseries-go) |
| redistimeseries-py | Python | BSD-3 | [RedisLabs](https://redislabs.com/) | [Github](https://github.com/RedisTimeSeries/redistimeseries-py) |
