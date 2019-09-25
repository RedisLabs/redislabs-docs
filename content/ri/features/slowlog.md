---
layout: docs
title:  Slowlog
date:  2018-06-14 03:49:29 +0530
weight: 70
categories: ["RI"]
permalink: docs/features/slowlog/
pageTitle: Slowlog
---
RedisInsight Slowlog is a list of slow operations for your redis instance. These can be used to troubleshoot performance issues. Each entry in the list displays the command, duration and timestamp. Any transaction that exceeds `slowlog-log-slower-than` microseconds will be recorded up to a maximum of `slowlog-max-len` after which older entries will be discarded.

**Clear Slowlog** - Clear slowlog clears all the slowlog entries from your redis server.

![slowlog](/images/ri/slowlog.png)
