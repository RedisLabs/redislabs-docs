---
layout: docs
title:  Redis Desktop Client for Mac, Windows and Linux
date:  2018-07-20 03:49:29 +0530
weight: 5
categories: ["RI"]
permalink: docs/install/redis-desktop-mac-win-linux/
pageTitle: Redis Desktop GUI Client
---
RedisInsight is a full-featured Desktop GUI client for Windows, Linux and Mac.

RedisInsight offers the following features -

* Easy to use browser based interface to search keys, view and edit data
* Only GUI tool to support Redis Cluster
* Supports SSL/TLS based connections
* Run Memory Analysis

Install RedisInsight on your Desktop

* For Windows, download [rdbtools-win-{{< param docker_image_version >}}.exe]({{< param windows_dl_link >}}) and double-click to start webserver
* For Mac, download [rdbtools-mac-{{< param docker_image_version >}}.dmg]({{< replace "version" >}}{{< param mac_dl_link >}}#_#{{< param docker_image_version >}}{{< /replace >}}) and launch app to start webserver
* For Linux, [download rdbtools binary](/docs/install/linux/) and execute to start webserver

Once the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and follow onscreen instructions to activate RedisInsight.
