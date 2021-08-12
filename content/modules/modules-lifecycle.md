---
Title: Module lifecycle
description:
weight: 7
alwaysopen: false
categories: ["Modules"]
---
You can view the Redis Enterprise Software subscription agreement [here](https://redislabs.com/company/terms-of-use#software).
This lifecycle fully reflects our subscription agreement.
However, for any discrepancy between the two policies, the subscription agreement prevails.

Redis Enterprise Software follows the [RS lifecycle]({{< relref "/rs/administering/product-lifecycle.md" >}}).

## Modules release numbering

Redis uses a three-place numbering scheme to designate released versions of its Redis Enterprise Modules.
The format is “Major1.Major2.Minor”.

- Major sections of the version number represents fundamental changes and additions in
    capabilities to the module. The Major1 and Major2 part of the
    version number are incremented based on the size and scale of the changes in each
    release.
- The Minor section of the version number represents quality improvements and fixes to
    existing capabilities. We increment the minor number when many quality improvements
    are added to the release.

## Modules end of life schedule {#modules-endoflife-schedule}

End-of-Life for a given Major version is 18 months after the formal release of
that version or 12 months after the release of the following version, whichever comes last.

### RediSearch

{{< table-csv "redisearch-lifecycle.csv" 2 >}}

### RedisBloom

{{< table-csv "redisbloom-lifecycle.csv" 2 >}}

### RedisTimeSeries

{{< table-csv "redistimeseries-lifecycle.csv" 2 >}}

### RedisGraph

{{< table-csv "redisgraph-lifecycle.csv" 2 >}}

### RedisJSON

{{< table-csv "redisjson-lifecycle.csv" 2 >}}
