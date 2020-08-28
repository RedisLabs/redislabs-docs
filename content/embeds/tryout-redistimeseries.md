## Quick start with redis-cli

After you set up RedisTimeSeries, you can interact with it using redis-cli.

Here we'll create a time series representing sensor temperature measurements.
After you create the time series, you can send temperature measurements.
Then you can query the data for a time range on some aggregation rule.

### With `redis-cli`

Connect to redis.

```sh
$ redis-cli -p 12543
127.0.0.1:12543>
```

Run these commands:

```sh
127.0.0.1:12543> TS.CREATE temperature RETENTION 60 LABELS sensor_id 2 area_id 32
OK
127.0.0.1:12543> TS.ADD temperature:3:11 1548149181 30
OK
127.0.0.1:12543> TS.ADD temperature:3:11 1548149191 42
OK
127.0.0.1:12543>  TS.RANGE temperature:3:11 1548149180 1548149210 AGGREGATION avg 5
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
