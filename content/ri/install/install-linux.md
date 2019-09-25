---
Title:  Redis GUI Client for Linux
date:  2018-07-20 03:49:29 +0530
weight: 30
categories: ["RI"]
path: install/linux/
---
### Install Redis GUI for Linux

RedisInsight is a single, self-contained binary that starts a web-server on port 8001.

```bash
wget -O rdbtools "({{< replace "version" >}}{{< param linux_dl_link >}}#_#{{< param docker_image_version >}}{{< /replace >}})" \
    && sudo mv ./rdbtools /usr/local/bin/ \
    && sudo chmod +x /usr/local/bin/rdbtools

rdbtools
```

Once the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and follow onscreen instructions to activate RedisInsight Redis GUI for Linux
