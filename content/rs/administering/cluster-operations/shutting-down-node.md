---
Title: Shutting Down a Node
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you shut down a machine acting as a Redis Enterprise Software (RS)
node, databases that have persistence enabled will attempt to persist
all data to disk before shutting down. Depending on the number of
databases and their size, the persistence operation might take a long
time and result in the machine shutdown taking a very long time. In
other cases, the operating system might force shutdown before all data
has been persisted to disk, resulting in data loss.

In order to ensure proper data persistence with no data loss it is
recommended to run the following command from the operating system
command-line-interface (CLI) and wait for it to finish before shutting
down the machine:

```src
$ sudo supervisorctl stop all
```

Note: You should only shut down one node at a time.
