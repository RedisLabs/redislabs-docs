---
layout: docs
title:  RDBTools Features - Slowlog
description: RDBTools Features - Slowlog Details
date:  2018-06-14 03:49:29 +0530
category: docs
permalink: docs/features/slowlog/
pageTitle: RDBTools Features - Slowlog
---

RDBTools Slowlog is a list of slow operations for your redis instance. These can be used to troubleshoot performance issues. Each entry in the list displays the command, duration and timestamp. Any transaction that exceeds `slowlog-log-slower-than` microseconds will be recorded up to a maximum of `slowlog-max-len` after which older entries will be discarded.

**Clear Slowlog** - Clear slowlog clears all the slowlog entries from your redis server.


<img src="/img/documentation/slowlog.png"/>
