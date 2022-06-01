---
Title: Authenticate database users
linkTitle: Authenticate database users
date: 2022-05-24 00:00:00 +0000
weight: 17
categories: ["RI"]
aliases: /ri/using-redisinsight/auth-database/
---
You can enforce authentication of users who share your databases by running Redisinsight with variables `RIAUTHPROMPT`,   `RIAUTHTIMER`, and `RILOGLEVEL`. For more information on variables, see [Configure RedisInsight](../../installing/configurations).

By setting the variables, enforce the prompt for username and password each time the database is opened and at a specific time interval while users work with the database. You can maintain multiple tabs with the same database without having to enter username and password in each one.

* For Windows and Linux:
```bash
docker run -p 8001:8001-e RIAUTHPROMPT=5 -e RIAUTHTIMER=1 redislabs/redisinsight # 5 minutes idle timer 
```

* For Mac:
```bash
docker run -p 8001:8001-e RIAUTHPROMPT=5 -e RIAUTHTIMER=1 redislabs/redisinsight # 5 minutes idle timer 
```

Where:
* `RIAUTHPROMPT` enables authentication prompt when opening instances and when the user is idle
* `RIAUTHTIMER` sets user idle timer value in minutes
* `RILOGLEVEL` logs to console/file

{{< note >}}
Do not store username and password in the browser.
{{< /note >}}

