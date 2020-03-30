---
Title: Troubleshooting RedisInsight
date: 2019-10-31 10:49:29 +0000
weight: 200
categories: ["RI"]
path: troubleshooting/
nextStep:
    Title: Memory Analysis
    href: /docs/features/troubleshooting/
---
## Logs

To get detailed information about errors in RedisInsight, you can review the log files with the `.log` extension in:

- **Docker**: In the `/db/` directory *inside the container*.
- **Mac**: In the `/Users/<your-username>/.redisinsight` directory.
- **Windows**: In the `C:\Users\<your-username>\.redisinsight` directory.
- **Linux**: In the `/home/<your-username>/.redisinsight` directory.

For additional configuration options, such as changing the default port, please see the following page:https://docs.redislabs.com/latest/ri/installing/configurations/

{{% note %}}
For not supported operating system version, you can install RedisInsight for the operating system, but it may have unexpected behavior.
We are happy to receive any feedback at redisinsight@redislabs.com.
{{% /note %}}
