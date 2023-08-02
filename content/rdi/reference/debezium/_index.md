---
Title: Debezium Server configuration file
linkTitle: Debezium Server configuration
description: Application properties settings used to configure Debezim Server for source database servers
weight: 50
alwaysopen: false
categories: ["redis-di"]
aliases:
---

The `application.properties` file configures Debezium Server configuration to support source databases. It contains sections that define the sink connector (Redis) configuration and the source connector configuration.

This file needs to be saved in the host running Debezium Server. For details, see [Debezium Server deployment]({{<relref "/rdi/installation/debezium-server-deployment">}}).

The following topics describe `application.properties` for specific database servers:

{{<allchildren style="h2" description="true"/>}}
