---
Title: Redis Enterprise cluster system log entries
linkTitle: Cluster system log entries
description: Describe system log entries related to cluster events.
weight: 50
alwaysopen: false
categories: ["RS"]
---

This article describes system log entries related to Redis Enterprise cluster (RLEC) events and helps you  identify and respond to such events.

## General log concepts

RLEC adds to the log different log entries, from various cluster components, for various events and actions that take place in the cluster. 

There might be many different log entries for a specific event that can be perceived externally as a single event. For example, in order for the cluster to decide that a cluster node is down there might be various log entries added by different cluster components from various nodes with different descriptions, until the cluster gets to a final decision that the node is actually down. 

In other cases, similar entries might be added to the log and the cluster will eventually get to a decision that the node is actually not down. 

In addition, some actions that might seem to the user as an atomic action, like removing a node from the cluster, are actually made up of several different events that take place in a sequence, and might also fail in the process. 

As a result, Redis enabled that by default all logs entries that are shown in the log page in the management UI will also be written to syslog. Then rsyslog can be configured to monitor the syslog. 

All alerts are logged to syslog if the alerts are configured to be enabled, in addition to other log entries. 

The log entries can be categorized into events and alerts . Events just get logged, while alerts have a state attached to them. 

RLEC log entries include information about the specific event that occurred as detailed below in the Log entry structure section. 

In addition, rsyslog can be configured to add other information, like the event severity for example. Since rsyslog entries do not include the severity information by default, you can use the following instructions in order to log that information (in Ubuntu):

-   Add the following line to **/etc/rsyslog.conf**:  
    `$template TraditionalFormatWithPRI,"%pri-text%: 
       %timegenerated% %HOSTNAME% %syslogtag%%msg:::drop-last-lf%\n"`

-   modify `$ActionFileDefaultTemplate` to use your new template:
    `$ActionFileDefaultTemplate TraditionalFormatWithPRI`

Make sure to save the changes and restart rsyslog in order for the
changes to take effect. you can see the alerts & events under /var/log
in messages log file.

Article continues...