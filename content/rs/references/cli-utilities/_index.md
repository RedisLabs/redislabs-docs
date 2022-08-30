---
Title: Command-line utilities
linkTitle: Command-line utilities
description: Documents the command-line utilities included with Redis Enterprise Software.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

Redis Enterprise Software includes a set of utilities to help you manage and test your cluster. To use a utility, run it from the command line.

## Public utilities

Administrators can use these CLI tools to manage and test a Redis Enterprise cluster. You can find the binaries in the `/opt/redislabs/bin/` directory.

{{<table-children columnNames="Utility,Description" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}

## Internal utilities

The `/opt/redislabs/bin/` directory also contains utilities used internally by Redis Enterprise Software and for troubleshooting.

{{<warning>}}
Do not use these tools for normal operations.
{{</warning>}}

| Utility | Description |
|---------|-------------|
| bdb-cli | `redis-cli` connected to a database. |
| ccs-cli | Inspect Cluster Configuration Store. |
| cnm-ctl | Manages services for provisioning, migration, monitoring, <br />resharding, rebalancing, deprovisioning, and autoscaling. |
| consistency_checker | Checks the consistency of Redis instances. |
| crdbtop | Monitor Active-Active databases. |
| debug_mode | Enables debug mode. |
| debuginfo | Collects cluster information. |
| dmc-cli | Configure and monitor the DMC proxy. |
| pdns_control | Sends commands to a running PowerDNS nameserver. |
| redis_ctl | Stops or starts Redis instances. |
| rl_rdbloader | Load RDB backup files to a server. |
| rlutil | Maintenance utility. |
| shard-cli | `redis-cli` connected to a shard. |
| supervisorctl | Manages the lifecycles of Redis Enterprise services. |
