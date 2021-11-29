---
Title: Services configuration object
linkTitle: services_configuration
description: An object for optional cluster services settings
weight: $weight
alwaysopen: false
categories: ["RS"]
---

Optional cluster services settings

| Name | Type/Value | Description |
|------|------------|-------------|
| cm_server | [cm_server]({{<relref "/rs/references/rest-api/objects/services_configuration/cm_server">}}) object | Whether to enable/disable the CM server |
| crdb_coordinator | [crdb_coordinator]({{<relref "/rs/references/rest-api/objects/services_configuration/crdb_coordinator">}}) object | Whether to enable/disable the CRDB coordinator process |
| crdb_worker | [crdb_worker]({{<relref "/rs/references/rest-api/objects/services_configuration/crdb_worker">}}) object | Whether to enable/disable the CRDB worker processes |
| mdns_server | [mdns_server]({{<relref "/rs/references/rest-api/objects/services_configuration/mdns_server">}}) object | Whether to enable/disable the multicast DNS server |
| pdns_server | [pdns_server]({{<relref "/rs/references/rest-api/objects/services_configuration/pdns_server">}}) object | Whether to enable/disable the PDNS server |
| saslauthd | [saslauthd]({{<relref "/rs/references/rest-api/objects/services_configuration/saslauthd">}}) object | Whether to enable/disable the saslauthd service |
| stats_archiver | [stats_archiver]({{<relref "/rs/references/rest-api/objects/services_configuration/stats_archiver">}}) object | Whether to enable/disable the stats archiver service |
