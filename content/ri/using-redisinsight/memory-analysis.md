---
Title: Memory Analysis
date: 2018-06-14 03:49:29 +0530
weight: 50
categories: ["RI"]
path: features/memory-analysis/
---
RedisInsight Memory analysis help you analyze your redis instance and helps in reducing memory usage and improving application performance. Analysis can be done in two ways:

1. **online mode** - In this mode, RedisInsight downloads a rdb file from your connected redis instance and analyzes it to create a temp file with all the keys and meta data required for analysis. In case there is a master-slave connection, RedisInsight downloads the dump from the slave instead of the master in order to avoid affecting the performance of the master.

1. **offline mode** - In this mode, RedisInsight analyzes your redis backup files. These files can either be present in your system or on s3. RedisInsight accepts a list of rdb files given to it and analyzes all the information required from these files instead of downloading it from your redis instance. In order to analyze backup files stored in s3, RedisInsight should have ReadOnly permission to your s3 bucket where the files are stored.
Specify the name of the s3 bucket and the path to the rdb file.

![s3_memory_analysis](/images/ri/s3-memory-analysis-dialog.png)

## Running memory analysis on an instance

Navigte to Memory Analysis > Overview, and then click the "Analyze Now" button. You should see a dialog box with two options - Offline Analysis and Online Analysis.

Choose the offline analysis approach if you have a RDB Backup file that you want to analyze. We can proceed with online analysis.

![online_memory_analysis](/images/ri/online_memory_analysis.png)

Memory analysis can take several minutes, and largely depends on the size of your data.

![snapshot_processing_screen](/images/ri/snapshot_processing_screen.png)

Once memory analysis completes, you can see various statistics about memory consumption under Memory Analysis. The overview page gives you a high level breakup of memory usage.

## Memory overview

Memory overview gives you an overview of your redis instance through graphical representation. Memory breakup by data type shows the overall size and count distribution of keys based on each data type. Expiry analysis gives a overview of how your keys are configured to expire. There could be a few keys which never expire.

![memory_overview](/images/ri/memory_overview.png)

## Keyspace summary

Keyspace Summary identifies the top key patterns from the set of keys in decending order of memory. This helps you identify which key patterns are consuming most of your memory and what are the top keys for that pattern. You can add your own key patterns in order to identify their memory usage and the top keys for that key pattern.

![keyspace_summary](/images/ri/keyspace_summary.png)

## Recommendations

RedisInsight provide recommendations on how you can save your memory. The recommendations are specially curated according to your Redis instance. These recommendations have been formed based on industry standards and our own experiences.

![memory_recommendations](/images/ri/memory_recommendations.png)

## Memory analyzer

Memory Analyzer lets you search a key or key patterns and get related information regarding it with other stats. You can apply various filters and aggregations using our advance filters feature.

![memory_usage_by_key](/images/ri/memory_usage_by_key.png)

## How memory analysis works

Here's a brief description of what goes on under the hood when you analyze a snapshot:
When the `analyze-memory` button is clicked, it connects to the redis instance and takes a point-in-time snapshot of the database.
This can be done in two ways:

  1. Using the [SYNC](https://redis.io/commands/sync) command.
     This is the preferred approach and is used if possible.
     Redis has a `SYNC` command that slaves use to synchronize with the master.
     Our agent pretends to be a slave and sends the `SYNC` command to the instance, which responds with all its data as it would to a slave trying to synchronize with it.
  1. Using the [DUMP](https://redis.io/commands/dump) command.
     Cloud providers do not support the `SYNC` command, so that approach won't work.
     But they do support the `DUMP` command.
     This command serializes the value of a key in a redis-specific format and returns it.
     We scan all the keys iteratively, dump the values, and concatenate them to generate an RDB.
     There are a couple of caveats with this method, among them being that the serialization format is opaque and non-standard and that all the keys are not dumped at the exact same time, meaning that some keys' values may have changed since the time the first key was dumped, making this not an exact point-in-time snapshot.

 After we have the dump, following either of the approaches mentioned above, we perform analysis on the dump, computing memory statistics and discovering key patterns. What happens here is similar to what is done by the open source [redis-rdb-tools](https://github.com/sripathikrishnan/redis-rdb-tools). The result of this process is an **RSNAP** file (stands for redis snapshot), which contains the key names, memory statistics and other generated information about the dump, but importantly, not the values of the keys themselves. The dump file never really leaves the system the agent runs on.

 After the RSNAP file is completely generated, it is used to generate recommendations. We have over 20 recommendations at this point which give you simple advice on how to optimize your redis database.

 So that's a very brief overview of what happens under the hood at RedisInsight. We are constantly working on improving our process and we've had quite a bit of back and forth about the exact mechanism of the entire process. It goes without saying that the process keeps evolving and might even look very different in the near future. We'll try to keep this page updated with all significant changes, so check back here or follow our blog to stay updated.
