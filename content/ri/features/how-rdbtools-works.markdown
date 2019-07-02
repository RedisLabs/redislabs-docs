---
layout: docs
title:  How Rdbtools Works
description: How Rdbtools Works
date:  2018-03-26 16:49:29 +0530
category: docs
permalink: docs/how-rdbtools-works/
pageTitle: How Memory Analysis Works
altTag: How RDBTools Works
---
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

 After the RSNAP file is completely generated, it is uploaded to our servers where further analysis is done to generate recommendations. We have over 20 recommendations at this point which give you simple advice on how to optimize your redis database.

 So that's a very brief overview of what happens under the hood at Rdbtools. We are constantly working on improving our process and we've had quite a bit of back and forth about the exact mechanism of the entire process. It goes without saying that the process will keep evolving and might even look very different in the near future. We'll try to keep this page updated with all significant changes, so check back here or follow our blog to stay updated.
