---
Title: Log security
description:
weight: 50
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise comes with [a set of logs]({{< relref "/rs/administering/logging/_index.md" >}}) on the server and available through the user interface to assist users in investigating actions taken on the server and to troubleshoot issues.

## Sending logs to a remote logging server

Redis Enterprise sends logs to syslog by default. You can send these logs to a remote logging server by configuring syslog.

To do this, modify the syslog or rsyslog configuration on your operating system to send logs in `/var/opt/redislabs/log` to a remote monitoring server of your choice.

## Log rotation

Redis Enterprise uses the default logrotate daemon to schedule rotation of logs stored on the operating system. The configuration of log rotation may be found at /etc/logrotate.d.

By default the log rotation should occur on a daily basis. Redis Labs reccomends sending log files to a remote logging server so that they can be more effectively maintained.

The below log rotation policy is enabled by default with Redis Enterprise but can be modified to meet your needs.

```sh
/var/opt/redislabs/log/*.log
{ 
  daily
  missingok
  copytruncate
  rotate 7
  compress
  notifempty
}
```

Below describes what the log rotation this configuration policy puts into effect.

- `/var/opt/redislabs/log/*.log` - When logrotate runs it checks the files under directory `/var/opt/redislabs/log/` and rotates any files that end with the extension .log.

- Daily - The interval is set to daily.

- Missingok - If there are missing logfiles don't do anything.

- Copytruncate - Truncate the original log file to zero sizes after creating a copy.

- rotate 7 - Keep 7 log files and delete the rest.

- compress - gzip log files.

- notifempty - Don't rotate the log file if it is empty

{{< note >}}
For large scale deployments, it may be nessesary to rotate logs at quicker intervals, such as hourly. This can be done through a cronjob or external vendor solutions.
{{< /note >}}
