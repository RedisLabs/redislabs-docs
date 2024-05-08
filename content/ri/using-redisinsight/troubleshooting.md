---
Title: Troubleshooting Redis Insight
date: 2024-05-08 10:49:29 +0000
weight: 200
categories: ["RI"]
path: troubleshooting/
nextStep:
    Title: Troubleshooting
    href: /docs/features/troubleshooting/
---
When Redis Insight doesn't behave as expected, use these steps to see what the problem is.

For additional configuration options, such as changing the default port, go to: https://docs.redislabs.com/latest/ri/installing/configurations/

## Logs

To get detailed information about errors in Redis Insight, you can review the log files with the `.log` extension in:

- **Docker**: In the `/data/logs` directory *inside the container*.
- **Mac**: In the `/Users/<your-username>/.redis-insight` directory.
- **Windows**: In the `C:\Users\<your-username>\.redis-insight` directory.
- **Linux**: In the `/home/<your-username>/.redis-insight` directory.

{{< note >}}
You can install Redis Insight on operating systems that are not officially supported, but it may not behave as expected.
{{< /note >}}

We are happy to receive your feedback in our repository - https://github.com/RedisInsight/RedisInsight/issues.

## Using behind a reverse proxy

When you configure Redis Insight to run behind a reverse proxy like NGINX:

- Since some requests can be long-running, we recommend that the **request timeout is set to over 30 seconds** on the reverse proxy. Redis Insight also allows to manage its connection timeout (30 seconds by default) on the form to manage the connection details, remember to change it accordingly.
- Hosting Redis Insight behind a prefix path (path-rewriting) is not supported at this time.
