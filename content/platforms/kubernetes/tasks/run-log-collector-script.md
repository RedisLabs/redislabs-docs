---
Title: Run the log collector script
linkTitle: Run log_collector.py
weight: 89
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/tasks/run-log-collector-script/
content/platforms/kubernetes/tasks/run-log-collector-script.md

---

The Redis Enterprise cluster (REC) log collector script ([`log_collector.py`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/log_collector/log_collector.py)) creates and fills a directory with the relevant logs for your environment.

1. Download the [`log_collector.py`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/log_collector/log_collector.py) file.
2. Run the script on the system that runs your `kubectl` or `oc` commands.
    Pass `-n` parameter to run on the current namespace. 
    Run with `-h` to see options. 
  ```bash
   python log_collector.py
  ```


