---
Title: rsyslog logging
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
This document explains the structure of Redis Enterprise Software log entries that go into `rsyslog`
and how to use these log entries to identify events.
Also, we recommend that you [secure your logs]({{< relref "/rs/security/logging.md" >}}) with a remote logging server and log rotation.

## Logging concepts

Redis Enterprise Software updates logs with entries from a variety of components in response to a host of actions and events that take place within the cluster.

Individual events may generate multiple log entries, even though they stem from a single action.

For example, in order for the cluster to decide that a cluster node is
down there might be various log entries added by different cluster
components from various nodes with different descriptions, until the
cluster gets to a final decision that the node is actually down. In
other cases, similar entries might be added to the log and the cluster
eventually gets to a decision that the node is
actually not down.

In addition, some actions that might seem to the user as an atomic
action, like removing a node from the cluster, are actually made up of
several different events that take place in a sequence, and might also
fail in the process.

As a result, all log entries displayed in the admin console are also written to `syslog`.  You can configure `rsyslog` to monitor `syslog`. Enabled alerts are logged to `syslog` along and appear with other log entries.


The log entries can be categorized into events and alerts. Events just
get logged, while alerts have a state attached to them. In the Mapping
UI events and alerts to log entries section below, there is a Category
column that calls out for each event whether it is an event or alert. RS
log entries include information about the specific event that occurred
as detailed below in the Log entry structure section. In addition,
rsyslog can be configured to add other information, like the event
severity for example.

Since rsyslog entries do not include the severity information by
default, you can use the following instructions in order to log that
information (in Ubuntu):
Add the following line to /etc/rsyslog.conf
$template TraditionalFormatWithPRI,"%pri-text%:%timegenerated%:%HOSTNAME%:%syslogtag%:%msg:::drop-last-lf%\n"

And modify $ActionFileDefaultTemplate to use your new template
$ActionFileDefaultTemplateTraditionalFormatWithPRI
Make sure to save the changes and restart rsyslog in order for the
changes to take effect. You can see the alerts and events under /var/log
in messages log file.

**Command components:**

- \%pri­text% ­adds the severity
- \%timegenerated% ­adds the timestamp
- \%HOSTNAME% ­adds the machine name
- \%syslogtag% ­the Redis Enterprise Software message as detailed below in the Log entry
    structure section
    below.
- \%msg:::drop­last­lf%n ­ removes duplicated log entries

### Log entry structure

The log entries have the following basic structure:
event_log\[\]:{\<list of key value pairs in any order\>}

- event_log­ plain static text is always shown at the beginning
    of the entry.
- processid­ the id of the process the logging in running under.
- listofkeyvaluepairsinanyorder­ a list of key value pairs describing
    the
    specific event. The key­values pairs can appear in any order. Some
    key­value pairs are always shown, and some appear depending on the specific event.
    - **Key­value pairs that always appear:**
        - "type" A unique code­name identifying the event logged. For
            the list of
            codenames relevant for this purpose please review the event
            code­name
            column in the Mapping UI events and alerts to log entries
            section below.
        - "object" has the format of "\[:\]". Defines the
            object type, and id if relevant, of the object this event is
            related to. For
            example cluster, node with id, bdb with id, etc'.
        - "time" unix time, can be ignored in this context.
    - **Key­value pairs that might appear depending on the specific
        entry:**
        - "state" boolean with value true or false. This is relevant
            only for
            entries from category alert. True means that the alert is
            on. False means
            that the alert is off.
        - "global_threshold" a value of a threshold for alerts
            related to the
            "cluster"or "node"objects.
        - "threshold" a value of a threshold for alerts related to the
            "bdb"
            object.

### Log entry samples

Below are examples of log entries that include the rsyslog configuration
mentioned above that add the severity, timestamp and machine name.

### Ephemeral storage passed threshold

**Alert on" log entry sample:**
daemon.warning:Jun1414:49:20node1event_log\[3464\]:{"storage_util":
90.061643120001,"global_threshold":"70″,"object":"node:1″,"state":
true,"time":1434282560,"type":"ephemeral_storage"}

The log entry above is an example of when the alert for node with id 1
"Ephemeral storage has reached 70% of its capacity" has been raised as
result of storage utilization reaching the value of \~90%.

**Log entry components:**

- daemon.warning ­ severity of entry is warning
- Jun1414:49:20­ the timestamp of the event
- node1­ machine name
- event_log­ static text that always appears
- \[3464\]­ process id
- "storage_util":90.061643120001­ current ephemeral storage
    utilization, in this
    case \~90%
- "global_threshold":"70″­ the user configured threshold above which
    the alert is
    raised, in this case it is 70%
- "object":"node:1″­ the object for which this alert has been raised
    for, in this case it
    is node with id 1
- "state":true­ current state of the alert, in this case it is on
- "time":1434282560­ can be ignored
- "type":"ephemeral_storage"­ is the code name identifier of this
    specific event, see
    full mapping in the Mapping UI events and alerts to log entries
    section below

**Alert off" log entry sample:**

daemon.info:Jun1414:51:35node1event_log\[3464\]:{"storage_util":
60.051723520008,"global_threshold":"70″,"object":"node:1″,"state":
false,"time":1434283480,"type":"ephemeral_storage"}

The log entry above is an example of when the alert for node with id 1
"Ephemeral storage has reached 70% of its capacity" has been turned off
as result of storage utilization reaching the value of \~60%.

**Log entry components**:

- daemon.info ­ severity of entry is info
- Jun1414:51:35­ the timestamp of the event
- node1­ machine name
- event_log­ static text that always appears
- \[3464\]­ process id
- "storage_util":60.051723520008­ current ephemeral storage
    utilization, in this
    case \~60%
- "global_threshold":"70″­ the user configured threshold above which
    the alert is
    raised, in this case it is 70%
- "object":"node:1″­ the object for which this alert has been raised
    for, in this case it
    is node with id 1
- "state":false­ current state of the alert, in this case it is on
- "time":1434283480­ can be ignored
- "type":"ephemeral_storage"­ is the code name identifier of this
    specific event, see
    full mapping in the Mapping UI events and alerts to log entries
    section below
    Odd number of nodes with a minimum of three nodes alert

**Alert on" log entry sample:**

daemon.warning:Jun1415:25:00node1event_log\[8310\]:{"object":
"cluster","state":true,"time":1434284700,"node_count":1,"type":
"even_node_count"}

The log entry above is an example of when the alert for "True high
availability requires an odd
number of nodes with a minimum of three nodes" has been turned on as
result of the cluster
having only one node.

**Log entry components:**

- daemon.warning­ severity of entry is warning
- Jun1415:25:00­ the timestamp of the event
- node1­ machine name
- event_log­ static text that always appears
- \[8310\]­ process id
- "object":"cluster"­ the object for which this alert has been raised
    for, in this case
    it is the cluster
- "state":true­ current state of the alert, in this case it is on
- "time":1434284700­ can be ignored
- "node_count":1­ the number of nodes in the cluster, in this case 1
- "type":"even_node_count"­ is the code name identifier of this
    specific event, see
    full mapping in the Mapping UI events and alerts to log entries
    section below

**Alert off" log entry sample:**

daemon.warning:Jun1415:30:40node1event_log\[8310\]:{"object":
"cluster","state":false,"time":1434285200,"node_count":3,"type":
"even_node_count"}

The log entry above is an example of when the alert for "True high
availability requires an odd
number of nodes with a minimum of three nodes" has been turned off as
result of the cluster
having 3 nodes.

**Log entry components:**

- daemon.info­ severity of entry is warning
- Jun1415:30:40­ the timestamp of the event
- node1­ machine name
- event_log­ static text that always appears
- \[8310\]­ process id
- "object":"cluster"­ the object for which this alert has been raised
    for, in this case
    it is the cluster
- "state":false­ current state of the alert, in this case it is off
- "time":1434285200­ can be ignored
- "node_count":3­ the number of nodes in the cluster, in this case 3
- "type":"even_node_count"­ is the code name identifier of this
    specific event, see
    full mapping in the Mapping UI events and alerts to log entries
    section below
    Node has insufficient disk space for AOF rewrite

**Alert on" log entry sample:**

daemon.err:Jun1513:51:23node1event_log\[34252\]:{"used":23457188,
"missing":604602126,"object":"node:1″,"free":9867264,"needed":
637926578,"state":true,"time":1434365483,"disk":705667072,"type":
"insufficient_disk_aofrw"}

The log entry above is an example of when the alert for "Node has
insufficient disk space for
AOF rewrite" has been turned on as result of not having enough
persistent storage disk space
for AOF rewrite purposes. It is missing 604602126 bytes.

**Log entry components:**

- daemon.err­ severity of entry is err
- Jun1513:51:23­ the timestamp of the event
- node1­ machine name
- event_log­ static text that always appears
- \[34252\]­ process id
- "used":23457188­ the amount of disk space in bytes currently used
    for AOF files
- "missing":604602126­ the amount of disk space in bytes that is
    currently missing for
    AOF rewrite purposes
- "object":"node:1″­ the object for which this alert has been raised
    for, in this case it
    is node with id 1
- "free":9867264­ the amount of disk space in bytes that is currently
    free
- "needed":637926578­ the amount of total disk space in bytes that is
    needed for AOF
    rewrite purposes
- state":true­ current state of the alert, in this case it is on
- "time":1434365483­ can be ignored
- "disk":705667072­ the total size in bytes of the persistent storage
- "type":"insufficient_disk_aofrw"­ is the code name identifier of
    this specific
    event, see full mapping in the Mapping UI events and alerts to log
    entries section below

"Alert off" log entry sample:
daemon.info:Jun1513:51:11node1event_log\[34252\]:{"used":0,"missing":
‐21614592,"object":"node:1″,"free":21614592,"needed":0,"state":
false,"time":1434365471,"disk":705667072,"type":
"insufficient_disk_aofrw"}

**Log entry components:**

- daemon.info­ severity of entry is info
- Jun1513:51:11­ the timestamp of the event
- node1­ machine name
- event_log­ static text that always appears
- \[34252\]­ process id
- "used":0­ the amount of disk space in bytes currently used for AOF
    files
- "missing":‐21614592­ the amount of disk space in bytes that is
    currently missing for
    AOF rewrite purposes, in this case it is not missing because the
    number is negative
- "object":"node:1″­ the object for which this alert has been raised
    for, in this case it
    is node with id 1
- "free":21614592­ the amount of disk space in bytes that is currently
    free
- "needed":0­ the amount of total disk space in bytes that is needed
    for AOF rewrite
    purposes, in this case no space is needed
- "state":false­ current state of the alert, in this case it is off
- "time":1434365471­ can be ignored
- "disk":705667072­ the total size in bytes of the persistent storage
- "type":"insufficient_disk_aofrw"­ is the code name identifier of
    this specific
    event, see full mapping in the Mapping UI events and alerts to log
    entries section below

## Mapping UI events and alerts to log entries

### Cluster and node related events

| **Event as shown in the UI** | **Event code­name** | **Object type** | **Category** | **Severity** | **Notes** |
|------------|-----------------|------------|-----------------|------------|-----------------|
| Node failed | failed | node | alert | critical | |
| Node joined | node_joined | cluster | event | info | |
| Node removed | node_remove_completed</br>node_remove_failed</br>node_remove_abort_completed</br>node_remove_abort_failed | cluster | event | info</br>error</br>info</br>error | The remove node is a process that can fail and can also be aborted. If aborted, the abort can succeed or fail. |
| Node memory has reached % of its capacity | memory | node | alert | true: warning</br>false: info | Has global_threshold parameter in the key/value section of the log entry. |
| Persistent storage has reached % of its capacity | persistent_storage | node | alert | true: warning</br>false: info | Has global_threshold parameter in the key/value section of the log entry. |
| Ephemeral storage has reached | ephemeral_storage | node | alert | true: warning</br>false: info | Has global_threshold parameter in the % of its capacity key/value section of the log entry. |
| CPU utilization has reached % | cpu_utilization | node | alert | true: warning</br>false: info | Has global_threshold parameter in the key/value section of the log entry. |
| Network throughput has reached MB/s | net_throughput | node | alert | true: warning</br>false: info | Has global_threshold parameter in the key/value section of the log entry. |
| Node has insufficient disk space for AOF rewrite | insufficient_disk_aofrw | node | alert | true: error</br>false: info | |
| Redis performance is degraded as result of disk I/O limits | aof_slow_disk_io | node | alert | true: error</br>false: info | |
| Cluster capacity is less than total memory allocated to its databases | ram_overcommit | cluster | alert | true: error</br>false: info | |
| Nodes rebalanced | rebalance_failed</br>rebalance_completed</br>rebalance_abort_failed</br>rebalance_abort_completed | cluster | event | error</br>info</br>error</br>info | The nodes rebalance is a process that can fail and can also be aborted. If aborted, the abort can succeed or fail. |
| Database replication requires at least two nodes in cluster | too_few_nodes_for_replication | cluster | alert | true: warning</br>false: info | |
| True high availability requires an odd number of nodes with a minimum of three nodes | even_node_count | cluster | alert | true: warning</br>false: info | |
| Not all nodes in the cluster are running the same Redis Enterprise Cluster version | inconsistent_rl_sw | cluster | alert | true: warning</br>false: info |
| Not all databases are running the same open source version | inconsistent_redis_sw | cluster | alert | true: warning</br>false: info | |

### Database related events

| **Event as shown in the UI** | **Event code-­name** | **Object type** | **Category** | **Severity** | **Notes** |
|------------|-----------------|------------|-----------------|------------|-----------------|
| Dataset size has reached % of the memory limit | size | bdb | alert | true: warning</br>false: info | Has threshold parameter in the key/value section of the log entry. |
| Throughput is higher than RPS (requests per second) | high_throughput | bdb | alert | true: warning</br>false: info | Has threshold parameter in the key/value section of the log entry. |
| Throughput is lower than RPS (requests per second) | low_throughput | bdb | alert | true: warning</br>false: info | Has threshold parameter in the key/value section of the log entry. |
| Latency is higher than msec | high_latency | bdb | alert | true: warning</br>false: info | Has threshold parameter in the key/value section of the log entry. |
| Periodic backup has been delayed for longer than minutes | backup_delayed | bdb | alert | true: warning</br>false: info | Has threshold parameter in the data: section of the log entry. |
| Replica Of ­database unable to sync with source | syncer_connection_error</br>syncer_general_error | bdb | alert | error</br>error |
| Replica Of sync lag is higher than seconds | high_syncer_lag | bdb | alert | true: warning</br>false: info | Has threshold parameter in the key/value section of the log entry. |
