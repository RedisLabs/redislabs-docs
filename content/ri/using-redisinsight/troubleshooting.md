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
When RedisInsight doesn't behave as expected, use these steps to see what the problem is.

For additional configuration options, such as changing the default port, go to: https://docs.redislabs.com/latest/ri/installing/configurations/

## Logs

To get detailed information about errors in RedisInsight, you can review the log files with the `.log` extension in:

- **Docker**: In the `/db/` directory *inside the container*.
- **Mac**: In the `/Users/<your-username>/.redisinsight` directory.
- **Windows**: In the `C:\Users\<your-username>\.redisinsight` directory.
- **Linux**: In the `/home/<your-username>/.redisinsight` directory.

{{< note >}}
You can install RedisInsight on operating systems that are not officially supported, but it may not behave as expected.
{{< /note >}}

We are happy to receive your feedback at redisinsight@redis.com.

## Using behind a reverse proxy

When you configure RedisInsight to run behind a reverse proxy like NGINX:

- Since some requests can be long-running, we recommend that the **request timeout is set to over 30 seconds** on the reverse proxy.
- Hosting RedisInsight behind a prefix path (path-rewriting) is not supported at this time.
