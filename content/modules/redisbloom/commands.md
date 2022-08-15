---
Title: RedisBloom commands 
linkTitle: Commands 
description: Lists RedisBloom commands and provides links to the command reference pages.
weight: 25
alwaysopen: false
toc: "true"
categories: ["Modules"]
---

The following table lists RedisBloom commands. See the command links for more information about each command's syntax, arguments, and examples.

## Bloom filter commands

| Command | Description |
|---------|-------------|
| [BF.ADD](https://redis.io/commands/bf.add) | Adds an item to the filter. |
| [BF.EXISTS](https://redis.io/commands/bf.exists) | Checks if an item exists in the filter. |
| [BF.INFO](https://redis.io/commands/bf.info) | Returns information about a Bloom filter. |
| [BF.INSERT](https://redis.io/commands/bf.insert) | Adds multiple items to a filter. If the key does not exist, it creates a new filter. |
| [BF.LOADCHUNK](https://redis.io/commands/bf.loadchunk) | Restores a Bloom filter previously saved with [BF.SCANDUMP](https://redis.io/commands/bf.scandump). |
| [BF.MADD](https://redis.io/commands/bf.madd) | Adds multiple items to the filter. |
| [BF.MEXISTS](https://redis.io/commands/bf.mexists) | For multiple items, checks if each item exists in the filter. |
| [BF.RESERVE](https://redis.io/commands/bf.reserve) | Creates a Bloom filter. Sets the false positive rate and capacity. |
| [BF.SCANDUMP](https://redis.io/commands/bf.scandump) | Starts an incremental save of a Bloom filter. |

## Cuckoo filter commands

| Command | Description |
|---------|-------------|
| [CF.ADD](https://redis.io/commands/cf.add) | Adds an item to a filter. |
| [CF.ADDNX](https://redis.io/commands/cf.addnx) | Adds an item to a filter only if the item does not already exist. |
| [CF.COUNT](https://redis.io/commands/cf.count) | Returns the probable number of times an item occurs in the filter. |
| [CF.DEL](https://redis.io/commands/cf.del) | Removes one instance of an item from the filter. |
| [CF.EXISTS](https://redis.io/commands/cf.exists) | Checks if an item exists in the filter. |
| [CF.INFO](https://redis.io/commands/cf.info) | Returns information about a cuckoo filter. |
| [CF.INSERT](https://redis.io/commands/cf.insert) | Adds multiple items to a filter. Optionally sets the capacity if the filter does not already exist. |
| [CF.INSERTNX](https://redis.io/commands/cf.insertnx) | Adds multiple items to a filter if they do not already exist. Optionally sets the capacity if the filter does not already exist. |
| [CF.LOADCHUNK](https://redis.io/commands/cf.loadchunk) | Restores a cuckoo filter previously saved with [CF.SCANDUMP](https://redis.io/commands/cf.scandump). |
| [CF.MEXISTS](https://redis.io/commands/cf.mexists) | For multiple items, checks if each item exists in the filter. |
| [CF.RESERVE](https://redis.io/commands/cf.reserve) | Creates a cuckoo filter and sets its capacity. |
| [CF.SCANDUMP](https://redis.io/commands/cf.scandump) | Starts an incremental save of a cuckoo filter. |

## Count-min sketch commands

| Command | Description |
|---------|-------------|
| [CMS.INCRBY](https://redis.io/commands/cms.incrby) | Increases item counts. |
| [CMS.INFO](https://redis.io/commands/cms.info) | Returns width, depth, and total count of the sketch. |
| [CMS.INITBYDIM](https://redis.io/commands/cms.initbydim) | Initializes a count-min sketch to the specified dimensions (width and depth). |
| [CMS.INITBYPROB](https://redis.io/commands/cms.initbyprob) | Initializes a count-min sketch to allow the specified overestimation percent for the item count and the probability of overestimation. |
| [CMS.MERGE](https://redis.io/commands/cms.merge) | Merges several sketches into one sketch. |
| [CMS.QUERY](https://redis.io/commands/cms.query) | Returns the count for one or more items in a sketch. |

## Top-k commands

| Command | Description |
|---------|-------------|
| [TOPK.ADD](https://redis.io/commands/topk.add) | Adds an item to the data structure. |
| [TOPK.COUNT](https://redis.io/commands/topk.count) | Returns probable item counts. |
| [TOPK.INCRBY](https://redis.io/commands/topk.incrby) | Increases the score of an item by the specified number. |
| [TOPK.INFO](https://redis.io/commands/topk.info) | Returns the number of required items (k), width, depth, and decay values. |
| [TOPK.LIST](https://redis.io/commands/topk.list) | Returns the keys of items in the top-k list. Optionally returns their item counts. |
| [TOPK.QUERY](https://redis.io/commands/topk.query) | Checks whether an item is one of top-k items. |
| [TOPK.RESERVE](https://redis.io/commands/topk.reserve) | Initializes a top-k with the specified number of top occurring items to keep, width, depth, and decay. |

## T-digest sketch commands

| Command | Description |
|---------|-------------|
| [TDIGEST.ADD](https://redis.io/commands/tdigest.add) | Adds one or more samples to a t-digest sketch. |
| [TDIGEST.CDF](https://redis.io/commands/tdigest.cdf) | Estimates the fraction of all observations which are less than or equal to the specified value. |
| [TDIGEST.CREATE](https://redis.io/commands/tdigest.create) | Allocates memory and initializes a t-digest sketch. |
| [TDIGEST.INFO](https://redis.io/commands/tdigest.info) | Returns information about the t-digest sketch. |
| [TDIGEST.MAX](https://redis.io/commands/tdigest.max) | Returns the maximum value from the sketch. |
| [TDIGEST.MERGE](https://redis.io/commands/tdigest.merge) | Copies values from one sketch to another. |
| [TDIGEST.MERGESTORE](https://redis.io/commands/tdigest.mergestore) | Merges multiple sketches and stores the combined sketch in a new key. |
| [TDIGEST.MIN](https://redis.io/commands/tdigest.min) | Returns the minimum value from the sketch. |
| [TDIGEST.QUANTILE](https://redis.io/commands/tdigest.quantile) | Estimates one or more cutoffs. |
| [TDIGEST.RESET](https://redis.io/commands/tdigest.reset) | Resets the sketch and reinitializes it. |
| [TDIGEST.TRIMMED_MEAN](https://redis.io/commands/tdigest.trimmed_mean) | Estimates the mean value from the sketch, excluding values outside the specified range. |
