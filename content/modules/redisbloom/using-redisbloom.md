---
Title: Using RedisBloom in Redis Enterprise Software (RS)
description: 
weight: 40
alwaysopen: false
categories: ["Modules"]
---
To use RedisBloom, the first thing you need is to [download and install the package]({{< relref "/modules/installing.md" >}})
into the RS cluster, and then create a database that uses the module.

{{< embed-md "tryout-redisbloom.md" >}}

### Debugging Bloom filters

Finally, I added a BF.DEBUG command, to see exactly how the filter is
being utilized:

```src
 127.0.0.1:6379> BF.DEBUG test
 1) "size:987949"
 2) "bytes:239627 bits:1917011 hashes:14 capacity:100000 size:100000 ratio:0.0001"
 3) "bytes:551388 bits:4411101 hashes:16 capacity:200000 size:200000 ratio:2.5e-05"
 4) "bytes:1319180 bits:10553436 hashes:19 capacity:400000 size:400000 ratio:3.125e-06"
 5) "bytes:3215438 bits:25723497 hashes:23 capacity:800000 size:287949 ratio:1.95313e-07"
```

This outputs the total number of elements as the first result, and then
a list of details for each filter in the chain. As you can see, whenever
a new filter is added, its capacity grows exponentially and the
strictness for errors increases.

Note that this filter chain also uses a total of 5MB. This is still much
more space efficient than alternative solutions, since we're still at
about 5 bytes per element, and the uppermost filter is only at about 12%
utilization. Had the initial capacity been greater, more space would
have been saved and lookups would have been quicker.
