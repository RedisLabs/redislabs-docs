---
Title: Profiler
date: 2018-06-14 03:49:29 +0530
weight: 60
categories: ["RI"]
path: features/profiler/
---
RedisInsight Profiler runs Redis ```MONITOR``` command, which analyzes every command sent to the redis instance. It parses the output of the MONITOR command and generates a summarized view. All the commands sent to the redis instance are monitored for the duration of the profiling.

Profiler gives information about the number of commands processed, commands/second and number of connected clients. It also gives information about top prefixes, top keys and top commands.

**Start profiling** - Starts the profiling.

**Stop Profiling** - Stops the profiler i.e. the monitor command.

![profile](/images/ri/profile.png)

{{< note >}}
Running monitor command is dangerous to the performance of your production server, hence the profiler is run for a maximum time of 5 minutes, if the user has not stopped it in between. This is to avoid overload on the server.
{{< /note >}}
