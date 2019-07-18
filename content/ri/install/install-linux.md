---
layout: docs
title:  Redis GUI Client for Linux
date:  2018-07-20 03:49:29 +0530
weight: 30
categories: ["RI"]
permalink: docs/install/linux/
pageTitle: Redis GUI Client for Linux
---
### Install Redis GUI for Linux

RedisInsight is a single, self-contained binary that starts a web-server on port 8001.

```bash
wget -O rdbtools "{{< param linux_dl_link >}}" \
    && sudo mv ./rdbtools /usr/local/bin/ \
    && sudo chmod +x /usr/local/bin/rdbtools

rdbtools
```

Once the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and follow onscreen instructions to activate RedisInsight Redis GUI for Linux
