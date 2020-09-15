---
Title: Stopping a Node with Persistence
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Because Redis is an in-memory database,
when you stop a machine that hosts a Redis Enterprise Software (RS) node that has databases with persistence enabled, either:

- Redis can delay the machine shutdown as the databases with persistence enabled try to save the data to disk.
    The length of the delay depends on the number of databases and the size of the data.
- The operating system can force the node to stop before all of the data is saved to disk. This results in data loss.

To gracefully stop RS and make sure that data is saved,
we recommended that you stop the RS processes so that RS saves the data to disk.
Then you can stop the node without risk of delay or data loss.

{{< note >}}
To avoid risk of data loss and cluster instability,
we recommend that at most only one node in the cluster be down at any time.
{{< /note >}}

To stop the RS processes, run:

```sh
sudo supervisorctl stop all
```

Wait for this process to finish and then stop the node.
