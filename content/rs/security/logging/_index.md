---
Title: Logging
description:
weight: 50
alwaysopen: false
categories: ["RS"]
---

Redis Enterprise comes with a set of logs on the server and available through the user interface to assist users in investigating actions taken on the server and to troubleshoot issues.

## Sending logs to a remote logging server
Redis Enterprise sends logs to syslog by default. You can send these  logs to a remote logging server by configuring syslog. 

To do this, modify the syslog or rsyslog configuration on your operating system to send logs in /var/opt/redislabs/log to a remote monitoring server of your choice.


## Viewing logs in the user interface
Redis Enterprise provides log files for auditing and troubleshooting. You can see these logs in the admin console and on the host operating system.

To view the audit logs:

1. Log in to the Redis Enterprise Software admin console
1. Go to the Log tab
1. Review logs directly in the UI, or export them to CSV using the export button

## Viewing logs on the server

Server logs can be found by default in the directory /var/opt/redislabs/log/

These log files are used by the Redis Labs support team to troubleshoot issues. The logs you will most frequently interact with is 'event_log.log'. This log file is where logs of configuration actions within Redis are stored and is useful to determine events that occur within Redis Enterprise.

## Log Rotation

Redis Enterprise uses the default logrotate daemon to schedule rotation of logs stored on the operating system. The configuration of log rotation may be found at /etc/logrotate.d.

By default the log rotation should occur on a daily basis. Redis Labs reccomends sending log files to a remote logging server so that they can be more effectively maintained.

The below log rotation policy is enabled by default with Redis Enterprise but may be modified to meet your needs. 

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

- /var/opt/redislabs/log/*.log: when logrotate runs it checks the files under directory /var/opt/redislabs/log/ and rotates any files that end with the extension .log

- Daily: The interval is set to daily.

- Missingok: If there are missing logfiles don't do anything.

- Copytruncate: Truncate the original log file to zero sizes after creating a copy.

- rotate 7: Keep 7 log files and delete the rest.

- compress: gzip log files.

- notifempty: Don't rotate the log file if it is empty

{{< note >}}
For large scale deployments, it may be nessesary to rotate logs at quicker intervals, such as hourly. This can be done through a cronjob or external vendor solutions.
{{< /note >}}

## Setting Log Timestamps

Redis Enterprise allows you to configure log timestamps. To configure log timestamps:

1. In **Settings** > **General** navigate to the timezone section.
1. Select the timezone for the logs based on your location

