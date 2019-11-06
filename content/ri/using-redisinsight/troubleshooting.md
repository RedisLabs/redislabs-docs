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

When things don't work and the error messages in the application aren't helpful, look into the logs to know what's wrong. The log files can be found in the following paths depending on the platform you are using:

- **Docker**: In the `/db/` directory *inside the container*.
- **Mac**: In the `/Users/<your-username>/.redisinsight` directory.
- **Windows**: In the `C:\Users\<your-username>\.redisinsight` directory.
- **Linux**: In the `/home/<your-username>/.redisinsight` directory.

There will be several log files ending with the `.log` file extension.
