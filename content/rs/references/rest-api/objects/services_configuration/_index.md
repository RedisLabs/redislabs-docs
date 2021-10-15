---
Title: Services configuration object
linkTitle: services_configuration
description: Documents the services_configuration object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

Optional cluster services settings

| Name | Type/Value | Description |
|------|------------|-------------|
| mdns_server       | [mdns_server]({{<relref "/rs/references/rest-api/objects/services_configuration/mdns_server">}}) object | Whether to enable/disable the Multicast DNS server |
| cm_server         | [cm_server]({{<relref "/rs/references/rest-api/objects/services_configuration/cm_server">}}) object | Whether to enable/disable the CM server |
| stats_archiver    | [stats_archiver]({{<relref "/rs/references/rest-api/objects/services_configuration/stats_archiver">}}) object | Whether to enable/disable the stats archiver service |
| saslauthd         | [saslauthd]({{<relref "/rs/references/rest-api/objects/services_configuration/saslauthd">}}) object | Whether to enable/disable the saslauthd service |
| pdns_server       | [pdns_server]({{<relref "/rs/references/rest-api/objects/services_configuration/pdns_server">}}) object | Whether to enable/disable the pdns server |
| crdb_coordinator  | [crdb_coordinator]({{<relref "/rs/references/rest-api/objects/services_configuration/crdb_coordinator">}}) object | Whether to enable/disable the crdb coordinator process |
| crdb_worker       | [crdb_worker]({{<relref "/rs/references/rest-api/objects/services_configuration/crdb_worker">}}) object | Whether to enable/disable the crdb worker processes |
