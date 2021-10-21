---
Title: Alert object
linkTitle: alert
description: An object that contains alert info
weight: $weight
alwaysopen: false
categories: ["RS"]
---

You can get, configure, and enable various alerts for the cluster.

Alerts are bound to a cluster object (such as a bdb or node), and the cluster's state determines whether the alerts turn on or off.

  Name  | Type/Value | Description | Writable
|-------|------------|-------------|----------|
| enabled       | boolean | If true, alert is enabled | x |
| state         | boolean | If true, alert is currently triggered | |               
| threshold     | string  | Represents an alert threshold when applicable | x |
| change_time   | string  | Timestamp when alert state last changed | |
| severity      | 'DEBUG'<br />'INFO'<br />'WARNING'<br />'ERROR'<br />'CRITICAL' | The alert's severity | |
| change_value  | object | Contains data relevant to the evaluation time when the alert went on/off (thresholds, sampled values, etc.) | |  
