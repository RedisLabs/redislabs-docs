---
Title: Collect logs
linkTitle: Collect logs
description: Run the log collector script to package relevant logs into a tar.gz file to send to Redis Support for help troubleshooting your Kubernetes environment.
weight: 89
alwaysopen: false
categories: ["Platforms"]
aliases: [ 
      /platforms/kubernetes/tasks/run-log-collector-script/, 
      /platforms/kubernetes/tasks/run-log-collector-script.md, 
      /platforms/kubernetes/logs/collect-logs.md,
      /platforms/kubernetes/logs/collect-logs/,
      /kubernetes/logs/collect-logs.md,
      /kubernetes/logs/collect-logs/
]
    
---

The Redis Enterprise cluster (REC) log collector script ([`log_collector.py`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/log_collector/log_collector.py)) creates and fills a directory with the relevant logs for your environment. These logs will help the support team with troubleshooting.

{{<note>}} This script requires Python 3.6 or above. {{</note>}}

1. Download the [`log_collector.py`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/log_collector/log_collector.py) file.
2. Run the script on the system that runs your `kubectl` or `oc` commands.
    - Pass `-n` parameter to run on a different namespace than the one you are currently on.
    - Run with `-h` to see options.

    ```bash
    python log_collector.py
    ```

  {{< note >}} If you get an error because the yaml module is not found, install the pyYAML module with `pip install pyyaml`.
  {{< /note >}}

3. Upload the resulting `tar.gz` file containing all the logs to [Redis Support](https://support.redislabs.com/).
